
;; streak-core
;; Core logic for STX Streaks

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-ACTIVE (err u101))
(define-constant ERR-NO-STREAK (err u102))
(define-constant ERR-TOO-EARLY (err u103))
(define-constant ERR-TOO-LATE (err u104))
(define-constant ERR-INSUFFICIENT-FUNDS (err u105))

;; 1 day in blocks (approx 144 blocks assuming 10 min blocks)
;; Stacks block time is ~10 min. 24h = 144 blocks.
(define-constant BLOCKS-PER-DAY u144)

;; Data Vars
(define-data-var platform-fee-bps uint u300) ;; 3% (300 bps)
(define-data-var total-staked uint u0)

;; Maps
(define-map streaks
    { user: principal }
    {
        start-block: uint,
        last-checkin-block: uint,
        stake-amount: uint,
        day-count: uint
    }
)

;; Public Functions

;; Start a new streak
(define-public (start-streak (amount uint))
    (let
        (
            (sender tx-sender)
            (existing-streak (map-get? streaks { user: sender }))
        )
        (asserts! (is-none existing-streak) ERR-ALREADY-ACTIVE)
        (asserts! (> amount u0) ERR-INSUFFICIENT-FUNDS)
        
        ;; Transfer STX to contract
        (try! (stx-transfer? amount sender (as-contract tx-sender)))
        
        ;; Initialize streak
        (map-set streaks { user: sender }
            {
                start-block: burn-block-height,
                last-checkin-block: burn-block-height,
                stake-amount: amount,
                day-count: u1
            }
        )
        
        (var-set total-staked (+ (var-get total-staked) amount))
        (ok true)
    )
)

;; Daily Check-in
(define-public (check-in)
    (let
        (
            (sender tx-sender)
            (streak (unwrap! (map-get? streaks { user: sender }) ERR-NO-STREAK))
            (blocks-since-last (- burn-block-height (get last-checkin-block streak)))
        )
        ;; Must be at least 20 hours passed (approx 120 blocks) but less than 30 hours (180 blocks)
        ;; For demo/testing, we might want shorter windows, but let's stick to logic.
        ;; Actually for hackathon, maybe 1 block? No, let's do logic validation.
        ;; Relaxed window: Check-in allowed if burn-block-height > last-checkin + 10 blocks (for testing)
        (asserts! (> blocks-since-last u10) ERR-TOO-EARLY)
        
        ;; If missed window (e.g. > 200 blocks), they should use 'forfeit' or be liquidated?
        ;; Let's allow check-in if within window. If too late, they fail.
        (asserts! (< blocks-since-last u300) ERR-TOO-LATE)
        
        (map-set streaks { user: sender }
            (merge streak {
                last-checkin-block: burn-block-height,
                day-count: (+ (get day-count streak) u1)
            })
        )
        (ok true)
    )
)

;; Forfeit / Quit (Voluntary)
(define-public (forfeit)
    (let
        (
            (sender tx-sender)
            (streak (unwrap! (map-get? streaks { user: sender }) ERR-NO-STREAK))
        )
        ;; User gives up. Stake goes to treasury/pool.
        ;; For now, just keep in contract and delete streak.
        ;; In full version, this would distribute to others.
        
        (map-delete streaks { user: sender })
        (ok true)
    )
)

;; Read-only

(define-read-only (get-streak (user principal))
    (map-get? streaks { user: user })
)
