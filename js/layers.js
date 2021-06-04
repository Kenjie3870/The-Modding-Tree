addLayer("m", {
    name: "Makers",
    symbol: "M",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fff",
    requires: new Decimal(25),
    resource: "Makers",
    baseResource: "Planck Lengths",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.05,
    softcap: new Decimal(1e3),
    softcapPower: new Decimal(0.25),
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('m', 22)) mult = mult.mul(upgradeEffect('m', 22))
        if (hasUpgrade('m', 33)) mult = mult.mul(upgradeEffect('m', 33))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "m", description: "<b>M</b> - Makes a maker", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    layerShown(){return true},
    passiveGeneration() {if(hasUpgrade('m',32)) return new Decimal(5)},
    automate() {player[this.layer].buyables[11]},

    tabFormat: {
        "Main": {
            content: ["main-display",
            ["prestige-button", function() {return "With your godlike powers, make"}],
            ["display-text", function() {return "You have <b>"+format(player.points)+"</b> PL."}],
            "milestones","upgrades"]
        },
        "Main II": {
            content: ["main-display",
            ["prestige-button", function() {return "With your godlike powers, make"}],
            ["display-text", function() {return "You have <b>"+format(player.points)+"</b> PL."}],
            "buyables","challenges"],
            unlocked() {return hasUpgrade('m',31)}
        }
    },

    upgrades: {
        11: {
            description: "<b>m11: Maker?</b><br>Make makers useful.<br>PL gain is affected by Makers",
            cost: new Decimal(1),
            effect() {
                let a = new Decimal(0.5)
                if(hasUpgrade('m',12)) a = a.add(upgradeEffect('m',12))
                if(hasChallenge('m',11)) a = a.add(0.15)
                // -----------------------------------------------------
                let b = new Decimal(1)
                if(hasUpgrade('m',41)) b = b.mul(2)
                // -----------------------------------------------------
                return player[this.layer].points.add(2).pow(a).mul(b)
            },
            effectDisplay() {
                let a = new Decimal(0.5)
                if(hasUpgrade('m',12)) a = a.add(upgradeEffect('m',12))
                if(hasChallenge('m',11)) a = a.add(0.15)
                return "<b>+"+format(upgradeEffect(this.layer,this.id))+"</b> to PL base gain (Exponent: <b>"+format(a)+"</b>)"
            },
            unlocked() {return player[this.layer].points.gte(1) || hasUpgrade('m',11)}
        },
        12: {
            description: "<b>m12: 2SLOW4U</b><br>Increase <b>m11</b>'s effect exponent by 0.25",
            cost: new Decimal(2),
            effect() {
                let x = new Decimal(0.25)
                if(hasUpgrade('m',13)) x = x.add(upgradeEffect('m',13))
                if(hasChallenge('m',11)) x = x.add(0.05)
                return x
            },
            effectDisplay() {return "<b>+"+format(upgradeEffect(this.layer,this.id))+"</b> to <b>m11</b>'s effect exponent"},
            unlocked() {return hasUpgrade('m',11)}
        },
        13: {
            description: "<b>m13: Another!</b><br>Increase <b>m12</b>'s effect by 0.15",
            cost: new Decimal(5),
            effect() {
                let x = new Decimal(0.15)
                if(hasChallenge('m',11)) x = x.add(0.05)
                return x
            },
            effectDisplay() {return "<b>+"+format(upgradeEffect(this.layer,this.id))+"</b> to <b>m12</b>'s effect"},
            unlocked() {return hasUpgrade('m',12)}
        },
        21: {
            description: "<b>m21: Finally!</b><br>PL gain is doubled",
            cost: new Decimal(10),
            effect() {
                let x = new Decimal(2)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasChallenge('m',12)) x = x.pow(1.5)
                if(hasUpgrade('m',23)) x = x.mul(upgradeEffect('m',23))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            effectDisplay() {return "<b>x"+format(upgradeEffect(this.layer,this.id))+"</b> to PL gain"},
            unlocked() {return hasUpgrade('m',13)}
        },
        22: {
            description: "<b>m22: Annoying...</b><br>Makers upon reset are multiplied",
            cost: new Decimal(10),
            effect() {
                let x = new Decimal(3)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasChallenge('m',12)) x = x.pow(1.5)
                if(hasUpgrade('m',23)) x = x.mul(upgradeEffect('m',23))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            effectDisplay() {return "<b>x"+format(upgradeEffect(this.layer,this.id))+"</b> Makers upon reset"},
            unlocked() {return hasUpgrade('m',21)}
        },
        23: {
            description: "<b>m23: Well...</b><br>Multiply <b>m21</b> and <b>m22</b>'s effects",
            cost: new Decimal(33),
            effect() {
                let x = new Decimal(2)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasChallenge('m',12)) x = x.pow(1.5)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasUpgrade('m',41)) x = x.mul(upgradeEffect('m',41))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            effectDisplay() {return "<b>x"+format(upgradeEffect(this.layer,this.id))+"</b> to <b>m21</b> and <b>m22</b>'s effects"},
            unlocked() {return hasUpgrade('m',22)}
        },
        31: {
            description: "<b>m31: Yeesh!</b><br>Unlock a challenge",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade('m',23)}
        },
        32: {
            description: "<b>Why?</b><br>Unlock a buyable and a milestone, and passively generate Makers",
            cost: new Decimal(3333),
            unlocked() {return hasChallenge('m',12)}
        },
        33: {
            description: "<b>Finally!</b><br>Multiply Maker gain by <b>buyables bought</b>",
            cost: new Decimal(5e3),
            effect() {
                let a = getBuyableAmount('m',11).add(getBuyableAmount('m',12))
                let b = getBuyableAmount('m',13)
                return a.add(b)
            },
            effectDisplay() {return "<b>x"+format(upgradeEffect(this.layer,this.id))+"</b> to Maker gain"},
            unlocked() {return hasMilestone('m',1)}
        },
        41: {
            description: "<b>Four?</b><br><b>m11</b> and all of <b>m-row 2</b>'s effects are multiplied",
            cost: new Decimal(1.5e4),
            effect() {return new Decimal(2)},
            effectDisplay() {return "<b>x"+format(upgradeEffect(this.layer,this.id))+"</b> to <b>m11</b> and <b>m-row 2</b>"},
            unlocked() {return hasUpgrade('m',33)}
        },
        42: {
            description: "<b>Not four.</b><br>Unlock two more challenges",
            cost: new Decimal(1e5),
            unlocked() {return hasUpgrade('m',41)}
        }
    },

    challenges: {
        11: {
            name: "Challenge m11: first!",
            challengeDescription() {return "<b><i>UPON ENTERING, YOUR MAKERS WILL RESET</i></b><br>PL gain is raised to the power of <b>0.5</b>"},
            unlocked() {return hasUpgrade('m',31)},
            goalDescription: "Goal: <b>100</b> PL",
            canComplete() {return player.points.gte(100)},
            rewardEffect() {new Decimal(0.05)},
            rewardDescription: "All <b>m-row 1</b> upgrades' effects increase by <b>0.05</b> each, and unlock a new challenge",
            onEnter() {
                player.points = new Decimal(0)
                player[this.layer].points = new Decimal(0)
            },
            onExit() {player.points = new Decimal(0)}
        },
        12: {
            name: "Challenge m12: disaster",
            challengeDescription() {return "<b>Challenge m11</b>'s effect + <b>m-row 2</b> does nothing"},
            unlocked() {return hasChallenge('m',11)},
            goalDescription: "Goal: <b>2,500</b> PL",
            canComplete() {return player.points.gte(2.5e3)},
            rewardEffect() {new Decimal(1.5)},
            rewardDescription: "All <b>m-row 2</b> upgrades' effects are raised to 1.5",
            countsAs: [11],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        21: {
            name: "Challenge m21: again",
            challengeDescription() {return "<b>Challenge m12</b> + <b>m11</b>'s exponent is halved"},
            unlocked() {return hasUpgrade('m',42)},
            goalDescription: "Goal: <b>1,000,000,000</b> PL",
            canComplete() {return player.points.gte(1e9)},
            rewardEffect() {new Decimal(0.1)},
            rewardDescription: "<b>m12</b>'s effect exponent increases by <b>0.1</b>",
            countsAs: [12],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        22: {
            name: "Challenge m22: binary?",
            challengeDescription() {return "<b>Challenge m12</b>, but point gain is raised to <b>0.33</b>"},
            unlocked() {return hasUpgrade('m',42)},
            goalDescription: "Goal: <b>11,111</b> PL",
            canComplete() {return player.points.gte(11111)},
            rewardEffect() {new Decimal(1.11)},
            rewardDescription: "PL gain is raised to <b>1.11</b>",
            countsAs: [12],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        31: {
            name: "Challenge m31: finals?",
            challengeDescription() {return "<b>Challenge m21</b>, but point gain is <b>square-rooted</b> after the effect"},
            unlocked() {return hasChallenge('m',21) && hasChallenge('m',22)},
            goalDescription: "Goal: <b>15,000</b> PL",
            canComplete() {return player.points.gte(1.5e4)},
            rewardEffect() {new Decimal(3)},
            rewardDescription: "<b>Buyable m11's</b> and <b>m-row 2</b> effect is quadrupled, and the same buyable is cheapened",
            countsAs: [21],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        }
    },
    
    buyables: {
        11: {
            title: "Buyable m11: very humble beginnings",
            cost() {
                let x = new Decimal(3).pow(getBuyableAmount(this.layer,this.id)).mul(50).div(buyableEffect('m',12))
                if(hasChallenge('m',31)) x = x.div(3)
                return x
            },
            display() {
                let a = this.cost()
                let b = getBuyableAmount(this.layer,this.id)
                let c = this.effect()
                let d = this.base()
                return "Your very first buyable!<br><b>x"+format(d)+" to PL gain</b><br>Cost: <b>"+format(a)+"</b><br>Amount: <b>"+format(b)+"</b><br>Effect: <b>"+format(c)+"</b>"
            },
            canAfford() {return player[this.layer].points.gte(this.cost())},
            buy() {
                if(hasMilestone('m',2)) {setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))}
                else player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
            effect() {
                let x = this.base().pow(getBuyableAmount(this.layer,this.id))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            base() {return new Decimal(1.23).add(buyableEffect('m',13))},
            unlocked() {return hasUpgrade('m',32)}
        },
        12: {
            title: "Buyable m12: Cheaper is Better",
            cost() {
                let x = new Decimal(3).add(getBuyableAmount(this.layer,this.id))
                return x
            },
            display() {
                let a = this.base()
                let b = this.cost()
                let c = getBuyableAmount(this.layer,this.id)
                let d = this.effect()
                let e = this.bonusBuyablesFunction()
                if(getBuyableAmount('m',21).gte(1)) return "Another buyable that cheapens the cost of the previous buyable by <b>"+format(a)+"</b><br>Cost: <b>"+format(b)+"</b><br>Amount: <b>"+format(c)+"</b> + <b>"+format(e)+"</b><br>Effect: <b>"+format(d)+"</b>"
                else return "Another buyable that cheapens the cost of the previous buyable by <b>"+format(a)+"</b><br>Cost: <b>"+format(b)+"</b><br>Amount: <b>"+format(c)+"</b><br>Effect: <b>"+format(d)+"</b>"
            },
            canAfford() {return getBuyableAmount('m',11).gte(this.cost())},
            buy() {
                setBuyableAmount('m',11,getBuyableAmount('m',11).sub(this.cost()))
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
            effect() {return this.base().pow(this.power())},
            base() {return new Decimal(1.11).add(buyableEffect('m',13))},
            power() {
                let x = getBuyableAmount(this.layer,this.id)
                if(getBuyableAmount('m',21).gte(0)) x = x.add(buyableEffect('m',21))
                return x
            },
            bonusBuyablesFunction() {
                let x = buyableEffect('m',21)
                return x
            },
            unlocked() {return hasMilestone('m',0)}
        },
        13: {
            title: "Buyable m13: This Again",
            cost() {
                let x = new Decimal(3).add(getBuyableAmount(this.layer,this.id).mul(2))
                return x
            },
            purchaseLimit: new Decimal(5),
            display() {
                let a = this.base()
                let b = this.cost()
                let c = getBuyableAmount(this.layer,this.id)
                let d = this.effect()
                let e = this.purchaseLimit
                return "Increase the base of the previous buyables by <b>"+format(a)+"</b><br>Cost: <b>"+format(b)+"</b><br>Amount: <b>"+format(c)+"</b> out of <b>"+format(e)+"</b><br>Effect: <b>"+format(d)+"</b>"
            },
            canAfford() {return getBuyableAmount('m',12).gte(this.cost())},
            buy() {
                setBuyableAmount('m',12,getBuyableAmount('m',12).sub(this.cost()))
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
            effect() {return this.base().mul(getBuyableAmount(this.layer,this.id))},
            base() {return new Decimal(0.02)},
            unlocked() {return hasMilestone('m',1)}
        },
        21: {
            title: "Buyable m21: a new era",
            cost() {
                let x = new Decimal(5).add(getBuyableAmount(this.layer,this.id))
                return x
            },
            purchaseLimit: new Decimal(2),
            display() {
                let a = this.base()
                let b = this.cost()
                let c = getBuyableAmount(this.layer,this.id)
                let d = this.effect()
                let e = this.purchaseLimit
                return "Get free <b>Buyable m12</b>s and increase the purchase limit of the previous buyable by +<b>"+format(a)+"</b><br>Requirement: <b>"+format(b)+"</b><br>Amount: <b>"+format(c)+"</b> out of <b>"+format(e)+"</b><br>Effect: <b>+"+format(d)+"</b>"
            },
            canAfford() {return getBuyableAmount('m',13).gte(this.cost())},
            buy() {
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
            effect() {return this.base().mul(getBuyableAmount(this.layer,this.id))},
            base() {return new Decimal(1).floor()},
            unlocked() {return hasMilestone('m',2)}
        }
    },
    
    milestones: {
        0: {
            requirementDescription: "Milestone m0 - 3 Buyable m11",
            effectDescription: "Unlock another buyable",
            done() {return getBuyableAmount('m',11).gte(3)},
            unlocked() {return hasUpgrade('m',32)}
        },
        1: {
            requirementDescription: "Milestone m1 - 3 Buyable m12",
            effectDescription: "Unlock another buyable and more upgrades",
            done() {return getBuyableAmount('m',12).gte(3)},
            unlocked() {return hasMilestone('m',0)}
        },
        2: {
            requirementDescription: "Milestone m2 - 3 Buyable m13 + Challenge m31",
            effectDescription: "Unlock a buyable, automate <b>Buyable m11</b>, and it doesn't cost anything",
            done() {return getBuyableAmount('m',13).gte(3) && hasChallenge('m',31)},
            unlocked() {return hasChallenge('m',31)},
            toggles: [["m","auto"]]
        }
    }
})