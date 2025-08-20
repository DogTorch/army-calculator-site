var X=Object.defineProperty;var Z=(y,e,t)=>e in y?X(y,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):y[e]=t;var h=(y,e,t)=>Z(y,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const ee="modulepreload",te=function(y){return"/army-calculator-site/"+y},q={},V=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),r=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(t.map(o=>{if(o=te(o),o in q)return;q[o]=!0;const l=o.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${c}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":ee,l||(m.as="script"),m.crossOrigin="",m.href=o,r&&m.setAttribute("nonce",r),document.head.appendChild(m),l)return new Promise((d,u)=>{m.addEventListener("load",d),m.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})}))}function a(s){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=s,window.dispatchEvent(r),!r.defaultPrevented)throw s}return i.then(s=>{for(const r of s||[])r.status==="rejected"&&a(r.reason);return e().catch(a)})};class v{static isPlayerUnit(e){return e.cost_type!==void 0||e.context==="player"}static isEnemyUnit(e){return e.cost_type===void 0||e.context==="enemy"}static isMortalEnemy(e){return v.isEnemyUnit(e)&&(e.isMortal===!0||e.count!==void 0)}static isImmortalEnemy(e){return v.isEnemyUnit(e)&&!v.isMortalEnemy(e)}static getRemainingEnemyCount(e){return v.isMortalEnemy(e)?e.count:void 0}static getCurrentEnemyHealth(e){return e.currentHealth!==void 0?e.currentHealth:(e.count??1)*e.health}static isMercenary(e){return e.cost_type==="Mercenary"||(e.authority_cost??0)>0}static getPrimaryCost(e){if(!v.isPlayerUnit(e))return 0;switch(e.cost_type){case"Leadership":return e.leadership_cost??0;case"Dominance":return e.dominance_cost??0;case"Authority":case"Mercenary":return e.authority_cost??0;default:return 0}}static getEfficiencyRatio(e){if(v.isPlayerUnit(e)){const t=v.getPrimaryCost(e);return t>0?e.strength/t:0}else return e.health>0?e.strength/e.health:0}static getStrengthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.strength/t:0}static getHealthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.health/t:0}static getStrengthPerHealth(e){return e.health>0?e.strength/e.health:0}static getEffectivenessScore(e){if(v.isPlayerUnit(e)){const t=v.getPrimaryCost(e);return t>0?e.strength*e.health/t:0}else return e.strength*e.health/1e3}static hasUnitType(e,t){return e.unit_types.some(n=>n.toLowerCase()===t.toLowerCase())}static getAttackModifierAgainst(e,t){if(!e.attack_modifiers)return 0;const n=e.attack_modifiers.find(i=>i.target_type.toLowerCase()===t.toLowerCase());return n?n.value:0}static getTotalStrengthAgainst(e,t){const n=e.strength,i=v.getAttackModifierAgainst(e,t);return n+i}static createUserEnemyUnit(e){const t=new Date;return{name:e.name??"Unnamed Enemy",unit_types:e.unit_types??["Epic Monster"],health:e.health??1e4,strength:e.strength??5e3,attack_modifiers:e.attack_modifiers??[],context:"enemy",id:`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,createdAt:t,modifiedAt:t}}static updateUserUnit(e,t){return{...e,...t,modifiedAt:new Date}}static validateUnit(e){const t=[],n=[];return(!e.name||e.name.trim()==="")&&t.push("Unit name is required"),(!e.unit_types||!Array.isArray(e.unit_types)||e.unit_types.length===0)&&t.push("At least one unit type is required"),(typeof e.health!="number"||e.health<=0)&&t.push("Health must be a positive number"),(typeof e.strength!="number"||e.strength<=0)&&t.push("Strength must be a positive number"),e.attack_modifiers&&(Array.isArray(e.attack_modifiers)?e.attack_modifiers.forEach((i,a)=>{(!i.target_type||i.target_type.trim()==="")&&t.push(`Attack modifier ${a+1}: target_type is required`),(!i.modifier_type||i.modifier_type.trim()==="")&&t.push(`Attack modifier ${a+1}: modifier_type is required`),(typeof i.value!="number"||i.value<0)&&t.push(`Attack modifier ${a+1}: value must be a non-negative number`)}):t.push("Attack modifiers must be an array")),(e.cost_type||e.context==="player")&&e.cost_type&&!["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)&&t.push("Invalid cost_type. Must be Leadership, Dominance, Authority, or Mercenary"),e.health&&e.health>1e7&&n.push("Health value is unusually high"),e.strength&&e.strength>5e6&&n.push("Strength value is unusually high"),{isValid:t.length===0,errors:t,warnings:n.length>0?n:void 0}}static validateEnemyUnit(e){return v.validateUnit(e)}static validateBattleConfiguration(e){const t=[],n=[];return e.playerArmy?(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)&&t.push("Player army must have at least one unit group"):t.push("Player army is required"),e.enemyGroupCount!==void 0&&e.enemyGroupCount<1&&t.push("Enemy group count must be at least 1"),e.enemyUnits!==void 0&&(!Array.isArray(e.enemyUnits)||e.enemyUnits.length===0)&&t.push("At least one enemy unit is required"),e.enemyGroupCount===void 0&&e.enemyUnits===void 0?t.push("Either enemy group count or enemy units must be specified"):e.enemyUnits!==void 0&&e.enemyUnits.length===0&&t.push("Enemy units array is empty - check that enemy army has valid units selected"),{isValid:t.length===0,errors:t,warnings:n.length>0?n:void 0}}}const ne=["Human","Beast","Undead","Demon","Elemental","Construct","Melee","Ranged","Magic","Siege","Mounted","Flying","Aquatic","Guardsman","Monster","Mercenary","Specialist","Elite","Heavy","Light","Epic Monster","Giant","Dragon","Fortification"],ie=["Strength"],ae=["Melee","Ranged","Flying","Mounted","Beast","Human","Siege","Dragon","Elemental","Giant","Fortification","Undead","Demon"],R="/army-calculator-site/",Y={FINAL_UNITS:`${R}final_units.json`,ENEMY_UNITS:`${R}enemy_units.json`};class se{constructor(){h(this,"units",[]);h(this,"unitsByName",new Map);h(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadPresetUnits(){return this.loadUnits(Y.FINAL_UNITS)}async loadUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Unit data must be an array");return this.units=t.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(t){throw console.error("❌ Error loading units:",t),t}}validateAndNormalizeUnit(e){const t={name:e.name||"Unknown",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],cost_type:e.cost_type||"Leadership",health:Number(e.health)||0,strength:Number(e.strength)||0,leadership_cost:Number(e.leadership_cost)||0,dominance_cost:Number(e.dominance_cost)||0,authority_cost:Number(e.authority_cost)||0,food_consumption:Number(e.food_consumption)||0,carrying_capacity:Number(e.carrying_capacity)||0,revival_cost_gold:Number(e.revival_cost_gold)||0,revival_cost_silver:Number(e.revival_cost_silver)||0,source_file:e.source_file||"",attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers:void 0};return["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)||(console.warn(`Invalid cost type for unit ${t.name}: ${t.cost_type}`),t.cost_type="Leadership"),t}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(e=>[e.name,e])),this.units.forEach(e=>{v.isMercenary(e)?this.unitsByCostType.Mercenary.push(e):e.cost_type in this.unitsByCostType&&this.unitsByCostType[e.cost_type].push(e)}),Object.keys(this.unitsByCostType).forEach(e=>{this.unitsByCostType[e].sort((t,n)=>t.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(e){return this.unitsByName.get(e)}getUnitsByCostType(e){return[...this.unitsByCostType[e]]}getAvailableUnits(e){const t=[];for(const n of e){const i=this.getUnitByName(n);i?t.push(i):console.warn(`Unit '${n}' not found in loaded data`)}return t}filterUnits(e){let t=this.units;return e.costType&&(t=t.filter(n=>n.cost_type===e.costType)),e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(i=>n.unit_types.includes(i)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxCost!==void 0&&(t=t.filter(n=>v.getPrimaryCost(n)<=e.maxCost)),t}searchUnits(e){if(!e.trim())return this.getAllUnits();const t=e.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedUnits(){return this.units.map(e=>({...e,get isMercenary(){return v.isMercenary(e)},get primaryCost(){return v.getPrimaryCost(e)},get strengthPerCost(){return v.getStrengthPerCost(e)},get healthPerCost(){return v.getHealthPerCost(e)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...e),max:Math.max(...e)},healthRange:{min:Math.min(...t),max:Math.max(...t)}}}getUniqueUnitTypes(){const e=new Set;return this.units.forEach(t=>{t.unit_types.forEach(n=>e.add(n))}),Array.from(e).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,i)=>n+i,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,i)=>n+i,0)/t.length)},topUnitsByStrength:[...this.units].sort((n,i)=>i.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,i)=>i.health-n.health).slice(0,10)}}}class O{constructor(e){h(this,"availableUnits");h(this,"unitsByName");h(this,"leadershipUnits");h(this,"dominanceUnits");h(this,"mercenaryUnits");this.availableUnits=[...e],this.unitsByName=new Map(e.map(t=>[t.name,t])),this.leadershipUnits=e.filter(t=>t.cost_type==="Leadership").sort((t,n)=>t.strength-n.strength),this.dominanceUnits=e.filter(t=>t.cost_type==="Dominance").sort((t,n)=>t.strength-n.strength),this.mercenaryUnits=e.filter(t=>v.isMercenary(t)).sort((t,n)=>t.strength-n.strength)}async optimizeArmy(e){const t=performance.now();console.log(`🔍 Optimizing army with L:${e.leadershipBudget} D:${e.dominanceBudget} M:${Object.keys(e.mercenaryLimits).length}`),console.log(`📋 Selected units: ${e.availableUnits.join(", ")}`);const n=[],i=this.generateGuaranteedValidCompositions(e);console.log(`Generated ${i.length} guaranteed valid army combinations`);let a=0;for(const d of i){a++;const u=this.evaluateComposition(d);n.push(u)}const s=performance.now();console.log(`Evaluated ${a} combinations, found ${n.length} valid stackings`);const r=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&d.cost_type==="Leadership"),o=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&d.cost_type==="Dominance"),l=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&v.isMercenary(d)),c=n.filter(d=>{const u=r.some(f=>d.units[f.name]&&d.units[f.name]>0),p=o.some(f=>d.units[f.name]&&d.units[f.name]>0),g=l.some(f=>d.units[f.name]&&d.units[f.name]>0);return[r.length>0?u:!0,o.length>0?p:!0,l.length>0?g:!0].every(f=>f)});return c.sort((d,u)=>{const p=d.totalLeadershipCost/e.leadershipBudget+d.totalDominanceCost/e.dominanceBudget;return u.totalLeadershipCost/e.leadershipBudget+u.totalDominanceCost/e.dominanceBudget-p}),{compositions:c.length>0?[c[0]]:n.slice(0,1),totalCombinationsEvaluated:a,validStackingsFound:n.length,executionTimeMs:s-t}}generateGuaranteedValidCompositions(e){const t=[],n=this.availableUnits.filter(s=>e.availableUnits.includes(s.name)&&s.cost_type==="Leadership").sort((s,r)=>r.strength-s.strength),i=this.availableUnits.filter(s=>e.availableUnits.includes(s.name)&&s.cost_type==="Dominance").sort((s,r)=>r.strength-s.strength),a=this.availableUnits.filter(s=>e.availableUnits.includes(s.name)&&v.isMercenary(s));if(console.log(`Selected units: L:${n.length} D:${i.length} M:${a.length}`),console.log("Leadership units:",n.map(s=>s.name)),console.log("Dominance units:",i.map(s=>s.name)),console.log("Mercenary units:",a.map(s=>s.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${i.length} M:${a.length}`),console.log(`Budgets: Leadership:${e.leadershipBudget} Dominance:${e.dominanceBudget}`),n.length>0&&i.length>0&&a.length>0&&e.leadershipBudget>0&&e.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const s=[...n,...a];t.push(...this.generateCombinedStackedCompositions(s,i,e.leadershipBudget,e.dominanceBudget,e.mercenaryLimits))}else if(n.length>0&&a.length>0&&i.length===0&&e.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const s=[...n,...a],r=this.calculateProperStackingQuantities(s,e.leadershipBudget,e.mercenaryLimits);t.push(r)}else if(i.length>0&&a.length>0&&n.length===0&&e.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const s=this.calculateProperStackingQuantitiesForDominance(i,e.dominanceBudget),r={};for(const l of a)r[l.name]=e.mercenaryLimits[l.name]||1;const o={...s,...r};t.push(o)}else if(n.length>0&&i.length>0&&a.length===0&&e.leadershipBudget>0&&e.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),t.push(...this.generateCombinedStackedCompositions(n,i,e.leadershipBudget,e.dominanceBudget,{}));else if(n.length>0&&i.length===0&&a.length===0&&e.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const s=this.calculateProperStackingQuantities(n,e.leadershipBudget,{});t.push(s)}else if(i.length>0&&n.length===0&&a.length===0&&e.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const s=this.calculateProperStackingQuantitiesForDominance(i,e.dominanceBudget);t.push(s)}else if(a.length>0&&n.length===0&&i.length===0){console.log("🗡️ Generating Mercenary-only compositions");const s={};for(const r of a){const o=e.mercenaryLimits[r.name]||1;s[r.name]=o}Object.keys(s).length>0&&t.push(s)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&a.length>0&&e.leadershipBudget>0&&t.push(...this.generateMercenaryMixedCompositions(n,a,e.leadershipBudget,e.mercenaryLimits,"leadership_cost")),i.length>0&&a.length>0&&e.dominanceBudget>0&&t.push(...this.generateMercenaryMixedCompositions(i,a,e.dominanceBudget,e.mercenaryLimits,"dominance_cost")),t}generateStackedCompositionsWithMercenaries(e,t,n,i){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const a=[...e,...t];console.log(`🚨 About to call calculateProperStackingQuantities with ${a.length} units`);const s=this.calculateProperStackingQuantities(a,n,i);return console.log("🚨 Got composition back:",s),[s]}calculateCleanStackingPattern(e,t){const n={};if(e.length===0)return n;const i=e[0];n[i.name]=1,console.log(`🎯 Starting with 1x ${i.name} (STR: ${i.strength})`);for(let a=1;a<e.length;a++){const s=e[a],r=e[a-1],o=r.health*(n[r.name]||1),l=Math.ceil((o+1)/s.health);n[s.name]=l,console.log(`📋 ${s.name}: need ${l} units (${l*s.health} HP) to exceed ${r.name} (${o} HP)`)}return n}calculateProperStackingQuantities(e,t,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${t}`);const i={},a=[...e].sort((d,u)=>u.strength-d.strength),s=a.filter(d=>d.cost_type==="Leadership"),r=a.filter(d=>v.isMercenary(d));if(a.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),i;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${a.length} units (${s.length} leadership + ${r.length} mercenary)`);const o=a[0],l={};l[o.name]=1;const c=o.health*1;console.log(`🔧 Base: 1x ${o.name} = ${c} HP (strongest)`);for(let d=1;d<a.length;d++){const u=a[d],p=Math.ceil((c+1)/u.health);l[u.name]=p;const g=v.isMercenary(u)?"mercenary":"leadership";console.log(`🔧 Base: ${p}x ${u.name} = ${p*u.health} HP (beats ${c}) [${g}]`)}console.log("🔧 Validating base pattern stacking order...");for(let d=0;d<a.length-1;d++){const u=a[d],p=a[d+1],g=u.health*l[u.name];let b=p.health*l[p.name];if(b<=g)if(v.isMercenary(p))console.log(`🔧 WARNING: ${p.name} mercenary limit (${l[p.name]}) gives ${b} HP, can't beat ${g} HP`);else{const f=Math.ceil((g+1)/p.health);l[p.name]=f,b=p.health*f,console.log(`🔧 Fixed: ${p.name} increased to ${f} units = ${b} HP (now beats ${g})`)}else console.log(`🔧 OK: ${p.name} ${l[p.name]} units = ${b} HP (beats ${g})`)}let m=0;for(const[d,u]of Object.entries(l)){const p=this.unitsByName.get(d);p&&p.cost_type==="Leadership"&&(m+=u*(p.leadership_cost??0))}if(console.log(`🔧 Base pattern leadership cost: ${m}`),m===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[d,u]of Object.entries(l))i[d]=u}else{const d=Math.floor(t/m);console.log(`🔧 Can afford ${d} base stacks (${t} / ${m})`);for(const[u,p]of Object.entries(l)){const g=this.unitsByName.get(u);if(g&&v.isMercenary(g)){const b=p*d,f=n[u]||1;i[u]=Math.min(b,f),b>f?console.log(`🔧 Mercenary ${u}: wanted ${b}, capped at limit ${f}`):console.log(`🔧 Mercenary ${u}: scaled to ${b} (under limit ${f})`)}else i[u]=p*d}}return console.log("🔧 SIMPLE STACKING: Final composition:",i),i}calculateProperStackingQuantitiesForDominance(e,t){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${t}`);const n={},i=[...e].sort((c,m)=>m.strength-c.strength);if(i.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${i.length} dominance units`);const a=i[0],s={};s[a.name]=1;const r=a.health*1;console.log(`🔧 Base: 1x ${a.name} = ${r} HP (strongest)`);for(let c=1;c<i.length;c++){const m=i[c],d=Math.ceil((r+1)/m.health);s[m.name]=d,console.log(`🔧 Base: ${d}x ${m.name} = ${d*m.health} HP (beats ${r})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let c=0;c<i.length-1;c++){const m=i[c],d=i[c+1],u=m.health*s[m.name];let p=d.health*s[d.name];if(p<=u){const g=Math.ceil((u+1)/d.health);s[d.name]=g,p=d.health*g,console.log(`🔧 Fixed: ${d.name} increased to ${g} units = ${p} HP (now beats ${u})`)}else console.log(`🔧 OK: ${d.name} ${s[d.name]} units = ${p} HP (beats ${u})`)}let o=0;for(const[c,m]of Object.entries(s)){const d=this.unitsByName.get(c);d&&d.cost_type==="Dominance"&&(o+=m*d.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${o}`),o===0)return console.log("🔧 No dominance costs found"),n;const l=Math.floor(t/o);console.log(`🔧 Can afford ${l} base stacks (${t} / ${o})`);for(const[c,m]of Object.entries(s))n[c]=m*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(e){return Object.entries(e).reduce((t,[n,i])=>{const a=this.unitsByName.get(n);return a&&a.cost_type==="Leadership"?t+i*a.leadership_cost:t},0)}calculateMaxStacksByMercenaries(e,t){let n=1/0;for(const[i,a]of Object.entries(e)){const s=this.unitsByName.get(i);if(s&&v.isMercenary(s)){const r=t[i]||1,o=Math.floor(r/a);n=Math.min(n,o),console.log(`🗡️ ${i}: limit ${r}, base need ${a}, allows ${o} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(e,t,n,i){const a=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const s=[...e,...t].sort((d,u)=>u.strength-d.strength);if(s.length===0)return a;const r=this.calculateCleanStackingPattern(s,i);console.log("📊 Dominance + Mercenary base pattern:",r);const o=Object.entries(r).reduce((d,[u,p])=>{const g=this.unitsByName.get(u);return g&&g.cost_type==="Dominance"?d+p*g.dominance_cost:d},0);if(console.log(`💰 Dominance cost per stack: ${o}`),o>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const d={};for(const u of t)d[u.name]=i[u.name]||1;return a.push(d),e.length>0&&a.push(...this.generateStackedCompositions(e,n,"dominance_cost")),a}const l=Math.floor(n/o),c=this.calculateMaxStacksByMercenaries(r,i),m=Math.min(l,c);console.log(`🔢 Max Dominance+Mercenary stacks: ${m}`);for(let d=1;d<=Math.min(m,5);d++){const u={};for(const[p,g]of Object.entries(r)){const b=this.unitsByName.get(p);b&&v.isMercenary(b)?u[p]=Math.min(g*d,i[p]||1):u[p]=g*d}a.push(u)}if(c<l&&e.length>0){const d=n-m*o,u=this.generateStackedCompositions(e,d,"dominance_cost"),p={};for(const g of t)p[g.name]=i[g.name]||1;for(const g of u.slice(0,3)){const b={...p,...g};a.push(b)}}return a}generateStackedCompositions(e,t,n){const i=[];if(e.length===0||t<=0)return i;const a=e[0];console.log(`🎯 Strongest unit: ${a.name} (STR: ${a.strength})`);const s=this.calculateStackingPattern(e);console.log("📊 Base stacking pattern:",s);const r=Object.entries(s).reduce((l,[c,m])=>{const d=this.unitsByName.get(c);if(d){const u=d[n];return l+m*u}return l},0);if(console.log(`💰 Base pattern cost: ${r}`),r<=0)return i;const o=Math.floor(t/r);console.log(`🔢 Max multiplier: ${o}`);for(let l=1;l<=Math.min(o,10);l++){const c={};for(const[m,d]of Object.entries(s))c[m]=d*l;i.push(c)}return e.length>1&&i.push(...this.generateStackingVariations(e,t,n)),i}calculateStackingPattern(e){const t={};if(e.length===0)return t;const n=e[0];t[n.name]=1;for(let i=1;i<e.length;i++){const a=e[i],s=e[i-1],r=s.health*(t[s.name]||1),o=Math.ceil((r+1)/a.health);t[a.name]=o,console.log(`📋 ${a.name}: need ${o} units (${o*a.health} HP) to exceed ${s.name} (${r} HP)`)}return t}generateCombinedStackedCompositions(e,t,n,i,a={}){const s=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const r=e.filter(w=>w.cost_type==="Leadership"),o=e.filter(w=>v.isMercenary(w));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...r,...o],m=[this.calculateProperStackingQuantities(l,n,a)];if(m.length===0)return s;const d=m[m.length-1];if(!d)return s;console.log("🎯 Using maximum Leadership composition for combination");const u=d,p=t[0];console.log(`🎯 Strongest Dominance unit: ${p.name} (STR: ${p.strength})`);const g=this.findClosestStrengthUnit(p,e);if(!g)return console.log("❌ No suitable Leadership unit found for comparison"),s;console.log(`🔍 Comparing to Leadership unit: ${g.name} (STR: ${g.strength})`);const b=u[g.name]||0,f=g.health*b;if(console.log(`📊 Comparison unit total health: ${f} (${b}x ${g.health})`),f<=0)return console.log("❌ Comparison unit not in Leadership composition"),s;const S=p.health;S>=f&&(console.log(`⚠️ Single Dominance unit too strong: ${S} HP >= ${f} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const C=[this.calculateProperStackingQuantitiesForDominance(t,i)];if(C.length>0){const w=C[C.length-1],_={...u,...w};s.push(_),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),s.push(u);return s}findClosestStrengthUnit(e,t){if(t.length===0)return null;let n=t[0],i=Math.abs(e.strength-n.strength);for(const a of t){const s=Math.abs(e.strength-a.strength);s<i&&(i=s,n=a)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${e.name} (STR: ${e.strength}), diff: ${i}`),n}calculateConstrainedDominanceStack(e,t,n){const i={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),e.length===0||t<=0||n<=0)return i;const a=e[0],s=Math.floor((n-1)/a.health),r=Math.floor(t/a.dominance_cost),o=Math.min(s,r);if(o<=0)return console.log(`❌ Cannot fit any ${a.name} within constraints`),i;for(let l=Math.min(o,3);l>=1;l--){const c={};c[a.name]=l;let m=l*a.dominance_cost,d=l*a.health;console.log(`🧪 Testing ${l}x ${a.name} (${d} HP, ${m} cost)`);for(let p=1;p<e.length&&m<t;p++){const g=e[p],b=t-m,f=Math.ceil((d+1)/g.health),S=Math.floor(b/g.dominance_cost),x=Math.min(f,S);x>0&&(c[g.name]=x,m+=x*g.dominance_cost,console.log(`  ➕ Added ${x}x ${g.name} (${x*g.health} HP)`))}const u=Object.entries(c).reduce((p,[g,b])=>{const f=this.unitsByName.get(g);return f?p+b*f.health:p},0);if(u<n)return console.log(`✅ Valid Dominance stack: ${u} HP < ${n} HP limit`),c;console.log(`❌ Dominance stack too strong: ${u} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),i}generateMercenaryMixedCompositions(e,t,n,i,a){const s=[];console.log("🗡️ Generating mixed compositions with mercenaries");const r=this.generateStackedCompositions(e,n,a);if(r.length===0)return s;for(const o of r.slice(0,3)){const l=t.sort((f,S)=>S.strength-f.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const c=this.findClosestStrengthUnit(l,e);if(!c){console.log("❌ No suitable base unit found for comparison");continue}const m=o[c.name]||0,d=c.health*m;if(console.log(`📊 Comparison base unit total health: ${d}`),d<=0){console.log("❌ Comparison unit not in base composition");continue}const u=l.health,p=i[l.name]||1,g=u*p;if(g>=d){console.log(`⚠️ Mercenary too strong: ${g} HP >= ${d} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const f=Math.floor((d-1)/u);if(f>0){console.log(`✅ Using ${f}x ${l.name} instead of ${p}`);const S={...o};S[l.name]=f;for(const x of t)if(x.name!==l.name){const C=i[x.name]||1;S[x.name]=C}s.push(S),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),s.push(o);continue}const b={...o};for(const f of t){const S=i[f.name]||1;b[f.name]=S}s.push(b),console.log("✅ Created mixed composition with mercenaries")}return s}createAlternativeDominanceStack(e,t,n){const i={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const a=[...e].sort((o,l)=>o.health-l.health);let s=0,r=0;for(const o of a){const l=Math.floor((n-r-1)/o.health),c=Math.floor((t-s)/o.dominance_cost),m=Math.min(l,c);m>0&&(i[o.name]=m,s+=m*o.dominance_cost,r+=m*o.health,console.log(`➕ Added ${m}x ${o.name} (${m*o.health} HP, ${m*o.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${r} HP total, ${s} cost`),i}calculateMaximizedDominanceStack(e,t,n){console.log(`💰 Maximizing Dominance budget: ${t} with health limit: ${n}`);const i=this.createAlternativeDominanceStack(e,t,n);return Object.keys(i).length>0?i:this.calculateConstrainedDominanceStack(e,t,n)}generateStackingVariations(e,t,n){const i=[],a={},s=e[0],r=s[n];if(r>0){const o=Math.floor(t/r);a[s.name]=Math.min(o,5);let l=t-a[s.name]*r;for(let c=1;c<e.length&&l>0;c++){const m=e[c],d=m[n];if(d>0&&d<=l){const u=Math.floor(l/d/(e.length-c));u>0&&(a[m.name]=u,l-=u*d)}}i.push(a)}return i}generateGuaranteedDiverseCompositions_OLD(e){const t=[],n=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),i=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),a=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&v.isMercenary(l)),s={};let r=0,o=0;for(const l of n)r+l.leadership_cost<=e.leadershipBudget&&(s[l.name]=1,r+=l.leadership_cost);for(const l of i)o+l.dominance_cost<=e.dominanceBudget&&(s[l.name]=1,o+=l.dominance_cost);for(const l of a){const c=e.mercenaryLimits[l.name]||1;s[l.name]=Math.min(1,c)}if(Object.keys(s).length>0&&t.push(s),n.length>0&&e.leadershipBudget>0){const l=n.sort((m,d)=>m.leadership_cost-d.leadership_cost)[0],c=Math.floor(e.leadershipBudget/l.leadership_cost);if(c>0){const m={};m[l.name]=Math.min(c,20);const d=e.leadershipBudget-m[l.name]*l.leadership_cost;for(const u of n.slice(1,3)){const p=Math.floor(d/u.leadership_cost/2);p>0&&(m[u.name]=p)}t.push(m)}}if(n.length>0||i.length>0){const l={};if(n.length>0&&e.leadershipBudget>0){const c=Math.floor(e.leadershipBudget/n.length);for(const m of n){const d=Math.floor(c/m.leadership_cost);d>0&&(l[m.name]=d)}}if(i.length>0&&e.dominanceBudget>0){const c=Math.floor(e.dominanceBudget/i.length);for(const m of i){const d=Math.floor(c/m.dominance_cost);d>0&&(l[m.name]=d)}}for(const c of a){const m=e.mercenaryLimits[c.name]||1;l[c.name]=Math.max(1,Math.floor(m/2))}Object.keys(l).length>0&&t.push(l)}return t}generateMercenaryCombinations(e){if(Object.keys(e).length===0)return[{}];let t=[{}];for(const[n,i]of Object.entries(e)){if(!this.unitsByName.has(n))continue;const a=[];for(const s of t)for(let r=0;r<=i;r++){const o={...s};r>0&&(o[n]=r),a.push(o)}t=a}return t}evaluateComposition(e){let t=0,n=0,i=0,a=0,s=0;const r=[];for(const[b,f]of Object.entries(e)){const S=this.unitsByName.get(b);if(!S)continue;const x=S.health*f,C=S.strength*f;t+=C,n+=x,i+=S.leadership_cost*f,a+=S.dominance_cost*f,v.isMercenary(S)&&(s+=f),r.push({unit:S,count:f,totalHealth:x,unitStrength:S.strength})}r.sort((b,f)=>b.unit.strength-f.unit.strength);let o=!0;const l=[];for(let b=0;b<r.length;b++){const{unit:f,count:S,totalHealth:x}=r[b];l.push({count:S,totalHealth:x,unit:f});for(let C=b+1;C<r.length;C++){const w=r[C].unit,_=r[C].totalHealth;if(f.strength===w.strength){const W=Math.max(x,_)*.1;if(Math.abs(x-_)<=W)continue}x<=_&&console.log(`❌ Stacking violation: ${f.name} (STR:${f.strength}, ${x} HP) <= ${w.name} (STR:${w.strength}, ${_} HP)`)}}const c=i+a+s;let m=c>0?t/c:0;m*=1.2;const u=1+(Object.keys(e).length-1)*.05;m*=u;let p=0;i>0&&p++,a>0&&p++,s>0&&p++;const g=1+(p-1)*.1;return m*=g,{units:e,totalStrength:t,totalHealth:n,totalLeadershipCost:i,totalDominanceCost:a,totalMercenaryCount:s,stackingOrder:l,isValidStacking:o,efficiencyScore:m}}explainStacking(e){const t=[],n=[],i=[],a=[];return e.stackingOrder.forEach(s=>{const r=s.unit;if(!r)return;const o={name:s.unit.name,count:s.count,totalHealth:s.totalHealth,strength:r.strength};v.isMercenary(r)?a.push(o):r.cost_type==="Leadership"?n.push(o):r.cost_type==="Dominance"&&i.push(o)}),t.push("🏆 OPTIMIZED ARMY COMPOSITION"),t.push("═".repeat(60)),t.push(""),t.push("📊 ARMY SUMMARY"),t.push("─".repeat(30)),t.push(`Total Units: ${Object.values(e.units).reduce((s,r)=>s+r,0).toLocaleString()}`),t.push(`Total Strength: ${e.totalStrength.toLocaleString()}`),t.push(`Total Health: ${e.totalHealth.toLocaleString()}`),t.push(`Budget Usage: L:${e.totalLeadershipCost} D:${e.totalDominanceCost} M:${e.totalMercenaryCount}`),t.push(""),a.length>0&&(t.push("🗡️ MERCENARY FORCES"),t.push("─".repeat(30)),a.forEach(s=>{t.push(`${s.count.toLocaleString()}x ${s.name}`),t.push(`   └─ ${s.totalHealth.toLocaleString()} HP total (STR: ${s.strength})`)}),t.push("")),n.length>0&&(t.push("👑 LEADERSHIP FORCES"),t.push("─".repeat(30)),n.sort((s,r)=>r.strength-s.strength),n.forEach(s=>{t.push(`${s.count.toLocaleString()}x ${s.name}`),t.push(`   └─ ${s.totalHealth.toLocaleString()} HP total (STR: ${s.strength})`)}),t.push("")),i.length>0&&(t.push("⚡ DOMINANCE FORCES"),t.push("─".repeat(30)),i.sort((s,r)=>r.strength-s.strength),i.forEach(s=>{t.push(`${s.count.toLocaleString()}x ${s.name}`),t.push(`   └─ ${s.totalHealth.toLocaleString()} HP total (STR: ${s.strength})`)}),t.push("")),t.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),t.push("─".repeat(40)),e.stackingOrder.forEach((s,r)=>{const o=s.unit;if(!o)return;const l=v.isMercenary(o)?"🗡️":o.cost_type==="Leadership"?"👑":o.cost_type==="Dominance"?"⚡":"❓";t.push(`${r+1}. ${l} ${s.count.toLocaleString()}x ${s.unit.name} (${s.totalHealth.toLocaleString()} HP)`)}),t.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}const L={MAX_BATTLE_TURNS:5e4,MAX_ACTIONS_PER_TURN:1e3,GENERIC_ENEMY_DAMAGE:999999999};class re{constructor(e=!0){h(this,"logs",[]);h(this,"startTime",0);h(this,"detailedLogging",!0);this.detailedLogging=e,this.startTime=Date.now()}logPlayerAction(e,t,n,i,a,s){const r=this.getEnemyDisplayName(t),o={turn:i,attacker:`${e.count}x ${e.unit.name}`,target:r,action:`attack ${r} for ${n.damageDealt} damage${n.bonusDamageDealt?` including ${n.bonusDamageDealt} bonus damage vs ${n.modifierName}`:""}${n.targetEliminated?" (ELIMINATED)":""}`,damageDealt:n.damageDealt,eliminated:n.targetEliminated,attackerSide:"player",timestamp:Date.now()-this.startTime};return this.detailedLogging&&(o.turnSummary=this.generateTurnSummary(i,a),o.actionDetails=this.generatePlayerActionDetails(e,t,n),s&&(o.stateSnapshot=this.createStateSnapshot(s))),this.logs.push(o),o}logEnemyAction(e,t,n,i,a,s){const r={turn:i,attacker:this.getEnemyDisplayName(e),target:t.unit.name,action:`attack ${t.unit.name} for ${n.damageDealt} damage${n.targetEliminated?" (ELIMINATED)":""}`,damageDealt:n.damageDealt,eliminated:n.targetEliminated,attackerSide:"enemy",timestamp:Date.now()-this.startTime};return this.detailedLogging&&(r.turnSummary=this.generateTurnSummary(i,a),r.actionDetails=this.generateEnemyActionDetails(e,t,n),s&&(r.stateSnapshot=this.createStateSnapshot(s))),this.logs.push(r),r}logTurnTransition(e,t,n){if(!this.detailedLogging)return;const i={turn:t,actionIndex:0,attackerName:"SYSTEM",attackerCount:0,targetName:"TURN_TRANSITION",targetType:"system",damageDealt:0,targetEliminated:!1,attackerSide:"system",timestamp:Date.now()-this.startTime,turnSummary:`Turn ${e} completed, advancing to Turn ${t}`,actionDetails:`Battle continues with ${this.countAlivePlayerGroups(n)} player groups vs ${this.countAttackableEnemies(n)} enemies`,stateSnapshot:this.createStateSnapshot(n)};this.logs.push(i)}logBattleStart(e,t,n){const i={turn:1,actionIndex:0,attackerName:"SYSTEM",attackerCount:0,targetName:"BATTLE_START",targetType:"system",damageDealt:0,targetEliminated:!1,attackerSide:"system",timestamp:0,turnSummary:"Battle begins",actionDetails:`${e.length} player groups vs ${t.length} enemies, ${n?"Player":"Enemy"} goes first`,stateSnapshot:{alivePlayerGroups:e.length,attackableEnemies:t.length,totalPlayerHealth:e.reduce((a,s)=>a+s.totalHealth,0)}};this.logs.push(i)}logBattleEnd(e,t,n="Battle completed"){const i={turn:t.currentTurn,actionIndex:t.currentAction,attackerName:"SYSTEM",attackerCount:0,targetName:"BATTLE_END",targetType:"system",damageDealt:t.totalDamageDealt,targetEliminated:!1,attackerSide:"system",timestamp:Date.now()-this.startTime,turnSummary:`Battle ended: ${e}`,actionDetails:`${n}. Total damage dealt: ${t.totalDamageDealt}`,stateSnapshot:this.createStateSnapshot(t)};this.logs.push(i)}getBattleLogs(){return[...this.logs]}getLogsForTurn(e){return this.logs.filter(t=>t.turn===e)}getLogsBySide(e){return this.logs.filter(t=>t.attackerSide===e)}generateBattleSummary(){const e=this.logs.filter(r=>r.attackerSide==="player"),t=this.logs.filter(r=>r.attackerSide==="enemy"),n=this.logs.filter(r=>r.targetEliminated),i=this.logs[this.logs.length-1],a=i?i.turn:0,s=this.logs.filter(r=>r.attackerSide!=="system").reduce((r,o)=>r+o.damageDealt,0);return{totalTurns:a,totalActions:e.length+t.length,totalDamageDealt:s,playerActionsCount:e.length,enemyActionsCount:t.length,eliminationsCount:n.length,battleDuration:a,outcome:this.determineBattleOutcome()}}exportLogs(e="json"){switch(e){case"json":return JSON.stringify(this.logs,null,2);case"csv":return this.exportToCSV();case"text":return this.exportToText();default:return JSON.stringify(this.logs,null,2)}}clearLogs(){this.logs=[],this.startTime=Date.now()}setDetailedLogging(e){this.detailedLogging=e}searchLogs(e){return this.logs.filter(t=>!(e.attacker&&!t.attackerName.toLowerCase().includes(e.attacker.toLowerCase())||e.target&&!t.targetName.toLowerCase().includes(e.target.toLowerCase())||e.minDamage&&t.damageDealt<e.minDamage||e.turnRange&&(t.turn<e.turnRange[0]||t.turn>e.turnRange[1])||e.eliminationOnly&&!t.targetEliminated))}getEnemyDisplayName(e){var t,n;switch(e.type){case"generic":return e.name||"Generic Enemy";case"infinite":return((t=e.unit)==null?void 0:t.name)||"Infinite Enemy";case"mortal":return((n=e.unit)==null?void 0:n.name)||"Mortal Enemy";default:return"Unknown Enemy"}}getEnemyCount(e){switch(e.type){case"generic":return 1;case"infinite":return 999999;case"mortal":return e.currentCount;default:return 0}}generateTurnSummary(e,t){return`Turn ${e}, Action ${t}`}generatePlayerActionDetails(e,t,n){const i=this.getEnemyDisplayName(t);let a=`${e.count}x ${e.unitName} attacks ${i}`;return a+=` for ${n.damageDealt} damage`,n.targetEliminated&&(a+=" (ELIMINATED)"),a}generateEnemyActionDetails(e,t,n){let a=`${this.getEnemyDisplayName(e)}`;return e.type==="mortal"&&(a+=` (${e.currentCount} units)`),a+=` attacks ${t.count}x ${t.unitName}`,a+=` for ${n.damageDealt} damage`,n.targetEliminated&&(a+=" (ELIMINATED)"),a}createStateSnapshot(e){return{alivePlayerGroups:this.countAlivePlayerGroups(e),attackableEnemies:this.countAttackableEnemies(e),totalPlayerHealth:e.playerGroups.reduce((t,n)=>t+n.totalHealth,0)}}countAlivePlayerGroups(e){return e.playerGroups.filter(t=>t.totalHealth>0).length}countAttackableEnemies(e){return e.enemies.filter(t=>{switch(t.type){case"generic":case"infinite":return!0;case"mortal":return t.currentCount>0;default:return!1}}).length}determineBattleOutcome(){const e=[...this.logs].reverse().find(t=>t.attackerSide==="system"&&t.targetName==="BATTLE_END");return e&&e.turnSummary?e.turnSummary.replace("Battle ended: ",""):"Unknown"}exportToCSV(){const e=["Turn","Action","Attacker Side","Attacker","Target","Damage","Eliminated","Timestamp"],t=this.logs.map(n=>[n.turn,n.actionIndex,n.attackerSide,`${n.attackerCount}x ${n.attackerName}`,n.targetName,n.damageDealt,n.targetEliminated?"Yes":"No",n.timestamp]);return[e,...t].map(n=>n.join(",")).join(`
`)}exportToText(){const e=this.generateBattleSummary();let t=`Battle Summary:
`;t+=`Total Turns: ${e.totalTurns}
`,t+=`Total Actions: ${e.totalActions}
`,t+=`Total Damage: ${e.totalDamageDealt}
`,t+=`Player Actions: ${e.playerActionsCount}
`,t+=`Enemy Actions: ${e.enemyActionsCount}
`,t+=`Eliminations: ${e.eliminationsCount}
`,t+=`Outcome: ${e.outcome}

`,t+=`Detailed Combat Log:
`,t+=`${"=".repeat(50)}
`;for(const n of this.logs)n.attackerSide==="system"?t+=`[SYSTEM] ${n.turnSummary}: ${n.actionDetails}
`:t+=`[Turn ${n.turn}.${n.actionIndex}] ${n.actionDetails}
`;return t}}class oe{constructor(e){h(this,"state");h(this,"battleLogger");this.state=this.initializeBattleState(e),this.battleLogger=new re}initializeBattleState(e){return{currentTurn:1,currentAction:0,playerGroups:e.playerArmy.stackingOrder.map(t=>({...t})),enemies:e.enemies.map(t=>({...t})),unitsActedThisTurn:{players:new Set,enemies:new Set},combatLog:[],battleEnded:!1,totalDamageDealt:0}}deepCloneState(e){return{...e,unitsActedThisTurn:{players:new Set(e.unitsActedThisTurn.players),enemies:new Set(e.unitsActedThisTurn.enemies)},playerGroups:e.playerGroups.map(t=>({...t})),enemies:e.enemies.map(t=>({...t})),combatLog:[...e.combatLog]}}getBattleState(){return this.deepCloneState(this.state)}applyStateUpdate(e){if(!e||typeof e.currentTurn!="number"||typeof e.currentAction!="number")throw new Error("Invalid state update: missing required fields");this.state=e}getAlivePlayerGroups(){return this.state.playerGroups.filter(e=>e.totalHealth>0)}getAttackableEnemies(){return this.state.enemies.filter(e=>{switch(e.type){case"generic":return!0;case"infinite":return!0;case"mortal":return e.currentCount>0;default:return!1}})}updatePlayerGroup(e,t,n=0){const i=this.state.playerGroups.find(a=>a.unit.name===e);i&&(i.totalHealth=Math.max(0,t),n>0&&(i.count=Math.max(0,i.count-n)))}updateMortalEnemy(e,t){const n=this.state.enemies[e];n&&n.type==="mortal"&&(n.currentCount=Math.max(0,n.currentCount-t))}applyCompleteAttack(e,t){var s,r;const n=this.deepCloneState(e),i={damageDealt:t.damageDealt,bonusDamageDealt:(s=t.damageBreakdown)==null?void 0:s.bonusDamage,modifierName:(r=t.damageBreakdown)!=null&&r.appliedModifiers&&t.damageBreakdown.appliedModifiers.length>0?t.damageBreakdown.appliedModifiers[0].target_type:void 0,targetEliminated:t.targetEliminated,attackerEliminated:!1,combatAction:t.combatAction},a=this.isPlayerGroup(t.attacker)?this.battleLogger.logPlayerAction(t.attacker,t.target,i,e.currentTurn,e.currentAction,e):this.battleLogger.logEnemyAction(t.attacker,t.target,i,e.currentTurn,e.currentAction,e);if(n.combatLog.push(a),n.totalDamageDealt+=t.damageDealt,this.isPlayerGroup(t.attacker))n.unitsActedThisTurn.players.add(t.attacker.unit.name);else{const o=n.enemies.findIndex(l=>l.groupIndex===t.attacker.groupIndex);o>=0&&n.unitsActedThisTurn.enemies.add(o)}if(n.currentAction++,t.targetEliminated){if(this.isPlayerGroup(t.target)){const o=n.playerGroups.find(l=>l.unit.name===t.target.unit.name);o&&(o.totalHealth=0,o.count=0)}else if(t.target.type==="mortal"){const o=n.enemies.findIndex(l=>l.groupIndex===t.target.groupIndex);o>=0&&n.enemies[o].type==="mortal"&&(n.enemies[o].currentCount=0)}}else if(this.isPlayerGroup(t.target)){const o=n.playerGroups.find(l=>l.unit.name===t.target.unit.name);if(o&&t.damageDealt>0){o.totalHealth=Math.max(0,o.totalHealth-t.damageDealt);const l=o.unit.health,c=Math.floor(t.damageDealt/l);o.count=Math.max(0,o.count-c)}}else if(t.target.type==="mortal"){const o=n.enemies.findIndex(l=>l.groupIndex===t.target.groupIndex);if(o>=0&&n.enemies[o].type==="mortal"){const l=n.enemies[o],c=Math.floor(t.damageDealt/l.unit.health);l.currentCount=Math.max(0,l.currentCount-c)}}return n}isPlayerGroup(e){return"unit"in e&&"totalHealth"in e&&!("type"in e)}applyAttackResult(e,t){const n=this.deepCloneState(e);if(n.combatLog.push({...t.combatAction,turn:e.currentTurn}),n.totalDamageDealt+=t.damageDealt,t.targetEliminated)if(t.combatAction.attacker.includes("x ")){const i=n.enemies.findIndex(a=>a.type==="mortal"&&this.getEnemyDisplayName(a)===t.combatAction.target);i>=0&&n.enemies[i].type==="mortal"&&(n.enemies[i].currentCount=0)}else{const i=n.playerGroups.find(a=>a.unit.name===t.combatAction.target);i&&(i.totalHealth=0,i.count=0)}else{const i=n.playerGroups.find(a=>a.unit.name===t.combatAction.target);if(i&&t.damageDealt>0){i.totalHealth=Math.max(0,i.totalHealth-t.damageDealt);const a=i.unit.health,s=Math.floor(t.damageDealt/a);i.count=Math.max(0,i.count-s)}}return n}getEnemyDisplayName(e){switch(e.type){case"generic":return e.name;case"infinite":return e.unit.name;case"mortal":return e.unit.name;default:return"Unknown Enemy"}}addCombatAction(e){this.state.combatLog.push({...e,turn:this.state.currentTurn})}addDamageDealt(e){this.state.totalDamageDealt+=e}checkBattleEndPure(e,t=L.MAX_BATTLE_TURNS){const n=e.playerGroups.filter(c=>c.totalHealth>0),i=e.enemies.filter(c=>{switch(c.type){case"generic":return!0;case"infinite":return!0;case"mortal":return c.currentCount>0;default:return!1}}),a=n.length===0,r=e.enemies.every(c=>c.type==="mortal")&&i.length===0,o=e.currentTurn>=t;return{...e,battleEnded:a||r||o}}checkBattleEnd(){const e=this.getBattleState(),t=this.checkBattleEndPure(e);this.applyStateUpdate(t)}canEnemyAttack(e){switch(e.type){case"generic":return!0;case"infinite":return!0;case"mortal":return e.currentCount>0;default:return!1}}getBattleOutcome(e=L.MAX_BATTLE_TURNS){const t=this.getAlivePlayerGroups(),n=this.getAttackableEnemies();return t.length===0?"player_eliminated":n.length===0&&this.state.enemies.every(i=>i.type==="mortal")?"player_victory":(this.state.currentTurn>=e,"stalemate")}isBattleEnded(){return this.state.battleEnded}getCurrentTurn(){return this.state.currentTurn}getCurrentAction(){return this.state.currentAction}getTotalDamageDealt(){return this.state.totalDamageDealt}getCombatLog(){return[...this.state.combatLog]}endBattle(){this.state.battleEnded=!0}resetBattle(e){this.state=this.initializeBattleState(e)}}class le{selectNextPlayerAttack(e){const t=e.playerGroups.filter(s=>s.totalHealth>0&&!e.unitsActedThisTurn.players.has(s.unit.name));if(t.length===0)return null;const n=this.getAttackableEnemies(e);if(n.length===0)return null;let i=null,a=0;for(const s of t)for(const r of n){const o=this.calculatePlayerDamageToEnemy(s,r);if(o.finalDamage>a){a=o.finalDamage;let l=!1;if(r.type==="mortal"){const c=r.unit.health*r.currentCount;l=o.finalDamage>=c}i={attacker:s,target:r,damageDealt:o.finalDamage,damageBreakdown:o,targetEliminated:l,combatAction:{}}}}return i}selectNextEnemyAttack(e){const t=e.enemies.filter((s,r)=>this.canEnemyAttack(s)&&!e.unitsActedThisTurn.enemies.has(r));if(t.length===0)return null;const n=e.playerGroups.filter(s=>s.totalHealth>0);if(n.length===0)return null;let i=null,a=0;for(const s of t)for(const r of n){const o=this.calculateEnemyDamageToPlayer(s,r);if(o.finalDamage>a){a=o.finalDamage;const l=o.finalDamage>=r.totalHealth;i={attacker:s,target:r,damageDealt:o.finalDamage,damageBreakdown:o,targetEliminated:l,combatAction:{}}}}return i}getEnemyDisplayName(e){switch(e.type){case"generic":return e.name;case"infinite":return e.unit.name;case"mortal":return`${e.unit.name} (${e.currentCount}/${e.count})`;default:return"Unknown Enemy"}}selectNextPlayer(e){const t=e.playerGroups.filter(s=>s.totalHealth>0&&!e.unitsActedThisTurn.players.has(s.unit.name));if(t.length===0)return null;const n=this.getAttackableEnemies(e);if(n.length===0)return null;let i=null,a=0;for(const s of t){const r=this.calculatePlayerMaxDamage(s,n);r>a&&(a=r,i=s)}return i}selectNextEnemy(e){const t=e.enemies.filter((s,r)=>this.canEnemyAttack(s)&&!e.unitsActedThisTurn.enemies.has(r));if(t.length===0)return null;const n=e.playerGroups.filter(s=>s.totalHealth>0);if(n.length===0)return null;let i=null,a=0;for(const s of t){const r=this.calculateEnemyMaxDamage(s,n);r>a&&(a=r,i=s)}return i}calculatePlayerMaxDamage(e,t){let n=0;for(const i of t){const a=this.calculatePlayerDamageToEnemy(e,i);n=Math.max(n,a)}return n}calculateEnemyMaxDamage(e,t){let n=0;for(const i of t){const a=this.calculateEnemyDamageToPlayer(e,i);n=Math.max(n,a)}return n}calculatePlayerDamageToEnemy(e,t){const n=e.count*e.unit.strength;let i=n;const a=this.createDamageBreakdown(n);if((t.type==="infinite"||t.type==="mortal")&&t.unit){const s=this.getBestAttackModifier(e,t.unit);s&&(i=this.applyAttackModifiers(n,s,a))}if(t.type==="mortal"){const s=t.unit.health*t.currentCount;i=Math.min(i,s)}return a.finalDamage=i,a}calculateEnemyDamageToPlayer(e,t){let n,i;if(e.type==="generic")n=L.GENERIC_ENEMY_DAMAGE,i=this.createDamageBreakdown(n);else if(e.type==="infinite"){const a=t.totalHealth;i=this.createDamageBreakdown(a);const s=this.getBestEnemyAttackModifier(e.unit,t);s&&s.value>0?n=this.applyAttackModifiers(a,s,i):n=a}else if(e.type==="mortal"){const a=e.currentCount*e.unit.strength;i=this.createDamageBreakdown(a);const s=this.getBestEnemyAttackModifier(e.unit,t);s&&s.value>0?n=this.applyAttackModifiers(a,s,i):n=a}else n=0,i=this.createDamageBreakdown(0);return i.finalDamage=Math.min(n,t.totalHealth),i}getBestAttackModifier(e,t){if(!e.unit||!e.unit.attack_modifiers||e.unit.attack_modifiers.length===0)return null;let n=null,i=0;for(const a of e.unit.attack_modifiers)t.unit_types&&t.unit_types.includes(a.target_type)&&(i=Math.max(i,a.value),n=a);return n}getBestEnemyAttackModifier(e,t){if(!e||!e.attack_modifiers||e.attack_modifiers.length===0)return null;let n=null,i=0;for(const a of e.attack_modifiers)t.unit.unit_types&&t.unit.unit_types.includes(a.target_type)&&(i=Math.max(i,a.value),n=a);return n}getAttackableEnemies(e){return e.enemies.filter(t=>this.canEnemyAttack(t))}canEnemyAttack(e){switch(e.type){case"generic":return!0;case"infinite":return!0;case"mortal":return e.currentCount>0;default:return!1}}createDamageBreakdown(e){return{baseDamage:e,bonusDamage:0,finalDamage:e,appliedModifiers:[]}}applyAttackModifiers(e,t,n){const i=1+t.value/100,a=Math.floor(e*i);return n.bonusDamage=Math.round(e*(t.value/100)),n.appliedModifiers=[t],a}selectBestTargetForPlayer(e,t){if(t.length===0)return null;let n=null,i=0;for(const a of t){const s=this.calculatePlayerDamageToEnemy(e,a);s>i&&(i=s,n=a)}return n}selectBestTargetForEnemy(e,t){if(t.length===0)return null;let n=null,i=0;for(const a of t){const s=this.calculateEnemyDamageToPlayer(e,a);s>i&&(i=s,n=a)}return n}}class ce{canAttack(e){return!0}calculateDamage(e,t){return L.GENERIC_ENEMY_DAMAGE}processAttack(e,t){const n=this.calculateDamage(e,t),i=!0,a={turn:0,attacker:this.getDisplayName(e),target:t.unit.name,action:`attack and eliminate ${t.unit.name}`,damageDealt:n,eliminated:i};return{damageDealt:n,targetEliminated:i,attackerEliminated:!1,combatAction:a}}isEliminated(e){return!1}getDisplayName(e){return e.name}getStrength(e){return L.GENERIC_ENEMY_DAMAGE}getEnemyType(){return"generic"}getMaxPotentialDamage(e,t){return L.GENERIC_ENEMY_DAMAGE}calculateTotalPotentialDamage(e,t){return L.GENERIC_ENEMY_DAMAGE*t.length}calculateActualDamage(e,t){return{healthLost:t.totalHealth,unitsKilled:t.count}}hasTargetPreference(e){return!1}getTargetPriority(e,t){return 1}canBeCounterAttacked(e){return!1}}class de{canAttack(e){return!0}calculateDamage(e,t){const n=e.unit.strength,i=this.getBestAttackModifier(e,t);if(i!==0){const a=1+i/100;return Math.floor(n*a)}return n}processAttack(e,t){const i=this.calculateActualDamage(e,t).healthLost,a=i>=t.totalHealth,s={turn:0,attacker:this.getDisplayName(e),target:t.unit.name,action:`attack ${t.unit.name} for ${i} damage${a?" (ELIMINATED)":""}`,damageDealt:i,eliminated:a};return{damageDealt:i,targetEliminated:a,attackerEliminated:!1,combatAction:s}}isEliminated(e){return!1}getDisplayName(e){return e.unit.name}getStrength(e){return e.unit.strength}calculateActualDamage(e,t){const n=this.calculateDamage(e,t),i=Math.min(Math.floor(n/t.unit.health),t.count);return{healthLost:Math.min(n,t.totalHealth),unitsKilled:i}}getBestAttackModifier(e,t){var n;if(!e.unit.attack_modifiers||e.unit.attack_modifiers.length===0)return 0;if((n=t.unit)!=null&&n.unit_types){let i=0;for(const a of e.unit.attack_modifiers)t.unit.unit_types.includes(a.target_type)&&a.modifier_type==="Strength"&&(i=Math.max(i,a.value));return i}return 0}hasTargetPreference(e){return e.unit.attack_modifiers&&e.unit.attack_modifiers.length>0}getTargetPriority(e,t){const i=this.getBestAttackModifier(e,t);return i>0?1+i/100:1}canBeCounterAttacked(e){return!0}getHealth(e){return e.unit.health}getUnitTypes(e){return e.unit.unit_types||[]}getAttackModifiers(e){return e.unit.attack_modifiers||[]}getEnemyType(){return"infinite"}getMaxPotentialDamage(e,t){const n=e.unit.strength;if(!t||t.length===0)return n;let i=n;for(const a of t){const s=this.calculateDamage(e,a);i=Math.max(i,s)}return i}calculateTotalPotentialDamage(e,t){let n=0;for(const i of t)n+=this.calculateDamage(e,i);return n}}class me{canAttack(e){return e.currentCount>0}calculateDamage(e,t){if(e.currentCount<=0)return 0;const n=e.currentCount*e.unit.strength,i=this.getBestAttackModifier(e,t);if(i!==0){const a=1+i/100;return Math.floor(n*a)}return n}processAttack(e,t){const i=this.calculateActualDamage(e,t).healthLost,a=i>=t.totalHealth,s={turn:0,attacker:this.getDisplayName(e),target:t.unit.name,action:`attack ${t.unit.name} for ${i} damage${a?" (ELIMINATED)":""}`,damageDealt:i,eliminated:a};return{damageDealt:i,targetEliminated:a,attackerEliminated:!1,combatAction:s}}isEliminated(e){return e.currentCount<=0}getDisplayName(e){return`${e.unit.name} (${e.currentCount}/${e.count})`}getStrength(e){return e.currentCount*e.unit.strength}calculateActualDamage(e,t){const n=this.calculateDamage(e,t),i=Math.min(Math.floor(n/t.unit.health),t.count);return{healthLost:Math.min(n,t.totalHealth),unitsKilled:i}}processDamageTaken(e,t){if(t<=0||e.currentCount<=0)return{unitsKilled:0,remainingCount:e.currentCount,enemyEliminated:this.isEliminated(e)};const n=Math.min(Math.floor(t/e.unit.health),e.currentCount);return e.currentCount=Math.max(0,e.currentCount-n),{unitsKilled:n,remainingCount:e.currentCount,enemyEliminated:this.isEliminated(e)}}getBestAttackModifier(e,t){var n;if(!e.unit.attack_modifiers||e.unit.attack_modifiers.length===0)return 0;if((n=t.unit)!=null&&n.unit_types){let i=0;for(const a of e.unit.attack_modifiers)t.unit.unit_types.includes(a.target_type)&&a.modifier_type==="Strength"&&(i=Math.max(i,a.value));return i}return 0}hasTargetPreference(e){return e.unit.attack_modifiers&&e.unit.attack_modifiers.length>0}getTargetPriority(e,t){const i=this.getBestAttackModifier(e,t);return i>0?1+i/100:1}canBeCounterAttacked(e){return e.currentCount>0}getTotalHealth(e){return e.currentCount*e.unit.health}getUnitHealth(e){return e.unit.health}getUnitTypes(e){return e.unit.unit_types||[]}getAttackModifiers(e){return e.unit.attack_modifiers||[]}getCurrentCount(e){return e.currentCount}getOriginalCount(e){return e.count}getEnemyType(){return"mortal"}getMaxPotentialDamage(e,t){if(e.currentCount<=0)return 0;const n=e.currentCount*e.unit.strength;if(!t||t.length===0)return n;let i=n;for(const a of t){const s=this.calculateDamage(e,a);i=Math.max(i,s)}return i}calculateTotalPotentialDamage(e,t){if(e.currentCount<=0)return 0;let n=0;for(const i of t)n+=this.calculateDamage(e,i);return n}resetToOriginalCount(e){e.currentCount=e.count}}const I=class I{constructor(){h(this,"handlers",new Map);this.initializeHandlers()}static getInstance(){return I.instance||(I.instance=new I),I.instance}initializeHandlers(){this.handlers.set("generic",new ce),this.handlers.set("infinite",new de),this.handlers.set("mortal",new me)}getHandler(e){const t=this.handlers.get(e);if(!t)throw new Error(`No handler found for enemy type: ${e}`);return t}getHandlerForEnemy(e){return this.getHandler(e.type)}hasHandler(e){return this.handlers.has(e)}getSupportedEnemyTypes(){return Array.from(this.handlers.keys())}validateHandlers(){const e=["generic","infinite","mortal"],t=[];for(const n of e)this.hasHandler(n)||t.push(n);return{isValid:t.length===0,missingTypes:t}}createEnemyConfiguration(e){if(!e.type||typeof e.type!="string")throw new Error("Enemy configuration must have a valid type");const t=e.type;if(!this.hasHandler(t))throw new Error(`Unsupported enemy type: ${t}`);switch(t){case"generic":return this.createGenericEnemy(e);case"infinite":return this.createInfiniteEnemy(e);case"mortal":return this.createMortalEnemy(e);default:throw new Error(`Unknown enemy type: ${t}`)}}createGenericEnemy(e){if(!e.name||typeof e.name!="string")throw new Error("Generic enemy must have a name");return{type:"generic",name:e.name,groupIndex:e.groupIndex||0}}createInfiniteEnemy(e){if(!e.unit||typeof e.unit!="object")throw new Error("Infinite enemy must have unit data");const t=e.unit;if(!t.name||typeof t.name!="string")throw new Error("Infinite enemy unit must have a name");if(typeof t.strength!="number"||t.strength<0)throw new Error("Infinite enemy unit must have valid strength");if(typeof t.health!="number"||t.health<=0)throw new Error("Infinite enemy unit must have valid health");return{type:"infinite",unit:{...t,unit_types:t.unit_types||[],attack_modifiers:t.attack_modifiers||[]},groupIndex:e.groupIndex||0}}createMortalEnemy(e){if(!e.unit||typeof e.unit!="object")throw new Error("Mortal enemy must have unit data");if(typeof e.count!="number"||e.count<=0)throw new Error("Mortal enemy must have a positive count");const t=e.unit;if(!t.name||typeof t.name!="string")throw new Error("Mortal enemy unit must have a name");if(typeof t.strength!="number"||t.strength<0)throw new Error("Mortal enemy unit must have valid strength");if(typeof t.health!="number"||t.health<=0)throw new Error("Mortal enemy unit must have valid health");return{type:"mortal",unit:{...t,unit_types:t.unit_types||[],attack_modifiers:t.attack_modifiers||[]},count:e.count,currentCount:e.currentCount||e.count,groupIndex:e.groupIndex||0}}resetHandlers(){}getHandlerStats(){const e={};for(const[t,n]of this.handlers)e[t]={type:n.getEnemyType(),available:!0};return e}cloneEnemy(e){switch(e.type){case"generic":return{...e};case"infinite":return{...e,unit:{...e.unit}};case"mortal":return{...e,unit:{...e.unit},currentCount:e.count};default:throw new Error(`Cannot clone unknown enemy type: ${e.type}`)}}createMultipleEnemies(e){const t=[];for(let n=0;n<e.length;n++)try{const i=this.createEnemyConfiguration({...e[n],groupIndex:e[n].groupIndex||n});t.push(i)}catch(i){throw new Error(`Error creating enemy at index ${n}: ${i}`)}return t}};h(I,"instance");let H=I;class ue{shouldPlayerActNext(e,t){const n=this.getAvailablePlayerGroups(e),i=this.getAvailableEnemies(e);if(n.length===0)return!1;if(i.length===0)return!0;const a=e.currentAction%2===0;return t?a:!a}getAvailablePlayerGroups(e){return e.playerGroups.filter(t=>t.totalHealth>0&&!e.unitsActedThisTurn.players.has(t.unit.name))}getAvailableEnemies(e){return e.enemies.filter((t,n)=>this.canEnemyAttack(t)&&!e.unitsActedThisTurn.enemies.has(n))}markUnitAsActed(e,t){const n={players:new Set(e.unitsActedThisTurn.players),enemies:new Set(e.unitsActedThisTurn.enemies)};if(this.isPlayerGroup(t))n.players.add(t.unit.name);else{const i=e.enemies.findIndex(a=>a.groupIndex===t.groupIndex);i>=0?n.enemies.add(i):console.warn("Could not find enemy index for marking as acted:",t)}return{...e,currentAction:e.currentAction+1,unitsActedThisTurn:n}}isTurnComplete(e){const t=this.getAvailablePlayerGroups(e),n=this.getAvailableEnemies(e);return t.length===0&&n.length===0}shouldBattleEnd(e){const t=e.playerGroups.filter(i=>i.totalHealth>0),n=e.enemies.filter(i=>this.canEnemyAttack(i));return t.length===0||n.length===0}advanceToNextTurn(e){return{...e,currentTurn:e.currentTurn+1,currentAction:0,unitsActedThisTurn:{players:new Set,enemies:new Set}}}canEnemyAttack(e){switch(e.type){case"generic":return!0;case"infinite":return!0;case"mortal":return e.currentCount>0;default:return!1}}isPlayerGroup(e){return"unit"in e&&"count"in e&&"totalHealth"in e}getTurnStats(e){return{currentTurn:e.currentTurn,currentAction:e.currentAction,actionsThisTurn:e.unitsActedThisTurn.players.size+e.unitsActedThisTurn.enemies.size,playersActedThisTurn:e.unitsActedThisTurn.players.size,enemiesActedThisTurn:e.unitsActedThisTurn.enemies.size,availablePlayerGroups:this.getAvailablePlayerGroups(e).length,availableEnemies:this.getAvailableEnemies(e).length,turnComplete:this.isTurnComplete(e)}}validateTurnState(e){const t=[],n=[];e.currentTurn<1&&t.push(`Invalid turn number: ${e.currentTurn} (should be >= 1)`),e.currentAction<0&&t.push(`Invalid action number: ${e.currentAction} (should be >= 0)`);const i=e.unitsActedThisTurn.players.size+e.unitsActedThisTurn.enemies.size;i>e.currentAction&&n.push(`More units marked as acted (${i}) than current action count (${e.currentAction})`);for(const a of e.unitsActedThisTurn.players){const s=e.playerGroups.find(r=>r.unit.name===a);s?s.totalHealth<=0&&n.push(`Dead player ${a} marked as acted this turn`):n.push(`Player ${a} marked as acted but not found in battle`)}for(const a of e.unitsActedThisTurn.enemies){const s=e.enemies[a];s?this.canEnemyAttack(s)||n.push(`Enemy ${s.type} at index ${a} marked as acted but cannot attack`):n.push(`Enemy at index ${a} marked as acted but not found`)}return{isValid:t.length===0,errors:t,warnings:n}}getAlternationAnalysis(e,t){const n=this.getAvailablePlayerGroups(e),i=this.getAvailableEnemies(e);let a="";const s=n.length+e.unitsActedThisTurn.players.size,r=i.length+e.unitsActedThisTurn.enemies.size,o=Math.max(s+r,e.currentAction);for(let m=0;m<o;m++){const d=this.shouldPlayerActNext({...e,currentAction:m},t);a+=d?"P":"E"}const l="P".repeat(e.unitsActedThisTurn.players.size)+"E".repeat(e.unitsActedThisTurn.enemies.size),c=this.shouldPlayerActNext(e,t)?"player":"enemy";return{expectedPattern:a,actualPattern:l,isCorrectAlternation:!0,nextShouldBe:c}}resetTurn(e){return{...e,currentTurn:1,currentAction:0,unitsActedThisTurn:{players:new Set,enemies:new Set}}}getTurnSummary(e){const t=this.getTurnStats(e);return`Turn ${t.currentTurn}, Action ${t.currentAction}: ${t.playersActedThisTurn}P + ${t.enemiesActedThisTurn}E acted, ${t.availablePlayerGroups}P + ${t.availableEnemies}E available`}}class F{constructor(){h(this,"battleState");h(this,"attackerSelector");h(this,"enemyFactory");h(this,"turnManager");this.attackerSelector=new le,this.enemyFactory=H.getInstance(),this.turnManager=new ue,this.validateEnemyHandlers()}simulateBattle(e){return this.battleState=new oe(e),this.validateConfiguration(e),this.runBattleLoop(e.playerGoesFirst,e),this.buildBattleResult(e)}runBattleLoop(e,t){let n=0;const i=t.maxBattleTurns??L.MAX_BATTLE_TURNS,a=t.maxActionsPerTurn??L.MAX_ACTIONS_PER_TURN,s=i*a;for(;!this.battleState.isBattleEnded()&&n<s;){const r=this.battleState.getBattleState();this.turnManager.shouldPlayerActNext(r,e)?this.processPlayerAction(r):this.processEnemyAction(r),n++;const l=this.battleState.getBattleState();if(this.turnManager.shouldBattleEnd(l)){const d=this.battleState.checkBattleEndPure(l,i);this.battleState.applyStateUpdate(d);break}const c=this.battleState.checkBattleEndPure(l,i);this.battleState.applyStateUpdate(c);const m=this.battleState.getBattleState();if(!this.battleState.isBattleEnded()&&this.turnManager.isTurnComplete(m)){const d=this.turnManager.advanceToNextTurn(m);this.battleState.applyStateUpdate(d)}}n>=s&&this.battleState.endBattle()}processPlayerAction(e){const t=this.attackerSelector.selectNextPlayerAttack(e);if(!t)return;const n=this.battleState.applyCompleteAttack(e,t);this.battleState.applyStateUpdate(n)}processEnemyAction(e){const t=this.attackerSelector.selectNextEnemyAttack(e);if(!t)return;const n=this.battleState.applyCompleteAttack(e,t);this.battleState.applyStateUpdate(n)}validateEnemyHandlers(){const e=this.enemyFactory.validateHandlers();if(!e.isValid)throw new Error(`Missing enemy type handlers: ${e.missingTypes.join(", ")}`)}validateConfiguration(e){var t;if(!e.playerArmy||!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(!e.enemies||e.enemies.length===0)throw new Error("Battle must have at least one enemy");for(const n of e.enemies)if(n.type==="mortal"&&(!n.count||n.count<=0))throw new Error(`Mortal enemy ${((t=n.unit)==null?void 0:t.name)||"Unknown"} must have a positive count`)}buildBattleResult(e){const t=this.battleState.getBattleState(),n=e.maxBattleTurns??L.MAX_BATTLE_TURNS,a={result:this.battleState.getBattleOutcome(n),survivingPlayerGroups:this.battleState.getAlivePlayerGroups(),survivingEnemies:this.battleState.getAttackableEnemies(),totalTurns:this.battleState.getCurrentTurn(),totalActions:t.currentAction+(this.battleState.getCurrentTurn()-1)*L.MAX_ACTIONS_PER_TURN};return{outcome:a,combatLog:this.battleState.getCombatLog(),totalDamageDealt:this.battleState.getTotalDamageDealt(),battleDuration:Math.ceil(a.totalTurns)}}getBattleState(){var e;return((e=this.battleState)==null?void 0:e.getBattleState())||{}}isBattleActive(){return this.battleState?!this.battleState.isBattleEnded():!1}}const he=Object.freeze(Object.defineProperty({__proto__:null,UnifiedBattleSimulation:F},Symbol.toStringTag,{value:"Module"}));class pe{constructor(e){h(this,"algorithm");this.algorithm=e||new ge}setAlgorithm(e){this.algorithm=e}reportProgress(e,t){e.onProgress&&e.onProgress(t)}checkCancellation(e){var t;if((t=e.signal)!=null&&t.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(e,t){const n=performance.now(),i=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${e.leadershipBudget} D:${e.dominanceBudget} vs ${e.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${i/1e3} seconds`),this.reportProgress(e,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(e),this.reportProgress(e,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const a=await this.algorithm.generateCombinations(e,t);console.log(`🔄 Generated ${a.length} army combinations to evaluate`),this.reportProgress(e,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:0,totalToEvaluate:a.length,elapsedMs:performance.now()-n});const s=[];let r=0;for(let m=0;m<a.length;m++){this.checkCancellation(e);const d=performance.now();if(d-n>i){console.warn(`⏱️ Optimization timeout after ${(d-n)/1e3}s - stopping at ${r} combinations`);break}const u=a[m];try{const p=await this.evaluateArmyComposition(u,e.enemyGroupCount,t,e.specificEnemyUnits);s.push(p),r++}catch(p){console.warn("⚠️ Failed to evaluate army composition:",p)}if(r%3===0&&await new Promise(p=>setTimeout(p,0)),r%10===0||r===a.length){const p=performance.now()-n,g=20+Math.floor(r/a.length*60),b=r>0?p/r*(a.length-r):void 0;this.reportProgress(e,{phase:"evaluating",progress:g,message:`Evaluating combinations... (${r}/${a.length})`,combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:r,totalToEvaluate:a.length,elapsedMs:p,estimatedRemainingMs:b})}if(r%25===0){const p=(performance.now()-n)/1e3;console.log(`📊 Progress: ${r}/${a.length} combinations (${p.toFixed(1)}s elapsed)`)}}this.reportProgress(e,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:r,totalToEvaluate:a.length,elapsedMs:performance.now()-n});const o=s.sort((m,d)=>{const u=d.averageDamagePerBattle-m.averageDamagePerBattle;return Math.abs(u)>.01?u:d.damageEfficiencyScore-m.damageEfficiencyScore}),c=performance.now()-n;return console.log(`✅ Optimization complete: ${o.length} valid results in ${c.toFixed(2)}ms`),this.reportProgress(e,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:r,totalToEvaluate:a.length,elapsedMs:c}),{rankedResults:o,combinationsEvaluated:r,optimizationTimeMs:c,algorithmUsed:this.algorithm.name,wasTruncated:a.length>(e.maxCombinations||50)}}async evaluateArmyComposition(e,t,n,i){const a=new F;let s;if(i&&i.length>0){const g=i.map((C,w)=>({type:C.isMortal?"mortal":"infinite",unit:{name:C.name,strength:C.strength,health:C.health,unit_types:C.unit_types||[],attack_modifiers:C.attack_modifiers||[]},count:C.count||1,currentCount:C.count||1,groupIndex:w})),b={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(e.stackingOrder)),totalStrength:e.totalStrength,totalHealth:e.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!0},f=a.simulateBattle(b),S={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(e.stackingOrder)),totalStrength:e.totalStrength,totalHealth:e.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!1},x=a.simulateBattle(S);s={bestCase:f,worstCase:x}}else{const g=Array.from({length:t},(C,w)=>({type:"generic",name:`Generic Enemy ${w+1}`,groupIndex:w})),b={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(e.stackingOrder)),totalStrength:e.totalStrength,totalHealth:e.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!0},f=a.simulateBattle(b),S={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(e.stackingOrder)),totalStrength:e.totalStrength,totalHealth:e.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!1},x=a.simulateBattle(S);s={bestCase:f,worstCase:x}}const r=this.calculateSilverCost(e,n),o=this.calculateFoodConsumption(e,n),l=this.calculateRevivalCost(e,n),c=s.bestCase.totalDamageDealt,m=s.worstCase.totalDamageDealt,d=(c+m)/2,u=e.totalLeadershipCost+e.totalDominanceCost+r,p=u>0?d/u:0;return{armyComposition:e,battleAnalysis:s,totalSilverCost:r,totalFoodConsumption:o,totalRevivalCost:l,averageDamagePerBattle:d,damageEfficiencyScore:p}}calculateSilverCost(e,t){const n=new Map(t.map(a=>[a.name,a]));let i=0;for(const[a,s]of Object.entries(e.units)){const r=n.get(a);r&&(i+=(r.revival_cost_silver??0)*s)}return i}calculateFoodConsumption(e,t){const n=new Map(t.map(a=>[a.name,a]));let i=0;for(const[a,s]of Object.entries(e.units)){const r=n.get(a);r&&(i+=(r.food_consumption??0)*s)}return i}calculateRevivalCost(e,t){return this.calculateSilverCost(e,t)}validateOptimizationConstraints(e){if(e.enemyGroupCount<1||e.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(e.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(e.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!e.availableUnits||e.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(e.maxCombinations&&e.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class ge{constructor(){h(this,"name","Systematic Combination Testing")}async generateCombinations(e,t){const n=performance.now(),i=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const a=t.filter(l=>e.availableUnits.includes(l.name));console.log(`📋 Available units for optimization: ${a.length}`);const s=e.maxCombinations||50,r=this.generateUnitCombinations(a.map(l=>l.name),s);console.log(`🔄 Testing ${r.length} different unit combinations (user requested: ${s})`);const o=[];for(let l=0;l<r.length;l++){const c=performance.now();if(c-n>i){console.warn(`⏱️ Generation timeout after ${(c-n)/1e3}s - stopping at ${l} combinations`);break}const m=r[l];try{const d=await this.testCombinationWithStackingAlgorithm(m,e,t);d&&o.push(d)}catch(d){console.warn(`⚠️ Failed to test combination [${m.join(", ")}]:`,d)}if(l%5===0&&await new Promise(d=>setTimeout(d,0)),l%20===0&&l>0){const d=(performance.now()-n)/1e3;console.log(`🔄 Generation progress: ${l}/${r.length} combinations tested (${d.toFixed(1)}s)`)}}return console.log(`✅ Generated ${o.length} valid army combinations for evaluation`),o}generateUnitCombinations(e,t){const n=Math.pow(2,e.length)-1;if(console.log(`📊 Total possible combinations: ${n}, user requested: ${t}`),n>t)return this.generateLimitedCombinations(e,t);const i=[];for(let a=1;a<=n;a++){const s=[];for(let r=0;r<e.length;r++)a&1<<r&&s.push(e[r]);i.push(s)}return i.sort((a,s)=>s.length-a.length),console.log(`🎯 Generated all ${i.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${t} combinations (all possible combinations fit within limit)`),i}generateLimitedCombinations(e,t){const n=[];n.push([...e]);for(let i=0;i<e.length&&n.length<t;i++){const a=e.filter((s,r)=>r!==i);n.push(a)}for(let i=0;i<e.length&&n.length<t;i++)for(let a=i+1;a<e.length&&n.length<t;a++){const s=e.filter((r,o)=>o!==i&&o!==a);s.length>0&&n.push(s)}for(let i=0;i<e.length&&n.length<t;i++)for(let a=i+1;a<e.length&&n.length<t;a++)for(let s=a+1;s<e.length&&n.length<t;s++){const r=e.filter((o,l)=>l!==i&&l!==a&&l!==s);r.length>0&&n.push(r)}if(n.length<t){const i=Math.floor(e.length/2);for(let s=0;s<10&&n.length<t;s++){const r=this.getRandomCombination(e,i);n.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||n.push(r)}const a=Math.max(1,Math.floor(e.length/4));for(let s=0;s<5&&n.length<t;s++){const r=this.getRandomCombination(e,a);n.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||n.push(r)}}return console.log(`🎯 Generated ${n.length} top-down combinations from ${e.length} units`),console.log(`   Strategy: Started with all ${e.length} units, then systematically removed units`),console.log(`   User requested: ${t} combinations (time-based limits still apply)`),n}getRandomCombination(e,t){return[...e].sort(()=>Math.random()-.5).slice(0,t)}async testCombinationWithStackingAlgorithm(e,t,n){try{const i=new O(n),a={leadershipBudget:t.leadershipBudget,dominanceBudget:t.dominanceBudget,mercenaryLimits:t.mercenaryLimits,availableUnits:e},s=await i.optimizeArmy(a);return s.compositions&&s.compositions.length>0?s.compositions[0]:null}catch(i){return console.warn(`Failed to test combination [${e.join(", ")}]:`,i),null}}}class K{constructor(){h(this,"enemyUnits",[]);h(this,"enemyUnitsByName",new Map);h(this,"enemyUnitsByType",new Map);this.resetData()}async loadPresetEnemyUnits(){return this.loadEnemyUnits(Y.ENEMY_UNITS)}async loadEnemyUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading enemy units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch enemy units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Enemy unit data must be an array");return this.enemyUnits=t.map(n=>this.validateAndNormalizeEnemyUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.enemyUnits.length} enemy units successfully`),this.enemyUnits}catch(t){throw console.error("❌ Error loading enemy units:",t),t}}validateAndNormalizeEnemyUnit(e){const t={name:e.name||"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],health:Number(e.health)||0,strength:Number(e.strength)||0,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers:[]};return(!Array.isArray(t.unit_types)||t.unit_types.length===0)&&(console.warn(`Enemy unit ${t.name} has no unit types, adding 'Unknown'`),t.unit_types=["Unknown"]),t.health<=0&&(console.warn(`Enemy unit ${t.name} has invalid health: ${t.health}`),t.health=1),t.strength<0&&(console.warn(`Enemy unit ${t.name} has negative strength: ${t.strength}`),t.strength=0),t.attack_modifiers&&Array.isArray(t.attack_modifiers)&&(t.attack_modifiers=t.attack_modifiers.filter(n=>!n||typeof n!="object"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier object`),!1):!n.target_type||typeof n.value!="number"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier: ${JSON.stringify(n)}`),!1):!0)),t}buildLookups(){this.resetData(),this.enemyUnitsByName=new Map(this.enemyUnits.map(e=>[e.name,e])),this.enemyUnits.forEach(e=>{e.unit_types.forEach(t=>{this.enemyUnitsByType.has(t)||this.enemyUnitsByType.set(t,[]),this.enemyUnitsByType.get(t).push(e)})}),this.enemyUnitsByType.forEach(e=>{e.sort((t,n)=>n.strength-t.strength)})}resetData(){this.enemyUnitsByName.clear(),this.enemyUnitsByType.clear()}getAllEnemyUnits(){return[...this.enemyUnits]}getEnemyUnitByName(e){return this.enemyUnitsByName.get(e)}getEnemyUnitsByType(e){return[...this.enemyUnitsByType.get(e)||[]]}getUniqueEnemyUnitTypes(){return Array.from(this.enemyUnitsByType.keys()).sort()}filterEnemyUnits(e){let t=this.enemyUnits;return e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(i=>n.unit_types.includes(i)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxStrength!==void 0&&(t=t.filter(n=>n.strength<=e.maxStrength)),e.minHealth!==void 0&&(t=t.filter(n=>n.health>=e.minHealth)),e.maxHealth!==void 0&&(t=t.filter(n=>n.health<=e.maxHealth)),t}searchEnemyUnits(e){if(!e.trim())return this.getAllEnemyUnits();const t=e.toLowerCase();return this.enemyUnits.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedEnemyUnits(){return this.enemyUnits.map(e=>({...e,get strengthPerHealth(){return v.getStrengthPerHealth(e)},get effectivenessScore(){return v.getEffectivenessScore(e)}}))}getEnemyUnitSummary(){if(this.enemyUnits.length===0)return{totalUnits:0,byUnitType:{},strengthRange:{min:0,max:0,average:0},healthRange:{min:0,max:0,average:0}};const e=this.enemyUnits.map(i=>i.strength),t=this.enemyUnits.map(i=>i.health),n={};return this.enemyUnitsByType.forEach((i,a)=>{n[a]=i.length}),{totalUnits:this.enemyUnits.length,byUnitType:n,strengthRange:{min:Math.min(...e),max:Math.max(...e),average:Math.round(e.reduce((i,a)=>i+a,0)/e.length)},healthRange:{min:Math.min(...t),max:Math.max(...t),average:Math.round(t.reduce((i,a)=>i+a,0)/t.length)}}}getStatistics(){if(this.enemyUnits.length===0)return{totalUnits:0,unitTypeDistribution:{},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[],unitsWithAttackModifiers:0};const e=this.enemyUnits.map(a=>a.strength),t=this.enemyUnits.map(a=>a.health),n={};this.enemyUnitsByType.forEach((a,s)=>{n[s]=a.length});const i=this.enemyUnits.filter(a=>a.attack_modifiers&&Array.isArray(a.attack_modifiers)&&a.attack_modifiers.length>0).length;return{totalUnits:this.enemyUnits.length,unitTypeDistribution:n,strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((a,s)=>a+s,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((a,s)=>a+s,0)/t.length)},topUnitsByStrength:[...this.enemyUnits].sort((a,s)=>s.strength-a.strength).slice(0,10),topUnitsByHealth:[...this.enemyUnits].sort((a,s)=>s.health-a.health).slice(0,10),unitsWithAttackModifiers:i}}getEnemyUnitsWithModifiersAgainst(e){return this.enemyUnits.filter(t=>!t.attack_modifiers||!Array.isArray(t.attack_modifiers)?!1:e.some(n=>t.attack_modifiers.some(i=>i.target_type.toLowerCase()===n.toLowerCase())))}getMostEffectiveAgainst(e,t=5){return this.enemyUnits.map(n=>({unit:n,effectiveness:this.calculateEffectivenessAgainst(n,e)})).sort((n,i)=>i.effectiveness-n.effectiveness).slice(0,t).map(n=>n.unit)}calculateEffectivenessAgainst(e,t){let n=v.getEffectivenessScore(e);return e.attack_modifiers&&Array.isArray(e.attack_modifiers)&&t.forEach(i=>{const a=v.getAttackModifierAgainst(e,i);n+=a*.1}),n}}class T{static validateEnemyUnit(e){return v.validateEnemyUnit(e)}static validateUserEnemyUnit(e){const t=v.validateEnemyUnit(e),n=[...t.errors],i=[...t.warnings||[]];return(!e.id||typeof e.id!="string"||e.id.trim()==="")&&n.push("User enemy unit must have a valid ID"),(!e.createdAt||!(e.createdAt instanceof Date))&&n.push("User enemy unit must have a valid creation date"),(!e.modifiedAt||!(e.modifiedAt instanceof Date))&&n.push("User enemy unit must have a valid modification date"),e.createdAt&&e.modifiedAt&&e.createdAt instanceof Date&&e.modifiedAt instanceof Date&&e.modifiedAt<e.createdAt&&n.push("Modification date cannot be before creation date"),{isValid:n.length===0,errors:n,warnings:i.length>0?i:void 0}}static validateName(e){if(!e||typeof e!="string")return{isValid:!1,error:"Name must be a non-empty string"};const t=e.trim();return t.length===0?{isValid:!1,error:"Name cannot be empty or only whitespace"}:t.length>100?{isValid:!1,error:"Name cannot exceed 100 characters"}:/[<>\"'&]/.test(t)?{isValid:!1,error:`Name contains invalid characters (<, >, ", ', &)`}:{isValid:!0}}static validateUnitTypes(e){const t=[];if(!Array.isArray(e))return{isValid:!1,error:"Unit types must be an array"};if(e.length===0)return{isValid:!1,error:"At least one unit type is required"};if(e.length>10)return{isValid:!1,error:"Cannot have more than 10 unit types"};for(let i=0;i<e.length;i++){const a=e[i];if(typeof a!="string"||a.trim()==="")return{isValid:!1,error:`Unit type ${i+1} must be a non-empty string`};ne.includes(a)||t.push(`Unit type '${a}' is not a standard type`)}return new Set(e).size!==e.length?{isValid:!1,error:"Unit types cannot contain duplicates"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateHealth(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Health must be a number"}:Number.isFinite(e)?e<=0?{isValid:!1,error:"Health must be greater than 0"}:e>5e7?{isValid:!1,error:"Health cannot exceed 50,000,000"}:(e<100&&t.push("Health value is unusually low (less than 100)"),e>1e7&&t.push("Health value is unusually high (greater than 10,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Health must be a finite number"}}static validateStrength(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Strength must be a number"}:Number.isFinite(e)?e<0?{isValid:!1,error:"Strength cannot be negative"}:e>25e6?{isValid:!1,error:"Strength cannot exceed 25,000,000"}:(e===0&&t.push("Strength value of 0 means this unit cannot deal damage"),e<50&&t.push("Strength value is unusually low (less than 50)"),e>5e6&&t.push("Strength value is unusually high (greater than 5,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Strength must be a finite number"}}static validateAttackModifiers(e){const t=[];if(e==null)return{isValid:!0};if(!Array.isArray(e))return{isValid:!1,error:"Attack modifiers must be an array"};if(e.length>20)return{isValid:!1,error:"Cannot have more than 20 attack modifiers"};for(let a=0;a<e.length;a++){const s=e[a];if(!s||typeof s!="object")return{isValid:!1,error:`Attack modifier ${a+1} must be an object`};if(!s.target_type||typeof s.target_type!="string")return{isValid:!1,error:`Attack modifier ${a+1}: target_type is required and must be a string`};if(ae.includes(s.target_type)||t.push(`Attack modifier ${a+1}: '${s.target_type}' is not a standard target type`),!s.modifier_type||!ie.includes(s.modifier_type))return{isValid:!1,error:`Attack modifier ${a+1}: modifier_type must be 'Strength'`};if(typeof s.value!="number"||!Number.isFinite(s.value))return{isValid:!1,error:`Attack modifier ${a+1}: value must be a finite number`};if(s.value<0)return{isValid:!1,error:`Attack modifier ${a+1}: value cannot be negative`};if(s.value>1e7)return{isValid:!1,error:`Attack modifier ${a+1}: value cannot exceed 10,000,000`};s.value>1e6&&t.push(`Attack modifier ${a+1}: value is unusually high (${s.value})`)}const n=e.map(a=>{var s;return(s=a.target_type)==null?void 0:s.toLowerCase()}).filter(Boolean);return new Set(n).size!==n.length?{isValid:!1,error:"Attack modifiers cannot have duplicate target types"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateForImport(e){const t=[],n=[];if(!e||typeof e!="object")return{isValid:!1,errors:["Data must be an object"]};const i=this.validateName(e.name);i.isValid||t.push(i.error);const a=this.validateUnitTypes(e.unit_types);a.isValid?a.warnings&&n.push(...a.warnings):t.push(a.error);const s=this.validateHealth(e.health);s.isValid?s.warnings&&n.push(...s.warnings):t.push(s.error);const r=this.validateStrength(e.strength);r.isValid?r.warnings&&n.push(...r.warnings):t.push(r.error);const o=this.validateAttackModifiers(e.attack_modifiers);return o.isValid?o.warnings&&n.push(...o.warnings):t.push(o.error),{isValid:t.length===0,errors:t,warnings:n.length>0?n:void 0}}static validateMultipleUnits(e){if(!Array.isArray(e))return{isValid:!1,results:[],summary:{total:0,valid:0,invalid:0,warnings:0}};const t=e.map((i,a)=>({index:a,validation:this.validateForImport(i)})),n={total:e.length,valid:t.filter(i=>i.validation.isValid).length,invalid:t.filter(i=>!i.validation.isValid).length,warnings:t.filter(i=>i.validation.warnings&&i.validation.warnings.length>0).length};return{isValid:n.invalid===0,results:t,summary:n}}static sanitizeEnemyUnit(e){const t={name:typeof e.name=="string"?e.name.trim():"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types.filter(n=>typeof n=="string"&&n.trim()!==""):["Epic Monster"],health:typeof e.health=="number"&&e.health>0?Math.min(e.health,5e7):1e4,strength:typeof e.strength=="number"&&e.strength>=0?Math.min(e.strength,25e6):5e3,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers.filter(n=>n&&typeof n=="object"&&typeof n.target_type=="string"&&typeof n.value=="number"&&n.value>=0).map(n=>({target_type:n.target_type,modifier_type:"Strength",value:Math.min(n.value,1e7)})):[]};return t.name.length===0&&(t.name="Unknown Enemy"),t.unit_types.length===0&&(t.unit_types=["Epic Monster"]),t}}const D=class D{constructor(e={}){h(this,"storageKey");h(this,"metadataKey");h(this,"maxUnits");h(this,"validateOnLoad");this.storageKey=e.storagePrefix?`${e.storagePrefix}_user_enemy_units`:D.DEFAULT_STORAGE_KEY,this.metadataKey=e.storagePrefix?`${e.storagePrefix}_enemy_units_metadata`:D.METADATA_KEY,this.maxUnits=e.maxUnits||D.DEFAULT_MAX_UNITS,this.validateOnLoad=e.validateOnLoad!==!1}isStorageAvailable(){try{const e="__storage_test__";return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch{return!1}}getAllUserEnemyUnits(){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),[];try{const e=localStorage.getItem(this.storageKey);if(!e)return[];const n=JSON.parse(e).map(i=>({...i,createdAt:new Date(i.createdAt),modifiedAt:new Date(i.modifiedAt)}));return this.validateOnLoad?n.filter(i=>{const a=T.validateUserEnemyUnit(i);return a.isValid?!0:(console.warn(`Invalid stored enemy unit removed: ${i.name}`,a.errors),!1)}):n}catch(e){return console.error("Error loading user enemy units from storage:",e),[]}}saveAllUserEnemyUnits(e){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),!1;try{return localStorage.setItem(this.storageKey,JSON.stringify(e)),this.updateMetadata(),!0}catch(t){return console.error("Error saving user enemy units to storage:",t),!1}}addUserEnemyUnit(e){const t=T.validateEnemyUnit(e);if(!t.isValid)return{success:!1,error:`Validation failed: ${t.errors.join(", ")}`};const n=this.getAllUserEnemyUnits();if(n.length>=this.maxUnits)return{success:!1,error:`Maximum number of units (${this.maxUnits}) reached`};if(n.some(s=>s.name.toLowerCase()===e.name.toLowerCase()))return{success:!1,error:`A unit with the name "${e.name}" already exists`};const i=v.createUserEnemyUnit(e);return n.push(i),this.saveAllUserEnemyUnits(n)?{success:!0,unit:i}:{success:!1,error:"Failed to save unit to storage"}}updateUserEnemyUnit(e,t){const n=this.getAllUserEnemyUnits(),i=n.findIndex(c=>c.id===e);if(i===-1)return{success:!1,error:"Unit not found"};const a=n[i],s={...a,...t},r=T.validateUserEnemyUnit(s);if(!r.isValid)return{success:!1,error:`Validation failed: ${r.errors.join(", ")}`};if(t.name&&n.some((c,m)=>m!==i&&c.name.toLowerCase()===t.name.toLowerCase()))return{success:!1,error:`A unit with the name "${t.name}" already exists`};const o=v.updateUserEnemyUnit(a,t);return n[i]=o,this.saveAllUserEnemyUnits(n)?{success:!0,unit:o}:{success:!1,error:"Failed to save updated unit to storage"}}deleteUserEnemyUnit(e){const t=this.getAllUserEnemyUnits(),n=t.findIndex(a=>a.id===e);return n===-1?{success:!1,error:"Unit not found"}:(t.splice(n,1),this.saveAllUserEnemyUnits(t)?{success:!0}:{success:!1,error:"Failed to save changes to storage"})}getUserEnemyUnitById(e){return this.getAllUserEnemyUnits().find(n=>n.id===e)||null}searchUserEnemyUnits(e){const t=this.getAllUserEnemyUnits();if(!e.trim())return t;const n=e.toLowerCase();return t.filter(i=>i.name.toLowerCase().includes(n))}clearAllUserEnemyUnits(){if(!this.isStorageAvailable())return{success:!1,error:"localStorage is not available"};try{return localStorage.removeItem(this.storageKey),localStorage.removeItem(this.metadataKey),{success:!0}}catch{return{success:!1,error:"Failed to clear storage"}}}exportUserEnemyUnits(){try{const e=this.getAllUserEnemyUnits(),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(n=>{var i,a;return{name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers,createdAt:((i=n.createdAt)==null?void 0:i.toISOString())??new Date().toISOString(),modifiedAt:((a=n.modifiedAt)==null?void 0:a.toISOString())??new Date().toISOString()}})};return{success:!0,data:JSON.stringify(t,null,2)}}catch{return{success:!1,error:"Failed to export units"}}}importUserEnemyUnits(e,t={}){try{const n=JSON.parse(e);if(!n.units||!Array.isArray(n.units))return{success:!1,errors:["Invalid import format: units array not found"]};const i=t.replace?[]:this.getAllUserEnemyUnits(),a=[];let s=0,r=0;for(const l of n.units){const c=T.validateForImport(l);if(!c.isValid){a.push(`Unit "${l.name||"Unknown"}": ${c.errors.join(", ")}`),r++;continue}if(i.some(u=>u.name.toLowerCase()===l.name.toLowerCase()))if(t.skipDuplicates){r++;continue}else{a.push(`Unit "${l.name}" already exists`),r++;continue}if(i.length>=this.maxUnits){a.push(`Maximum number of units (${this.maxUnits}) reached`);break}const d=v.createUserEnemyUnit({name:l.name,unit_types:l.unit_types,health:l.health,strength:l.strength,attack_modifiers:l.attack_modifiers||[]});i.push(d),s++}return this.saveAllUserEnemyUnits(i)?{success:!0,imported:s,skipped:r,errors:a.length>0?a:void 0}:{success:!1,errors:["Failed to save imported units to storage"]}}catch{return{success:!1,errors:["Invalid JSON format"]}}}getStorageStats(){var s;const e=this.getAllUserEnemyUnits(),t=new Date;t.setHours(0,0,0,0);const n=e.filter(r=>r.createdAt&&r.createdAt>=t).length;let i=null;e.length>0&&(i=new Date(Math.max(...e.map(r=>{var o;return((o=r.modifiedAt)==null?void 0:o.getTime())??0}))));const a=this.isStorageAvailable()?(((s=localStorage.getItem(this.storageKey))==null?void 0:s.length)||0)*2:0;return{totalUnits:e.length,storageSize:a,lastModified:i,unitsCreatedToday:n}}updateMetadata(){if(this.isStorageAvailable())try{const e={lastModified:new Date().toISOString(),version:"1.0"};localStorage.setItem(this.metadataKey,JSON.stringify(e))}catch(e){console.warn("Failed to update metadata:",e)}}getAvailableSpace(){return Math.max(0,this.maxUnits-this.getAllUserEnemyUnits().length)}isNearCapacity(e=.9){return this.getAllUserEnemyUnits().length>=this.maxUnits*e}};h(D,"DEFAULT_STORAGE_KEY","army_calculator_user_enemy_units"),h(D,"METADATA_KEY","army_calculator_enemy_units_metadata"),h(D,"DEFAULT_MAX_UNITS",100);let N=D;class J{constructor(e){h(this,"container",null);h(this,"props");h(this,"loader");h(this,"storage");h(this,"presetUnits",[]);h(this,"userUnits",[]);h(this,"filteredUnits",[]);h(this,"currentFilter","");h(this,"currentCategory","all");h(this,"currentSelectedUnits",[]);this.props=e,this.loader=new K,this.storage=new N,this.currentSelectedUnits=e.selectedUnits?[...e.selectedUnits]:[]}async mount(e){this.container=e,await this.loadData(),this.render(),this.attachEventListeners()}async loadData(){try{this.presetUnits=await this.loader.loadPresetEnemyUnits(),this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}catch(e){console.error("Error loading enemy unit data:",e),this.presetUnits=[],this.userUnits=[],this.filteredUnits=[]}}updateFilteredUnits(){let e=[];switch(this.currentCategory){case"preset":e=[...this.presetUnits];break;case"user":e=[...this.userUnits];break;case"all":default:e=[...this.presetUnits,...this.userUnits];break}if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();this.filteredUnits=e.filter(n=>n.name.toLowerCase().includes(t)||n.unit_types.some(i=>i.toLowerCase().includes(t)))}else this.filteredUnits=e;this.filteredUnits.sort((t,n)=>t.name.localeCompare(n.name))}render(){if(!this.container)return;const e=this.props.title||"Select Enemy Unit";this.container.innerHTML=`
      <div class="enemy-unit-selector">
        <div class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="modal-title">⚔️ ${e}</h2>
              <button class="modal-close" id="close-selector">&times;</button>
            </div>
            
            <div class="modal-body">
              <!-- Search and Filter Controls -->
              <div class="selector-controls">
                <div class="search-section">
                  <div class="search-input-group">
                    <input 
                      type="text" 
                      id="unit-search" 
                      class="form-input search-input" 
                      placeholder="🔍 Search by name or unit type..."
                      value="${this.currentFilter}"
                    >
                    <button class="btn btn-secondary btn-sm" id="clear-search">
                      ❌ Clear
                    </button>
                  </div>
                </div>
                
                <div class="filter-section">
                  <div class="filter-tabs">
                    <button class="filter-tab ${this.currentCategory==="all"?"active":""}" data-category="all">
                      📋 All Units (${this.presetUnits.length+this.userUnits.length})
                    </button>
                    <button class="filter-tab ${this.currentCategory==="preset"?"active":""}" data-category="preset">
                      🏛️ Preset (${this.presetUnits.length})
                    </button>
                    <button class="filter-tab ${this.currentCategory==="user"?"active":""}" data-category="user">
                      👤 Custom (${this.userUnits.length})
                    </button>
                  </div>
                </div>
              </div>

              <!-- Unit List -->
              <div class="unit-list-container">
                <div class="unit-list-header">
                  <span class="results-count">
                    ${this.filteredUnits.length} unit${this.filteredUnits.length!==1?"s":""} found
                  </span>
                </div>
                
                <div class="unit-list" id="unit-list">
                  ${this.renderUnitList()}
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="btn btn-secondary btn-lg" id="cancel-selection">
                ❌ Cancel
              </button>
              ${this.props.selectedUnit?`
                <button class="btn btn-success btn-lg" id="confirm-selection">
                  ✅ Select "${this.props.selectedUnit.name}"
                </button>
              `:""}
            </div>
          </div>
        </div>
      </div>
    `,this.addStyles()}renderUnitList(){return this.filteredUnits.length===0?`
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No units found</h3>
          <p>Try adjusting your search or filter criteria</p>
          ${this.currentCategory==="user"&&this.userUnits.length===0?`
            <p class="text-sm text-secondary">
              You haven't created any custom enemy units yet.
            </p>
          `:""}
        </div>
      `:this.filteredUnits.map(e=>{var i;const t=this.props.mode==="multiple"?this.currentSelectedUnits.some(a=>a.name===e.name):((i=this.props.selectedUnit)==null?void 0:i.name)===e.name,n="id"in e;return`
        <div class="unit-card ${t?"selected":""}" data-unit-name="${e.name}">
          <div class="unit-card-header">
            <div class="unit-info">
              <h4 class="unit-name">
                ${e.name}
                ${n?'<span class="user-badge">👤</span>':'<span class="preset-badge">🏛️</span>'}
              </h4>
              <div class="unit-types">
                ${e.unit_types.map(a=>`<span class="unit-type-tag">${a}</span>`).join("")}
              </div>
            </div>
            <div class="unit-actions">
              <button class="btn btn-primary btn-sm select-unit-btn" data-unit-name="${e.name}">
                ${t?"✅ Selected":"👆 Select"}
              </button>
            </div>
          </div>
          
          <div class="unit-stats">
            <div class="stat-group">
              <div class="stat-item">
                <span class="stat-label">❤️ Health</span>
                <span class="stat-value">${e.health.toLocaleString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">⚔️ Strength</span>
                <span class="stat-value">${e.strength.toLocaleString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">📊 Ratio</span>
                <span class="stat-value">${(e.strength/e.health).toFixed(3)}</span>
              </div>
            </div>
            
            ${e.attack_modifiers&&e.attack_modifiers.length>0?`
              <div class="attack-modifiers">
                <span class="modifiers-label">🎯 Attack Bonuses:</span>
                <div class="modifiers-list">
                  ${e.attack_modifiers.map(a=>`<span class="modifier-tag">+${a.value.toLocaleString()} vs ${a.target_type}</span>`).join("")}
                </div>
              </div>
            `:""}
          </div>
        </div>
      `}).join("")}addStyles(){const e=document.createElement("style");e.textContent=`
      .enemy-unit-selector {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-md);
      }

      .modal-content {
        background-color: var(--color-background);
        border-radius: var(--radius-lg);
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-lg);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
        flex-shrink: 0;
      }

      .modal-title {
        margin: 0;
        font-size: var(--font-size-xl);
        color: var(--color-text);
      }

      .modal-close {
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
      }

      .modal-close:hover {
        color: var(--color-text);
        background-color: var(--color-surface);
      }

      .modal-body {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .modal-footer {
        padding: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
        display: flex;
        gap: var(--spacing-md);
        justify-content: flex-end;
        flex-shrink: 0;
      }

      /* Selector Controls */
      .selector-controls {
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
        flex-shrink: 0;
      }

      .search-section {
        margin-bottom: var(--spacing-md);
      }

      .search-input-group {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
      }

      .search-input {
        flex: 1;
        font-size: var(--font-size-sm);
      }

      .filter-section {
        margin-bottom: 0;
      }

      .filter-tabs {
        display: flex;
        gap: var(--spacing-xs);
        flex-wrap: wrap;
      }

      .filter-tab {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 2px solid var(--color-border);
        background-color: var(--color-surface);
        color: var(--color-text-secondary);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-size: var(--font-size-sm);
        font-weight: 500;
      }

      .filter-tab:hover {
        border-color: var(--color-primary);
        color: var(--color-text);
      }

      .filter-tab.active {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        color: white;
      }

      /* Unit List */
      .unit-list-container {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .unit-list-header {
        padding: var(--spacing-md) var(--spacing-lg);
        background-color: var(--color-surface);
        border-bottom: 1px solid var(--color-border);
        flex-shrink: 0;
      }

      .results-count {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .unit-list {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-md);
      }

      /* Unit Cards */
      .unit-card {
        background-color: var(--color-surface);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        margin-bottom: var(--spacing-md);
        transition: all var(--transition-fast);
        cursor: pointer;
      }

      .unit-card:hover {
        border-color: var(--color-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .unit-card.selected {
        border-color: var(--color-success);
        background-color: rgba(34, 197, 94, 0.05);
      }

      .unit-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
      }

      .unit-info {
        flex: 1;
      }

      .unit-name {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-md);
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .user-badge,
      .preset-badge {
        font-size: var(--font-size-xs);
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        background-color: var(--color-primary);
        color: white;
      }

      .user-badge {
        background-color: var(--color-success);
      }

      .unit-types {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }

      .unit-type-tag {
        background-color: var(--color-background);
        color: var(--color-text-secondary);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        border: 1px solid var(--color-border);
      }

      .unit-actions {
        flex-shrink: 0;
        margin-left: var(--spacing-md);
      }

      .select-unit-btn {
        min-width: 100px;
      }

      .unit-stats {
        margin-top: var(--spacing-sm);
      }

      .stat-group {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-sm);
      }

      .stat-item {
        text-align: center;
      }

      .stat-label {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-bottom: 2px;
      }

      .stat-value {
        display: block;
        font-size: var(--font-size-sm);
        font-weight: 600;
        color: var(--color-text);
      }

      .attack-modifiers {
        padding-top: var(--spacing-sm);
        border-top: 1px solid var(--color-border);
      }

      .modifiers-label {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        display: block;
        margin-bottom: var(--spacing-xs);
      }

      .modifiers-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }

      .modifier-tag {
        background-color: var(--color-warning);
        color: white;
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-weight: 500;
      }

      /* Empty State */
      .empty-state {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--color-text-secondary);
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: var(--spacing-md);
      }

      .empty-state h3 {
        margin: 0 0 var(--spacing-sm) 0;
        color: var(--color-text);
      }

      .empty-state p {
        margin: 0 0 var(--spacing-xs) 0;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .modal-overlay {
          padding: var(--spacing-sm);
        }

        .modal-content {
          max-height: 95vh;
        }

        .unit-card-header {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .unit-actions {
          margin-left: 0;
          align-self: stretch;
        }

        .select-unit-btn {
          width: 100%;
        }

        .stat-group {
          grid-template-columns: repeat(2, 1fr);
        }

        .filter-tabs {
          flex-direction: column;
        }

        .filter-tab {
          text-align: center;
        }

        .search-input-group {
          flex-direction: column;
        }

        .search-input {
          width: 100%;
        }

        .modal-footer {
          flex-direction: column;
        }

        .modal-footer .btn {
          width: 100%;
        }
      }

      @media (max-width: 480px) {
        .modal-title {
          font-size: var(--font-size-lg);
        }

        .unit-name {
          font-size: var(--font-size-sm);
        }

        .stat-group {
          grid-template-columns: 1fr;
          gap: var(--spacing-sm);
        }
      }
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-selector");e&&e.addEventListener("click",this.handleCancel.bind(this));const t=document.getElementById("cancel-selection");t&&t.addEventListener("click",this.handleCancel.bind(this));const n=document.getElementById("confirm-selection");n&&n.addEventListener("click",this.handleConfirm.bind(this));const i=document.getElementById("unit-search");i&&i.addEventListener("input",this.handleSearch.bind(this));const a=document.getElementById("clear-search");a&&a.addEventListener("click",this.handleClearSearch.bind(this)),document.querySelectorAll(".filter-tab").forEach(r=>{r.addEventListener("click",this.handleFilterChange.bind(this))}),document.querySelectorAll(".select-unit-btn").forEach(r=>{r.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(r=>{r.addEventListener("click",this.handleCardClick.bind(this))});const s=document.querySelector(".modal-overlay");s&&s.addEventListener("click",r=>{r.target===s&&this.handleCancel()}),document.addEventListener("keydown",this.handleKeyDown.bind(this))}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitList()}handleFilterChange(e){const n=e.target.dataset.category;n&&n!==this.currentCategory&&(this.currentCategory=n,this.updateFilteredUnits(),this.refreshFilterTabs(),this.refreshUnitList())}handleUnitSelect(e){e.stopPropagation();const n=e.target.dataset.unitName;if(n){const i=this.filteredUnits.find(a=>a.name===n);if(i){if(this.props.mode==="multiple"){const a=this.currentSelectedUnits.findIndex(s=>s.name===i.name);if(a>=0)this.currentSelectedUnits.splice(a,1);else{const s=this.props.maxSelections||5;this.currentSelectedUnits.length<s?this.currentSelectedUnits.push(i):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(i))}this.refreshUnitList()}this.props.onSelect(i)}}}handleCardClick(e){const n=e.target.closest(".unit-card");if(n){const i=n.dataset.unitName;if(i){const a=this.filteredUnits.find(s=>s.name===i);if(a){if(this.props.mode==="multiple"){const s=this.currentSelectedUnits.findIndex(r=>r.name===a.name);if(s>=0)this.currentSelectedUnits.splice(s,1);else{const r=this.props.maxSelections||5;this.currentSelectedUnits.length<r?this.currentSelectedUnits.push(a):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(a))}this.refreshUnitList()}this.props.onSelect(a)}}}}handleCancel(){this.props.onCancel()}handleConfirm(){this.props.selectedUnit&&this.props.onSelect(this.props.selectedUnit)}handleKeyDown(e){e.key==="Escape"&&this.handleCancel()}refreshUnitList(){const e=document.getElementById("unit-list");e&&(e.innerHTML=this.renderUnitList(),document.querySelectorAll(".select-unit-btn").forEach(n=>{n.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(n=>{n.addEventListener("click",this.handleCardClick.bind(this))}));const t=document.querySelector(".results-count");t&&(t.textContent=`${this.filteredUnits.length} unit${this.filteredUnits.length!==1?"s":""} found`)}refreshFilterTabs(){document.querySelectorAll(".filter-tab").forEach(e=>{e.getAttribute("data-category")===this.currentCategory?e.classList.add("active"):e.classList.remove("active")})}unmount(){document.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.container&&(this.container.innerHTML="")}updateTitle(e){this.props.title=e;const t=document.getElementById("modal-title");t&&(t.textContent=`⚔️ ${e}`)}updateSelectedUnits(e){this.currentSelectedUnits=[...e],this.refreshUnitList()}}const fe=Object.freeze(Object.defineProperty({__proto__:null,EnemyUnitSelector:J},Symbol.toStringTag,{value:"Module"}));class Q{static generateResultsHTML(e,t,n={}){const{showComparison:i=!0,title:a="Battle Analysis Results",subtitle:s}=n,r=e.totalDamageDealt-t.totalDamageDealt,o=e.battleDuration-t.battleDuration,l=(e.totalDamageDealt+t.totalDamageDealt)/2,c=`
      <div class="results-header">
        <h3>📊 ${a}
          <span class="help-icon" data-tooltip="battle-results">ℹ️</span>
        </h3>
        ${s?`<p class="results-summary">${s}</p>`:`
          <p class="results-summary">
            Simulation complete! Here's how your army performs in battle scenarios.
          </p>
        `}
      </div>
    `,m=`
      <div class="scenario-comparison">
        <div class="scenario-card best-case">
          <h4>🟢 Best Case Scenario
            <span class="help-icon" data-tooltip="best-case-scenario">ℹ️</span>
          </h4>
          <p class="scenario-description">Your army attacks first</p>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${e.totalDamageDealt.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${e.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Total Actions:</span>
              <span class="stat-value">${e.outcome.totalActions}</span>
            </div>
          </div>
        </div>

        <div class="scenario-card worst-case">
          <h4>🔴 Worst Case Scenario
            <span class="help-icon" data-tooltip="worst-case-scenario">ℹ️</span>
          </h4>
          <p class="scenario-description">Enemy forces attack first</p>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${t.totalDamageDealt.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${t.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Total Actions:</span>
              <span class="stat-value">${t.outcome.totalActions}</span>
            </div>
          </div>
        </div>
      </div>
    `,d=i?`
      <div class="comparison-analysis">
        <h4>📈 Scenario Comparison</h4>
        <div class="comparison-stats">
          <div class="comparison-stat">
            <span class="stat-label">Damage Difference:</span>
            <span class="stat-value ${r>=0?"positive":"negative"}">
              ${r>=0?"+":""}${r.toLocaleString()}
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Survival Difference:</span>
            <span class="stat-value ${o>=0?"positive":"negative"}">
              ${o>=0?"+":""}${o} turns
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Average Damage:</span>
            <span class="stat-value">${Math.round(l).toLocaleString()}</span>
          </div>
        </div>
        <div class="comparison-insights">
          <p class="insight">
            ${r>0?`💡 <strong>Initiative Advantage:</strong> Attacking first provides ${r.toLocaleString()} extra damage.`:r<0?`⚠️ <strong>Initiative Disadvantage:</strong> Enemy first strike reduces your damage by ${Math.abs(r).toLocaleString()}.`:"⚖️ <strong>Balanced Combat:</strong> Turn order has minimal impact on damage output."}
          </p>
        </div>
      </div>
    `:"",u=`
      <div class="detailed-logs">
        <div class="log-tabs">
          <button class="log-tab active" data-scenario="best">Best Case Combat Log</button>
          <button class="log-tab" data-scenario="worst">Worst Case Combat Log</button>
        </div>
        <div class="log-content">
          <div id="best-case-log" class="combat-log active">
            ${this.formatCombatLog(e.combatLog)}
          </div>
          <div id="worst-case-log" class="combat-log hidden">
            ${this.formatCombatLog(t.combatLog)}
          </div>
        </div>
      </div>
    `;return c+m+d+u}static displayResults(e,t,n,i={}){e.innerHTML=this.generateResultsHTML(t,n,i),this.attachLogTabListeners(e,i.onLogTabChange)}static formatCombatLog(e){return e.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${e.map(n=>`
        <div class="${n.attackerSide==="player"?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${n.turn}:</span>
          <span class="action-text">${n.attacker} ${n.action}</span>
        </div>
      `).join("")}</div>`}static attachLogTabListeners(e,t){const n=e.querySelectorAll(".log-tab");n.forEach(i=>{i.addEventListener("click",a=>{const s=a.target,r=s.dataset.scenario;n.forEach(c=>c.classList.remove("active")),s.classList.add("active"),e.querySelectorAll(".combat-log").forEach(c=>{c.classList.remove("active"),c.classList.add("hidden")});const l=e.querySelector(`#${r}-case-log`);l&&(l.classList.add("active"),l.classList.remove("hidden")),t&&t()})})}}class G{constructor(){h(this,"container",null);h(this,"unifiedBattleService");h(this,"currentArmy",null);h(this,"currentBestCase",null);h(this,"currentWorstCase",null);h(this,"selectedEnemyUnit",null);h(this,"enemyUnitSelector",null);h(this,"tooltipData",{"battle-simulation-overview":`
      <strong>Battle Simulation Overview</strong><br>
      Simulates asymmetric combat where:<br>
      • Player units deal damage to enemies<br>
      • Enemy units eliminate player groups<br>
      • Battle ends when all player groups are eliminated<br>
      • Results show best case (player first) vs worst case (enemy first)
    `,"enemy-groups":`
      <strong>Enemy Groups</strong><br>
      Each enemy group represents a separate attacking force:<br>
      • More groups = more enemy attacks per battle phase<br>
      • Each group can eliminate one player unit group<br>
      • Enemies target your highest health groups first<br>
      • Recommended: 1-5 groups for balanced battles
    `,"run-simulation":`
      <strong>Run Battle Simulation</strong><br>
      Executes both scenarios simultaneously:<br>
      • <span style="color: #27ae60;">Best Case:</span> Your units attack first<br>
      • <span style="color: #e74c3c;">Worst Case:</span> Enemy units attack first<br>
      • Shows damage dealt, battle duration, and survival statistics<br>
      • Results help optimize army composition
    `,"battle-mechanics-guide":`
      <strong>Battle Mechanics Guide</strong><br>
      <strong>Turn Order:</strong> Players attack by strength (highest first), enemies target by health (highest first)<br>
      <strong>Battle Phases:</strong> Each unit gets exactly one turn per phase<br>
      <strong>Overflow:</strong> Side with more groups gets extra turns<br>
      <strong>Elimination:</strong> Units eliminated mid-phase don't get subsequent turns
    `,"battle-results":`
      <strong>Battle Analysis Results</strong><br>
      Shows outcomes for both scenarios:<br>
      • <span style="color: #27ae60;">Best Case:</span> Maximum damage when you attack first<br>
      • <span style="color: #e74c3c;">Worst Case:</span> Minimum damage when enemies attack first<br>
      • <strong>Comparison:</strong> Difference between scenarios<br>
      • Use results to optimize army composition
    `,"best-case-scenario":`
      <strong>Best Case Scenario</strong><br>
      Your army gets initiative and attacks first:<br>
      • Higher damage potential<br>
      • Longer battle duration<br>
      • Better survival chances<br>
      • Represents optimal conditions
    `,"worst-case-scenario":`
      <strong>Worst Case Scenario</strong><br>
      Enemy forces attack first:<br>
      • Lower damage potential<br>
      • Shorter battle duration<br>
      • Reduced survival chances<br>
      • Represents challenging conditions
    `});this.unifiedBattleService=new F}mount(e,t){this.container=e,this.currentArmy=t,this.render(),this.attachEventListeners(),this.showSimulationControls()}initialize(e){}render(){this.container&&(this.container.innerHTML=`
      <section class="card battle-simulation-section" id="battle-simulation-section">
        <h2 class="section-title">⚔️ Battle Simulation
          <span class="help-icon" data-tooltip="battle-simulation-overview">ℹ️</span>
        </h2>
        <p class="section-description">
          Simulate battles against enemy forces to analyze best and worst case scenarios.
          Enter the number of enemy groups you expect to face.
        </p>

        <!-- Enemy Configuration -->
        <div class="enemy-input-container">
          <!-- Enemy Type Selection -->
          <div class="enemy-type-selection">
            <h4>Choose Enemy Type:</h4>
            <div class="enemy-type-options">
              <label class="radio-option">
                <input type="radio" name="enemy-type" value="generic" checked>
                <span class="radio-label">Generic Enemy Groups</span>
                <small class="radio-help">Simple enemy groups without specific units</small>
              </label>
              <label class="radio-option">
                <input type="radio" name="enemy-type" value="specific">
                <span class="radio-label">Specific Enemy Units</span>
                <small class="radio-help">Choose specific enemy units with unique abilities</small>
              </label>
            </div>
          </div>

          <!-- Generic Enemy Input -->
          <div id="generic-enemy-input" class="enemy-config-section">
            <div class="input-group">
              <label for="enemy-groups" class="input-label">
                Number of Enemy Groups:
                <span class="help-icon" data-tooltip="enemy-groups">ℹ️</span>
              </label>
              <input
                type="number"
                id="enemy-groups"
                min="1"
                max="20"
                value="3"
                class="input large-input"
                placeholder="Enter number of enemy groups"
              >
              <small class="input-help">
                Each enemy group can eliminate one of your unit groups per attack.
              </small>
            </div>
          </div>

          <!-- Specific Enemy Unit Input -->
          <div id="specific-enemy-input" class="enemy-config-section hidden">
            <div class="enemy-unit-selection">
              <div class="selected-enemy-display">
                <div id="no-enemy-selected" class="no-selection-message">
                  <span class="icon">🎯</span>
                  <span class="message">No enemy unit selected</span>
                  <small class="help">Click "Select Enemy Unit" to choose a specific enemy</small>
                </div>
                <div id="selected-enemy-info" class="selected-enemy-card hidden">
                  <!-- Selected enemy info will be populated here -->
                </div>
              </div>
              <div class="enemy-selection-controls">
                <button id="select-enemy-btn" class="btn btn-secondary">
                  🎯 Select Enemy Unit
                </button>
                <button id="clear-enemy-btn" class="btn btn-outline" style="display: none;">
                  🗑️ Clear Selection
                </button>
              </div>
            </div>
          </div>
          
          <div class="simulation-controls">
            <button id="run-simulation-btn" class="btn btn-primary large-btn" data-tooltip="run-simulation">
              🎯 Run Battle Simulation
            </button>
            <button id="clear-simulation-btn" class="btn btn-secondary" style="display: none;">
              🗑️ Clear Results
            </button>
          </div>
        </div>

        <!-- Pre-calculated Results Note -->
        <div id="simulation-note" class="simulation-note hidden">
          <!-- Note will be populated here -->
        </div>

        <!-- Loading State -->
        <div id="simulation-loading" class="simulation-loading hidden">
          <div class="loading-spinner"></div>
          <p>Running battle simulation...</p>
        </div>

        <!-- Results Container -->
        <div id="simulation-results" class="simulation-results hidden">
          <!-- Results will be populated here -->
        </div>

        <!-- Help Section -->
        <div class="help-section">
          <h4>📚 Battle Mechanics Guide
            <span class="help-icon" data-tooltip="battle-mechanics-guide">ℹ️</span>
          </h4>
          <div class="help-content">
            <div class="help-item">
              <strong>🎯 Initiative:</strong> 50/50 chance who attacks first (best vs worst case)
            </div>
            <div class="help-item">
              <strong>⚔️ Player Attacks:</strong> Deal damage to enemies based on unit strength
            </div>
            <div class="help-item">
              <strong>🛡️ Enemy Attacks:</strong> Eliminate entire player unit groups
            </div>
            <div class="help-item">
              <strong>🔄 Battle Phases:</strong> All units take turns, then cycle repeats
            </div>
            <div class="help-item">
              <strong>🏁 Victory Condition:</strong> Battle ends when all player groups are eliminated
            </div>
          </div>
        </div>
      </section>

      <!-- Tooltip Container -->
      <div id="tooltip" class="tooltip hidden">
        <div class="tooltip-content"></div>
        <div class="tooltip-arrow"></div>
      </div>
    `,this.addBattleSimulationStyles())}attachEventListeners(){const e=document.getElementById("run-simulation-btn"),t=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups"),i=document.getElementById("select-enemy-btn"),a=document.getElementById("clear-enemy-btn");e&&e.addEventListener("click",()=>this.runSimulation()),t&&t.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),i&&i.addEventListener("click",()=>this.openEnemyUnitSelector()),a&&a.addEventListener("click",()=>this.clearSelectedEnemyUnit()),document.querySelectorAll('input[name="enemy-type"]').forEach(r=>{r.addEventListener("change",o=>this.handleEnemyTypeChange(o))}),this.attachTooltipListeners()}handleEnemyTypeChange(e){const n=e.target.value,i=document.getElementById("generic-enemy-input"),a=document.getElementById("specific-enemy-input");n==="generic"?(i==null||i.classList.remove("hidden"),a==null||a.classList.add("hidden")):n==="specific"&&(i==null||i.classList.add("hidden"),a==null||a.classList.remove("hidden")),this.validateInput()}async openEnemyUnitSelector(){const e=document.createElement("div");e.id="enemy-unit-selector-modal",document.body.appendChild(e),this.enemyUnitSelector=new J({onSelect:t=>{this.selectedEnemyUnit=t,this.displaySelectedEnemyUnit(),this.validateInput(),this.closeEnemyUnitSelector()},onCancel:()=>{this.closeEnemyUnitSelector()},selectedUnit:this.selectedEnemyUnit,mode:"single",title:"Select Enemy Unit for Battle"}),await this.enemyUnitSelector.mount(e)}closeEnemyUnitSelector(){this.enemyUnitSelector&&(this.enemyUnitSelector.unmount(),this.enemyUnitSelector=null);const e=document.getElementById("enemy-unit-selector-modal");e&&e.remove()}clearSelectedEnemyUnit(){this.selectedEnemyUnit=null,this.displaySelectedEnemyUnit(),this.validateInput()}displaySelectedEnemyUnit(){const e=document.getElementById("no-enemy-selected"),t=document.getElementById("selected-enemy-info"),n=document.getElementById("clear-enemy-btn");if(!(!e||!t||!n))if(!this.selectedEnemyUnit)e.classList.remove("hidden"),t.classList.add("hidden"),n.style.display="none";else{e.classList.add("hidden"),t.classList.remove("hidden"),n.style.display="inline-block";const i=this.selectedEnemyUnit,a=i.attack_modifiers&&Object.keys(i.attack_modifiers).length>0?Object.entries(i.attack_modifiers).map(([s,r])=>`+${r} vs ${s}`).join(", "):"None";t.innerHTML=`
        <div class="enemy-unit-card">
          <div class="enemy-unit-header">
            <h5 class="enemy-unit-name">${i.name}</h5>
            <div class="enemy-unit-types">
              ${i.unit_types.map(s=>`<span class="unit-type-tag">${s}</span>`).join("")}
            </div>
          </div>
          <div class="enemy-unit-stats">
            <div class="stat-item">
              <span class="stat-label">Health:</span>
              <span class="stat-value">${i.health.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Strength:</span>
              <span class="stat-value">${i.strength.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Attack Modifiers:</span>
              <span class="stat-value">${a}</span>
            </div>
          </div>
        </div>
      `}}validateInput(){const e=document.getElementById("run-simulation-btn");if(!e)return!1;const t=document.querySelector('input[name="enemy-type"]:checked'),n=(t==null?void 0:t.value)||"generic";let i=!0,a="";if(n==="generic"){const s=document.getElementById("enemy-groups");if(!s)return!1;const r=s.value.trim();r?isNaN(Number(r))||!Number.isInteger(Number(r))?(i=!1,a="Please enter a valid whole number"):parseInt(r)<1&&(i=!1,a="Number of enemy groups must be at least 1"):(i=!1,a="Please enter the number of enemy groups"),i?(s.classList.remove("error"),this.hideInputError("enemy-groups")):(s.classList.add("error"),this.showInputError("enemy-groups",a))}else n==="specific"&&(this.selectedEnemyUnit||(i=!1,a="Please select an enemy unit for the battle simulation"));return e.disabled=!i||!this.validateArmyComposition(),i}validateArmyComposition(){var e,t;if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const n of this.currentArmy.stackingOrder)if(!((e=n.unit)!=null&&e.name)||n.count<=0||!((t=n.unit)!=null&&t.strength)||n.unit.strength<=0||n.totalHealth<=0)return!1;return!0}showInputError(e,t){var a;const n=document.getElementById(e);if(!n)return;this.hideInputError(e);const i=document.createElement("div");i.className="input-error-message",i.id=`${e}-error`,i.textContent=t,(a=n.parentNode)==null||a.insertBefore(i,n.nextSibling)}hideInputError(e){const t=document.getElementById(`${e}-error`);t&&t.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(t=>{t.addEventListener("mouseenter",n=>this.showTooltip(n)),t.addEventListener("mouseleave",()=>this.hideTooltip()),t.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",t=>{const n=t.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(e){const t=e.target,n=t.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const i=document.getElementById("tooltip"),a=i==null?void 0:i.querySelector(".tooltip-content");!i||!a||(a.innerHTML=this.tooltipData[n],i.classList.remove("hidden"),this.positionTooltip(i,t))}hideTooltip(){const e=document.getElementById("tooltip");e&&e.classList.add("hidden")}toggleTooltip(e){const t=document.getElementById("tooltip");t!=null&&t.classList.contains("hidden")?this.showTooltip(e):this.hideTooltip()}positionTooltip(e,t){const n=t.getBoundingClientRect(),i=e;i.style.top="",i.style.left="",i.style.transform="";const a=e.getBoundingClientRect(),s=window.innerWidth,r=window.innerHeight;let o=n.bottom+10,l=n.left+n.width/2-a.width/2;l<10?l=10:l+a.width>s-10&&(l=s-a.width-10),o+a.height>r-10&&(o=n.top-a.height-10),i.style.top=`${o}px`,i.style.left=`${l}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const e=document.querySelector('input[name="enemy-type"]:checked'),t=(e==null?void 0:e.value)||"generic";this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((s,r)=>{try{if(t==="specific"&&this.selectedEnemyUnit){const o=[{type:this.selectedEnemyUnit.isMortal?"mortal":"infinite",unit:{name:this.selectedEnemyUnit.name,strength:this.selectedEnemyUnit.strength,health:this.selectedEnemyUnit.health,unit_types:this.selectedEnemyUnit.unit_types||[],attack_modifiers:this.selectedEnemyUnit.attack_modifiers||[]},count:this.selectedEnemyUnit.count||1,currentCount:this.selectedEnemyUnit.count||1,groupIndex:0}],l={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(this.currentArmy.stackingOrder)),totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:JSON.parse(JSON.stringify(o)),playerGoesFirst:!0};this.currentBestCase=this.unifiedBattleService.simulateBattle(l);const c={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(this.currentArmy.stackingOrder)),totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:JSON.parse(JSON.stringify(o)),playerGoesFirst:!1};this.currentWorstCase=this.unifiedBattleService.simulateBattle(c)}else{const o=document.getElementById("enemy-groups"),l=parseInt(o.value),c=[];for(let u=0;u<l;u++)c.push({type:"generic",name:`Enemy Group ${u+1}`,groupIndex:u});const m={playerArmy:{stackingOrder:this.currentArmy.stackingOrder,totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:c,playerGoesFirst:!0};this.currentBestCase=this.unifiedBattleService.simulateBattle(m);const d={...m,playerGoesFirst:!1};this.currentWorstCase=this.unifiedBattleService.simulateBattle(d)}s()}catch(o){r(o)}}),i=new Promise((s,r)=>{setTimeout(()=>r(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,i]),!this.currentBestCase||!this.currentWorstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const a=document.getElementById("clear-simulation-btn");a&&(a.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let i="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?i="Simulation timed out. Try reducing the complexity or check your army composition.":n.message.includes("invalid")?i="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")?i="Army composition error. Please re-optimize your army and try again.":n.message.includes("Enemy unit")&&(i="Enemy unit configuration error. Please select a valid enemy unit.")),this.showError(i)}}displayResults(){if(!this.currentBestCase||!this.currentWorstCase)return;const e=document.getElementById("simulation-results");e&&(Q.displayResults(e,this.currentBestCase,this.currentWorstCase,{includeTooltips:!0,onLogTabChange:()=>this.attachTooltipListeners()}),this.attachTooltipListeners())}clearResults(){this.currentBestCase=null,this.currentWorstCase=null,this.showResults(!1);const e=document.getElementById("clear-simulation-btn");e&&(e.style.display="none")}showLoading(e){const t=document.getElementById("simulation-loading");t&&t.classList.toggle("hidden",!e)}showResults(e){const t=document.getElementById("simulation-results");t&&t.classList.toggle("hidden",!e)}showError(e){this.hideError();const t=document.createElement("div");t.className="simulation-error",t.id="simulation-error",t.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${e}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;const n=document.getElementById("simulation-results");n&&n.parentNode?n.parentNode.insertBefore(t,n):this.container&&this.container.appendChild(t),setTimeout(()=>{this.hideError()},1e4)}hideError(){const e=document.getElementById("simulation-error");e&&e.remove()}addBattleSimulationStyles(){const e=document.createElement("style");e.textContent=`
      .battle-simulation-section {
        margin-top: 2rem;
        padding: 2rem;
        background: linear-gradient(135deg, #fff0f0 0%, #f8f9fa 100%);
        border: 2px solid #e74c3c;
        border-radius: 12px;
      }

      .section-description {
        color: #666;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        line-height: 1.6;
      }

      .enemy-input-container {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .input-help {
        color: #666;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        display: block;
      }

      .simulation-controls {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .simulation-loading {
        text-align: center;
        padding: 2rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .simulation-results {
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .results-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .results-summary {
        color: #666;
        font-size: 1.1rem;
        margin-top: 0.5rem;
      }

      .scenario-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .scenario-card {
        padding: 1.5rem;
        border-radius: 8px;
        border: 2px solid;
      }

      .scenario-card.best-case {
        background: #f0fff4;
        border-color: #27ae60;
      }

      .scenario-card.worst-case {
        background: #fff5f5;
        border-color: #e74c3c;
      }

      .scenario-card h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.3rem;
      }

      .scenario-description {
        color: #666;
        margin-bottom: 1rem;
        font-style: italic;
      }

      .scenario-stats, .comparison-stats {
        display: grid;
        gap: 0.75rem;
      }

      .stat, .comparison-stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: rgba(255,255,255,0.7);
        border-radius: 4px;
      }

      .stat-label {
        font-weight: 600;
        color: #333;
      }

      .stat-value {
        font-weight: 700;
        color: #2c3e50;
      }

      .stat-value.positive {
        color: #27ae60;
      }

      .stat-value.negative {
        color: #e74c3c;
      }

      .comparison-summary {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .comparison-summary h4 {
        margin: 0 0 1rem 0;
        color: #2c3e50;
      }

      .detailed-logs {
        border-top: 2px solid #eee;
        padding-top: 2rem;
      }

      .log-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .log-tab {
        padding: 0.75rem 1.5rem;
        border: 2px solid #ddd;
        background: #f8f9fa;
        border-radius: 6px 6px 0 0;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }

      .log-tab.active {
        background: white;
        border-bottom-color: white;
        color: #2c3e50;
      }

      .log-content {
        background: white;
        border: 2px solid #ddd;
        border-radius: 0 6px 6px 6px;
        padding: 1.5rem;
        min-height: 300px;
        max-height: 500px;
        overflow-y: auto;
      }

      .hidden {
        display: none !important;
      }

      .combat-log.hidden {
        display: none;
      }

      .log-entries {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.6;
      }

      .log-entry {
        padding: 0.5rem;
        border-bottom: 1px solid #f0f0f0;
        border-radius: 4px;
        margin-bottom: 2px;
      }

      .log-entry.player-turn {
        background-color: #e3f2fd;
        border-left: 3px solid #2196f3;
      }

      .log-entry.enemy-turn {
        background-color: #ffebee;
        border-left: 3px solid #f44336;
      }

      .turn-number {
        color: #666;
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .action-text {
        color: #333;
      }

      .no-log {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 2rem;
      }

      .input.error {
        border-color: #e74c3c;
        background-color: #fff5f5;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
      }

      .input-error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.25rem;
        display: block;
        font-weight: 500;
      }

      .simulation-error {
        background: #f8d7da;
        border: 2px solid #e74c3c;
        border-radius: 8px;
        margin-bottom: 1rem;
        animation: slideIn 0.3s ease-out;
      }

      .error-content {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .error-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .error-message {
        flex: 1;
        color: #721c24;
        font-weight: 500;
        line-height: 1.4;
      }

      .error-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #721c24;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }

      .error-close:hover {
        background-color: rgba(114, 28, 36, 0.1);
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @media (max-width: 768px) {
        .scenario-comparison {
          grid-template-columns: 1fr;
        }
        
        .simulation-controls {
          flex-direction: column;
          align-items: stretch;
        }
        
        .log-tabs {
          flex-direction: column;
        }
        
        .log-tab {
          border-radius: 6px;
        }
        
        .log-content {
          border-radius: 6px;
        }
      }

      /* Help Section Styles */
      .help-section {
        background: #e8f5e8;
        padding: 1.5rem;
        border-radius: 8px;
        margin-top: 2rem;
        border: 2px solid #27ae60;
      }

      .help-section h4 {
        margin: 0 0 1rem 0;
        color: #1e7e34;
        font-size: 1.1rem;
      }

      .help-content {
        display: grid;
        gap: 0.75rem;
      }

      .help-item {
        background: white;
        padding: 0.75rem;
        border-radius: 6px;
        border-left: 4px solid #27ae60;
        font-size: 0.9rem;
        line-height: 1.4;
        color: #333333;
      }

      .help-icon {
        display: inline-block;
        margin-left: 0.5rem;
        cursor: help;
        color: #007bff;
        font-size: 0.9rem;
        transition: all 0.2s;
        user-select: none;
      }

      .help-icon:hover {
        color: #0056b3;
        transform: scale(1.1);
      }

      /* Tooltip Styles */
      .tooltip {
        position: fixed;
        background: #2c3e50;
        color: white;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .tooltip-content {
        padding: 1rem;
      }

      .tooltip-arrow {
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #2c3e50;
      }

      .tooltip.hidden {
        display: none;
      }

      /* Simulation Note Styles */
      .simulation-note {
        margin-bottom: 1.5rem;
      }

      .info-note {
        background: #e3f2fd;
        border: 1px solid #2196f3;
        border-radius: 6px;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .note-icon {
        font-size: 1.2rem;
        color: #1976d2;
      }

      .note-text {
        color: #1565c0;
        font-weight: 500;
        font-size: 0.95rem;
      }

      /* Enemy Type Selection Styles */
      .enemy-type-selection {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .enemy-type-selection h4 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #495057;
        font-size: 18px;
      }

      .enemy-type-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .radio-option {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 15px;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        background-color: white;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .radio-option:hover {
        border-color: #007bff;
        background-color: #f8f9fa;
      }

      .radio-option:has(input:checked) {
        border-color: #007bff;
        background-color: #e7f3ff;
      }

      .radio-option input[type="radio"] {
        margin: 0;
        margin-top: 2px;
      }

      .radio-label {
        font-weight: 600;
        color: #495057;
        display: block;
        margin-bottom: 5px;
      }

      .radio-help {
        color: #6c757d;
        font-size: 14px;
        line-height: 1.4;
        display: block;
      }

      .enemy-config-section {
        margin-top: 15px;
        padding: 15px;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 6px;
      }

      .enemy-unit-selection {
        margin-top: 15px;
      }

      .selected-enemy-display {
        margin-bottom: 15px;
      }

      .no-selection-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        background-color: #f8f9fa;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        text-align: center;
      }

      .no-selection-message .icon {
        font-size: 24px;
        color: #6c757d;
      }

      .no-selection-message .message {
        font-weight: 600;
        color: #495057;
      }

      .no-selection-message .help {
        color: #6c757d;
        font-size: 14px;
      }

      .selected-enemy-card {
        padding: 15px;
        background-color: #e7f3ff;
        border: 1px solid #007bff;
        border-radius: 8px;
      }

      .enemy-unit-card {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .enemy-unit-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 15px;
      }

      .enemy-unit-name {
        font-weight: 600;
        color: #495057;
        margin: 0;
        font-size: 18px;
      }

      .enemy-unit-types {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .unit-type-tag {
        background-color: #007bff;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      }

      .enemy-unit-stats {
        display: grid;
        gap: 10px;
      }

      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 4px;
      }

      .stat-item .stat-label {
        font-weight: 500;
        color: #495057;
      }

      .stat-item .stat-value {
        font-weight: 600;
        color: #007bff;
      }

      .enemy-selection-controls {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .select-enemy-unit-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;
      }

      .select-enemy-unit-btn:hover {
        background-color: #0056b3;
      }

      .change-enemy-unit-btn {
        background-color: #6c757d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.2s ease;
      }

      .change-enemy-unit-btn:hover {
        background-color: #5a6268;
      }

      /* Mobile Responsiveness for Enemy Unit Features */
      @media (max-width: 768px) {
        .enemy-type-selection {
          padding: 15px;
        }

        .radio-option {
          padding: 12px;
        }

        .enemy-unit-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .enemy-selection-controls {
          flex-direction: column;
          align-items: stretch;
        }

        .select-enemy-unit-btn,
        .change-enemy-unit-btn {
          width: 100%;
        }

        .stat-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
      }
    `,document.head.appendChild(e)}displayPreCalculatedResults(e){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",e),console.log("BattleSimulationComponent: bestCase structure:",e.bestCase),console.log("BattleSimulationComponent: worstCase structure:",e.worstCase),!this.container){console.log("BattleSimulationComponent: no container");return}if(e.bestCase&&e.worstCase)this.currentBestCase=e.bestCase,this.currentWorstCase=e.worstCase,console.log("BattleSimulationComponent: currentBestCase totalDamageDealt:",this.currentBestCase.totalDamageDealt),console.log("BattleSimulationComponent: currentWorstCase totalDamageDealt:",this.currentWorstCase.totalDamageDealt);else{console.warn("BattleSimulationComponent: Invalid battle analysis format");return}const t=this.container.querySelector("#simulation-results");if(!t){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",t),t.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const n=this.container.querySelector(".simulation-controls"),i=this.container.querySelector(".enemy-input-container");n&&(n.style.display="none"),i&&(i.style.display="none");const a=this.container.querySelector("#simulation-note");a&&(a.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,a.classList.remove("hidden"))}showSimulationControls(){if(!this.container)return;const e=this.container.querySelector(".simulation-controls"),t=this.container.querySelector(".enemy-input-container");e&&(e.style.display="block"),t&&(t.style.display="block")}}class U{static convertToStackingGroups(e){return e.stackingOrder.filter(t=>t.count>0).sort((t,n)=>t.totalHealth-n.totalHealth)}static convertToBattleConfiguration(e){const t=this.convertToStackingGroups(e.playerArmy),n=e.enemyArmy.stackingOrder.filter(i=>i.count>0).reduce((i,a)=>i+Math.min(a.count,100),0);return{playerArmy:{units:{},stackingOrder:t,totalStrength:t.reduce((i,a)=>i+a.count*a.unit.strength,0),totalHealth:t.reduce((i,a)=>i+a.totalHealth,0),totalLeadershipCost:0,totalDominanceCost:0,totalMercenaryCount:0,isValidStacking:!0,efficiencyScore:0},enemyGroupCount:Math.min(n,100),playerGoesFirst:e.playerGoesFirst}}static validateArmyConfiguration(e){const t=[],n=[];let i=0,a=!1;e.stackingOrder.length===0&&t.push("Army must have at least one unit type");for(const o of e.stackingOrder){if(!o.unit){t.push("Invalid unit configuration");continue}o.count<=0?t.push(`Unit "${o.unit.name}" must have a positive quantity`):o.count>1e4&&n.push(`Unit "${o.unit.name}" has a very large quantity (${o.count})`),i+=o.count,o.count>1e5&&(a=!0)}!a&&i>5e4&&n.push(`Army size is very large (${i} total units). This may affect performance.`);const s=e.stackingOrder.map(o=>o.unit.name),r=s.filter((o,l)=>s.indexOf(o)!==l);return r.length>0&&t.push(`Duplicate units found: ${Array.from(new Set(r)).join(", ")}`),{isValid:t.length===0,errors:t,warnings:n,totalUnits:i,hasInfiniteUnits:a}}static createEmptyArmy(e,t){return{stackingOrder:[],totalStrength:0,totalHealth:0,name:t,side:e}}static addUnitToArmy(e,t,n,i=!1){const a=i?z.INFINITE_UNIT_VALUE:n,s=t.health*a,r=e.stackingOrder.findIndex(d=>d.unit.name===t.name),o=[...e.stackingOrder],l={count:a,totalHealth:s,unit:t};r>=0?o[r]=l:o.push(l);const c=o.reduce((d,u)=>d+u.count*u.unit.strength,0),m=o.reduce((d,u)=>d+u.totalHealth,0);return{...e,stackingOrder:o,totalStrength:c,totalHealth:m}}static removeUnitFromArmy(e,t){const n=e.stackingOrder.filter(s=>s.unit.name!==t),i=n.reduce((s,r)=>s+r.count*r.unit.strength,0),a=n.reduce((s,r)=>s+r.totalHealth,0);return{...e,stackingOrder:n,totalStrength:i,totalHealth:a}}static getArmySummary(e){if(e.stackingOrder.length===0)return"No units configured";const t=e.stackingOrder.length,n=e.stackingOrder.filter(a=>a.count>1e5).length,i=e.stackingOrder.filter(a=>a.count<=1e5).reduce((a,s)=>a+s.count,0);return n>0?`${t} unit types (${n} infinite, ${i} finite)`:`${t} unit types, ${i} total units`}}const z={MAX_FINITE_UNITS:1e4,MAX_ARMY_UNIT_TYPES:50,INFINITE_UNIT_VALUE:999999999,MAX_ENEMY_GROUPS:100};class ye{constructor(e){h(this,"container",null);h(this,"props");h(this,"playerUnitSelection",this.createEmptySelection());h(this,"enemyUnitSelection",this.createEmptySelection());this.props=e}mount(e){this.container=e,this.render(),this.attachEventListeners()}unmount(){this.container&&(this.container.innerHTML="",this.container=null)}updateProps(e){this.props={...this.props,...e},this.container&&((e.playerArmy||e.enemyArmy)&&this.updateArmyLists(),(e.availableUnits||e.availableEnemyUnits||e.disabled!==void 0)&&(this.render(),this.attachEventListeners()))}createEmptySelection(){return{selectedUnit:null,quantity:1,isInfinite:!1,isValid:!1}}render(){this.container&&(this.container.innerHTML=`
      <div class="dual-army-input">
        <h3 class="dual-army-title">⚔️ Configure Battle Armies</h3>
        <p class="dual-army-description">
          Set up both player and enemy armies by selecting units and quantities for each side.
        </p>

        <div class="army-panels">
          <!-- Player Army Panel -->
          <div class="army-panel player-army">
            <div class="army-panel-header">
              <h4 class="army-title">👤 Player Army</h4>
              <div class="army-summary">
                <span class="army-summary-text">${U.getArmySummary(this.props.playerArmy)}</span>
              </div>
            </div>

            <div class="army-configuration">
              <div class="unit-selection">
                <div class="input-group">
                  <label for="player-unit-select" class="input-label">Select Unit:</label>
                  <select id="player-unit-select" class="unit-select">
                    <option value="">Choose a unit...</option>
                    ${this.renderUnitOptions("player")}
                  </select>
                </div>

                <div class="input-group">
                  <label for="player-quantity" class="input-label">Quantity:</label>
                  <input
                    type="number"
                    id="player-quantity"
                    class="quantity-input"
                    min="1"
                    max="${z.MAX_FINITE_UNITS}"
                    value="${this.playerUnitSelection.quantity}"
                    placeholder="Enter quantity"
                  >
                </div>

                <div class="unit-actions">
                  <button id="add-player-unit" class="btn btn-primary" disabled>
                    ➕ Add to Army
                  </button>
                </div>
              </div>

              <div class="army-list">
                <h5>Current Army:</h5>
                <div id="player-army-list" class="unit-list">
                  ${this.renderArmyList(this.props.playerArmy,"player")}
                </div>
              </div>
            </div>
          </div>

          <!-- Enemy Army Panel -->
          <div class="army-panel enemy-army">
            <div class="army-panel-header">
              <h4 class="army-title">👹 Enemy Army</h4>
              <div class="army-summary">
                <span class="army-summary-text">${U.getArmySummary(this.props.enemyArmy)}</span>
              </div>
            </div>

            <div class="army-configuration">
              <div class="unit-selection">
                <div class="input-group">
                  <label for="enemy-unit-select" class="input-label">Select Unit:</label>
                  <select id="enemy-unit-select" class="unit-select">
                    <option value="">Choose a unit...</option>
                    ${this.renderUnitOptions("enemy")}
                  </select>
                </div>

                <div class="input-group">
                  <label for="enemy-quantity" class="input-label">Quantity:</label>
                  <div class="quantity-controls">
                    <input
                      type="number"
                      id="enemy-quantity"
                      class="quantity-input"
                      min="1"
                      max="${z.MAX_FINITE_UNITS}"
                      value="${this.enemyUnitSelection.quantity}"
                      placeholder="Enter quantity"
                      ${this.enemyUnitSelection.isInfinite?"disabled":""}
                    >
                    <label class="infinite-toggle">
                      <input
                        type="checkbox"
                        id="enemy-infinite"
                        ${this.enemyUnitSelection.isInfinite?"checked":""}
                      >
                      <span class="infinite-label">Infinite</span>
                    </label>
                  </div>
                </div>

                <div class="unit-actions">
                  <button id="add-enemy-unit" class="btn btn-primary" disabled>
                    ➕ Add to Army
                  </button>
                </div>
              </div>

              <div class="army-list">
                <h5>Current Army:</h5>
                <div id="enemy-army-list" class="unit-list">
                  ${this.renderArmyList(this.props.enemyArmy,"enemy")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="army-actions">
          <button id="clear-all-armies" class="btn btn-secondary">
            🗑️ Clear Both Armies
          </button>
          <button id="validate-armies" class="btn btn-outline">
            ✅ Validate Armies
          </button>
        </div>

        <div id="validation-results" class="validation-results hidden">
          <!-- Validation results will be displayed here -->
        </div>
      </div>
    `,this.addStyles())}renderUnitOptions(e="player"){return(e==="player"?this.props.availableUnits:this.props.availableEnemyUnits||this.props.availableUnits).sort((n,i)=>n.name.localeCompare(i.name)).map(n=>`
        <option value="${n.name}" title="${this.getUnitTooltip(n)}">
          ${n.name} (${n.strength} STR, ${n.health} HP)
        </option>
      `).join("")}getUnitTooltip(e){return`Health: ${e.health}, Strength: ${e.strength}, Types: ${e.unit_types.join(", ")}`}renderArmyList(e,t){return e.stackingOrder.length===0?'<p class="empty-army">No units added</p>':e.stackingOrder.map(n=>{const i=n.count>=z.INFINITE_UNIT_VALUE;return`
        <div class="army-unit-item" data-unit-name="${n.unit.name}">
          <div class="unit-info">
            <span class="unit-name">${n.unit.name}</span>
            <span class="unit-stats">${n.unit.strength} STR • ${n.unit.health} HP</span>
          </div>
          <div class="unit-quantity">
            ${i?'<span class="infinite-badge">∞ Infinite</span>':`<span class="quantity-badge">${n.count.toLocaleString()}</span>`}
          </div>
          <div class="unit-actions">
            <button class="btn-remove" data-side="${t}" data-unit="${n.unit.name}">
              🗑️
            </button>
          </div>
        </div>
      `}).join("")}attachEventListeners(){if(!this.container)return;const e=this.container.querySelector("#player-unit-select"),t=this.container.querySelector("#player-quantity"),n=this.container.querySelector("#add-player-unit"),i=this.container.querySelector("#enemy-unit-select"),a=this.container.querySelector("#enemy-quantity"),s=this.container.querySelector("#enemy-infinite"),r=this.container.querySelector("#add-enemy-unit"),o=this.container.querySelector("#clear-all-armies"),l=this.container.querySelector("#validate-armies");e&&e.addEventListener("change",()=>this.handlePlayerUnitSelection()),t&&t.addEventListener("input",()=>this.handlePlayerQuantityChange()),n&&n.addEventListener("click",()=>this.handleAddPlayerUnit()),i&&i.addEventListener("change",()=>this.handleEnemyUnitSelection()),a&&a.addEventListener("input",()=>this.handleEnemyQuantityChange()),s&&s.addEventListener("change",()=>this.handleEnemyInfiniteToggle()),r&&r.addEventListener("click",()=>this.handleAddEnemyUnit()),o&&o.addEventListener("click",()=>this.handleClearAllArmies()),l&&l.addEventListener("click",()=>this.handleValidateArmies()),this.container.addEventListener("click",c=>{const m=c.target;if(m.classList.contains("btn-remove")){const d=m.dataset.side,u=m.dataset.unit;d&&u&&this.handleRemoveUnit(d,u)}})}handlePlayerUnitSelection(){var i;const e=(i=this.container)==null?void 0:i.querySelector("#player-unit-select");if(!e)return;const t=e.value,n=this.props.availableUnits.find(a=>a.name===t)||null;this.playerUnitSelection={...this.playerUnitSelection,selectedUnit:n,isValid:n!==null&&this.playerUnitSelection.quantity>0},this.updateAddButton("player")}handlePlayerQuantityChange(){var n;const e=(n=this.container)==null?void 0:n.querySelector("#player-quantity");if(!e)return;const t=parseInt(e.value)||0;this.playerUnitSelection={...this.playerUnitSelection,quantity:t,isValid:this.playerUnitSelection.selectedUnit!==null&&t>0},this.updateAddButton("player")}handleEnemyUnitSelection(){var a;const e=(a=this.container)==null?void 0:a.querySelector("#enemy-unit-select");if(!e)return;const t=e.value,i=(this.props.availableEnemyUnits||this.props.availableUnits).find(s=>s.name===t)||null;this.enemyUnitSelection={...this.enemyUnitSelection,selectedUnit:i,isValid:i!==null&&(this.enemyUnitSelection.isInfinite||this.enemyUnitSelection.quantity>0)},this.updateAddButton("enemy")}handleEnemyQuantityChange(){var n;const e=(n=this.container)==null?void 0:n.querySelector("#enemy-quantity");if(!e)return;const t=parseInt(e.value)||0;this.enemyUnitSelection={...this.enemyUnitSelection,quantity:t,isValid:this.enemyUnitSelection.selectedUnit!==null&&(this.enemyUnitSelection.isInfinite||t>0)},this.updateAddButton("enemy")}handleEnemyInfiniteToggle(){var i,a;const e=(i=this.container)==null?void 0:i.querySelector("#enemy-infinite"),t=(a=this.container)==null?void 0:a.querySelector("#enemy-quantity");if(!e||!t)return;const n=e.checked;this.enemyUnitSelection={...this.enemyUnitSelection,isInfinite:n,isValid:this.enemyUnitSelection.selectedUnit!==null&&(n||this.enemyUnitSelection.quantity>0)},t.disabled=n,n&&(t.value="0"),this.updateAddButton("enemy")}updateAddButton(e){var i;const t=(i=this.container)==null?void 0:i.querySelector(`#add-${e}-unit`);if(!t)return;const n=e==="player"?this.playerUnitSelection:this.enemyUnitSelection;t.disabled=!n.isValid||this.props.disabled||!1}handleAddPlayerUnit(){if(!this.playerUnitSelection.selectedUnit||!this.playerUnitSelection.isValid)return;const e=U.addUnitToArmy(this.props.playerArmy,this.playerUnitSelection.selectedUnit,this.playerUnitSelection.quantity,!1);this.props.onPlayerArmyChange(e),this.props={...this.props,playerArmy:e},this.resetPlayerSelection(),this.updateArmyLists()}handleAddEnemyUnit(){if(!this.enemyUnitSelection.selectedUnit||!this.enemyUnitSelection.isValid)return;const e=U.addUnitToArmy(this.props.enemyArmy,this.enemyUnitSelection.selectedUnit,this.enemyUnitSelection.quantity,this.enemyUnitSelection.isInfinite);this.props.onEnemyArmyChange(e),this.props={...this.props,enemyArmy:e},this.resetEnemySelection(),this.updateArmyLists()}handleRemoveUnit(e,t){if(e==="player"){const n=U.removeUnitFromArmy(this.props.playerArmy,t);this.props.onPlayerArmyChange(n),this.props={...this.props,playerArmy:n}}else{const n=U.removeUnitFromArmy(this.props.enemyArmy,t);this.props.onEnemyArmyChange(n),this.props={...this.props,enemyArmy:n}}this.updateArmyLists()}handleClearAllArmies(){const e=U.createEmptyArmy("player","Player Army"),t=U.createEmptyArmy("enemy","Enemy Army");this.props.onPlayerArmyChange(e),this.props.onEnemyArmyChange(t),this.props={...this.props,playerArmy:e,enemyArmy:t},this.updateArmyLists()}handleValidateArmies(){const e=U.validateArmyConfiguration(this.props.playerArmy),t=U.validateArmyConfiguration(this.props.enemyArmy);this.displayValidationResults(e,t)}updateArmyLists(){if(!this.container)return;const e=this.container.querySelector("#player-army-list");e&&(e.innerHTML=this.renderArmyList(this.props.playerArmy,"player"));const t=this.container.querySelector("#enemy-army-list");t&&(t.innerHTML=this.renderArmyList(this.props.enemyArmy,"enemy"));const n=this.container.querySelector(".player-army .army-summary-text");n&&(n.textContent=U.getArmySummary(this.props.playerArmy));const i=this.container.querySelector(".enemy-army .army-summary-text");i&&(i.textContent=U.getArmySummary(this.props.enemyArmy)),this.attachRemoveEventListeners()}attachRemoveEventListeners(){if(!this.container)return;this.container.querySelectorAll(".btn-remove").forEach(t=>{var i;const n=t.cloneNode(!0);(i=t.parentNode)==null||i.replaceChild(n,t),n.addEventListener("click",a=>{const s=a.target,r=s.dataset.side||n.dataset.side,o=s.dataset.unit||n.dataset.unit;r&&o&&this.handleRemoveUnit(r,o)})})}displayValidationResults(e,t){var r;const n=(r=this.container)==null?void 0:r.querySelector("#validation-results");if(!n)return;const i=[...e.errors,...t.errors],a=[...e.warnings,...t.warnings],s=i.length===0;n.innerHTML=`
      <div class="validation-summary ${s?"valid":"invalid"}">
        <h4>${s?"✅ Armies Valid":"❌ Validation Errors"}</h4>
        
        ${i.length>0?`
          <div class="errors">
            <h5>Errors:</h5>
            <ul>
              ${i.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </div>
        `:""}
        
        ${a.length>0?`
          <div class="warnings">
            <h5>Warnings:</h5>
            <ul>
              ${a.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </div>
        `:""}
        
        <div class="summary-stats">
          <p><strong>Player Army:</strong> ${U.getArmySummary(this.props.playerArmy)}</p>
          <p><strong>Enemy Army:</strong> ${U.getArmySummary(this.props.enemyArmy)}</p>
        </div>
      </div>
    `,n.classList.remove("hidden")}resetPlayerSelection(){var n,i;this.playerUnitSelection=this.createEmptySelection();const e=(n=this.container)==null?void 0:n.querySelector("#player-unit-select"),t=(i=this.container)==null?void 0:i.querySelector("#player-quantity");e&&(e.value=""),t&&(t.value="1")}resetEnemySelection(){var i,a,s;this.enemyUnitSelection=this.createEmptySelection();const e=(i=this.container)==null?void 0:i.querySelector("#enemy-unit-select"),t=(a=this.container)==null?void 0:a.querySelector("#enemy-quantity"),n=(s=this.container)==null?void 0:s.querySelector("#enemy-infinite");e&&(e.value=""),t&&(t.value="1",t.disabled=!1),n&&(n.checked=!1)}addStyles(){const e="dual-army-input-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
      .dual-army-input {
        max-width: 1200px;
        margin: 0 auto;
      }

      .dual-army-title {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 1rem;
      }

      .dual-army-description {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
      }

      .army-panels {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .army-panel {
        border: 2px solid;
        border-radius: 12px;
        padding: 1.5rem;
        background: white;
      }

      .army-panel.player-army {
        border-color: #3498db;
        background: linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%);
      }

      .army-panel.enemy-army {
        border-color: #e74c3c;
        background: linear-gradient(135deg, #fff0f0 0%, #ffffff 100%);
      }

      .army-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .army-title {
        margin: 0;
        font-size: 1.3rem;
        color: #2c3e50;
      }

      .army-summary {
        font-size: 0.9rem;
        color: #666;
      }

      .unit-selection {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: rgba(255,255,255,0.7);
        border-radius: 8px;
        border: 1px solid #eee;
      }

      .input-group {
        margin-bottom: 1rem;
      }

      .input-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #333;
      }

      .unit-select, .quantity-input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.2s;
      }

      .unit-select:focus, .quantity-input:focus {
        outline: none;
        border-color: #3498db;
      }

      .quantity-controls {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .quantity-input {
        flex: 1;
      }

      .infinite-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #e74c3c;
        cursor: pointer;
        user-select: none;
      }

      .infinite-label {
        white-space: nowrap;
      }

      .unit-actions {
        text-align: center;
        margin-top: 1rem;
      }

      .army-list {
        background: rgba(0,0,0,0.05);
        border-radius: 8px;
        padding: 1rem;
      }

      .army-list h5 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 1rem;
      }

      .unit-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .empty-army {
        text-align: center;
        color: #999;
        font-style: italic;
        margin: 1rem 0;
      }

      .army-unit-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 6px;
        border: 1px solid #ddd;
      }

      .unit-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .unit-name {
        font-weight: 600;
        color: #333;
      }

      .unit-stats {
        font-size: 0.85rem;
        color: #666;
      }

      .unit-quantity {
        display: flex;
        align-items: center;
      }

      .quantity-badge {
        background: #3498db;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.85rem;
      }

      .infinite-badge {
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.85rem;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .unit-actions {
        display: flex;
        gap: 0.5rem;
      }

      .btn-remove {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: background-color 0.2s;
      }

      .btn-remove:hover {
        background: #c0392b;
      }

      .army-actions {
        text-align: center;
        margin: 2rem 0;
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .validation-results {
        margin-top: 2rem;
        padding: 1.5rem;
        border-radius: 8px;
        border: 2px solid;
      }

      .validation-summary.valid {
        background: #d4edda;
        border-color: #27ae60;
        color: #155724;
      }

      .validation-summary.invalid {
        background: #f8d7da;
        border-color: #e74c3c;
        color: #721c24;
      }

      .validation-summary h4 {
        margin: 0 0 1rem 0;
      }

      .errors ul, .warnings ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
      }

      .errors {
        color: #e74c3c;
      }

      .warnings {
        color: #f39c12;
      }

      .summary-stats {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(0,0,0,0.1);
      }

      .summary-stats p {
        margin: 0.5rem 0;
      }

      .hidden {
        display: none !important;
      }

      /* Mobile Responsiveness */
      @media (max-width: 768px) {
        .army-panels {
          grid-template-columns: 1fr;
        }

        .army-panel-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .quantity-controls {
          flex-direction: column;
          align-items: stretch;
        }

        .army-actions {
          flex-direction: column;
        }

        .army-unit-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }
      }
    `,document.head.appendChild(t)}}class be{constructor(e){h(this,"container",null);h(this,"props");h(this,"dualArmyForm",null);h(this,"availableUnits",[]);h(this,"enemyUnits",[]);h(this,"enemyUnitLoader");h(this,"enemyUnitStorage");h(this,"currentBattleConfig",null);h(this,"currentAnalysis",null);h(this,"isLoading",!1);this.props=e,this.enemyUnitLoader=new K,this.enemyUnitStorage=new N,this.initializeDefaultBattleConfig()}async mount(e){this.container=e,await this.loadUnits(),this.render(),this.attachEventListeners()}unmount(){this.dualArmyForm&&(this.dualArmyForm.unmount(),this.dualArmyForm=null),this.container&&(this.container.innerHTML="",this.container=null)}updateProps(e){this.props={...this.props,...e}}initializeDefaultBattleConfig(){this.currentBattleConfig={playerArmy:U.createEmptyArmy("player","Player Army"),enemyArmy:U.createEmptyArmy("enemy","Enemy Army"),playerGoesFirst:!0,battleName:"Custom Battle"}}async loadUnits(){try{this.availableUnits=this.props.unitLoader.getAllUnits(),this.availableUnits.length===0&&(this.availableUnits=await this.props.unitLoader.loadPresetUnits());try{this.enemyUnits=await this.enemyUnitLoader.loadPresetEnemyUnits()}catch(e){console.warn("Could not load enemy_units.json, continuing with regular units only:",e),this.enemyUnits=[]}try{const t=this.enemyUnitStorage.getAllUserEnemyUnits().map(n=>({name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers}));this.enemyUnits.push(...t)}catch(e){console.warn("Could not load user enemy units:",e)}console.log(`Loaded ${this.availableUnits.length} regular units and ${this.enemyUnits.length} enemy units`)}catch(e){console.error("Failed to load units:",e),this.showError("Failed to load unit data. Please refresh the page.")}}convertEnemyUnitToUnit(e){var t;return{name:`${e.name} [Enemy]`,unit_types:e.unit_types,cost_type:"Leadership",health:e.health,strength:e.strength,leadership_cost:0,dominance_cost:0,authority_cost:0,food_consumption:0,carrying_capacity:0,revival_cost_gold:0,revival_cost_silver:0,source_file:"enemy_units",attack_modifiers:((t=e.attack_modifiers)==null?void 0:t.map(n=>({target_type:n.target_type,modifier_type:n.modifier_type,value:n.value})))||void 0}}getEnemyArmyUnits(){const e=this.availableUnits,t=this.enemyUnits.map(n=>this.convertEnemyUnitToUnit(n));return[...e,...t]}render(){!this.container||!this.currentBattleConfig||(this.container.innerHTML=`
      <div class="manual-battle-simulation">
        <header class="manual-battle-header">
          <h2 class="manual-battle-title">⚔️ Manual Battle Simulation</h2>
          <p class="manual-battle-description">
            Configure custom armies for both player and enemy sides, then simulate the battle 
            to see detailed combat results and analysis.
          </p>
        </header>

        <!-- Army Configuration Section -->
        <section class="army-config-section">
          <div id="dual-army-form-container"></div>
        </section>

        <!-- Battle Configuration Section -->
        <section class="battle-config-section">
          <h3>⚙️ Battle Settings</h3>
          <div class="battle-settings">
            <div class="setting-group">
              <label for="battle-name" class="setting-label">Battle Name:</label>
              <input
                type="text"
                id="battle-name"
                class="setting-input"
                value="${this.currentBattleConfig.battleName||"Custom Battle"}"
                placeholder="Enter battle name"
                maxlength="50"
              >
            </div>

            <div class="setting-group">
              <label class="setting-label">Initiative:</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input
                    type="radio"
                    name="initiative"
                    value="player"
                    ${this.currentBattleConfig.playerGoesFirst?"checked":""}
                  >
                  <span>Player goes first (Best Case)</span>
                </label>
                <label class="radio-option">
                  <input
                    type="radio"
                    name="initiative"
                    value="enemy"
                    ${this.currentBattleConfig.playerGoesFirst?"":"checked"}
                  >
                  <span>Enemy goes first (Worst Case)</span>
                </label>
                <label class="radio-option">
                  <input
                    type="radio"
                    name="initiative"
                    value="both"
                    checked
                  >
                  <span>Simulate both scenarios</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <!-- Battle Actions -->
        <section class="battle-actions">
          <div class="action-buttons">
            <button id="simulate-battle" class="btn btn-primary large-btn" disabled>
              🎯 Simulate Battle
            </button>
            <button id="clear-all" class="btn btn-secondary">
              🗑️ Clear All
            </button>
            <button id="save-config" class="btn btn-outline" style="display: none;">
              💾 Save Configuration
            </button>
          </div>
          
          <div id="battle-status" class="battle-status hidden">
            <!-- Status messages will appear here -->
          </div>
        </section>

        <!-- Loading State -->
        <div id="loading-state" class="loading-state hidden">
          <div class="loading-spinner"></div>
          <p class="loading-message">Running battle simulation...</p>
          <div class="loading-details">
            <small>This may take a moment for large armies</small>
          </div>
        </div>

        <!-- Battle Results -->
        <section id="battle-results" class="battle-results hidden">
          <!-- Results will be populated here -->
        </section>

        <!-- Error Display -->
        <div id="error-display" class="error-display hidden">
          <!-- Error messages will appear here -->
        </div>
      </div>
    `,this.addStyles(),this.mountDualArmyForm(),this.updateSimulateButton())}mountDualArmyForm(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#dual-army-form-container");!e||!this.currentBattleConfig||(this.dualArmyForm&&this.dualArmyForm.unmount(),this.dualArmyForm=new ye({availableUnits:this.availableUnits,availableEnemyUnits:this.getEnemyArmyUnits(),playerArmy:this.currentBattleConfig.playerArmy,enemyArmy:this.currentBattleConfig.enemyArmy,onPlayerArmyChange:n=>this.handlePlayerArmyChange(n),onEnemyArmyChange:n=>this.handleEnemyArmyChange(n),disabled:this.isLoading||this.props.disabled}),this.dualArmyForm.mount(e))}attachEventListeners(){if(!this.container)return;const e=this.container.querySelector("#battle-name");e&&e.addEventListener("input",()=>this.handleBattleNameChange()),this.container.querySelectorAll('input[name="initiative"]').forEach(s=>{s.addEventListener("change",()=>this.handleInitiativeChange())});const n=this.container.querySelector("#simulate-battle"),i=this.container.querySelector("#clear-all"),a=this.container.querySelector("#save-config");n&&n.addEventListener("click",()=>this.handleSimulateBattle()),i&&i.addEventListener("click",()=>this.handleClearAll()),a&&a.addEventListener("click",()=>this.handleSaveConfig())}handlePlayerArmyChange(e){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,playerArmy:e},this.updateSimulateButton(),this.clearResults())}handleEnemyArmyChange(e){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,enemyArmy:e},this.updateSimulateButton(),this.clearResults())}handleBattleNameChange(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#battle-name");!e||!this.currentBattleConfig||(this.currentBattleConfig={...this.currentBattleConfig,battleName:e.value.trim()||"Custom Battle"})}handleInitiativeChange(){var n;const e=(n=this.container)==null?void 0:n.querySelector('input[name="initiative"]:checked');if(!e||!this.currentBattleConfig)return;const t=e.value;(t==="player"||t==="enemy")&&(this.currentBattleConfig={...this.currentBattleConfig,playerGoesFirst:t==="player"})}updateSimulateButton(){var a;const e=(a=this.container)==null?void 0:a.querySelector("#simulate-battle");if(!e||!this.currentBattleConfig)return;const t=this.currentBattleConfig.playerArmy.stackingOrder.length>0,n=this.currentBattleConfig.enemyArmy.stackingOrder.length>0,i=t&&n&&!this.isLoading&&!this.props.disabled;e.disabled=!i,!t&&!n?e.textContent="🎯 Configure armies to simulate":t?n?this.isLoading?e.textContent="⏳ Simulating...":e.textContent="🎯 Simulate Battle":e.textContent="🎯 Add enemy units to simulate":e.textContent="🎯 Add player units to simulate"}async handleSimulateBattle(){var n;if(!this.currentBattleConfig||this.isLoading)return;const e=U.validateArmyConfiguration(this.currentBattleConfig.playerArmy),t=U.validateArmyConfiguration(this.currentBattleConfig.enemyArmy);if(!e.isValid||!t.isValid){const i=[...e.errors,...t.errors];this.showError(`Cannot simulate battle: ${i.join(", ")}`);return}this.setLoading(!0),this.hideError(),this.clearResults();try{const i=(n=this.container)==null?void 0:n.querySelector('input[name="initiative"]:checked'),a=(i==null?void 0:i.value)||"both",{UnifiedBattleSimulation:s}=await V(async()=>{const{UnifiedBattleSimulation:l}=await Promise.resolve().then(()=>he);return{UnifiedBattleSimulation:l}},void 0),r=new s;let o;if(a==="both"){const l={playerArmy:{stackingOrder:this.currentBattleConfig.playerArmy.stackingOrder,totalStrength:this.currentBattleConfig.playerArmy.totalStrength,totalHealth:this.currentBattleConfig.playerArmy.totalHealth},enemies:this.currentBattleConfig.enemyArmy.stackingOrder.map((u,p)=>({type:u.count>=z.INFINITE_UNIT_VALUE?"infinite":"mortal",unit:u.unit,groupIndex:p,count:u.count,currentCount:u.count})),playerGoesFirst:!0},c={...l,playerGoesFirst:!1},m=r.simulateBattle(l),d=r.simulateBattle(c);o={bestCase:m,worstCase:d,comparison:{damageDifference:m.totalDamageDealt-d.totalDamageDealt,survivalDifference:m.battleDuration-d.battleDuration,averageDamage:(m.totalDamageDealt+d.totalDamageDealt)/2,averageSurvival:(m.battleDuration+d.battleDuration)/2},manualConfiguration:this.currentBattleConfig}}else{const l={playerArmy:{stackingOrder:this.currentBattleConfig.playerArmy.stackingOrder,totalStrength:this.currentBattleConfig.playerArmy.totalStrength,totalHealth:this.currentBattleConfig.playerArmy.totalHealth},enemies:this.currentBattleConfig.enemyArmy.stackingOrder.map((m,d)=>({type:m.count>=z.INFINITE_UNIT_VALUE?"infinite":"mortal",unit:m.unit,groupIndex:d,count:m.count,currentCount:m.count})),playerGoesFirst:a==="player"},c=r.simulateBattle(l);o={bestCase:c,worstCase:c,comparison:{damageDifference:0,survivalDifference:0,averageDamage:c.totalDamageDealt,averageSurvival:c.battleDuration},manualConfiguration:this.currentBattleConfig}}this.currentAnalysis=o,this.displayResults(),this.props.onBattleComplete&&this.props.onBattleComplete(o)}catch(i){console.error("Battle simulation failed:",i),this.showError(i instanceof Error?`Battle simulation failed: ${i.message}`:"Battle simulation failed with an unknown error")}finally{this.setLoading(!1)}}handleClearAll(){this.initializeDefaultBattleConfig(),this.clearResults(),this.hideError(),this.render(),this.attachEventListeners()}handleSaveConfig(){if(!this.currentBattleConfig)return;const e=JSON.stringify(this.currentBattleConfig,null,2);console.log("Battle Configuration:",e),this.showStatus("Configuration saved to console (feature in development)","info")}displayResults(){if(!this.currentAnalysis||!this.container)return;const e=this.container.querySelector("#battle-results");if(!e)return;const{bestCase:t,worstCase:n,manualConfiguration:i}=this.currentAnalysis,a=`
      <div class="manual-battle-header">
        <h3>📊 Battle Results: ${i.battleName}</h3>
        <p class="battle-summary">
          ${i.playerArmy.name} vs ${i.enemyArmy.name}
        </p>
        <div class="army-summaries">
          <div class="army-summary player-summary">
            <h4>👤 ${i.playerArmy.name}</h4>
            <p>${U.getArmySummary(i.playerArmy)}</p>
          </div>
          <div class="army-summary enemy-summary">
            <h4>👹 ${i.enemyArmy.name}</h4>
            <p>${U.getArmySummary(i.enemyArmy)}</p>
          </div>
        </div>
      </div>
    `,s=`
      <div class="results-actions">
        <button id="export-results" class="btn btn-outline">
          📄 Export Results
        </button>
        <button id="simulate-again" class="btn btn-secondary">
          🔄 Simulate Again
        </button>
        <button id="clear-results" class="btn btn-outline">
          🗑️ Clear Results
        </button>
      </div>
    `;e.innerHTML=a;const r=document.createElement("div");r.className="shared-battle-results",e.appendChild(r),Q.displayResults(r,t,n,{title:"Scenario Analysis",subtitle:"Detailed comparison of best and worst case battle outcomes"});const o=document.createElement("div");o.innerHTML=s,e.appendChild(o),e.classList.remove("hidden"),this.attachResultsEventListeners()}attachResultsEventListeners(){if(!this.container)return;const e=this.container.querySelectorAll(".log-tab");e.forEach(i=>{i.addEventListener("click",a=>{const s=a.target,r=s.dataset.scenario;e.forEach(c=>c.classList.remove("active")),s.classList.add("active"),this.container.querySelectorAll(".combat-log").forEach(c=>{c.classList.remove("active"),c.classList.add("hidden")});const l=this.container.querySelector(`#${r}-case-log`);l&&(l.classList.add("active"),l.classList.remove("hidden"))})});const t=this.container.querySelector("#export-results"),n=this.container.querySelector("#simulate-again");t&&t.addEventListener("click",()=>this.handleExportResults()),n&&n.addEventListener("click",()=>this.handleSimulateAgain())}handleExportResults(){if(!this.currentAnalysis)return;const e=JSON.stringify(this.currentAnalysis,null,2);console.log("Battle Results:",e),this.showStatus("Results exported to console (feature in development)","info")}handleSimulateAgain(){this.clearResults(),this.handleSimulateBattle()}setLoading(e){var i,a;this.isLoading=e;const t=(i=this.container)==null?void 0:i.querySelector("#loading-state"),n=(a=this.container)==null?void 0:a.querySelector("#battle-results");t&&t.classList.toggle("hidden",!e),e&&n&&n.classList.add("hidden"),this.updateSimulateButton(),this.dualArmyForm&&this.dualArmyForm.updateProps({disabled:e||this.props.disabled})}clearResults(){var t;this.currentAnalysis=null;const e=(t=this.container)==null?void 0:t.querySelector("#battle-results");e&&e.classList.add("hidden")}showError(e){var n;const t=(n=this.container)==null?void 0:n.querySelector("#error-display");t&&(t.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${e}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.classList.add('hidden')">×</button>
      </div>
    `,t.classList.remove("hidden"),setTimeout(()=>this.hideError(),1e4))}hideError(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#error-display");e&&e.classList.add("hidden")}showStatus(e,t="info"){var i;const n=(i=this.container)==null?void 0:i.querySelector("#battle-status");n&&(n.innerHTML=`
      <div class="status-message ${t}">
        ${e}
      </div>
    `,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}addStyles(){const e="manual-battle-simulation-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
      .manual-battle-simulation {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .manual-battle-header {
        text-align: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 3px solid #eee;
      }

      .manual-battle-title {
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 1rem;
      }

      .manual-battle-description {
        font-size: 1.1rem;
        color: #666;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
      }

      .army-config-section {
        margin-bottom: 3rem;
      }

      .battle-config-section {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 2px solid #dee2e6;
      }

      .battle-config-section h3 {
        margin: 0 0 1.5rem 0;
        color: #2c3e50;
      }

      .battle-settings {
        display: grid;
        gap: 2rem;
      }

      .setting-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .setting-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .setting-input {
        padding: 0.75rem;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        max-width: 300px;
      }

      .setting-input:focus {
        outline: none;
        border-color: #3498db;
      }

      .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .radio-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: white;
        border: 2px solid #ddd;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        color: #2c3e50;
        font-weight: 500;
      }

      .radio-option:hover {
        border-color: #3498db;
        background: #f0f8ff;
        color: #1e3a8a;
      }

      .radio-option:has(input:checked) {
        border-color: #3498db;
        background: #e7f3ff;
        color: #1e3a8a;
        font-weight: 600;
      }

      .radio-option span {
        color: inherit;
        font-weight: inherit;
      }

      .battle-actions {
        text-align: center;
        margin-bottom: 2rem;
      }

      .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .battle-status {
        margin-top: 1rem;
      }

      .status-message {
        padding: 1rem;
        border-radius: 6px;
        border: 1px solid;
      }

      .status-message.info {
        background: #e3f2fd;
        border-color: #2196f3;
        color: #1565c0;
      }

      .status-message.success {
        background: #e8f5e9;
        border-color: #4caf50;
        color: #2e7d32;
      }

      .status-message.warning {
        background: #fff3e0;
        border-color: #ff9800;
        color: #f57c00;
      }

      .loading-state {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 12px;
        border: 2px solid #3498db;
      }

      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .loading-message {
        font-size: 1.2rem;
        color: #2c3e50;
        margin-bottom: 0.5rem;
      }

      .loading-details {
        color: #666;
      }

      .battle-results {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        border: 2px solid #27ae60;
      }

      .results-header {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eee;
      }

      .results-header h3 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
      }

      .battle-summary {
        color: #666;
        font-size: 1.1rem;
      }

      .army-summaries {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .army-summary {
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
      }

      .army-summary.player-summary {
        background: #e3f2fd;
        border: 2px solid #2196f3;
      }

      .army-summary.enemy-summary {
        background: #ffebee;
        border: 2px solid #f44336;
      }

      .army-summary h4 {
        margin: 0 0 0.5rem 0;
        color: #2c3e50;
      }

      .scenario-comparison {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .scenario-card {
        padding: 1.5rem;
        border-radius: 8px;
        border: 2px solid;
      }

      .scenario-card.best-case {
        background: #f0fff4;
        border-color: #27ae60;
      }

      .scenario-card.worst-case {
        background: #fff5f5;
        border-color: #e74c3c;
      }

      .scenario-card h4 {
        margin: 0 0 1rem 0;
        font-size: 1.2rem;
      }

      .scenario-stats, .comparison-stats {
        display: grid;
        gap: 0.75rem;
      }

      .stat, .comparison-stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: rgba(255,255,255,0.7);
        border-radius: 4px;
      }

      .stat-label {
        font-weight: 600;
        color: #333;
      }

      .stat-value {
        font-weight: 700;
        color: #2c3e50;
      }

      .stat-value.positive {
        color: #27ae60;
      }

      .stat-value.negative {
        color: #e74c3c;
      }

      .comparison-analysis {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .comparison-analysis h4 {
        margin: 0 0 1rem 0;
        color: #2c3e50;
      }

      .combat-logs {
        border-top: 2px solid #eee;
        padding-top: 2rem;
        margin-bottom: 2rem;
      }

      .log-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .log-tab {
        padding: 0.75rem 1.5rem;
        border: 2px solid #ddd;
        background: #f8f9fa;
        border-radius: 6px 6px 0 0;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }

      .log-tab.active {
        background: white;
        border-bottom-color: white;
        color: #2c3e50;
      }

      .log-content {
        background: white;
        border: 2px solid #ddd;
        border-radius: 0 6px 6px 6px;
        padding: 1.5rem;
        min-height: 300px;
        max-height: 500px;
        overflow-y: auto;
      }

      .combat-log.hidden {
        display: none;
      }

      .log-entries {
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.6;
      }

      .log-entry {
        padding: 0.5rem;
        border-bottom: 1px solid #f0f0f0;
        border-radius: 4px;
        margin-bottom: 2px;
      }

      .log-entry.player-turn {
        background-color: #e3f2fd;
        border-left: 3px solid #2196f3;
      }

      .log-entry.enemy-turn {
        background-color: #ffebee;
        border-left: 3px solid #f44336;
      }

      .turn-number {
        color: #666;
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .action-text {
        color: #333;
      }

      .no-log {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 2rem;
      }

      .results-actions {
        text-align: center;
        padding-top: 1rem;
        border-top: 2px solid #eee;
        display: flex;
        gap: 1rem;
        justify-content: center;
      }

      .error-display {
        background: #f8d7da;
        border: 2px solid #e74c3c;
        border-radius: 8px;
        margin-bottom: 2rem;
        animation: slideIn 0.3s ease-out;
      }

      .error-content {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .error-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .error-message {
        flex: 1;
        color: #721c24;
        font-weight: 500;
        line-height: 1.4;
      }

      .error-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #721c24;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
      }

      .error-close:hover {
        background-color: rgba(114, 28, 36, 0.1);
      }

      .hidden {
        display: none !important;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Mobile Responsiveness */
      @media (max-width: 768px) {
        .manual-battle-simulation {
          padding: 1rem;
        }

        .manual-battle-title {
          font-size: 2rem;
        }

        .action-buttons {
          flex-direction: column;
        }

        .army-summaries {
          grid-template-columns: 1fr;
        }

        .scenario-comparison {
          grid-template-columns: 1fr;
        }

        .log-tabs {
          flex-direction: column;
        }

        .log-tab {
          border-radius: 6px;
        }

        .log-content {
          border-radius: 6px;
        }

        .results-actions {
          flex-direction: column;
        }
      }
    `,document.head.appendChild(t)}}class ve{constructor(e){h(this,"container",null);h(this,"props");h(this,"storage");h(this,"attackModifiers",{});this.props=e,this.storage=new N}mount(e){this.container=e,this.initializeForm(),this.render(),this.attachEventListeners()}initializeForm(){var e;(e=this.props.editingUnit)!=null&&e.attack_modifiers?(this.attackModifiers={},this.props.editingUnit.attack_modifiers.forEach(t=>{this.attackModifiers[t.target_type]=t.value})):this.attackModifiers={}}render(){var n;if(!this.container)return;const e=this.props.mode==="edit",t=this.props.editingUnit;this.container.innerHTML=`
      <div class="enemy-unit-input-form">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              ${e?"✏️ Edit Enemy Unit":"➕ Create New Enemy Unit"}
            </h2>
            <p class="text-secondary">
              ${e?"Modify the enemy unit details below":"Define a custom enemy unit for battle simulations"}
            </p>
          </div>
          
          <form id="enemy-unit-form" class="enemy-unit-form">
            <!-- Basic Information Section -->
            <div class="form-section">
              <h3>📋 Basic Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="form-label" for="enemy-name">Enemy Unit Name *</label>
                  <input 
                    type="text" 
                    id="enemy-name" 
                    class="form-input" 
                    value="${(t==null?void 0:t.name)||""}"
                    placeholder="e.g., Elite Dark Elf Archer"
                    required
                    maxlength="50"
                  >
                  <div class="form-error" id="enemy-name-error"></div>
                  <small class="form-help">Choose a descriptive name for this enemy unit</small>
                </div>
                <div class="form-group">
                  <label class="form-label" for="enemy-description">Description</label>
                  <input
                    type="text"
                    id="enemy-description"
                    class="form-input"
                    value=""
                    placeholder="Optional description"
                    maxlength="100"
                  >
                  <small class="form-help">Optional description for this enemy unit</small>
                </div>
              </div>
            </div>

            <!-- Combat Stats Section -->
            <div class="form-section">
              <h3>⚔️ Combat Statistics</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="form-group">
                  <label class="form-label" for="enemy-health">Health Points *</label>
                  <input 
                    type="number" 
                    id="enemy-health" 
                    class="form-input" 
                    value="${(t==null?void 0:t.health)||""}"
                    min="1" 
                    max="10000000"
                    placeholder="e.g., 50000"
                    required
                  >
                  <div class="form-error" id="enemy-health-error"></div>
                  <small class="form-help">Total health points (1 - 10,000,000)</small>
                </div>
                <div class="form-group">
                  <label class="form-label" for="enemy-strength">Strength *</label>
                  <input 
                    type="number" 
                    id="enemy-strength" 
                    class="form-input" 
                    value="${(t==null?void 0:t.strength)||""}"
                    min="1" 
                    max="1000000"
                    placeholder="e.g., 8000"
                    required
                  >
                  <div class="form-error" id="enemy-strength-error"></div>
                  <small class="form-help">Attack strength (1 - 1,000,000)</small>
                </div>
                <div class="form-group">
                  <label class="form-label" for="enemy-unit-types">Unit Types</label>
                  <input 
                    type="text" 
                    id="enemy-unit-types" 
                    class="form-input" 
                    value="${((n=t==null?void 0:t.unit_types)==null?void 0:n.join(", "))||""}"
                    placeholder="e.g., Ranged, Human, Elite"
                  >
                  <div class="form-error" id="enemy-unit-types-error"></div>
                  <small class="form-help">Comma-separated unit types (optional)</small>
                </div>
              </div>
            </div>

            <!-- Attack Modifiers Section -->
            <div class="form-section">
              <h3>🎯 Attack Modifiers</h3>
              <p class="text-sm text-secondary mb-4">
                Define strength bonuses against specific unit types. Use absolute values (e.g., 1000 = +1000 strength vs that type).
              </p>
              
              <div class="attack-modifiers-container">
                <div class="modifier-controls">
                  <div class="add-modifier-form">
                    <div class="grid grid-cols-3 gap-2">
                      <input 
                        type="text" 
                        id="new-modifier-type" 
                        class="form-input" 
                        placeholder="Unit type (e.g., Human)"
                      >
                      <input 
                        type="number" 
                        id="new-modifier-value" 
                        class="form-input" 
                        placeholder="Bonus strength"
                        min="0"
                        max="100000"
                      >
                      <button type="button" id="add-modifier-btn" class="btn btn-primary">
                        ➕ Add
                      </button>
                    </div>
                  </div>
                </div>
                
                <div id="attack-modifiers-list" class="attack-modifiers-list">
                  <!-- Attack modifiers will be populated here -->
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="form-section">
              <div class="form-actions">
                <button type="submit" class="btn btn-success btn-lg" id="save-btn">
                  <span>${e?"💾 Update Enemy Unit":"✅ Create Enemy Unit"}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-lg" id="cancel-btn">
                  <span>❌ Cancel</span>
                </button>
                ${e?`
                  <button type="button" class="btn btn-danger btn-lg" id="delete-btn">
                    <span>🗑️ Delete</span>
                  </button>
                `:""}
              </div>
            </div>
          </form>
        </div>
      </div>
    `,this.addStyles(),this.populateAttackModifiers()}addStyles(){const e=document.createElement("style");e.textContent=`
      .enemy-unit-input-form {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--spacing-lg);
      }

      .form-section {
        margin-bottom: var(--spacing-xl);
        padding-bottom: var(--spacing-lg);
        border-bottom: 1px solid var(--color-border);
      }

      .form-section:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .form-section h3 {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-md);
        color: var(--color-text);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .form-group {
        margin-bottom: var(--spacing-md);
      }

      .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
        color: var(--color-text);
        font-size: var(--font-size-sm);
      }

      .form-input {
        width: 100%;
        padding: var(--spacing-sm);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        transition: border-color var(--transition-fast);
        background-color: var(--color-background);
        color: var(--color-text);
      }

      .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
      }

      .form-input.error {
        border-color: var(--color-danger);
        background-color: rgba(239, 68, 68, 0.05);
      }

      .form-error {
        color: var(--color-danger);
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-xs);
        min-height: 1.2em;
        font-weight: 500;
      }

      .form-help {
        color: var(--color-text-secondary);
        font-size: var(--font-size-xs);
        margin-top: var(--spacing-xs);
        display: block;
      }

      .grid {
        display: grid;
        gap: var(--spacing-md);
      }

      .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
      }

      .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
      }

      .gap-2 {
        gap: var(--spacing-sm);
      }

      .gap-4 {
        gap: var(--spacing-md);
      }

      /* Attack Modifiers Styles */
      .attack-modifiers-container {
        background: var(--color-surface);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        border: 1px solid var(--color-border);
      }

      .modifier-controls {
        margin-bottom: var(--spacing-md);
      }

      .add-modifier-form {
        background: var(--color-background);
        padding: var(--spacing-md);
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-border);
      }

      .attack-modifiers-list {
        min-height: 60px;
        max-height: 300px;
        overflow-y: auto;
      }

      .modifier-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm);
        background: var(--color-background);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        margin-bottom: var(--spacing-xs);
        transition: all var(--transition-fast);
      }

      .modifier-item:hover {
        border-color: var(--color-primary);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .modifier-info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modifier-type {
        font-weight: 600;
        color: var(--color-text);
      }

      .modifier-value {
        color: var(--color-success);
        font-weight: 500;
      }

      .modifier-actions {
        display: flex;
        gap: var(--spacing-xs);
      }

      .btn-xs {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-xs);
        border-radius: var(--radius-sm);
      }

      .empty-modifiers {
        text-align: center;
        color: var(--color-text-secondary);
        font-style: italic;
        padding: var(--spacing-lg);
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-md);
      }

      /* Form Actions */
      .form-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-lg {
        padding: var(--spacing-md) var(--spacing-lg);
        font-size: var(--font-size-md);
        font-weight: 600;
        min-width: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
      }

      .btn-lg:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .enemy-unit-input-form {
          padding: var(--spacing-md);
        }

        .grid-cols-2,
        .grid-cols-3 {
          grid-template-columns: 1fr;
        }

        .form-actions {
          flex-direction: column;
          align-items: stretch;
        }

        .btn-lg {
          min-width: auto;
          width: 100%;
        }

        .add-modifier-form .grid-cols-3 {
          grid-template-columns: 1fr;
          gap: var(--spacing-sm);
        }

        .modifier-item {
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-sm);
        }

        .modifier-info {
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-xs);
        }

        .modifier-actions {
          justify-content: center;
        }
      }

      @media (max-width: 480px) {
        .card-title {
          font-size: var(--font-size-lg);
        }

        .form-section h3 {
          font-size: var(--font-size-md);
        }

        .attack-modifiers-container {
          padding: var(--spacing-sm);
        }
      }
    `,document.head.appendChild(e)}populateAttackModifiers(){const e=document.getElementById("attack-modifiers-list");if(e){if(Object.keys(this.attackModifiers).length===0){e.innerHTML=`
        <div class="empty-modifiers">
          <p>No attack modifiers defined</p>
          <small>Add modifiers above to give this enemy unit bonuses against specific unit types</small>
        </div>
      `;return}e.innerHTML=Object.entries(this.attackModifiers).map(([t,n])=>`
        <div class="modifier-item" data-unit-type="${t}">
          <div class="modifier-info">
            <span class="modifier-type">${t}</span>
            <span class="modifier-value">+${n.toLocaleString()} strength</span>
          </div>
          <div class="modifier-actions">
            <button type="button" class="btn btn-xs btn-secondary edit-modifier-btn" data-unit-type="${t}">
              ✏️ Edit
            </button>
            <button type="button" class="btn btn-xs btn-danger remove-modifier-btn" data-unit-type="${t}">
              🗑️ Remove
            </button>
          </div>
        </div>
      `).join(""),this.attachModifierEventListeners()}}attachEventListeners(){const e=document.getElementById("enemy-unit-form"),t=document.getElementById("save-btn"),n=document.getElementById("cancel-btn"),i=document.getElementById("delete-btn"),a=document.getElementById("add-modifier-btn");e&&e.addEventListener("submit",this.handleSubmit.bind(this)),t&&t.addEventListener("click",this.handleSubmit.bind(this)),n&&n.addEventListener("click",this.handleCancel.bind(this)),i&&i.addEventListener("click",this.handleDelete.bind(this)),a&&a.addEventListener("click",this.handleAddModifier.bind(this)),this.addValidationListeners();const s=document.getElementById("new-modifier-value");s&&s.addEventListener("keypress",r=>{r.key==="Enter"&&(r.preventDefault(),this.handleAddModifier())})}attachModifierEventListeners(){document.querySelectorAll(".edit-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.unitType;n&&this.handleEditModifier(n)})}),document.querySelectorAll(".remove-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.unitType;n&&this.handleRemoveModifier(n)})})}addValidationListeners(){["enemy-name","enemy-health","enemy-strength","enemy-unit-types"].forEach(t=>{const n=document.getElementById(t);n&&(n.addEventListener("blur",()=>this.validateField(t)),n.addEventListener("input",()=>this.clearFieldError(t)))})}validateField(e){const t=document.getElementById(e),n=document.getElementById(`${e}-error`);if(!t||!n)return!0;let i;switch(e){case"enemy-name":i=T.validateName(t.value);break;case"enemy-health":i=T.validateHealth(parseInt(t.value));break;case"enemy-strength":i=T.validateStrength(parseInt(t.value));break;case"enemy-unit-types":const a=t.value.split(",").map(s=>s.trim()).filter(s=>s);i=T.validateUnitTypes(a);break;default:return!0}return i.isValid?(t.classList.remove("error"),n.textContent="",!0):(t.classList.add("error"),n.textContent=i.error||"",!1)}clearFieldError(e){const t=document.getElementById(e),n=document.getElementById(`${e}-error`);t&&n&&(t.classList.remove("error"),n.textContent="")}handleAddModifier(){const e=document.getElementById("new-modifier-type"),t=document.getElementById("new-modifier-value");if(!e||!t)return;const n=e.value.trim(),i=parseInt(t.value);if(!n){alert("Please enter a unit type"),e.focus();return}if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)"),t.focus();return}this.attackModifiers[n]&&!confirm(`A modifier for "${n}" already exists. Replace it?`)||(this.attackModifiers[n]=i,e.value="",t.value="",this.populateAttackModifiers(),e.focus())}handleEditModifier(e){const t=this.attackModifiers[e],n=prompt(`Edit strength bonus for "${e}":`,t.toString());if(n===null)return;const i=parseInt(n);if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)");return}this.attackModifiers[e]=i,this.populateAttackModifiers()}handleRemoveModifier(e){confirm(`Remove attack modifier for "${e}"?`)&&(delete this.attackModifiers[e],this.populateAttackModifiers())}handleSubmit(e){if(e.preventDefault(),!this.validateForm())return;const t=this.collectFormData();t&&this.props.onSave(t)}handleCancel(){this.hasUnsavedChanges()?confirm("You have unsaved changes. Are you sure you want to cancel?")&&this.props.onCancel():this.props.onCancel()}handleDelete(){if(!this.props.editingUnit)return;const e=this.props.editingUnit.name;if(confirm(`Are you sure you want to delete "${e}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(this.props.editingUnit.id??"");t.success?this.props.onCancel():alert(`Failed to delete unit: ${t.error}`)}}validateForm(){const e=["enemy-name","enemy-health","enemy-strength","enemy-unit-types"];let t=!0;return e.forEach(n=>{this.validateField(n)||(t=!1)}),t}collectFormData(){var e,t;try{const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),a=document.getElementById("enemy-strength"),s=document.getElementById("enemy-unit-types"),r=n.value.trim(),o=parseInt(i.value),l=parseInt(a.value),c=s.value.split(",").map(p=>p.trim()).filter(p=>p),m=Object.keys(this.attackModifiers).length>0?Object.entries(this.attackModifiers).map(([p,g])=>({target_type:p,modifier_type:"Strength",value:g})):void 0,d={id:((e=this.props.editingUnit)==null?void 0:e.id)||`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,name:r,unit_types:c,health:o,strength:l,attack_modifiers:m,createdAt:((t=this.props.editingUnit)==null?void 0:t.createdAt)||new Date,modifiedAt:new Date},u=T.validateUserEnemyUnit(d);return u.isValid?d:(alert(`Validation failed: ${u.errors.join(", ")}`),null)}catch(n){return console.error("Error collecting form data:",n),alert("Error collecting form data. Please check your inputs."),null}}hasUnsavedChanges(){if(!this.props.editingUnit){const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),a=document.getElementById("enemy-strength");return!!(n!=null&&n.value.trim()||i!=null&&i.value||a!=null&&a.value)}const e=this.collectFormData();if(!e)return!1;const t=this.props.editingUnit;return e.name!==t.name||e.health!==t.health||e.strength!==t.strength||JSON.stringify(e.unit_types)!==JSON.stringify(t.unit_types)||JSON.stringify(e.attack_modifiers)!==JSON.stringify(t.attack_modifiers)}unmount(){this.container&&(this.container.innerHTML="")}}class Ee{constructor(e){h(this,"container",null);h(this,"props");h(this,"storage");h(this,"userUnits",[]);h(this,"filteredUnits",[]);h(this,"currentFilter","");h(this,"sortBy","name");h(this,"sortOrder","asc");h(this,"selectedUnits",new Set);h(this,"showingForm",!1);h(this,"editingUnit",null);this.props=e,this.storage=new N}mount(e){this.container=e,this.loadData(),this.render(),this.attachEventListeners()}loadData(){this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}updateFilteredUnits(){let e=[...this.userUnits];if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();e=e.filter(n=>n.name.toLowerCase().includes(t)||n.unit_types.some(i=>i.toLowerCase().includes(t)))}e.sort((t,n)=>{var a,s,r,o;let i=0;switch(this.sortBy){case"name":i=t.name.localeCompare(n.name);break;case"created":i=(((a=t.createdAt)==null?void 0:a.getTime())??0)-(((s=n.createdAt)==null?void 0:s.getTime())??0);break;case"modified":i=(((r=t.modifiedAt)==null?void 0:r.getTime())??0)-(((o=n.modifiedAt)==null?void 0:o.getTime())??0);break;case"health":i=t.health-n.health;break;case"strength":i=t.strength-n.strength;break}return this.sortOrder==="desc"?-i:i}),this.filteredUnits=e}render(){if(!this.container)return;if(this.showingForm){this.renderForm();return}const e=this.props.mode==="standalone",t=this.storage.getStorageStats();this.container.innerHTML=`
      <div class="enemy-unit-manager ${e?"standalone":"embedded"}">
        ${e?`
          <div class="manager-header">
            <div class="header-content">
              <h1 class="manager-title">
                👤 Custom Enemy Units
              </h1>
              <p class="manager-subtitle">
                Manage your custom enemy units for battle simulations
              </p>
            </div>
            ${this.props.onClose?`
              <button class="btn btn-secondary" id="close-manager">
                ❌ Close
              </button>
            `:""}
          </div>
        `:""}
        
        <div class="manager-content">
          <!-- Statistics Panel -->
          <div class="stats-panel">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-info">
                  <span class="stat-value">${t.totalUnits}</span>
                  <span class="stat-label">Total Units</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💾</div>
                <div class="stat-info">
                  <span class="stat-value">${Math.round(t.storageSize/1024)}KB</span>
                  <span class="stat-label">Storage Used</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📅</div>
                <div class="stat-info">
                  <span class="stat-value">${t.unitsCreatedToday}</span>
                  <span class="stat-label">Created Today</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🔄</div>
                <div class="stat-info">
                  <span class="stat-value">${t.lastModified?this.formatDate(t.lastModified):"Never"}</span>
                  <span class="stat-label">Last Modified</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Controls Panel -->
          <div class="controls-panel">
            <div class="controls-row">
              <div class="search-controls">
                <div class="search-input-group">
                  <input 
                    type="text" 
                    id="unit-search" 
                    class="form-input search-input" 
                    placeholder="🔍 Search units..."
                    value="${this.currentFilter}"
                  >
                  <button class="btn btn-secondary btn-sm" id="clear-search">
                    ❌ Clear
                  </button>
                </div>
              </div>
              
              <div class="action-controls">
                <button class="btn btn-success" id="create-unit-btn">
                  ➕ Create New Unit
                </button>
                <div class="dropdown" id="bulk-actions-dropdown">
                  <button class="btn btn-secondary dropdown-toggle" id="bulk-actions-btn" ${this.selectedUnits.size===0?"disabled":""}>
                    📋 Bulk Actions (${this.selectedUnits.size})
                  </button>
                  <div class="dropdown-menu">
                    <button class="dropdown-item" id="export-selected">📤 Export Selected</button>
                    <button class="dropdown-item" id="delete-selected">🗑️ Delete Selected</button>
                  </div>
                </div>
                <div class="dropdown" id="import-export-dropdown">
                  <button class="btn btn-secondary dropdown-toggle" id="import-export-btn">
                    📁 Import/Export
                  </button>
                  <div class="dropdown-menu">
                    <button class="dropdown-item" id="import-units">📥 Import Units</button>
                    <button class="dropdown-item" id="export-all">📤 Export All</button>
                    <button class="dropdown-item" id="clear-all">🗑️ Clear All</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="controls-row">
              <div class="sort-controls">
                <label class="form-label">Sort by:</label>
                <select class="form-input sort-select" id="sort-by">
                  <option value="name" ${this.sortBy==="name"?"selected":""}>Name</option>
                  <option value="created" ${this.sortBy==="created"?"selected":""}>Date Created</option>
                  <option value="modified" ${this.sortBy==="modified"?"selected":""}>Last Modified</option>
                  <option value="health" ${this.sortBy==="health"?"selected":""}>Health</option>
                  <option value="strength" ${this.sortBy==="strength"?"selected":""}>Strength</option>
                </select>
                <button class="btn btn-secondary btn-sm" id="sort-order-btn">
                  ${this.sortOrder==="asc"?"⬆️ Ascending":"⬇️ Descending"}
                </button>
              </div>
              
              <div class="selection-controls">
                <button class="btn btn-secondary btn-sm" id="select-all">
                  ☑️ Select All
                </button>
                <button class="btn btn-secondary btn-sm" id="select-none" ${this.selectedUnits.size===0?"disabled":""}>
                  ⬜ Select None
                </button>
              </div>
            </div>
          </div>

          <!-- Units List -->
          <div class="units-list-container">
            <div class="units-list-header">
              <span class="results-info">
                Showing ${this.filteredUnits.length} of ${this.userUnits.length} units
                ${this.selectedUnits.size>0?`(${this.selectedUnits.size} selected)`:""}
              </span>
            </div>
            
            <div class="units-list" id="units-list">
              ${this.renderUnitsList()}
            </div>
          </div>
        </div>
        
        <!-- Hidden file input for import -->
        <input type="file" id="import-file-input" accept=".json" style="display: none;">
      </div>
    `,this.addStyles()}renderForm(){if(!this.container)return;const e=document.createElement("div");this.container.innerHTML="",this.container.appendChild(e),new ve({onSave:this.handleFormSave.bind(this),onCancel:this.handleFormCancel.bind(this),editingUnit:this.editingUnit,mode:this.editingUnit?"edit":"create"}).mount(e)}renderUnitsList(){return this.filteredUnits.length===0?`
        <div class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No custom enemy units</h3>
          <p>Create your first custom enemy unit to get started</p>
          <button class="btn btn-primary" id="create-first-unit">
            ➕ Create Your First Unit
          </button>
        </div>
      `:this.filteredUnits.map(e=>{const t=this.selectedUnits.has(e.id??"");return`
        <div class="unit-item ${t?"selected":""}" data-unit-id="${e.id??""}">
          <div class="unit-checkbox">
            <input 
              type="checkbox" 
              class="unit-select-checkbox" 
              data-unit-id="${e.id}"
              ${t?"checked":""}
            >
          </div>
          
          <div class="unit-content">
            <div class="unit-header">
              <div class="unit-basic-info">
                <h4 class="unit-name">${e.name}</h4>
                <div class="unit-types">
                  ${e.unit_types.map(n=>`<span class="unit-type-tag">${n}</span>`).join("")}
                </div>
              </div>
              
              <div class="unit-stats-summary">
                <div class="stat-item">
                  <span class="stat-icon">❤️</span>
                  <span class="stat-value">${e.health.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">⚔️</span>
                  <span class="stat-value">${e.strength.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">📊</span>
                  <span class="stat-value">${(e.strength/e.health).toFixed(3)}</span>
                </div>
              </div>
            </div>
            
            <div class="unit-details">
              <div class="unit-meta">
                <span class="meta-item">
                  <span class="meta-label">Created:</span>
                  <span class="meta-value">${e.createdAt?this.formatDate(e.createdAt):"Unknown"}</span>
                </span>
                <span class="meta-item">
                  <span class="meta-label">Modified:</span>
                  <span class="meta-value">${e.modifiedAt?this.formatDate(e.modifiedAt):"Unknown"}</span>
                </span>
              </div>
              
              ${e.attack_modifiers&&e.attack_modifiers.length>0?`
                <div class="unit-modifiers">
                  <span class="modifiers-label">🎯 Attack Bonuses:</span>
                  <div class="modifiers-list">
                    ${e.attack_modifiers.map(n=>`<span class="modifier-tag">+${n.value.toLocaleString()} vs ${n.target_type}</span>`).join("")}
                  </div>
                </div>
              `:""}
            </div>
          </div>
          
          <div class="unit-actions">
            ${this.props.onUnitSelect?`
              <button class="btn btn-primary btn-sm" data-action="select" data-unit-id="${e.id}">
                👆 Select
              </button>
            `:""}
            <button class="btn btn-secondary btn-sm" data-action="edit" data-unit-id="${e.id}">
              ✏️ Edit
            </button>
            <button class="btn btn-warning btn-sm" data-action="duplicate" data-unit-id="${e.id}">
              📋 Duplicate
            </button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-unit-id="${e.id}">
              🗑️ Delete
            </button>
          </div>
        </div>
      `}).join("")}addStyles(){const e=document.createElement("style");e.textContent=`
      .enemy-unit-manager {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .enemy-unit-manager.standalone {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--spacing-lg);
      }

      .manager-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-lg);
        padding-bottom: var(--spacing-lg);
        border-bottom: 2px solid var(--color-border);
      }

      .header-content h1 {
        margin: 0 0 var(--spacing-xs) 0;
        color: var(--color-text);
        font-size: var(--font-size-2xl);
      }

      .header-content p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
      }

      .manager-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      /* Statistics Panel */
      .stats-panel {
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        border: 1px solid var(--color-border);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
      }

      .stat-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-background);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }

      .stat-icon {
        font-size: var(--font-size-xl);
        width: 40px;
        text-align: center;
      }

      .stat-info {
        flex: 1;
      }

      .stat-value {
        display: block;
        font-size: var(--font-size-lg);
        font-weight: 700;
        color: var(--color-text);
        line-height: 1.2;
      }

      .stat-label {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: 2px;
      }

      /* Controls Panel */
      .controls-panel {
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        border: 1px solid var(--color-border);
      }

      .controls-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
      }

      .controls-row:last-child {
        margin-bottom: 0;
      }

      .search-controls {
        flex: 1;
        max-width: 400px;
      }

      .search-input-group {
        display: flex;
        gap: var(--spacing-sm);
      }

      .search-input {
        flex: 1;
      }

      .action-controls {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
      }

      .sort-controls {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
      }

      .sort-controls .form-label {
        margin: 0;
        font-size: var(--font-size-sm);
        white-space: nowrap;
      }

      .sort-select {
        min-width: 150px;
      }

      .selection-controls {
        display: flex;
        gap: var(--spacing-sm);
      }

      /* Dropdown Styles */
      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-toggle {
        cursor: pointer;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: var(--color-background);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 100;
        min-width: 180px;
        display: none;
      }

      .dropdown.open .dropdown-menu {
        display: block;
      }

      .dropdown-item {
        display: block;
        width: 100%;
        padding: var(--spacing-sm) var(--spacing-md);
        text-align: left;
        background: none;
        border: none;
        color: var(--color-text);
        cursor: pointer;
        font-size: var(--font-size-sm);
        transition: background-color var(--transition-fast);
      }

      .dropdown-item:hover {
        background-color: var(--color-surface);
      }

      .dropdown-item:first-child {
        border-radius: var(--radius-md) var(--radius-md) 0 0;
      }

      .dropdown-item:last-child {
        border-radius: 0 0 var(--radius-md) var(--radius-md);
      }

      /* Units List */
      .units-list-container {
        flex: 1;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .units-list-header {
        padding: var(--spacing-md) var(--spacing-lg);
        background: var(--color-background);
        border-bottom: 1px solid var(--color-border);
      }

      .results-info {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .units-list {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-md);
      }

      /* Unit Items */
      .unit-item {
        display: flex;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-background);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-md);
        transition: all var(--transition-fast);
      }

      .unit-item:hover {
        border-color: var(--color-primary);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      .unit-item.selected {
        border-color: var(--color-success);
        background-color: rgba(34, 197, 94, 0.05);
      }

      .unit-checkbox {
        display: flex;
        align-items: flex-start;
        padding-top: 2px;
      }

      .unit-select-checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .unit-content {
        flex: 1;
        min-width: 0;
      }

      .unit-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
      }

      .unit-basic-info {
        flex: 1;
        min-width: 0;
      }

      .unit-name {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-md);
        color: var(--color-text);
        font-weight: 600;
      }

      .unit-types {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }

      .unit-type-tag {
        background-color: var(--color-surface);
        color: var(--color-text-secondary);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        border: 1px solid var(--color-border);
      }

      .unit-stats-summary {
        display: flex;
        gap: var(--spacing-md);
        align-items: center;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: var(--font-size-sm);
      }

      .stat-icon {
        font-size: var(--font-size-sm);
      }

      .stat-value {
        font-weight: 600;
        color: var(--color-text);
      }

      .unit-details {
        margin-top: var(--spacing-sm);
        padding-top: var(--spacing-sm);
        border-top: 1px solid var(--color-border);
      }

      .unit-meta {
        display: flex;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-sm);
      }

      .meta-item {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }

      .meta-label {
        font-weight: 500;
      }

      .unit-modifiers {
        margin-top: var(--spacing-sm);
      }

      .modifiers-label {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        display: block;
        margin-bottom: var(--spacing-xs);
      }

      .modifiers-list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
      }

      .modifier-tag {
        background-color: var(--color-warning);
        color: white;
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-weight: 500;
      }

      .unit-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        align-items: stretch;
        min-width: 120px;
      }

      .unit-actions .btn {
        font-size: var(--font-size-xs);
        padding: var(--spacing-xs) var(--spacing-sm);
        white-space: nowrap;
      }

      /* Empty State */
      .empty-state {
        text-align: center;
        padding: var(--spacing-xl);
        color: var(--color-text-secondary);
      }

      .empty-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
      }

      .empty-state h3 {
        margin: 0 0 var(--spacing-sm) 0;
        color: var(--color-text);
      }

      .empty-state p {
        margin: 0 0 var(--spacing-lg) 0;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .enemy-unit-manager.standalone {
          padding: var(--spacing-md);
        }

        .manager-header {
          flex-direction: column;
          gap: var(--spacing-md);
          text-align: center;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .controls-row {
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-md);
        }

        .search-controls {
          max-width: none;
        }

        .action-controls {
          flex-wrap: wrap;
          justify-content: center;
        }

        .sort-controls {
          flex-wrap: wrap;
          justify-content: center;
        }

        .unit-item {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .unit-header {
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .unit-stats-summary {
          justify-content: space-around;
        }

        .unit-actions {
          flex-direction: row;
          min-width: auto;
        }

        .unit-actions .btn {
          flex: 1;
        }

        .unit-meta {
          flex-direction: column;
          gap: var(--spacing-xs);
        }
      }

      @media (max-width: 480px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }

        .action-controls {
          flex-direction: column;
          align-items: stretch;
        }

        .selection-controls {
          flex-direction: column;
        }

        .unit-actions {
          flex-direction: column;
        }
      }
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-manager");e&&e.addEventListener("click",()=>{var c,m;return(m=(c=this.props).onClose)==null?void 0:m.call(c)});const t=document.getElementById("unit-search");t&&t.addEventListener("input",this.handleSearch.bind(this));const n=document.getElementById("clear-search");n&&n.addEventListener("click",this.handleClearSearch.bind(this));const i=document.getElementById("create-unit-btn");i&&i.addEventListener("click",this.handleCreateUnit.bind(this));const a=document.getElementById("create-first-unit");a&&a.addEventListener("click",this.handleCreateUnit.bind(this));const s=document.getElementById("sort-by");s&&s.addEventListener("change",this.handleSortChange.bind(this));const r=document.getElementById("sort-order-btn");r&&r.addEventListener("click",this.handleSortOrderToggle.bind(this));const o=document.getElementById("select-all");o&&o.addEventListener("click",this.handleSelectAll.bind(this));const l=document.getElementById("select-none");l&&l.addEventListener("click",this.handleSelectNone.bind(this)),document.querySelectorAll(".unit-select-checkbox").forEach(c=>{c.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",this.handleUnitAction.bind(this))}),this.attachDropdownListeners(),this.attachImportExportListeners()}attachDropdownListeners(){document.querySelectorAll(".dropdown-toggle").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const n=e.closest(".dropdown");n&&(document.querySelectorAll(".dropdown.open").forEach(i=>{i!==n&&i.classList.remove("open")}),n.classList.toggle("open"))})}),document.addEventListener("click",()=>{document.querySelectorAll(".dropdown.open").forEach(e=>{e.classList.remove("open")})})}attachImportExportListeners(){const e=document.getElementById("import-units");e&&e.addEventListener("click",this.handleImportUnits.bind(this));const t=document.getElementById("export-all");t&&t.addEventListener("click",this.handleExportAll.bind(this));const n=document.getElementById("export-selected");n&&n.addEventListener("click",this.handleExportSelected.bind(this));const i=document.getElementById("delete-selected");i&&i.addEventListener("click",this.handleDeleteSelected.bind(this));const a=document.getElementById("clear-all");a&&a.addEventListener("click",this.handleClearAll.bind(this));const s=document.getElementById("import-file-input");s&&s.addEventListener("change",this.handleFileImport.bind(this))}formatDate(e){const n=new Date().getTime()-e.getTime(),i=Math.floor(n/(1e3*60*60*24));return i===0?"Today":i===1?"Yesterday":i<7?`${i} days ago`:e.toLocaleDateString()}handleFormSave(e){if(this.editingUnit){const t=this.storage.updateUserEnemyUnit(this.editingUnit.id??"",e);t.success?(this.showingForm=!1,this.editingUnit=null,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to update unit: ${t.error}`)}else{const t=this.storage.addUserEnemyUnit(e);t.success?(this.showingForm=!1,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to create unit: ${t.error}`)}}handleFormCancel(){this.showingForm=!1,this.editingUnit=null,this.render(),this.attachEventListeners()}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitsList()}handleCreateUnit(){this.showingForm=!0,this.editingUnit=null,this.render()}handleSortChange(e){const t=e.target;this.sortBy=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleSortOrderToggle(){this.sortOrder=this.sortOrder==="asc"?"desc":"asc",this.updateFilteredUnits(),this.refreshUnitsList();const e=document.getElementById("sort-order-btn");e&&(e.textContent=this.sortOrder==="asc"?"⬆️ Ascending":"⬇️ Descending")}handleSelectAll(){this.selectedUnits.clear(),this.filteredUnits.forEach(e=>{e.id&&this.selectedUnits.add(e.id)}),this.refreshSelectionUI()}handleSelectNone(){this.selectedUnits.clear(),this.refreshSelectionUI()}handleCheckboxChange(e){const t=e.target,n=t.dataset.unitId;n&&(t.checked?this.selectedUnits.add(n):this.selectedUnits.delete(n),this.refreshSelectionUI())}handleUnitAction(e){var s,r;const t=e.target,n=t.dataset.action,i=t.dataset.unitId;if(!n||!i)return;const a=this.userUnits.find(o=>o.id===i);if(a)switch(n){case"select":(r=(s=this.props).onUnitSelect)==null||r.call(s,a);break;case"edit":this.editingUnit=a,this.showingForm=!0,this.render();break;case"duplicate":this.handleDuplicateUnit(a);break;case"delete":this.handleDeleteUnit(a);break}}handleDuplicateUnit(e){const n={name:`${e.name} (Copy)`,unit_types:[...e.unit_types],health:e.health,strength:e.strength,attack_modifiers:e.attack_modifiers?[...e.attack_modifiers]:void 0},i=this.storage.addUserEnemyUnit(n);i.success?(this.loadData(),this.refreshUnitsList()):alert(`Failed to duplicate unit: ${i.error}`)}handleDeleteUnit(e){if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(e.id??"");t.success?(e.id&&this.selectedUnits.delete(e.id),this.loadData(),this.refreshUnitsList()):alert(`Failed to delete unit: ${t.error}`)}}handleImportUnits(){const e=document.getElementById("import-file-input");e&&e.click()}handleFileImport(e){var a;const t=e.target,n=(a=t.files)==null?void 0:a[0];if(!n)return;const i=new FileReader;i.onload=s=>{var r,o;try{const l=(r=s.target)==null?void 0:r.result,c=this.storage.importUserEnemyUnits(l,{skipDuplicates:!0});if(c.success){let m=`Successfully imported ${c.imported} units.`;c.skipped&&c.skipped>0&&(m+=` ${c.skipped} units were skipped.`),c.errors&&c.errors.length>0&&(m+=`

Errors:
${c.errors.join(`
`)}`),alert(m),this.loadData(),this.refreshUnitsList()}else alert(`Import failed: ${((o=c.errors)==null?void 0:o.join(", "))||"Unknown error"}`)}catch{alert("Failed to read file. Please ensure it's a valid JSON file.")}},i.readAsText(n),t.value=""}handleExportAll(){const e=this.storage.exportUserEnemyUnits();e.success&&e.data?this.downloadJson(e.data,"enemy-units-export.json"):alert(`Export failed: ${e.error}`)}handleExportSelected(){if(this.selectedUnits.size===0){alert("No units selected for export.");return}const e=this.userUnits.filter(i=>i.id&&this.selectedUnits.has(i.id)),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(i=>{var a,s;return{name:i.name,unit_types:i.unit_types,health:i.health,strength:i.strength,attack_modifiers:i.attack_modifiers,createdAt:((a=i.createdAt)==null?void 0:a.toISOString())??new Date().toISOString(),modifiedAt:((s=i.modifiedAt)==null?void 0:s.toISOString())??new Date().toISOString()}})},n=JSON.stringify(t,null,2);this.downloadJson(n,`enemy-units-selected-${this.selectedUnits.size}.json`)}handleDeleteSelected(){if(this.selectedUnits.size===0){alert("No units selected for deletion.");return}const e=this.selectedUnits.size;if(confirm(`Are you sure you want to delete ${e} selected unit${e>1?"s":""}? This action cannot be undone.`)){let t=0;const n=[];this.selectedUnits.forEach(a=>{const s=this.storage.deleteUserEnemyUnit(a);s.success?t++:n.push(`Failed to delete unit: ${s.error}`)}),this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList();let i=`Successfully deleted ${t} unit${t>1?"s":""}.`;n.length>0&&(i+=`

Errors:
${n.join(`
`)}`),alert(i)}}handleClearAll(){if(this.userUnits.length===0){alert("No units to clear.");return}if(confirm(`Are you sure you want to delete ALL ${this.userUnits.length} custom enemy units? This action cannot be undone.`)){const e=this.storage.clearAllUserEnemyUnits();e.success?(this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList(),alert("All custom enemy units have been deleted.")):alert(`Failed to clear units: ${e.error}`)}}downloadJson(e,t){const n=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(n),a=document.createElement("a");a.href=i,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}refreshUnitsList(){const e=document.getElementById("units-list");e&&(e.innerHTML=this.renderUnitsList(),document.querySelectorAll(".unit-select-checkbox").forEach(n=>{n.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",this.handleUnitAction.bind(this))}));const t=document.querySelector(".results-info");t&&(t.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}refreshSelectionUI(){document.querySelectorAll(".unit-select-checkbox").forEach(i=>{const a=i,s=a.dataset.unitId;s&&(a.checked=this.selectedUnits.has(s))}),document.querySelectorAll(".unit-item").forEach(i=>{const a=i.dataset.unitId;a&&(this.selectedUnits.has(a)?i.classList.add("selected"):i.classList.remove("selected"))});const e=document.getElementById("bulk-actions-btn");e&&(e.textContent=`📋 Bulk Actions (${this.selectedUnits.size})`,e.disabled=this.selectedUnits.size===0);const t=document.getElementById("select-none");t&&(t.disabled=this.selectedUnits.size===0);const n=document.querySelector(".results-info");n&&(n.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}unmount(){this.container&&(this.container.innerHTML="")}}const j={tabletSmall:768,tabletLarge:1024};class Se{constructor(){h(this,"currentMode","desktop");h(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(e){this.listeners.push(e)}removeLayoutChangeListener(e){const t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)}updateLayoutMode(){const e=this.getViewportWidth();let t;e<j.tabletSmall?t="mobile":e<j.tabletLarge?t="tablet":t="desktop",t!==this.currentMode&&(this.currentMode=t,this.notifyListeners())}setupResizeListener(){let e;window.addEventListener("resize",()=>{clearTimeout(e),e=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(e=>e(this.currentMode))}}class P{static addSwipeSupport(e,t,n,i=50){if(!("ontouchstart"in window))return;let a=0,s=0,r=0;e.addEventListener("touchstart",o=>{const l=o.touches[0];a=l.clientX,s=l.clientY,r=Date.now()},{passive:!0}),e.addEventListener("touchend",o=>{if(o.changedTouches.length===0)return;const l=o.changedTouches[0],c=l.clientX,m=l.clientY,d=Date.now(),u=c-a,p=m-s;d-r<500&&Math.abs(u)>i&&Math.abs(p)<Math.abs(u)*.5&&(u>0&&n?(o.preventDefault(),n()):u<0&&t&&(o.preventDefault(),t()))},{passive:!1})}static addTouchSupport(e,t){if(e.addEventListener("click",t),"ontouchstart"in window){let n;e.addEventListener("touchstart",i=>{n=Date.now(),e.classList.add("touch-active")}),e.addEventListener("touchend",i=>{e.classList.remove("touch-active"),Date.now()-n<200&&(i.preventDefault(),t())}),e.addEventListener("touchcancel",()=>{e.classList.remove("touch-active")})}}static optimizeScrolling(e){e.style.webkitOverflowScrolling="touch",e.style.scrollBehavior="smooth",e.classList.add("scroll-momentum")}static addHapticFeedback(e){e.addEventListener("touchstart",()=>{e.style.transform="scale(0.98)",e.style.transition="transform 0.1s ease"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e.addEventListener("touchcancel",()=>{e.style.transform="scale(1)"})}static addPullToRefresh(e,t,n=80){if(!("ontouchstart"in window))return;let i=0,a=0,s=!1,r=null;const o=()=>{r||(r=document.createElement("div"),r.className="pull-refresh-indicator",r.innerHTML=`
        <div class="refresh-spinner"></div>
        <span class="refresh-text">Pull to refresh</span>
      `,e.insertBefore(r,e.firstChild))};e.addEventListener("touchstart",l=>{e.scrollTop===0&&!s&&(i=l.touches[0].clientY,o())},{passive:!0}),e.addEventListener("touchmove",l=>{if(e.scrollTop===0&&!s&&r){a=l.touches[0].clientY;const c=Math.max(0,a-i);if(c>0){l.preventDefault();const m=Math.min(c/n,1);r.style.transform=`translateY(${c*.5}px)`,r.style.opacity=m.toString(),c>n?r.querySelector(".refresh-text").textContent="Release to refresh":r.querySelector(".refresh-text").textContent="Pull to refresh"}}},{passive:!1}),e.addEventListener("touchend",async()=>{if(r&&!s)if(a-i>n){s=!0,r.querySelector(".refresh-text").textContent="Refreshing...",r.querySelector(".refresh-spinner").classList.add("spinning");try{await t()}finally{s=!1,r&&(r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300))}}else r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300)})}}class ${static updateBodyClasses(e){const t=document.body;t.classList.remove("layout-mobile","layout-tablet","layout-desktop"),t.classList.add(`layout-${e.getCurrentMode()}`),e.isTouchDevice()&&t.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(t=>{t instanceof HTMLElement&&P.optimizeScrolling(t)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&P.addHapticFeedback(t)})}}const E=new Se;E.addLayoutChangeListener(()=>{$.updateBodyClasses(E)});$.updateBodyClasses(E);class xe{constructor(){h(this,"sections",[]);h(this,"currentActiveSection",null);h(this,"tabContainer",null);h(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var n;const e=document.querySelector(".main-content");if(!e)return;const t=document.createElement("div");t.className="mobile-tab-navigation mobile-only",t.innerHTML=`
      <div class="tab-nav-container">
        ${this.sections.map(i=>`
          <button class="tab-nav-item ${i.id==="config-section"?"active":""}" 
                  data-section="${i.id}">
            <span class="tab-icon">${i.icon}</span>
            <span class="tab-label">${i.title}</span>
          </button>
        `).join("")}
      </div>
    `,(n=e.parentNode)==null||n.insertBefore(t,e),this.tabContainer=t,this.attachTabListeners(),this.addSwipeSupport()}createTabletCollapsibleHeaders(){this.sections.forEach(e=>{if(!e.element)return;const t=document.createElement("div");t.className="collapsible-header tablet-only",t.innerHTML=`
        <div class="collapsible-title">
          <span class="section-icon">${e.icon}</span>
          <h2>${e.title}</h2>
          <span class="collapse-indicator">▼</span>
        </div>
      `,e.element.insertBefore(t,e.element.firstChild),t.addEventListener("click",()=>{this.toggleSectionCollapse(e.id)})})}setupInitialLayout(){const e=E.getCurrentMode();this.applyLayoutMode(e),this.updateTabVisibility()}applyLayoutMode(e){switch(e){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(e=>{e.element&&(e.id===this.currentActiveSection||this.currentActiveSection===null&&e.id==="config-section"?e.element.classList.remove("hidden"):e.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden"):e.element.classList.add("hidden"),e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden","collapsed"):e.element.classList.add("hidden"),e.isCollapsed=!1)})}switchToSection(e){this.currentActiveSection=e,E.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(e){const t=this.sections.find(i=>i.id===e);if(!t||!t.element)return;t.isCollapsed=!t.isCollapsed,t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed");const n=t.element.querySelector(".collapse-indicator");n&&(n.textContent=t.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{t.addEventListener("click",()=>{if(t.classList.contains("disabled"))return;const n=t.getAttribute("data-section");n&&this.switchToSection(n)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const n=t.getAttribute("data-section");n===this.currentActiveSection||this.currentActiveSection===null&&n==="config-section"?t.classList.add("active"):t.classList.remove("active")})}setupLayoutListener(){E.addLayoutChangeListener(e=>{this.initialized&&this.applyLayoutMode(e)})}showSection(e){const t=this.sections.find(n=>n.id===e);t&&(!t.element&&(t.element=document.getElementById(e),!t.element)||(t.element.classList.remove("hidden"),t.isAvailable=!0,E.isMobile()&&this.switchToSection(e),this.updateTabVisibility()))}hideSection(e){const t=this.sections.find(n=>n.id===e);!t||!t.element||(t.element.classList.add("hidden"),t.isAvailable=!1,this.updateTabVisibility(),E.isMobile()&&this.currentActiveSection===e&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const n=t.getAttribute("data-section"),i=this.sections.find(a=>a.id===n);i&&(i.isAvailable?(t.classList.remove("disabled"),t.disabled=!1):(t.classList.add("disabled"),t.disabled=!0))})}addSwipeSupport(){if(!E.isMobile())return;const e=document.querySelector(".main-content");e&&P.addSwipeSupport(e,()=>this.swipeToNextSection(),()=>this.swipeToPreviousSection())}swipeToNextSection(){const e=this.sections.filter(n=>n.isAvailable),t=e.findIndex(n=>n.id===this.currentActiveSection);if(t<e.length-1){const n=e[t+1];this.switchToSection(n.id)}}swipeToPreviousSection(){const e=this.sections.filter(n=>n.isAvailable),t=e.findIndex(n=>n.id===this.currentActiveSection);if(t>0){const n=e[t-1];this.switchToSection(n.id)}}}const A=new xe;class B{static createFloatingActionButton(e){const t=document.createElement("button");return t.className=`floating-action-button fab-${e.position||"bottom-right"} fab-${e.color||"primary"}`,t.innerHTML=`
      <span class="fab-icon">${e.icon}</span>
      <span class="fab-label">${e.label}</span>
    `,t.addEventListener("click",e.onClick),t.addEventListener("touchstart",()=>{t.style.transform="scale(0.95)"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t}static showFloatingActionButton(e){if(!E.isMobile())return;this.hideFloatingActionButton(),this.fabContainer||(this.fabContainer=document.createElement("div"),this.fabContainer.className="fab-container",document.body.appendChild(this.fabContainer));const t=this.createFloatingActionButton(e);this.fabContainer.appendChild(t),setTimeout(()=>{t.classList.add("fab-visible")},10)}static hideFloatingActionButton(){this.fabContainer&&this.fabContainer.querySelectorAll(".floating-action-button").forEach(t=>{t.classList.remove("fab-visible"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)})}static showBottomSheet(e){return new Promise(t=>{if(!E.isMobile()){this.showDesktopModal(e),t();return}this.hideBottomSheet();const n=document.createElement("div");n.className="bottom-sheet-backdrop";const i=document.createElement("div");i.className="bottom-sheet";const a=document.createElement("div");a.className="bottom-sheet-header",a.innerHTML=`
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">${e.title}</h3>
        ${e.dismissible!==!1?'<button class="bottom-sheet-close">×</button>':""}
      `;const s=document.createElement("div");s.className="bottom-sheet-content",typeof e.content=="string"?s.innerHTML=e.content:s.appendChild(e.content);const r=document.createElement("div");if(r.className="bottom-sheet-actions",e.actions&&e.actions.forEach(o=>{const l=document.createElement("button");l.className=`btn btn-${o.style||"secondary"}`,l.textContent=o.label,l.addEventListener("click",()=>{o.onClick(),this.hideBottomSheet(),t()}),r.appendChild(l)}),i.appendChild(a),i.appendChild(s),e.actions&&e.actions.length>0&&i.appendChild(r),this.bottomSheetContainer||(this.bottomSheetContainer=document.createElement("div"),this.bottomSheetContainer.className="bottom-sheet-container",document.body.appendChild(this.bottomSheetContainer)),this.bottomSheetContainer.appendChild(n),this.bottomSheetContainer.appendChild(i),e.dismissible!==!1){n.addEventListener("click",()=>{this.hideBottomSheet(),t()});const o=a.querySelector(".bottom-sheet-close");o&&o.addEventListener("click",()=>{this.hideBottomSheet(),t()})}setTimeout(()=>{n.classList.add("visible"),i.classList.add("visible")},10)})}static hideBottomSheet(){if(this.bottomSheetContainer){const e=this.bottomSheetContainer.querySelector(".bottom-sheet-backdrop"),t=this.bottomSheetContainer.querySelector(".bottom-sheet");e&&t&&(e.classList.remove("visible"),t.classList.remove("visible"),setTimeout(()=>{this.bottomSheetContainer&&(this.bottomSheetContainer.innerHTML="")},300))}}static showDesktopModal(e){const t=typeof e.content=="string"?e.content:e.title;alert(t)}static createMobileDropdown(e,t){E.isMobile()&&e.addEventListener("click",()=>{const n=document.createElement("div");n.className="mobile-dropdown-content",t.forEach(i=>{const a=document.createElement("button");a.className="mobile-dropdown-item",a.textContent=i.label,a.addEventListener("click",()=>{i.onClick(),this.hideBottomSheet()}),n.appendChild(a)}),this.showBottomSheet({title:"Select Option",content:n,dismissible:!0})})}static showMobileLoading(e="Loading..."){if(!E.isMobile())return;const t=document.createElement("div");t.className="mobile-loading-overlay",t.innerHTML=`
      <div class="mobile-loading-content">
        <div class="mobile-loading-spinner"></div>
        <p class="mobile-loading-text">${e}</p>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("visible")},10)}static hideMobileLoading(){const e=document.querySelector(".mobile-loading-overlay");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300))}}h(B,"fabContainer",null),h(B,"bottomSheetContainer",null);E.addLayoutChangeListener(y=>{y!=="mobile"&&(B.hideFloatingActionButton(),B.hideBottomSheet())});class M{static initialize(){E.isMobile()&&(this.setupLazyLoading(),this.optimizeScrolling(),this.monitorInteractions(),this.setupMemoryMonitoring())}static setupLazyLoading(){const e=document.querySelectorAll("[data-lazy]");if(e.length===0)return;const t=new IntersectionObserver(n=>{n.forEach(i=>{if(i.isIntersecting){const a=i.target;this.loadElement(a),t.unobserve(a)}})},{rootMargin:"50px",threshold:.1});e.forEach(n=>t.observe(n)),this.observers.set("lazy-loading",t)}static loadElement(e){const t=performance.now(),n=e.dataset.lazy;n&&(e.innerHTML=n,e.removeAttribute("data-lazy"));const i=performance.now();this.metrics.renderTime+=i-t}static optimizeScrolling(){document.querySelectorAll(".combat-log, .unit-family-content, .main-content").forEach(t=>{let n=!1,i;t.addEventListener("scroll",()=>{n||(n=!0,this.requestOptimizedFrame(()=>{this.optimizeScrollFrame(t),n=!1})),clearTimeout(i),i=window.setTimeout(()=>{this.onScrollEnd(t)},150)},{passive:!0})})}static optimizeScrollFrame(e){const t=performance.now();e.getBoundingClientRect();const n=e.children;for(let a=0;a<n.length;a++){const s=n[a],r=s.getBoundingClientRect(),o=r.bottom>-window.innerHeight*2&&r.top<window.innerHeight*3;!o&&!s.classList.contains("scroll-hidden")?(s.classList.add("scroll-hidden"),s.style.visibility="hidden"):o&&s.classList.contains("scroll-hidden")&&(s.classList.remove("scroll-hidden"),s.style.visibility="visible")}const i=performance.now();this.metrics.scrollPerformance+=i-t}static onScrollEnd(e){e.querySelectorAll(".scroll-hidden").forEach(n=>{n.classList.remove("scroll-hidden"),n.style.visibility="visible"})}static requestOptimizedFrame(e){this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{e(),this.rafId=null})}static monitorInteractions(){let e;document.addEventListener("touchstart",()=>{e=performance.now()},{passive:!0}),document.addEventListener("touchend",()=>{if(e){const t=performance.now()-e;this.metrics.interactionTime=Math.max(this.metrics.interactionTime,t)}},{passive:!0})}static setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const e=performance.memory;this.metrics.memoryUsage=e.usedJSHeapSize/e.jsHeapSizeLimit,this.metrics.memoryUsage>.8&&(console.warn("High memory usage detected:",this.metrics.memoryUsage),this.optimizeMemory())},1e4)}static optimizeMemory(){this.observers.forEach((e,t)=>{t!=="lazy-loading"&&(e.disconnect(),this.observers.delete(t))}),"gc"in window&&window.gc()}static getMetrics(){return{...this.metrics}}static resetMetrics(){this.metrics={renderTime:0,interactionTime:0,scrollPerformance:0}}static addMobileCSSOptimizations(){if(!E.isMobile())return;const e=document.createElement("style");e.textContent=`
      /* Mobile Performance Optimizations */
      * {
        -webkit-tap-highlight-color: transparent;
      }

      .scroll-hidden {
        visibility: hidden !important;
      }

      /* Optimize animations for mobile */
      @media (max-width: 767px) {
        * {
          animation-duration: 0.2s !important;
          transition-duration: 0.2s !important;
        }

        /* Reduce motion for better performance */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Optimize transforms */
        .unit-card,
        .tab-nav-item,
        .btn {
          will-change: transform;
          transform: translateZ(0);
        }

        /* Optimize scrolling */
        .combat-log,
        .unit-family-content,
        .main-content {
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
          will-change: scroll-position;
        }
      }
    `,document.head.appendChild(e)}static cleanup(){this.observers.forEach(e=>e.disconnect()),this.observers.clear(),this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}h(M,"metrics",{renderTime:0,interactionTime:0,scrollPerformance:0}),h(M,"observers",new Map),h(M,"rafId",null);E.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{M.initialize(),M.addMobileCSSOptimizations()});E.addLayoutChangeListener(y=>{y!=="mobile"?M.cleanup():(M.initialize(),M.addMobileCSSOptimizations())});class k{static initialize(){this.createScreenReaderAnnouncer(),this.setupFocusManagement(),this.enhanceTabNavigation(),this.addTouchAccessibility(),this.setupKeyboardNavigation()}static createScreenReaderAnnouncer(){this.announcer||(this.announcer=document.createElement("div"),this.announcer.setAttribute("aria-live","polite"),this.announcer.setAttribute("aria-atomic","true"),this.announcer.className="sr-only",this.announcer.style.cssText=`
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `,document.body.appendChild(this.announcer))}static announce(e,t="polite"){this.announcer||this.createScreenReaderAnnouncer(),this.announcer.setAttribute("aria-live",t),this.announcer.textContent=e,setTimeout(()=>{this.announcer&&(this.announcer.textContent="")},1e3)}static setupFocusManagement(){document.addEventListener("focusin",e=>{this.focusTracker=e.target}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&E.isMobile()&&this.restoreFocus()})}static restoreFocus(){if(this.focusTracker&&document.contains(this.focusTracker))this.focusTracker.focus();else{const e=document.querySelector(".main-content > :not(.hidden)");if(e){const t=e.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');t&&t.focus()}}}static enhanceTabNavigation(){const e=document.querySelector(".mobile-tab-navigation");if(!e)return;e.setAttribute("role","tablist"),e.setAttribute("aria-label","Main navigation");const t=e.querySelectorAll(".tab-nav-item");t.forEach((n,i)=>{n.setAttribute("role","tab"),n.setAttribute("aria-selected",i===0?"true":"false"),n.setAttribute("tabindex",i===0?"0":"-1");const a=n.getAttribute("data-section");a&&(n.setAttribute("aria-controls",a),n.id=`tab-${a}`),n.addEventListener("keydown",s=>{this.handleTabKeydown(s,t,i)}),n.addEventListener("click",()=>{var r;const s=((r=n.querySelector(".tab-label"))==null?void 0:r.textContent)||"Section";this.announce(`Switched to ${s} section`),this.updateTabAria(t,i)})})}static handleTabKeydown(e,t,n){let i=n;switch(e.key){case"ArrowLeft":e.preventDefault(),i=n>0?n-1:t.length-1;break;case"ArrowRight":e.preventDefault(),i=n<t.length-1?n+1:0;break;case"Home":e.preventDefault(),i=0;break;case"End":e.preventDefault(),i=t.length-1;break;case"Enter":case" ":e.preventDefault(),t[n].click();return}i!==n&&(this.updateTabAria(t,i),t[i].focus())}static updateTabAria(e,t){e.forEach((n,i)=>{n.setAttribute("aria-selected",i===t?"true":"false"),n.setAttribute("tabindex",i===t?"0":"-1")})}static addTouchAccessibility(){document.addEventListener("touchstart",t=>{const n=t.target;n.matches("button, .unit-card, .tab-nav-item")&&n.setAttribute("aria-pressed","true")},{passive:!0}),document.addEventListener("touchend",t=>{const n=t.target;n.matches("button, .unit-card, .tab-nav-item")&&n.removeAttribute("aria-pressed")},{passive:!0});let e=0;document.addEventListener("touchend",t=>{const n=new Date().getTime(),i=n-e;i<500&&i>0&&t.target.matches(".unit-card, .army-composition")&&this.announce("Double tap to activate","assertive"),e=n})}static setupKeyboardNavigation(){this.addSkipLinks(),document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".bottom-sheet.visible, .mobile-loading-overlay.visible");if(t){e.preventDefault(),this.announce("Modal closed");const n=t.querySelector(".bottom-sheet-close");n&&n.click()}}})}static addSkipLinks(){const e=document.createElement("div");e.className="skip-links",e.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#mobile-navigation" class="skip-link">Skip to navigation</a>
    `,document.body.insertBefore(e,document.body.firstChild);const t=document.querySelector(".main-content");t&&!t.id&&(t.id="main-content");const n=document.querySelector(".mobile-tab-navigation");n&&!n.id&&(n.id="mobile-navigation")}static enhanceFormAccessibility(){document.querySelectorAll("form").forEach(t=>{t.querySelectorAll("input, select, textarea").forEach(i=>{var s;if(!t.querySelector(`label[for="${i.id}"]`)&&i.id){const r=document.createElement("label");r.setAttribute("for",i.id),r.textContent=i.getAttribute("placeholder")||"Input field",r.className="sr-only",(s=i.parentNode)==null||s.insertBefore(r,i)}i.hasAttribute("required")&&(i.setAttribute("aria-required","true"),i.addEventListener("invalid",()=>{this.announce("Required field is empty","assertive")}))}),t.addEventListener("submit",()=>{this.announce("Form submitted")})})}static addDynamicLabels(){document.querySelectorAll(".unit-card").forEach(i=>{var s;const a=(s=i.querySelector(".unit-name"))==null?void 0:s.textContent;a&&!i.getAttribute("aria-label")&&(i.setAttribute("aria-label",`Unit: ${a}`),i.setAttribute("role","button"))}),document.querySelectorAll(".army-composition").forEach((i,a)=>{i.getAttribute("aria-label")||(i.setAttribute("aria-label",`Army composition ${a+1}`),i.setAttribute("role","article"))}),document.querySelectorAll(".combat-action").forEach((i,a)=>{var s;if(!i.getAttribute("aria-label")){const r=((s=i.textContent)==null?void 0:s.substring(0,50))||"Combat action";i.setAttribute("aria-label",`Combat action ${a+1}: ${r}`)}})}static cleanup(){this.announcer&&this.announcer.parentNode&&(this.announcer.parentNode.removeChild(this.announcer),this.announcer=null);const e=document.querySelector(".skip-links");e&&e.parentNode&&e.parentNode.removeChild(e)}}h(k,"focusTracker",null),h(k,"announcer",null);E.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{k.initialize()});E.addLayoutChangeListener(y=>{y!=="mobile"?k.cleanup():k.initialize()});class Ae{constructor(){h(this,"container",null);h(this,"unitLoader");h(this,"optimizer",null);h(this,"damageOptimizer",null);h(this,"selectedUnits",new Set);h(this,"mercenaryLimits",{});h(this,"battleSimulation",null);h(this,"manualBattleSimulation",null);h(this,"currentOptimizedArmy",null);h(this,"currentMode","stacking");h(this,"enemyUnitManager",null);h(this,"selectedEnemyUnits",[]);h(this,"currentEnemyUnitSelector",null);h(this,"currentEnemyUnitSelectorContainer",null);h(this,"optimizationAbortController",null);h(this,"optimizationStartTime",0);h(this,"progressUpdateInterval",null);this.unitLoader=new se}async mount(e){this.container=e,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),A.initialize(),this.initializeAdvancedMobileFeatures()}render(){this.container&&(this.container.innerHTML=`
      <div class="army-calculator">
        <header class="header">
          <h1>🏰 TotalBattle Army Calculator</h1>
          <p class="subtitle">Optimize your army composition for maximum effectiveness</p>

          <!-- Mode Switcher -->
          <div class="mode-switcher">
            <div class="mode-tabs">
              <button id="stacking-mode-btn" class="mode-tab active" data-mode="stacking">
                <span class="mode-icon">🛡️</span>
                <span class="mode-label">Stacking Optimizer</span>
                <span class="mode-desc">Maximize budget usage</span>
              </button>
              <button id="damage-mode-btn" class="mode-tab" data-mode="damage">
                <span class="mode-icon">⚔️</span>
                <span class="mode-label">Damage Optimizer</span>
                <span class="mode-desc">Maximize damage output</span>
              </button>
              <button id="enemy-units-btn" class="mode-tab" data-mode="enemy-units">
                <span class="mode-icon">👹</span>
                <span class="mode-label">Enemy Units</span>
                <span class="mode-desc">Manage enemy units</span>
              </button>
              <button id="manual-battle-btn" class="mode-tab" data-mode="manual-battle">
                <span class="mode-icon">⚔️</span>
                <span class="mode-label">Manual Battle</span>
                <span class="mode-desc">Custom battle simulation</span>
              </button>
            </div>
          </div>
        </header>

        <main class="main-content">
          <!-- Army Configuration Section -->
          <section class="card main-config-section" id="config-section">
            <h1 class="main-title" id="config-title">⚔️ Army Configuration</h1>

            <!-- Mode-specific description -->
            <div class="mode-description" id="mode-description">
              <p id="stacking-description" class="mode-desc-text">
                Configure your army to maximize budget usage with optimal health stacking.
              </p>
              <p id="damage-description" class="mode-desc-text hidden">
                Configure your army to maximize damage output against enemy forces.
              </p>
            </div>

            <div class="config-grid">
              <!-- Resource Constraints -->
              <div class="config-group resource-constraints">
                <h2 class="section-title">💰 Resource Constraints</h2>
                <div class="input-group">
                  <label for="leadership-budget" class="input-label">Leadership Points:</label>
                  <input type="number" id="leadership-budget" min="0" value="0" class="input large-input">
                </div>
                <div class="input-group">
                  <label for="dominance-budget" class="input-label">Dominance Points:</label>
                  <input type="number" id="dominance-budget" min="0" value="0" class="input large-input">
                </div>

                <!-- Damage Optimization Controls -->
                <div class="damage-optimization-controls hidden" id="damage-controls">
                  <div class="input-group">
                    <label for="enemy-count" class="input-label">Enemy Groups:</label>
                    <input type="number" id="enemy-count" min="1" max="20" value="5" class="input large-input">
                    <small class="input-help">Number of enemy groups to optimize against</small>
                  </div>
                  <div class="input-group">
                    <label for="max-combinations" class="input-label">Max Combinations:</label>
                    <input type="number" id="max-combinations" min="10" max="200" value="50" class="input large-input">
                    <small class="input-help">Performance limit (higher = more thorough but slower)</small>
                  </div>
                  <div class="input-group">
                    <label class="input-label">Enemy Configuration:</label>
                    <button id="select-enemy-units-btn" class="btn btn-secondary">
                      👹 Select Enemy Units
                    </button>
                    <small class="input-help">Choose specific enemy units for battle optimization</small>
                  </div>
                </div>
              </div>

              <!-- Available Units -->
              <div class="config-group unit-selection-group">
                <h2 class="section-title">🛡️ Available Units</h2>
                <div class="unit-selection">
                  <div class="unit-controls">
                    <div class="search-box">
                      <input type="text" id="unit-search" placeholder="Search units..." class="input">
                    </div>
                    <div class="filter-tabs">
                      <button class="filter-tab active" data-filter="all">All (101)</button>
                      <button class="filter-tab" data-filter="Guardsmen">Guardsmen</button>
                      <button class="filter-tab" data-filter="Specialists">Specialists</button>
                      <button class="filter-tab" data-filter="Engineer Corps">Engineer Corps</button>
                      <button class="filter-tab" data-filter="Monsters">Monsters</button>
                      <button class="filter-tab" data-filter="Mercenaries">Mercenaries</button>
                    </div>
                    <div class="unit-type-filters">
                      <select id="unit-type-filter" class="input">
                        <option value="">All Unit Types</option>
                      </select>
                    </div>
                  </div>
                  <div class="selected-units-summary">
                    <span id="selected-count">0 units selected</span>
                    <button id="select-all-visible" class="btn btn-sm">Select All Visible</button>
                    <button id="clear-selection" class="btn btn-sm">Clear All</button>
                  </div>
                  <div id="unit-groups" class="unit-groups"></div>
                </div>
              </div>

              <!-- Mercenary Limits -->
              <div class="config-group mercenary-group">
                <h2 class="section-title">🗡️ Mercenary Limits</h2>
                <div id="mercenary-limits" class="mercenary-limits">
                  <p class="text-muted">Select mercenary units to set limits</p>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button id="optimize-btn" class="btn btn-success large-btn" disabled>
                <span id="optimize-btn-text">🚀 Optimize Army</span>
              </button>
              <button id="clear-btn" class="btn btn-secondary large-btn">🗑️ Clear Selection</button>
            </div>
          </section>

          <!-- Results Section -->
          <section class="card hidden" id="results-section">
            <h2 id="results-title">🎯 Optimization Results</h2>

            <div id="optimization-stats" class="optimization-stats"></div>

            <!-- Stacking Results -->
            <div id="stacking-results" class="results-container">
              <div id="army-compositions" class="army-compositions"></div>
            </div>

            <!-- Damage Results -->
            <div id="damage-results" class="results-container hidden">
              <div id="damage-army-list" class="damage-army-list"></div>

              <!-- Selected Army Details -->
              <div id="selected-army-details" class="selected-army-details hidden">
                <h3>📋 Selected Army Details</h3>
                <div id="selected-army-composition" class="selected-army-composition"></div>
              </div>
            </div>
          </section>

          <!-- Enemy Units Management Section -->
          <section class="card hidden" id="enemy-units-section">
            <h2>👹 Enemy Units Management</h2>
            <div id="enemy-units-container">
              <!-- Enemy units manager component will be mounted here -->
            </div>
          </section>

          <!-- Manual Battle Simulation Section -->
          <section class="card hidden" id="manual-battle-section">
            <div id="manual-battle-container">
              <!-- Manual battle simulation component will be mounted here -->
            </div>
          </section>

          <!-- Battle Simulation Section -->
          <div id="battle-simulation-container" class="hidden">
            <!-- Battle simulation component will be mounted here -->
          </div>

        </main>

        <!-- Loading Modal -->
        <div id="loading-modal" class="modal hidden">
          <div class="modal-content">
            <div class="loading-spinner"></div>
            <p>Optimizing army compositions...</p>
          </div>
        </div>

        <footer class="footer">
          <p>Built for TotalBattle strategy optimization</p>
        </footer>
      </div>
    `,this.addUnitSelectionStyles())}addUnitSelectionStyles(){const e=document.createElement("style");e.textContent=`
      /* Main Layout Improvements */
      .main-config-section {
        margin-bottom: 3rem;
      }

      .main-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #2c3e50;
        text-align: center;
        font-weight: 700;
      }

      .section-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: #34495e;
        font-weight: 600;
        border-bottom: 2px solid #3498db;
        padding-bottom: 0.5rem;
      }

      .config-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        margin-bottom: 2rem;
      }

      .config-group {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
      }

      .resource-constraints {
        background: linear-gradient(135deg, #fff5f5 0%, #f8f9fa 100%);
      }

      .unit-selection-group {
        background: linear-gradient(135deg, #f0f8ff 0%, #f8f9fa 100%);
      }

      .mercenary-group {
        background: linear-gradient(135deg, #fff8f0 0%, #f8f9fa 100%);
        margin-top: 2rem;
      }

      .input-group {
        margin-bottom: 1.5rem;
      }

      .input-label {
        display: block;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: #2c3e50;
      }

      .large-input {
        font-size: 1.2rem;
        padding: 0.75rem 1rem;
        border: 2px solid #bdc3c7;
        border-radius: 6px;
        width: 200px;
        transition: border-color 0.3s;
      }

      .large-input:focus {
        border-color: #3498db;
        outline: none;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
      }

      .action-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 2px solid #ecf0f1;
      }

      .large-btn {
        font-size: 1.3rem;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        min-width: 200px;
        transition: all 0.3s;
      }

      .large-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      /* Compact Data Section */
      .compact-data-section {
        margin-top: 3rem;
        padding: 1rem;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
      }

      .compact-data-section h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        color: #6c757d;
      }



      .data-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
      }

      .data-table th,
      .data-table td {
        padding: 0.5rem;
        text-align: center;
        border: 1px solid #dee2e6;
      }

      .data-table th {
        background: #e9ecef;
        font-weight: 600;
        color: #495057;
      }

      .data-table td {
        background: white;
      }

      /* Unit Selection Styles */
      .unit-controls {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .filter-tabs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .filter-tab {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.2s;
      }

      .filter-tab:hover {
        background: #f5f5f5;
      }

      .filter-tab.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
      }

      .unit-type-filters {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .selected-units-summary {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #f8f9fa;
        border-radius: 4px;
        font-size: 0.9rem;
      }

      .selected-units-summary .btn {
        padding: 0.25rem 0.5rem;
        font-size: 0.8rem;
      }

      .unit-groups {
        max-height: 500px;
        overflow-y: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      /* Main Category Styles */
      .main-category {
        border-bottom: 2px solid #ddd;
      }

      .main-category:last-child {
        border-bottom: none;
      }

      .main-category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #e9ecef;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .main-category-header:hover {
        background: #dee2e6;
      }

      .category-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .category-title h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #333;
      }

      .main-category-content {
        transition: all 0.3s ease;
      }

      .main-category-content.collapsed {
        display: none;
      }

      /* Sub Category Styles */
      .sub-category {
        border-bottom: 1px solid #eee;
        margin-left: 1rem;
      }

      .sub-category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f8f9fa;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .sub-category-header:hover {
        background: #f1f3f4;
      }

      .subcategory-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .subcategory-title h4 {
        margin: 0;
        font-size: 1rem;
        color: #444;
      }

      .sub-category-content {
        transition: all 0.3s ease;
      }

      .sub-category-content.collapsed {
        display: none;
      }

      /* Unit Family Styles */
      .unit-family {
        border-bottom: 1px solid #f0f0f0;
        margin-left: 1rem;
      }

      .unit-family-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: #fafbfc;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .unit-family-header:hover {
        background: #f5f6f7;
      }

      .family-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .family-title h5 {
        margin: 0;
        font-size: 0.9rem;
        color: #555;
      }

      .unit-family-content {
        transition: all 0.3s ease;
      }

      .unit-family-content.collapsed {
        display: none;
      }

      /* Expand Icons */
      .expand-icon {
        font-size: 0.8rem;
        color: #666;
        transition: transform 0.2s;
      }

      /* Action Buttons */
      .category-actions,
      .subcategory-actions,
      .family-actions {
        display: flex;
        gap: 0.25rem;
      }

      .unit-group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
      }

      .group-title {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .hierarchy {
        font-size: 0.75rem;
        color: #666;
        font-style: italic;
      }

      .unit-group-header h4 {
        margin: 0;
        font-size: 1rem;
        color: #333;
      }

      .group-actions {
        display: flex;
        gap: 0.5rem;
      }

      .btn-xs {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        border-radius: 3px;
      }

      /* Unit Cards Grid */
      .unit-family-content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 0.5rem;
        padding: 0.75rem;
        background: white;
      }

      /* Mobile responsive grid adjustments */
      @media (max-width: 767px) {
        .unit-family-content {
          grid-template-columns: 1fr;
          gap: 0.75rem;
          padding: 1rem;
        }

        .unit-card {
          min-height: 48px;
          padding: 1rem;
        }

        .unit-name {
          font-size: 1rem;
        }

        .unit-cost {
          font-size: 0.9rem;
        }

        .stat {
          font-size: 0.9rem;
        }
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        .unit-family-content {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .unit-card {
          min-height: 44px;
          padding: 0.875rem;
        }
      }

      .unit-card {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
        /* Mobile touch optimizations */
        min-height: 44px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .unit-card:hover {
        border-color: #007bff;
        box-shadow: 0 2px 4px rgba(0,123,255,0.1);
      }

      .unit-card:active {
        transform: scale(0.98);
        background: #f8fafc;
      }

      .unit-card.selected {
        border-color: #28a745;
        background: #f8fff9;
        box-shadow: 0 2px 4px rgba(40,167,69,0.2);
      }

      .unit-card.selected .unit-name {
        color: #1e7e34 !important; /* Dark green for better contrast on light green background */
        font-weight: 700;
      }

      .unit-card.selected .unit-cost {
        color: #155724 !important; /* Darker green for cost text */
        font-weight: 600;
      }

      .unit-card.selected .stat {
        color: #155724 !important; /* Darker green for stats */
        font-weight: 500;
      }

      .unit-card.selected .unit-types {
        color: #155724 !important; /* Darker green for unit types */
        font-weight: 500;
      }

      .unit-card.touch-active {
        transform: scale(0.98);
        background: #f0f9ff;
      }

      .unit-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }

      .unit-name {
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
        line-height: 1.2;
      }

      .unit-cost {
        font-size: 0.8rem;
        color: #666;
        white-space: nowrap;
      }

      .unit-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }

      .stat {
        font-size: 0.8rem;
        color: #555;
      }

      .unit-types {
        font-size: 0.75rem;
        color: #777;
        font-style: italic;
      }

      .no-units {
        text-align: center;
        padding: 2rem;
        color: #666;
        font-style: italic;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .main-title {
          font-size: 2rem;
        }

        .section-title {
          font-size: 1.3rem;
        }

        .large-input {
          width: 100%;
          font-size: 1.1rem;
        }

        .action-buttons {
          flex-direction: column;
          align-items: center;
        }

        .large-btn {
          width: 100%;
          max-width: 300px;
        }

        .unit-family-content {
          grid-template-columns: 1fr;
        }

        .filter-tabs {
          flex-direction: column;
        }

        .selected-units-summary {
          flex-direction: column;
          gap: 0.5rem;
          align-items: stretch;
        }

        .data-table {
          font-size: 0.8rem;
        }

        .data-table th,
        .data-table td {
          padding: 0.3rem;
        }
      }

      /* Damage Optimization Results Styling Fixes */
      .damage-army-card .unit-name {
        color: #2c3e50 !important; /* Dark text for better readability */
        font-weight: 600;
        font-size: 0.9rem;
      }

      .damage-army-card .unit-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .damage-army-card .unit-item:last-child {
        border-bottom: none;
      }

      .damage-army-card .unit-count {
        font-weight: 700;
        color: #27ae60;
        min-width: 3rem;
        text-align: right;
      }
    `,document.head.appendChild(e)}async loadInitialData(){try{await this.unitLoader.loadPresetUnits(),this.displayUnitList(),this.updateOptimizeButton()}catch(e){console.error("Failed to load unit data:",e)}}attachEventListeners(){const e=document.getElementById("stacking-mode-btn"),t=document.getElementById("damage-mode-btn"),n=document.getElementById("enemy-units-btn"),i=document.getElementById("unit-search"),a=document.getElementById("unit-type-filter"),s=document.getElementById("optimize-btn"),r=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),c=document.getElementById("leadership-budget"),m=document.getElementById("dominance-budget"),d=document.getElementById("select-enemy-units-btn"),u=document.getElementById("enemy-count");e&&e.addEventListener("click",()=>this.switchMode("stacking")),t&&t.addEventListener("click",()=>this.switchMode("damage")),n&&n.addEventListener("click",()=>this.switchMode("enemy-units"));const p=document.getElementById("manual-battle-btn");p&&p.addEventListener("click",()=>this.switchMode("manual-battle")),d&&d.addEventListener("click",()=>this.openEnemyUnitSelector()),i&&i.addEventListener("input",()=>this.filterAndDisplayUnits()),a&&a.addEventListener("change",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("click",()=>this.optimizeArmy()),r&&r.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),c&&c.addEventListener("input",()=>this.updateOptimizeButton()),m&&m.addEventListener("input",()=>this.updateOptimizeButton()),u&&u.addEventListener("input",()=>this.handleEnemyGroupsChange()),document.addEventListener("click",g=>{const b=g.target;b.classList.contains("filter-tab")&&this.handleFilterTabClick(b)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const e=document.getElementById("unit-type-filter");if(!e)return;const t=this.unitLoader.getUniqueUnitTypes();e.innerHTML='<option value="">All Unit Types</option>',t.forEach(n=>{const i=document.createElement("option");i.value=n,i.textContent=n,e.appendChild(i)})}updateFilterTabCounts(){const e=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const i=n.getAttribute("data-filter");let a=0;i==="all"?a=e.length:a=e.filter(s=>this.getMainCategory(s)===i).length,n.textContent=`${i==="all"?"All":i} (${a})`})}handleFilterTabClick(e){document.querySelectorAll(".filter-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var a,s,r;const e=((a=document.getElementById("unit-search"))==null?void 0:a.value)||"",t=((s=document.querySelector(".filter-tab.active"))==null?void 0:s.getAttribute("data-filter"))||"all",n=((r=document.getElementById("unit-type-filter"))==null?void 0:r.value)||"";let i=this.unitLoader.getAllUnits();if(t!=="all"&&(i=i.filter(o=>this.getMainCategory(o)===t)),n&&(i=i.filter(o=>o.unit_types.includes(n))),e){const o=e.toLowerCase();i=i.filter(l=>l.name.toLowerCase().includes(o)||l.unit_types.some(c=>c.toLowerCase().includes(o)))}this.renderGroupedUnits(i),this.updateSelectedSummary()}renderGroupedUnits(e){const t=document.getElementById("unit-groups");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(e);Object.entries(n).forEach(([i,a])=>{const s=this.createMainCategoryElement(i,a);t.appendChild(s)}),this.attachAllEventListeners(n)}createHierarchicalGroups(e){const t={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return e.forEach(n=>{const i=this.getMainCategory(n),a=this.getSubCategory(n),s=this.getUnitFamily(n);t[i][a]||(t[i][a]={}),t[i][a][s]||(t[i][a][s]=[]),t[i][a][s].push(n)}),Object.values(t).forEach(n=>{Object.values(n).forEach(i=>{Object.values(i).forEach(a=>{a.sort((s,r)=>s.strength-r.strength)})})}),t}getMainCategory(e){if(e.cost_type==="Mercenary"||(e.authority_cost??0)>0)return"Mercenaries";const t=e.unit_types;return t.includes("Engineer corps")||t.includes("Siege engine")?"Engineer Corps":t.includes("Guardsman")?"Guardsmen":t.includes("Specialist")?"Specialists":t.includes("Beast")||t.includes("Dragon")||t.includes("Giant")||t.includes("Elemental")||t.includes("ELEMENTAL")||t.includes("Flying")&&!t.includes("Human")?"Monsters":t.includes("Human")&&(t.includes("Melee")||t.includes("Ranged")||t.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(e){const t=e.unit_types,n=e.name.toUpperCase(),i=this.getMainCategory(e);if(i==="Mercenaries")return t.includes("Guardsman")?"Elite Forces":"Special Forces";if(i==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(t.includes("Siege engine"))return"Siege Engines"}if(i==="Monsters"){if(t.includes("Dragon"))return"Dragons";if(t.includes("Giant"))return"Giants";if(t.includes("Beast"))return"Beasts";if(t.includes("Elemental")||t.includes("ELEMENTAL"))return"Elementals";if(t.includes("Flying"))return"Flying"}if(i==="Guardsmen"||i==="Specialists"){if(t.includes("Ranged"))return"Ranged";if(t.includes("Melee"))return"Melee";if(t.includes("Mounted"))return"Mounted";if(t.includes("Flying")||t.includes("Beast"))return"Flying";if(t.includes("Scout"))return"Scouts"}return t.includes("Human")?"Infantry":"Other"}getUnitFamily(e){let t=e.name;return t=t.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),t.includes("HEAVY "),t}createMainCategoryElement(e,t){const n=document.createElement("div");n.className="main-category";const i=this.countUnitsInCategory(t),a=this.countSelectedUnitsInCategory(t);return n.innerHTML=`
      <div class="main-category-header" data-category="${e}">
        <div class="category-title">
          <h3>${e} (${a}/${i})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${e}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${e}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(t).map(([s,r])=>this.createSubCategoryHTML(e,s,r)).join("")}
      </div>
    `,n}createSubCategoryHTML(e,t,n){const i=Object.values(n).reduce((s,r)=>s+r.length,0),a=Object.values(n).reduce((s,r)=>s+r.filter(o=>this.selectedUnits.has(o.name)).length,0);return`
      <div class="sub-category" data-category="${e}" data-subcategory="${t}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${t} (${a}/${i})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(n).map(([s,r])=>this.createUnitFamilyHTML(s,r)).join("")}
        </div>
      </div>
    `}createUnitFamilyHTML(e,t){const n=t.filter(i=>this.selectedUnits.has(i.name)).length;return`
      <div class="unit-family" data-family="${e}">
        <div class="unit-family-header">
          <div class="family-title">
            <h5>${e} (${n}/${t.length})</h5>
            <span class="expand-icon">▼</span>
          </div>
          <div class="family-actions">
            <button class="btn btn-xs select-family">Select All</button>
            <button class="btn btn-xs deselect-family">Deselect All</button>
          </div>
        </div>
        <div class="unit-family-content collapsed">
          ${t.map(i=>this.createUnitCard(i)).join("")}
        </div>
      </div>
    `}createUnitCard(e){const t=this.selectedUnits.has(e.name),n=this.getUnitCost(e);return`
      <div class="unit-card ${t?"selected":""}" data-unit="${e.name}">
        <div class="unit-card-header">
          <div class="unit-name">${e.name}</div>
          <div class="unit-cost">${e.cost_type}: ${n}</div>
        </div>
        <div class="unit-stats">
          <span class="stat">HP: ${e.health.toLocaleString()}</span>
          <span class="stat">STR: ${e.strength.toLocaleString()}</span>
        </div>
        <div class="unit-types">${e.unit_types.slice(0,3).join(", ")}${e.unit_types.length>3?"...":""}</div>
      </div>
    `}attachAllEventListeners(e){document.querySelectorAll(".main-category").forEach((t,n)=>{const a=Object.keys(e)[n];if(a){const s=e[a];this.attachMainCategoryListeners(t,a,s)}}),document.querySelectorAll(".sub-category").forEach(t=>{var a;const n=t.getAttribute("data-category"),i=t.getAttribute("data-subcategory");if(n&&i&&((a=e[n])!=null&&a[i])){const s=e[n][i];this.attachSubCategoryListeners(t,s)}}),document.querySelectorAll(".unit-family").forEach(t=>{const n=t.getAttribute("data-family");let i=[];Object.values(e).forEach(a=>{Object.values(a).forEach(s=>{s[n]&&(i=s[n])})}),i.length>0&&this.attachUnitFamilyListeners(t,i)})}countUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((i,a)=>i+a.length,0),0)}countSelectedUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((i,a)=>i+a.filter(s=>this.selectedUnits.has(s.name)).length,0),0)}attachMainCategoryListeners(e,t,n){const i=e.querySelector(".main-category-header"),a=e.querySelector(".main-category-content"),s=e.querySelector(".expand-icon");if(!i||!a||!s){console.warn("Missing main-category elements for",t,{header:!!i,content:!!a,expandIcon:!!s});return}i.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",t,"collapsed:",a.classList.contains("collapsed")),a.classList.toggle("collapsed"),s.textContent=a.classList.contains("collapsed")?"▼":"▲"});const r=e.querySelector(".select-category"),o=e.querySelector(".deselect-category");r&&r.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(n)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(e,t){const n=e.querySelector(".sub-category-header"),i=e.querySelector(".sub-category-content"),a=e.querySelector(".expand-icon");if(!n||!i||!a){console.warn("Missing sub-category elements:",{header:!!n,content:!!i,expandIcon:!!a});return}n.addEventListener("click",o=>{if(o.target.classList.contains("btn")){o.stopPropagation();return}console.log("Sub-category header clicked, toggling:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),a.textContent=i.classList.contains("collapsed")?"▼":"▲"});const s=e.querySelector(".select-subcategory"),r=e.querySelector(".deselect-subcategory");s&&s.addEventListener("click",o=>{o.stopPropagation(),this.selectAllInFamilies(t)}),r&&r.addEventListener("click",o=>{o.stopPropagation(),this.deselectAllInFamilies(t)})}attachUnitFamilyListeners(e,t){const n=e.querySelector(".unit-family-header"),i=e.querySelector(".unit-family-content"),a=e.querySelector(".expand-icon");n.addEventListener("click",l=>{l.target.classList.contains("btn")||(i.classList.toggle("collapsed"),a.textContent=i.classList.contains("collapsed")?"▼":"▲")});const s=e.querySelector(".select-family"),r=e.querySelector(".deselect-family");s&&s.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(t)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(t)}),e.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-unit");if(c){const m=this.unitLoader.getUnitByName(c);m&&this.toggleUnitSelection(m)}})})}getUnitCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost??0;case"Dominance":return e.dominance_cost??0;case"Authority":case"Mercenary":return e.authority_cost??0;default:return 0}}toggleUnitSelection(e){this.selectedUnits.has(e.name)?(this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]):(this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton(),E.isMobile()&&this.addFloatingActionButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(e=>{const t=e.getAttribute("data-unit");t&&(this.selectedUnits.has(t)?e.classList.add("selected"):e.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((e,t)=>{const n=e.querySelector(".category-title h3");if(n){const a=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][t];if(a){const{selected:s,total:r}=this.countUnitsInMainCategory(a),l=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${l} (${s}/${r})`}}}),document.querySelectorAll(".sub-category").forEach(e=>{const t=e.querySelector(".subcategory-title h4"),n=e.getAttribute("data-category"),i=e.getAttribute("data-subcategory");if(t&&n&&i){const{selected:a,total:s}=this.countUnitsInSubCategory(n,i),o=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${o} (${a}/${s})`}}),document.querySelectorAll(".unit-family").forEach(e=>{const t=e.querySelector(".family-title h5"),n=e.getAttribute("data-family");if(t&&n){const{selected:i,total:a}=this.countUnitsInFamily(n),r=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${r} (${i}/${a})`}})}countUnitsInMainCategory(e){const n=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===e);return{selected:n.filter(a=>this.selectedUnits.has(a.name)).length,total:n.length}}countUnitsInSubCategory(e,t){const i=this.unitLoader.getAllUnits().filter(s=>this.getMainCategory(s)===e&&this.getSubCategory(s)===t);return{selected:i.filter(s=>this.selectedUnits.has(s.name)).length,total:i.length}}countUnitsInFamily(e){const n=this.unitLoader.getAllUnits().filter(a=>this.getUnitFamily(a)===e);return{selected:n.filter(a=>this.selectedUnits.has(a.name)).length,total:n.length}}updateSelectedSummary(){const e=document.getElementById("selected-count");e&&(e.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(t=>{const n=t.getAttribute("data-unit");if(n){const i=this.unitLoader.getUnitByName(n);i&&(this.selectedUnits.add(i.name),(i.cost_type==="Mercenary"||i.cost_type==="Authority")&&(this.mercenaryLimits[i.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(e){Object.values(e).forEach(t=>{this.selectAllInFamilies(t)})}deselectAllInCategory(e){Object.values(e).forEach(t=>{this.deselectAllInFamilies(t)})}selectAllInFamilies(e){Object.values(e).forEach(t=>{this.selectAllUnits(t)})}deselectAllInFamilies(e){Object.values(e).forEach(t=>{this.deselectAllUnits(t)})}selectAllUnits(e){e.forEach(t=>{this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(e){e.forEach(t=>{this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const e=document.getElementById("mercenary-limits");if(!e)return;const t=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&(n.cost_type==="Mercenary"||n.cost_type==="Authority"));if(t.length===0){e.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}e.innerHTML="",t.forEach(n=>{if(!n)return;const i=document.createElement("div");i.className="mercenary-item";const a=n.cost_type==="Authority"?"⚔️":"🗡️",s=n.cost_type==="Authority"?`AUTH: ${n.authority_cost}`:`AUTH: ${n.authority_cost}`;i.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${a} ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health}, ${s})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,i.querySelector("input").addEventListener("change",o=>{const l=o.target;this.mercenaryLimits[l.dataset.unit]=parseInt(l.value)||1}),e.appendChild(i)})}updateOptimizeButton(){const e=document.getElementById("optimize-btn"),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!e||!t||!n)return;const i=this.selectedUnits.size>0,a=parseInt(t.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;e.disabled=!i||!a}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(e){console.error("Optimization failed:",e),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new O(e);const t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},a=await this.optimizer.optimizeArmy(i);this.displayStackingResults(a)}async optimizeForDamage(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i=document.getElementById("enemy-count"),a=document.getElementById("max-combinations"),s={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(i.value)||5,maxCombinations:parseInt(a.value)||50,specificEnemyUnits:this.selectedEnemyUnits.length>0?[...this.selectedEnemyUnits]:void 0};await this.runDamageOptimizationWithProgress(s,e)}async runDamageOptimizationWithProgress(e,t){this.optimizationAbortController=new AbortController,E.isMobile()?B.showMobileLoading("Optimizing army composition..."):this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new pe);const n={...e,signal:this.optimizationAbortController.signal,onProgress:a=>{this.updateProgressModal(a.progress,a.message,{combinationsEvaluated:a.combinationsEvaluated,totalToEvaluate:a.totalToEvaluate,phase:a.phase,estimatedRemainingMs:a.estimatedRemainingMs})}},i=await this.damageOptimizer.optimizeForDamage(n,t);await this.delay(500),E.isMobile()?B.hideMobileLoading():this.hideProgressModal(),this.displayDamageResults(i)}catch(n){E.isMobile()?B.hideMobileLoading():this.hideProgressModal(),n instanceof Error&&n.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",n),alert(`Optimization failed: ${n instanceof Error?n.message:"Unknown error"}`))}}delay(e){return new Promise(t=>setTimeout(t,e))}displayStackingResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),i=document.getElementById("results-section"),a=document.getElementById("stacking-results"),s=document.getElementById("damage-results");!t||!n||!i||(a&&a.classList.remove("hidden"),s&&s.classList.add("hidden"),t.innerHTML=`
      <div class="stat-card">
        <div class="stat-value">${e.compositions.length}</div>
        <div class="stat-label">Valid Solutions</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${e.totalCombinationsEvaluated.toLocaleString()}</div>
        <div class="stat-label">Combinations Tested</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(e.executionTimeMs)}ms</div>
        <div class="stat-label">Execution Time</div>
      </div>
    `,n.innerHTML="",e.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.compositions.forEach((r,o)=>{const l=this.createCompositionElement(r,o+1);n.appendChild(l)}),i.classList.remove("hidden"),A.showSection("results-section"),e.compositions.length>0&&(this.currentOptimizedArmy=e.compositions[0]))}displayDamageResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("damage-army-list"),i=document.getElementById("results-section"),a=document.getElementById("stacking-results"),s=document.getElementById("damage-results");if(!t||!n||!i)return;a&&a.classList.add("hidden"),s&&s.classList.remove("hidden");const r=document.getElementById("battle-simulation-container");r&&(r.classList.add("hidden"),A.hideSection("battle-simulation-container")),t.innerHTML=`
      <div class="stat-card">
        <div class="stat-value">${e.rankedResults.length}</div>
        <div class="stat-label">Army Options</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${e.combinationsEvaluated.toLocaleString()}</div>
        <div class="stat-label">Combinations Tested</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(e.optimizationTimeMs)}ms</div>
        <div class="stat-label">Execution Time</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${e.algorithmUsed}</div>
        <div class="stat-label">Algorithm</div>
      </div>
    `,n.innerHTML="",e.rankedResults.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.rankedResults.slice(0,10).forEach((o,l)=>{const c=this.createDamageArmyElement(o,l+1);n.appendChild(c)}),i.classList.remove("hidden"),A.showSection("results-section"),E.isMobile()||setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(e){const t=document.getElementById("battle-simulation-container");!t||!this.currentOptimizedArmy||(t.classList.remove("hidden"),A.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new G,this.battleSimulation.initialize(this.unitLoader),this.battleSimulation.mount(t,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(e),E.isMobile()||t.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const e=document.getElementById("battle-simulation-container");e&&(e.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new G,this.battleSimulation.initialize(this.unitLoader)),this.battleSimulation.mount(e,this.currentOptimizedArmy),A.showSection("battle-simulation-container"),E.isMobile()||setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(e,t){var l;const n=document.createElement("div");n.className="army-composition";const i=((l=this.optimizer)==null?void 0:l.explainStacking(e))||"No stacking explanation available",a=`
      <div class="composition-header">
        <div class="composition-title">Solution ${t} ${e.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${e.efficiencyScore.toFixed(2)}</div>
      </div>
    `,s=i.split(`
`).map(c=>c.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${c}</h3>`:c.includes("═".repeat(60))?'<hr class="title-divider">':c.includes("📊 ARMY SUMMARY")||c.includes("🗡️ MERCENARY FORCES")||c.includes("👑 LEADERSHIP FORCES")||c.includes("⚡ DOMINANCE FORCES")||c.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${c}</h4>`:c.includes("─".repeat(30))||c.includes("─".repeat(40))?'<hr class="section-divider">':c.includes("└─")?`<div class="unit-detail">${c}</div>`:c.trim()&&!c.includes("═")&&!c.includes("─")?`<div class="unit-line">${c}</div>`:c.trim()===""?'<div class="spacing"></div>':"").filter(c=>c!=="").join(""),r=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${t-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;n.innerHTML=a+'<div class="composition-content">'+s+"</div>"+r;const o=n.querySelector(".simulate-btn");return o&&o.addEventListener("click",()=>{this.currentOptimizedArmy=e,this.showBattleSimulation()}),n}createDamageArmyElement(e,t){const n=document.createElement("div");n.className="damage-army-card",n.setAttribute("data-army-index",(t-1).toString());const i=e.armyComposition.totalDominanceCost===0?"Leadership":e.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",a=i==="Leadership"?"🛡️":i==="Dominance"?"👹":"⚔️";return n.addEventListener("click",()=>this.selectDamageArmy(e,t-1)),n.innerHTML=`
      <div class="damage-army-header">
        <div class="army-rank">#${t}</div>
        <div class="army-strategy">
          <span class="strategy-icon">${a}</span>
          <span class="strategy-label">${i} Strategy</span>
        </div>
        <div class="army-damage">
          <span class="damage-value">${e.averageDamagePerBattle.toLocaleString()}</span>
          <span class="damage-label">avg damage/battle</span>
        </div>
        <div class="click-indicator">
          <span class="click-text">Click for details</span>
          <span class="click-icon">👆</span>
        </div>
      </div>

      <div class="damage-army-content">
        <div class="army-composition-summary">
          <h4>Army Composition:</h4>
          <div class="unit-list">
            ${Object.entries(e.armyComposition.units).map(([s,r])=>`<div class="unit-item">
                <span class="unit-count">${r.toLocaleString()}x</span>
                <span class="unit-name">${s}</span>
              </div>`).join("")}
          </div>
        </div>

        <div class="army-stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Strength:</span>
            <span class="stat-value">${e.armyComposition.totalStrength.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Budget Usage:</span>
            <span class="stat-value">${e.armyComposition.totalLeadershipCost}L / ${e.armyComposition.totalDominanceCost}D</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Battle Range:</span>
            <span class="stat-value">${e.battleAnalysis.worstCase.totalDamageDealt.toLocaleString()} - ${e.battleAnalysis.bestCase.totalDamageDealt.toLocaleString()} damage</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Silver Cost:</span>
            <span class="stat-value">${e.totalSilverCost.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Food Cost:</span>
            <span class="stat-value">${e.totalFoodConsumption.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Efficiency:</span>
            <span class="stat-value">${e.damageEfficiencyScore.toFixed(3)}</span>
          </div>
        </div>
      </div>
    `,n}selectDamageArmy(e,t){document.querySelectorAll(".damage-army-card").forEach((i,a)=>{i.classList.toggle("selected",a===t)}),this.showSelectedArmyDetails(e),this.currentOptimizedArmy=e.armyComposition,this.showBattleSimulationWithResults(e.battleAnalysis)}showSelectedArmyDetails(e){const t=document.getElementById("selected-army-details"),n=document.getElementById("selected-army-composition");if(!t||!n)return;const i=e.armyComposition,a=this.unitLoader.getAvailableUnits(Object.keys(i.units)),r=new O(a).explainStacking(i);n.innerHTML=`
      <div class="selected-army-header">
        <h4>Army Composition Details</h4>
        <div class="army-summary-stats">
          <span class="summary-stat">
            <strong>Total Damage:</strong> ${e.averageDamagePerBattle.toLocaleString()}/battle
          </span>
          <span class="summary-stat">
            <strong>Total Strength:</strong> ${i.totalStrength.toLocaleString()}
          </span>
          <span class="summary-stat">
            <strong>Army Size:</strong> ${Object.values(i.units).reduce((o,l)=>o+l,0).toLocaleString()} units
          </span>
        </div>
      </div>

      <div class="composition-explanation">
        ${r.split(`
`).map(o=>o.trim()===""?'<div class="spacing"></div>':o.includes("Total")||o.includes("Budget")?`<div class="summary-line"><strong>${o}</strong></div>`:o.includes("→")?`<div class="unit-line">${o}</div>`:o.includes("✓")||o.includes("Valid")?`<div class="validation-line success">${o}</div>`:`<div class="explanation-line">${o}</div>`).join("")}
      </div>

      <div class="battle-performance-summary">
        <h5>Battle Performance Analysis</h5>
        <div class="performance-grid">
          <div class="performance-item">
            <span class="performance-label">Best Case:</span>
            <span class="performance-value">${e.battleAnalysis.bestCase.totalDamageDealt.toLocaleString()} damage in ${e.battleAnalysis.bestCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Worst Case:</span>
            <span class="performance-value">${e.battleAnalysis.worstCase.totalDamageDealt.toLocaleString()} damage in ${e.battleAnalysis.worstCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Efficiency Score:</span>
            <span class="performance-value">${e.damageEfficiencyScore.toFixed(3)}</span>
          </div>
        </div>
      </div>

      <div class="combat-logs-section">
        <h5>📜 Complete Combat Logs</h5>

        <div class="combat-scenarios">
          <div class="combat-scenario">
            <h6>🟢 Best Case Scenario (You Attack First)</h6>
            <div class="combat-log">
              ${this.formatCombatLog(e.battleAnalysis.bestCase.combatLog)}
            </div>
          </div>

          <div class="combat-scenario">
            <h6>🔴 Worst Case Scenario (Enemy Attacks First)</h6>
            <div class="combat-log">
              ${this.formatCombatLog(e.battleAnalysis.worstCase.combatLog)}
            </div>
          </div>
        </div>
      </div>
    `,t.classList.remove("hidden"),t.scrollIntoView({behavior:"smooth",block:"nearest"})}formatCombatLog(e){return!e||e.length===0?'<div class="no-combat-log">No combat actions recorded</div>':e.map((t,n)=>{const i=t.attacker&&!t.attacker.includes("Enemy");return`
        <div class="combat-action ${i?"player-action":"enemy-action"}">
          <div class="action-header">
            <span class="turn-number">Turn ${t.turn}</span>
            <span class="action-type">${i?"⚔️ Player Attack":"🛡️ Enemy Attack"}</span>
          </div>
          <div class="action-details">
            <strong>${t.attacker}</strong> ${t.action} <strong>${t.target}</strong>
            ${t.damageDealt?`<span class="damage-dealt">(${t.damageDealt.toLocaleString()} damage)</span>`:""}
            ${t.eliminated?'<span class="eliminated-indicator">💀 Eliminated</span>':""}
          </div>
        </div>
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const e=document.getElementById("leadership-budget"),t=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),i=document.getElementById("battle-simulation-container");e&&(e.value="0"),t&&(t.value="0"),n&&(n.classList.add("hidden"),A.hideSection("results-section")),i&&(i.classList.add("hidden"),A.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(e){this.currentMode=e;const t=document.getElementById("stacking-mode-btn"),n=document.getElementById("damage-mode-btn"),i=document.getElementById("enemy-units-btn"),a=document.getElementById("manual-battle-btn");t&&n&&i&&a&&(t.classList.toggle("active",e==="stacking"),n.classList.toggle("active",e==="damage"),i.classList.toggle("active",e==="enemy-units"),a.classList.toggle("active",e==="manual-battle"));const s=document.getElementById("stacking-description"),r=document.getElementById("damage-description");s&&r&&(s.classList.toggle("hidden",e!=="stacking"),r.classList.toggle("hidden",e!=="damage"));const o=document.getElementById("damage-controls");o&&o.classList.toggle("hidden",e!=="damage");const l=document.getElementById("optimize-btn-text");l&&(e==="stacking"?l.textContent="🚀 Optimize Army":e==="damage"?l.textContent="⚔️ Optimize for Damage":e==="enemy-units"?l.textContent="👹 Manage Enemy Units":e==="manual-battle"&&(l.textContent="⚔️ Configure Battle"));const c=document.getElementById("results-title");c&&(e==="stacking"?c.textContent="🎯 Stacking Results":e==="damage"?c.textContent="⚔️ Damage Optimization Results":e==="enemy-units"?c.textContent="👹 Enemy Units Management":e==="manual-battle"&&(c.textContent="⚔️ Manual Battle Results"));const m=document.getElementById("config-section"),d=document.getElementById("results-section"),u=document.getElementById("enemy-units-section"),p=document.getElementById("manual-battle-section"),g=document.getElementById("battle-simulation-container");e==="enemy-units"?(m&&m.classList.add("hidden"),d&&d.classList.add("hidden"),u&&u.classList.remove("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),this.initializeEnemyUnitsManager(),A.hideSection("config-section"),A.hideSection("results-section"),A.showSection("enemy-units-section"),A.hideSection("manual-battle-section"),A.hideSection("battle-simulation-container")):e==="manual-battle"?(m&&m.classList.add("hidden"),d&&d.classList.add("hidden"),u&&u.classList.add("hidden"),p&&p.classList.remove("hidden"),g&&g.classList.add("hidden"),this.initializeManualBattleSimulation(),A.hideSection("config-section"),A.hideSection("results-section"),A.hideSection("enemy-units-section"),A.showSection("manual-battle-section"),A.hideSection("battle-simulation-container")):(m&&m.classList.remove("hidden"),u&&u.classList.add("hidden"),p&&p.classList.add("hidden"),d&&d.classList.add("hidden"),g&&g.classList.add("hidden"),A.showSection("config-section"),A.hideSection("enemy-units-section"),A.hideSection("manual-battle-section"),A.hideSection("results-section"),A.hideSection("battle-simulation-container"))}showLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.remove("hidden")}hideLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.add("hidden")}showProgressModal(){let e=document.getElementById("progress-modal");if(!e){e=document.createElement("div"),e.id="progress-modal",e.className="modal",e.innerHTML=`
        <div class="modal-content progress-modal-content">
          <h3>⚔️ Optimizing for Damage</h3>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="progress-text" id="progress-text">Initializing...</div>
            <div class="progress-percentage" id="progress-percentage">0%</div>
          </div>
          <div class="progress-details">
            <div class="progress-stats">
              <span id="progress-combinations">0 / 0 combinations</span>
              <span id="progress-phase">Initializing</span>
            </div>
            <div class="progress-timing">
              <span id="progress-elapsed">00:00</span>
              <span class="timer-separator">/</span>
              <span id="progress-timeout">02:00</span>
              <span id="progress-remaining"></span>
            </div>
          </div>
          <div class="progress-actions">
            <button id="cancel-optimization-btn" class="btn btn-secondary">
              <span class="btn-icon">❌</span>
              Cancel Optimization
            </button>
          </div>
          <p class="progress-note">Large army pools may take longer to process...</p>
        </div>
      `,document.body.appendChild(e);const t=document.getElementById("cancel-optimization-btn");t&&t.addEventListener("click",()=>{this.cancelOptimization()})}e.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(e,t,n){const i=document.getElementById("progress-fill"),a=document.getElementById("progress-text"),s=document.getElementById("progress-percentage"),r=document.getElementById("progress-combinations"),o=document.getElementById("progress-phase"),l=document.getElementById("progress-remaining");if(i&&(i.style.width=`${e}%`),a&&(a.textContent=t),s&&(s.textContent=`${Math.round(e)}%`),r&&n){const c=n.combinationsEvaluated||0,m=n.totalToEvaluate||0;r.textContent=`${c.toLocaleString()} / ${m.toLocaleString()} combinations`}if(o&&(n!=null&&n.phase)&&(o.textContent=n.phase.charAt(0).toUpperCase()+n.phase.slice(1)),l&&(n!=null&&n.estimatedRemainingMs)){const c=Math.ceil(n.estimatedRemainingMs/1e3),m=Math.floor(c/60),d=c%60;l.textContent=`(~${m}:${d.toString().padStart(2,"0")} remaining)`}else l&&(l.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const e=performance.now()-this.optimizationStartTime,t=Math.floor(e/1e3),n=Math.floor(t/60),i=t%60,a=document.getElementById("progress-elapsed");a&&(a.textContent=`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const e=document.getElementById("progress-modal");e&&e.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){$.optimizeCombatLogs(),$.optimizeUnitCards(),this.addTouchSupportToUnitCards(),E.addLayoutChangeListener(e=>{this.handleLayoutModeChange(e)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&P.addHapticFeedback(t)})}handleLayoutModeChange(e){setTimeout(()=>{$.optimizeCombatLogs(),$.optimizeUnitCards(),this.addTouchSupportToUnitCards(),e==="mobile"&&this.initializeAdvancedMobileFeatures()},100)}initializeAdvancedMobileFeatures(){E.isMobile()&&(M.initialize(),k.initialize(),this.addPullToRefresh(),this.addFloatingActionButton(),k.enhanceFormAccessibility(),setTimeout(()=>{k.addDynamicLabels()},500))}addPullToRefresh(){const e=document.querySelector(".main-content");e&&P.addPullToRefresh(e,async()=>{k.announce("Refreshing data..."),await new Promise(t=>setTimeout(t,1e3)),$.optimizeCombatLogs(),$.optimizeUnitCards(),k.addDynamicLabels(),k.announce("Data refreshed")})}addFloatingActionButton(){this.selectedUnits.size>0?B.showFloatingActionButton({icon:"⚡",label:"Quick Optimize",onClick:()=>{k.announce("Starting quick optimization"),this.optimizeArmy()},position:"bottom-right",color:"primary"}):B.hideFloatingActionButton()}initializeEnemyUnitsManager(){const e=document.getElementById("enemy-units-container");e&&(this.enemyUnitManager||(this.enemyUnitManager=new Ee({mode:"embedded"})),this.enemyUnitManager.mount(e))}async initializeManualBattleSimulation(){const e=document.getElementById("manual-battle-container");e&&(this.manualBattleSimulation||(this.manualBattleSimulation=new be({unitLoader:this.unitLoader,onBattleComplete:t=>{console.log("Manual battle completed:",t)}})),await this.manualBattleSimulation.mount(e))}openEnemyUnitSelector(){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5");V(async()=>{const{EnemyUnitSelector:n}=await Promise.resolve().then(()=>fe);return{EnemyUnitSelector:n}},void 0).then(({EnemyUnitSelector:n})=>{const i=document.createElement("div");i.id="enemy-unit-selector-modal",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.right="0",i.style.bottom="0",i.style.zIndex="2000",document.body.appendChild(i);const a=new n({onSelect:s=>{this.handleEnemyUnitSelected(s)},onCancel:()=>{this.closeEnemyUnitSelector(i,a)},mode:"multiple",title:`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`,maxSelections:t,selectedUnits:[...this.selectedEnemyUnits]});this.currentEnemyUnitSelector=a,this.currentEnemyUnitSelectorContainer=i,a.mount(i)}).catch(n=>{console.error("Failed to load EnemyUnitSelector:",n),alert("Failed to open enemy unit selector. Please try again.")})}handleEnemyUnitSelected(e){const t=document.getElementById("enemy-count"),n=parseInt((t==null?void 0:t.value)||"5"),i=this.selectedEnemyUnits.findIndex(a=>a.name===e.name);i>=0?this.selectedEnemyUnits.splice(i,1):this.selectedEnemyUnits.length<n?this.selectedEnemyUnits.push(e):(this.selectedEnemyUnits.shift(),this.selectedEnemyUnits.push(e)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}closeEnemyUnitSelector(e,t){try{t&&typeof t.unmount=="function"&&t.unmount(),e&&e.parentNode&&e.parentNode.removeChild(e),this.currentEnemyUnitSelector=null,this.currentEnemyUnitSelectorContainer=null}catch(n){console.error("Error closing enemy unit selector:",n)}}updateEnemyUnitSelectorTitle(){if(this.currentEnemyUnitSelector&&typeof this.currentEnemyUnitSelector.updateTitle=="function"){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5"),n=`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`;this.currentEnemyUnitSelector.updateTitle(n),typeof this.currentEnemyUnitSelector.updateSelectedUnits=="function"&&this.currentEnemyUnitSelector.updateSelectedUnits(this.selectedEnemyUnits)}}handleEnemyGroupsChange(){if(this.currentMode==="damage"){const e=document.getElementById("enemy-count"),t=e&&parseInt(e.value)||1;this.selectedEnemyUnits.length>t&&(this.selectedEnemyUnits=this.selectedEnemyUnits.slice(0,t)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}}updateEnemyUnitDisplay(){const e=document.getElementById("select-enemy-units-btn");if(e){const t=document.getElementById("enemy-count"),n=parseInt((t==null?void 0:t.value)||"5");if(this.selectedEnemyUnits.length===0)e.innerHTML=`
          👹 Select Enemy Units
        `,e.classList.remove("enemy-selected");else if(this.selectedEnemyUnits.length===1){const i=this.selectedEnemyUnits[0];e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${i.name}
          <small class="enemy-stats">(STR: ${i.strength.toLocaleString()}, HP: ${i.health.toLocaleString()})</small>
        `,e.classList.add("enemy-selected")}else e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${this.selectedEnemyUnits.length} Enemy Units Selected
          <small class="enemy-stats">(${this.selectedEnemyUnits.length}/${n} selected)</small>
        `,e.classList.add("enemy-selected")}}}document.addEventListener("DOMContentLoaded",()=>{const y=document.getElementById("app");if(!y)throw new Error("App container not found");new Ae().mount(y),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-BTcpftIa.js.map
