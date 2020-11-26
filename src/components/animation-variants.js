    export const container_variants = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                // restDelta: 2
            }
        },
        closed: {
            x: "-100%",
            transition: {
                type: "spring",
                delay: 0.5,
                stiffness: 200,
                damping: 75
            }
        }
    } 

    export const item_div_variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            overflowY: "scroll"
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
            overflowY: "hidden"
        }
    }

    export const item_variants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    }

    export const right_container_variants = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                // restDelta: 2
            }
        },
        closed: {
            x: "-20%",
            transition: {
                type: "spring",
                delay: 0.5,
                stiffness: 200,
                damping: 75
            }
        }
    }

    