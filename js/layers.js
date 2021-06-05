// (although it can mess with this at times) - you can use the lambda format (() => returnValue) instead of the function format (function() { return returnValue }) in your display stuff
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
        let exp = new Decimal(1)
        if (hasChallenge('m',32)) exp = exp.add(0.25)
        return exp
    },
    row: 0,
    hotkeys: [
        {key: "m", description: "M - Makes a maker", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    layerShown(){return true},
    passiveGeneration() {if(hasUpgrade('m',32)) return new Decimal(5)},
    automate() {
        if(hasMilestone('m',2)) {buyBuyable('m',11)}
        if(hasMilestone('m',3)) {buyBuyable('m',12)}
    },
    branches: ['x'],

    microtabs: {
        stuff: {
            "Buyables": { content: ["buyables"], unlocked() {return hasUpgrade('m',32)} },
            "Challenges": { content: ["challenges"], unlocked() {return hasUpgrade('m',31)} },
            "Milestones": { content: ["milestones"], unlocked() {return hasUpgrade('m',32)} },
            "Upgrades": { content: ["upgrades"] },
        }
    },
    
    tabFormat: {
        "Main": {
            content: ["main-display","prestige-button",
            ["display-text", function() {return "You have "+format(player.points)+" PL."}],["microtabs","stuff"]]
        },
        "Effects": {
            content: ["main-display",
            ["display-text", function() {return "You have "+format(player.points)+" PL."}],
            ["infobox","bm"],["infobox","cm"],["infobox","mm"],["infobox","um"]]
        }
    },
    
    upgrades: {
        11: {
            description: "m11: Maker?<br>Make makers useful.<br>PL gain is affected by Makers",
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
                return "+"+format(upgradeEffect(this.layer,this.id))+" to PL base gain (Exponent: "+format(a)+")"
            }
        },
        12: {
            description: "m12: 2SLOW4U<br>Increase m11's effect exponent by 0.25",
            cost: new Decimal(2),
            effect() {
                let x = new Decimal(0.25)
                if(hasUpgrade('m',13)) x = x.add(upgradeEffect('m',13))
                if(hasChallenge('m',11)) x = x.add(0.05)
                return x
            },
            effectDisplay() {return "+"+format(upgradeEffect(this.layer,this.id))+" to m11's effect exponent"},
            unlocked() {return hasUpgrade('m',11)}
        },
        13: {
            description: "m13: Another!<br>Increase m12's effect by 0.15",
            cost: new Decimal(5),
            effect() {
                let x = new Decimal(0.15)
                if(hasChallenge('m',11)) x = x.add(0.05)
                return x
            },
            effectDisplay() {return "+"+format(upgradeEffect(this.layer,this.id))+" to m12's effect"},
            unlocked() {return hasUpgrade('m',12)}
        },
        21: {
            description: "m21: Finally<br>PL gain is multiplied",
            cost: new Decimal(10),
            effect() {
                let x = new Decimal(3)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasChallenge('m',12)) x = x.pow(1.5)
                if(hasUpgrade('m',23)) x = x.mul(upgradeEffect('m',23))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            effectDisplay() {return "x"+format(upgradeEffect(this.layer,this.id))+" to PL gain"},
            unlocked() {return hasUpgrade('m',12)}
        },
        22: {
            description: "m22: Annoying...<br>Makers upon reset are multiplied",
            cost: new Decimal(10),
            effect() {
                let x = new Decimal(3)
                if(inChallenge('m',12)) x = new Decimal(1)
                if(hasChallenge('m',12)) x = x.pow(1.5)
                if(hasUpgrade('m',23)) x = x.mul(upgradeEffect('m',23))
                if(hasChallenge('m',31)) x = x.mul(4)
                return x
            },
            effectDisplay() {return "x"+format(upgradeEffect(this.layer,this.id))+" Makers upon reset"},
            unlocked() {return hasUpgrade('m',12)}
        },
        23: {
            description: "m23: Well...<br>Multiply m21 and m22's effects",
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
            effectDisplay() {return "x"+format(upgradeEffect(this.layer,this.id))+" to m21 and m22's effects"},
            unlocked() {return hasUpgrade('m',22) && hasUpgrade('m',21)}
        },
        31: {
            description: "m31: Yeesh!<br>Unlock a challenge",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade('m',23)}
        },
        32: {
            description: "m32: Why?<br>Unlock a buyable and a milestone, and passively generate Makers",
            cost: new Decimal(3333),
            unlocked() {return hasChallenge('m',12)}
        },
        33: {
            description: "m33: Finally!<br>Multiply Maker gain by m-buyables bought",
            cost: new Decimal(5e3),
            effect() {
                let a = getBuyableAmount('m',11).add(getBuyableAmount('m',12)).add(getBuyableAmount('m',13)).add(getBuyableAmount('m',21))
                let b = getBuyableAmount('m',11).add(getBuyableAmount('m',12).mul(2)).add(getBuyableAmount('m',13).mul(5)).add(getBuyableAmount('m',21).mul(10)).mul(5)
                return (hasUpgrade('m',43) ? b : a)
            },
            effectDisplay() {return "x"+format(upgradeEffect(this.layer,this.id))+" to Maker gain"},
            unlocked() {return hasMilestone('m',1)}
        },
        41: {
            description: "m41: Four?<br>m11 and all of m-row 2's effects are multiplied",
            cost: new Decimal(1.5e4),
            effect() {return new Decimal(2)},
            effectDisplay() {return "x"+format(upgradeEffect(this.layer,this.id))+" to m11 and m-row 2"},
            unlocked() {return hasUpgrade('m',33)}
        },
        42: {
            description: "m42: Not four.<br>Unlock two more challenges",
            cost: new Decimal(1e5),
            unlocked() {return hasUpgrade('m',41)}
        },
        43: {
            description: "m43: Finally!!<br>m33's effect is better, make the next layer visible, and unlock another challenge",
            cost: new Decimal(2500420),
            unlocked() {return hasUpgrade('m',42)}
        }
    },

    challenges: {
        11: {
            name: "Challenge m11: first!",
            challengeDescription() {return "<i>UPON ENTERING, YOUR MAKERS WILL RESET</i><br>PL gain is raised to the power of 0.5"},
            unlocked() {return hasUpgrade('m',31)},
            goalDescription: "Goal: 100 PL",
            canComplete() {return player.points.gte(100)},
            rewardEffect() {new Decimal(0.05)},
            rewardDescription: "All m-row 1 upgrades' effects increase by 0.05 each, and unlock a new challenge",
            onEnter() {
                player.points = new Decimal(0)
                player[this.layer].points = new Decimal(0)
            },
            onExit() {player.points = new Decimal(0)}
        },
        12: {
            name: "Challenge m12: disaster",
            challengeDescription() {return "Challenge m11's effect + m-row 2 does nothing"},
            unlocked() {return hasChallenge('m',11)},
            goalDescription: "Goal: 2,500 PL",
            canComplete() {return player.points.gte(2.5e3)},
            rewardEffect() {new Decimal(1.5)},
            rewardDescription: "All m-row 2 upgrades' effects are raised to 1.5",
            countsAs: [11],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        21: {
            name: "Challenge m21: again",
            challengeDescription() {return "Challenge m12 + m11's exponent is halved"},
            unlocked() {return hasUpgrade('m',42)},
            goalDescription: "Goal: 1,000,000,000 PL",
            canComplete() {return player.points.gte(1e9)},
            rewardEffect() {new Decimal(0.1)},
            rewardDescription: "m12's effect increases by 0.1",
            countsAs: [12],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        22: {
            name: "Challenge m22: binary?",
            challengeDescription() {return "Challenge m12, but point gain is raised to 0.33"},
            unlocked() {return hasUpgrade('m',42)},
            goalDescription: "Goal: 11,111 PL",
            canComplete() {return player.points.gte(11111)},
            rewardEffect() {new Decimal(1.11)},
            rewardDescription: "PL gain is raised to 1.11",
            countsAs: [12],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        31: {
            name: "Challenge m31: finals?",
            challengeDescription() {return "Challenge m21, but point gain is square-rooted after the effect"},
            unlocked() {return hasChallenge('m',21) && hasChallenge('m',22)},
            goalDescription: "Goal: 15,000 PL",
            canComplete() {return player.points.gte(1.5e4)},
            rewardEffect() {new Decimal(4)},
            rewardDescription: "Buyable m11 and m-row 2's upgrade effects are quadrupled, and Buyable m11 is cheapened",
            countsAs: [21],
            onEnter() {player.points = new Decimal(0)},
            onExit() {player.points = new Decimal(0)}
        },
        32: {
            name: "Challenge m32: truly",
            challengeDescription() {return "Challenge m22 AND Challenge m31's effects are combined"},
            unlocked() {return hasUpgrade('m',43)},
            goalDescription: "Goal: 1,000 PL",
            canComplete() {return player.points.gte(1e3)},
            rewardEffect() {new Decimal(1.25)},
            rewardDescription: "Maker gain is raised to 1.25",
            countsAs: [22,31],
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
            purchaseLimit() {return new Decimal(3).add(getBuyableAmount('m',12))},
            display() {
                let a = this.cost()
                let b = getBuyableAmount(this.layer,this.id)
                let c = this.effect()
                let d = this.base()
                let e = this.purchaseLimit()
                return "Your very first buyable!<br>x"+format(d)+" to PL gain<br>Cost: "+format(a)+"<br>Amount: "+format(b)+" out of "+format(e)+"<br>Effect: "+format(c)+""
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
                let e = this.bbf()
                if(getBuyableAmount('m',21).gte(1)) return "Another buyable that cheapens the cost of the previous buyable by "+format(a)+"<br>Cost: "+format(b)+"<br>Amount: "+format(c)+" + "+format(e)+"<br>Effect: "+format(d)+""
                else return "Another buyable that cheapens the cost of the previous buyable by "+format(a)+"<br>Cost: "+format(b)+"<br>Amount: "+format(c)+"<br>Effect: "+format(d)+""
            },
            canAfford() {return getBuyableAmount('m',11).gte(this.cost())},
            buy() {
                if(hasMilestone('m',3)) setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
                else setBuyableAmount('m',11,getBuyableAmount('m',11).sub(this.cost()))
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
            effect() {return this.base().pow(this.power())},
            base() {return new Decimal(1.11).add(buyableEffect('m',13))},
            power() {
                let x = getBuyableAmount(this.layer,this.id)
                if(getBuyableAmount('m',21).gte(0)) x = x.add(buyableEffect('m',21))
                return x
            },
            bbf() {
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
            purchaseLimit() {return new Decimal(5).add(buyableEffect('m',21))},
            display() {
                let a = this.base()
                let b = this.cost()
                let c = getBuyableAmount(this.layer,this.id)
                let d = this.effect()
                let e = this.purchaseLimit()
                return "Increase the base of the previous buyables by "+format(a)+"<br>Cost: "+format(b)+"<br>Amount: "+format(c)+" out of "+format(e)+"<br>Effect: "+format(d)+""
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
            purchaseLimit() {return new Decimal(2)},
            display() {
                let a = this.base()
                let b = this.cost()
                let c = getBuyableAmount(this.layer,this.id)
                let d = this.effect()
                let e = this.purchaseLimit()
                return "Get free Buyable m12s and increase the purchase limit of the previous buyable by +"+format(a)+"<br>Requirement: "+format(b)+"<br>Amount: "+format(c)+" out of "+format(e)+"<br>Effect: +"+format(d)+""
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
            effectDescription: "Unlock a buyable, automate Buyable m11, and it doesn't cost anything",
            done() {return getBuyableAmount('m',13).gte(3) && hasChallenge('m',31)},
            unlocked() {return hasChallenge('m',31)}
        },
        3: {
            requirementDescription: "Milestone m3 - 2 Buyable m21",
            effectDescription: "Automation also applies to Buyable m12, and it doesn't cost anything",
            done() {return getBuyableAmount('m',21).gte(2)},
            unlocked() {return hasMilestone('m',2)}
        }
    },

    infoboxes: {
        bm: {
            title: "Buyable Effects",
            body() {
                let aa = (hasUpgrade('m',32) ? "Buyable m11 is multiplying PL gain by "+format(buyableEffect('m',11))+"<br>" : "")
                let bb = (hasMilestone('m',0) ? "Buyable m12 is cheapening the previous buyable by "+format(buyableEffect('m',12))+"<br>" : "")
                let cc = (hasMilestone('m',1) ? "Buyable m13 is adding "+format(buyableEffect('m',13))+" to the previous buyables' bases<br>" : "")
                let dd = (hasMilestone('m',2) ? "Buyable m13 is making free Buyable m12s and increasing the purchase limit of the previous buyable by "+format(buyableEffect('m',21)) : "")
                return `${(aa)}${(bb)}${(cc)}<br>${(dd)}`
            },
            unlocked() {return hasUpgrade('m',32)}
        },
        cm: {
            title: "Challenge Effects",
            body() {
                let aa = (hasUpgrade('m',31) ? "Challenge m11 is increasing m11-m13's upgrades' effects by 0.05, and unlocking 1 new challenge<br>" : "")
                let bb = (hasChallenge('m',11) ? "Challenge m12 is raising m21-m23's upgrades' effects by 1.5<br>" : "")
                let cc = (hasUpgrade('m',42) ? "Challenge m21 is increasing m12's effect by 0.1<br>" : "")
                let dd = (hasUpgrade('m',42) ? "Challenge m22 is raising PL gain to 1.11<br>" : "")
                let ee = (hasChallenge('m',21)&&hasChallenge('m',22) ? "Challenge m31 is quadrupling Buyable m11 and m21-m23's effects, and cheapening Buyable m11<br>" : "")
                return `${(aa)}${(bb)}<br>${(cc)}${(dd)}<br>${(ee)}`
            },
            unlocked() {return hasUpgrade('m',31)}
        },
        mm: {
            title: "Milestone Effects",
            body() {
                let aa = (hasUpgrade('m',32) ? "Milestone m0 unlocks 1 buyable<br>" : "")
                let bb = (getBuyableAmount('m',12).gte(3) ? "Milestone m1 unlocks 1 buyable and several upgrades<br>" : "")
                let cc = (getBuyableAmount('m',13).gte(3)&&hasChallenge('m',31) ? "Milestone m2 unlocks 1 buyable, automates Buyable m11, and makes its cost a requirement<br>" : "")
                let dd = (getBuyableAmount('m',21) ? "Milestone m3 makes Buyable m12 automated and makes its cost a requirement<br>" : "")
                return `${(aa)}${(bb)}${(cc)}${(dd)}`
            },
            unlocked() {return hasUpgrade('m',32)}
        },
        um: {
            title: "Upgrade Effects",
            body() {
                let aa = (hasUpgrade('m',12) ? "m11 adds "+format(upgradeEffect('m',11))+" to base PL gain<br>" : "Sorry, there's nothing here yet! Buy <i>something</i>")
                let bb = (hasUpgrade('m',12) ? "m12 adds "+format(upgradeEffect('m',12))+" to m11's exponent<br>" : "")
                let cc = (hasUpgrade('m',13) ? "m13 adds "+format(upgradeEffect('m',13))+" to m12 effect<br><br>" : "")
                let dd = (hasUpgrade('m',21) ? "m21 multiplies PL gain by "+format(upgradeEffect('m',21))+"<br>" : "" )
                let ee = (hasUpgrade('m',22) ? "m22 multiplies Maker gain by "+format(upgradeEffect('m',22))+"<br>" : "" )
                let ff = (hasUpgrade('m',23) ? "m23 multiplies m21 and m22's effects by "+format(upgradeEffect('m',23))+"<br><br>" : "" )
                let gg = (hasUpgrade('m',31) ? "m31 unlocks 1 new challenge<br>" : "" )
                let hh = (hasUpgrade('m',32) ? "m32 unlocks 1 buyable, 1 milestone, and unlocks the ability to passively generate Makers<br>" : "" )
                let ii = (hasUpgrade('m',33) ? "m33 multiplies Maker gain by "+format(upgradeEffect('m',33))+"<br><br>" : "" )
                let jj = (hasUpgrade('m',41) ? "m41 multiplies m11 and m21-m23's effects by "+format(upgradeEffect('m',41))+"<br>" : "" )
                let kk = (hasUpgrade('m',42) ? "m42 unlocks 2 challenges <br>" : "" )
                let ll = (hasUpgrade('m',43) ? "m43 makes m33's effect better, and unlocks 1 new challenge and layer<br>" : "" )
                return `${(aa)}${(bb)}${(cc)}${(dd)}${(ee)}${(ff)}${(gg)}${(hh)}${(ii)}${(jj)}${(kk)}${(ll)}`
            }
        }
    }
}),

addLayer("x", {
    name: "x",
    symbol: "X",
    position: 0,
    startData() { return {
        unlocked() {return (hasUpgrade('m',43) ? true : false)},
		points: new Decimal(0),
    }},
    color: "#696969",
    requires: new Decimal(15e6),
    resource: "x",
    baseResource: "Makers",
    baseAmount() {return player["m"].points},
    type: "normal",
    exponent: 0.05,
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    row: 1,
    hotkeys: [
        {key: "x", description: "X - X", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], 
    layerShown(){return player["m"].points.gte(15e6)},
})