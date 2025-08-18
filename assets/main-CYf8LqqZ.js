var ie=Object.defineProperty;var ne=(b,e,t)=>e in b?ie(b,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):b[e]=t;var h=(b,e,t)=>ne(b,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const se="modulepreload",ae=function(b){return"/army-calculator-site/"+b},G={},R=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(t.map(o=>{if(o=ae(o),o in G)return;G[o]=!0;const l=o.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${c}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":se,l||(d.as="script"),d.crossOrigin="",d.href=o,r&&d.setAttribute("nonce",r),document.head.appendChild(d),l)return new Promise((m,u)=>{d.addEventListener("load",m),d.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})}))}function s(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return n.then(a=>{for(const r of a||[])r.status==="rejected"&&s(r.reason);return e().catch(s)})};class v{static isPlayerUnit(e){return e.cost_type!==void 0||e.context==="player"}static isEnemyUnit(e){return e.cost_type===void 0||e.context==="enemy"}static isMercenary(e){return e.cost_type==="Mercenary"||(e.authority_cost??0)>0}static getPrimaryCost(e){if(!v.isPlayerUnit(e))return 0;switch(e.cost_type){case"Leadership":return e.leadership_cost??0;case"Dominance":return e.dominance_cost??0;case"Authority":case"Mercenary":return e.authority_cost??0;default:return 0}}static getEfficiencyRatio(e){if(v.isPlayerUnit(e)){const t=v.getPrimaryCost(e);return t>0?e.strength/t:0}else return e.health>0?e.strength/e.health:0}static getStrengthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.strength/t:0}static getHealthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.health/t:0}static getStrengthPerHealth(e){return e.health>0?e.strength/e.health:0}static getEffectivenessScore(e){if(v.isPlayerUnit(e)){const t=v.getPrimaryCost(e);return t>0?e.strength*e.health/t:0}else return e.strength*e.health/1e3}static hasUnitType(e,t){return e.unit_types.some(i=>i.toLowerCase()===t.toLowerCase())}static getAttackModifierAgainst(e,t){if(!e.attack_modifiers)return 0;const i=e.attack_modifiers.find(n=>n.target_type.toLowerCase()===t.toLowerCase());return i?i.value:0}static getTotalStrengthAgainst(e,t){const i=e.strength,n=v.getAttackModifierAgainst(e,t);return i+n}static createUserEnemyUnit(e){const t=new Date;return{name:e.name??"Unnamed Enemy",unit_types:e.unit_types??["Epic Monster"],health:e.health??1e4,strength:e.strength??5e3,attack_modifiers:e.attack_modifiers??[],context:"enemy",id:`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,createdAt:t,modifiedAt:t}}static updateUserUnit(e,t){return{...e,...t,modifiedAt:new Date}}static validateUnit(e){const t=[],i=[];return(!e.name||e.name.trim()==="")&&t.push("Unit name is required"),(!e.unit_types||!Array.isArray(e.unit_types)||e.unit_types.length===0)&&t.push("At least one unit type is required"),(typeof e.health!="number"||e.health<=0)&&t.push("Health must be a positive number"),(typeof e.strength!="number"||e.strength<=0)&&t.push("Strength must be a positive number"),e.attack_modifiers&&(Array.isArray(e.attack_modifiers)?e.attack_modifiers.forEach((n,s)=>{(!n.target_type||n.target_type.trim()==="")&&t.push(`Attack modifier ${s+1}: target_type is required`),(!n.modifier_type||n.modifier_type.trim()==="")&&t.push(`Attack modifier ${s+1}: modifier_type is required`),(typeof n.value!="number"||n.value<0)&&t.push(`Attack modifier ${s+1}: value must be a non-negative number`)}):t.push("Attack modifiers must be an array")),(e.cost_type||e.context==="player")&&e.cost_type&&!["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)&&t.push("Invalid cost_type. Must be Leadership, Dominance, Authority, or Mercenary"),e.health&&e.health>1e7&&i.push("Health value is unusually high"),e.strength&&e.strength>5e6&&i.push("Strength value is unusually high"),{isValid:t.length===0,errors:t,warnings:i.length>0?i:void 0}}static validateEnemyUnit(e){return v.validateUnit(e)}static validateBattleConfiguration(e){const t=[],i=[];return e.playerArmy?(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)&&t.push("Player army must have at least one unit group"):t.push("Player army is required"),e.enemyGroupCount!==void 0&&e.enemyGroupCount<1&&t.push("Enemy group count must be at least 1"),e.enemyUnits!==void 0&&(!Array.isArray(e.enemyUnits)||e.enemyUnits.length===0)&&t.push("At least one enemy unit is required"),e.enemyGroupCount===void 0&&(e.enemyUnits===void 0||e.enemyUnits.length===0)&&t.push("Either enemy group count or enemy units must be specified"),{isValid:t.length===0,errors:t,warnings:i.length>0?i:void 0}}}const re=["Human","Beast","Undead","Demon","Elemental","Construct","Melee","Ranged","Magic","Siege","Mounted","Flying","Aquatic","Guardsman","Monster","Mercenary","Specialist","Elite","Heavy","Light","Epic Monster","Giant","Dragon","Fortification"],oe=["Strength"],le=["Melee","Ranged","Flying","Mounted","Beast","Human","Siege","Dragon","Elemental","Giant","Fortification","Undead","Demon"],V="/army-calculator-site/",J={FINAL_UNITS:`${V}final_units.json`,ENEMY_UNITS:`${V}enemy_units.json`};class ce{constructor(){h(this,"units",[]);h(this,"unitsByName",new Map);h(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadPresetUnits(){return this.loadUnits(J.FINAL_UNITS)}async loadUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading units from: ${e}`);const i=await fetch(e);if(!i.ok)throw new Error(`Failed to fetch units: ${i.status} ${i.statusText}`);t=await i.json()}else t=e;if(!Array.isArray(t))throw new Error("Unit data must be an array");return this.units=t.map(i=>this.validateAndNormalizeUnit(i)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(t){throw console.error("❌ Error loading units:",t),t}}validateAndNormalizeUnit(e){const t={name:e.name||"Unknown",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],cost_type:e.cost_type||"Leadership",health:Number(e.health)||0,strength:Number(e.strength)||0,leadership_cost:Number(e.leadership_cost)||0,dominance_cost:Number(e.dominance_cost)||0,authority_cost:Number(e.authority_cost)||0,food_consumption:Number(e.food_consumption)||0,carrying_capacity:Number(e.carrying_capacity)||0,revival_cost_gold:Number(e.revival_cost_gold)||0,revival_cost_silver:Number(e.revival_cost_silver)||0,source_file:e.source_file||"",attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers:void 0};return["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)||(console.warn(`Invalid cost type for unit ${t.name}: ${t.cost_type}`),t.cost_type="Leadership"),t}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(e=>[e.name,e])),this.units.forEach(e=>{v.isMercenary(e)?this.unitsByCostType.Mercenary.push(e):e.cost_type in this.unitsByCostType&&this.unitsByCostType[e.cost_type].push(e)}),Object.keys(this.unitsByCostType).forEach(e=>{this.unitsByCostType[e].sort((t,i)=>t.strength-i.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(e){return this.unitsByName.get(e)}getUnitsByCostType(e){return[...this.unitsByCostType[e]]}getAvailableUnits(e){const t=[];for(const i of e){const n=this.getUnitByName(i);n?t.push(n):console.warn(`Unit '${i}' not found in loaded data`)}return t}filterUnits(e){let t=this.units;return e.costType&&(t=t.filter(i=>i.cost_type===e.costType)),e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(i=>e.unitTypes.some(n=>i.unit_types.includes(n)))),e.minStrength!==void 0&&(t=t.filter(i=>i.strength>=e.minStrength)),e.maxCost!==void 0&&(t=t.filter(i=>v.getPrimaryCost(i)<=e.maxCost)),t}searchUnits(e){if(!e.trim())return this.getAllUnits();const t=e.toLowerCase();return this.units.filter(i=>i.name.toLowerCase().includes(t))}getEnhancedUnits(){return this.units.map(e=>({...e,get isMercenary(){return v.isMercenary(e)},get primaryCost(){return v.getPrimaryCost(e)},get strengthPerCost(){return v.getStrengthPerCost(e)},get healthPerCost(){return v.getHealthPerCost(e)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const e=this.units.map(i=>i.strength),t=this.units.map(i=>i.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...e),max:Math.max(...e)},healthRange:{min:Math.min(...t),max:Math.max(...t)}}}getUniqueUnitTypes(){const e=new Set;return this.units.forEach(t=>{t.unit_types.forEach(i=>e.add(i))}),Array.from(e).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const e=this.units.map(i=>i.strength),t=this.units.map(i=>i.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((i,n)=>i+n,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((i,n)=>i+n,0)/t.length)},topUnitsByStrength:[...this.units].sort((i,n)=>n.strength-i.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((i,n)=>n.health-i.health).slice(0,10)}}}class q{constructor(e){h(this,"availableUnits");h(this,"unitsByName");h(this,"leadershipUnits");h(this,"dominanceUnits");h(this,"mercenaryUnits");this.availableUnits=[...e],this.unitsByName=new Map(e.map(t=>[t.name,t])),this.leadershipUnits=e.filter(t=>t.cost_type==="Leadership").sort((t,i)=>t.strength-i.strength),this.dominanceUnits=e.filter(t=>t.cost_type==="Dominance").sort((t,i)=>t.strength-i.strength),this.mercenaryUnits=e.filter(t=>v.isMercenary(t)).sort((t,i)=>t.strength-i.strength)}async optimizeArmy(e){const t=performance.now();console.log(`🔍 Optimizing army with L:${e.leadershipBudget} D:${e.dominanceBudget} M:${Object.keys(e.mercenaryLimits).length}`),console.log(`📋 Selected units: ${e.availableUnits.join(", ")}`);const i=[],n=this.generateGuaranteedValidCompositions(e);console.log(`Generated ${n.length} guaranteed valid army combinations`);let s=0;for(const m of n){s++;const u=this.evaluateComposition(m);i.push(u)}const a=performance.now();console.log(`Evaluated ${s} combinations, found ${i.length} valid stackings`);const r=this.availableUnits.filter(m=>e.availableUnits.includes(m.name)&&m.cost_type==="Leadership"),o=this.availableUnits.filter(m=>e.availableUnits.includes(m.name)&&m.cost_type==="Dominance"),l=this.availableUnits.filter(m=>e.availableUnits.includes(m.name)&&v.isMercenary(m)),c=i.filter(m=>{const u=r.some(y=>m.units[y.name]&&m.units[y.name]>0),p=o.some(y=>m.units[y.name]&&m.units[y.name]>0),g=l.some(y=>m.units[y.name]&&m.units[y.name]>0);return[r.length>0?u:!0,o.length>0?p:!0,l.length>0?g:!0].every(y=>y)});return c.sort((m,u)=>{const p=m.totalLeadershipCost/e.leadershipBudget+m.totalDominanceCost/e.dominanceBudget;return u.totalLeadershipCost/e.leadershipBudget+u.totalDominanceCost/e.dominanceBudget-p}),{compositions:c.length>0?[c[0]]:i.slice(0,1),totalCombinationsEvaluated:s,validStackingsFound:i.length,executionTimeMs:a-t}}generateGuaranteedValidCompositions(e){const t=[],i=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,r)=>r.strength-a.strength),n=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,r)=>r.strength-a.strength),s=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&v.isMercenary(a));if(console.log(`Selected units: L:${i.length} D:${n.length} M:${s.length}`),console.log("Leadership units:",i.map(a=>a.name)),console.log("Dominance units:",n.map(a=>a.name)),console.log("Mercenary units:",s.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${i.length} D:${n.length} M:${s.length}`),console.log(`Budgets: Leadership:${e.leadershipBudget} Dominance:${e.dominanceBudget}`),i.length>0&&n.length>0&&s.length>0&&e.leadershipBudget>0&&e.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...i,...s];t.push(...this.generateCombinedStackedCompositions(a,n,e.leadershipBudget,e.dominanceBudget,e.mercenaryLimits))}else if(i.length>0&&s.length>0&&n.length===0&&e.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...i,...s],r=this.calculateProperStackingQuantities(a,e.leadershipBudget,e.mercenaryLimits);t.push(r)}else if(n.length>0&&s.length>0&&i.length===0&&e.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(n,e.dominanceBudget),r={};for(const l of s)r[l.name]=e.mercenaryLimits[l.name]||1;const o={...a,...r};t.push(o)}else if(i.length>0&&n.length>0&&s.length===0&&e.leadershipBudget>0&&e.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),t.push(...this.generateCombinedStackedCompositions(i,n,e.leadershipBudget,e.dominanceBudget,{}));else if(i.length>0&&n.length===0&&s.length===0&&e.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(i,e.leadershipBudget,{});t.push(a)}else if(n.length>0&&i.length===0&&s.length===0&&e.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(n,e.dominanceBudget);t.push(a)}else if(s.length>0&&i.length===0&&n.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const r of s){const o=e.mercenaryLimits[r.name]||1;a[r.name]=o}Object.keys(a).length>0&&t.push(a)}else console.log("❌ No valid combination of selected units and budgets");return i.length>0&&s.length>0&&e.leadershipBudget>0&&t.push(...this.generateMercenaryMixedCompositions(i,s,e.leadershipBudget,e.mercenaryLimits,"leadership_cost")),n.length>0&&s.length>0&&e.dominanceBudget>0&&t.push(...this.generateMercenaryMixedCompositions(n,s,e.dominanceBudget,e.mercenaryLimits,"dominance_cost")),t}generateStackedCompositionsWithMercenaries(e,t,i,n){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const s=[...e,...t];console.log(`🚨 About to call calculateProperStackingQuantities with ${s.length} units`);const a=this.calculateProperStackingQuantities(s,i,n);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(e,t){const i={};if(e.length===0)return i;const n=e[0];i[n.name]=1,console.log(`🎯 Starting with 1x ${n.name} (STR: ${n.strength})`);for(let s=1;s<e.length;s++){const a=e[s],r=e[s-1],o=r.health*(i[r.name]||1),l=Math.ceil((o+1)/a.health);i[a.name]=l,console.log(`📋 ${a.name}: need ${l} units (${l*a.health} HP) to exceed ${r.name} (${o} HP)`)}return i}calculateProperStackingQuantities(e,t,i){console.log(`🔧 SIMPLE STACKING: Starting with budget ${t}`);const n={},s=[...e].sort((m,u)=>u.strength-m.strength),a=s.filter(m=>m.cost_type==="Leadership"),r=s.filter(m=>v.isMercenary(m));if(s.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),n;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${s.length} units (${a.length} leadership + ${r.length} mercenary)`);const o=s[0],l={};l[o.name]=1;const c=o.health*1;console.log(`🔧 Base: 1x ${o.name} = ${c} HP (strongest)`);for(let m=1;m<s.length;m++){const u=s[m],p=Math.ceil((c+1)/u.health);l[u.name]=p;const g=v.isMercenary(u)?"mercenary":"leadership";console.log(`🔧 Base: ${p}x ${u.name} = ${p*u.health} HP (beats ${c}) [${g}]`)}console.log("🔧 Validating base pattern stacking order...");for(let m=0;m<s.length-1;m++){const u=s[m],p=s[m+1],g=u.health*l[u.name];let f=p.health*l[p.name];if(f<=g)if(v.isMercenary(p))console.log(`🔧 WARNING: ${p.name} mercenary limit (${l[p.name]}) gives ${f} HP, can't beat ${g} HP`);else{const y=Math.ceil((g+1)/p.health);l[p.name]=y,f=p.health*y,console.log(`🔧 Fixed: ${p.name} increased to ${y} units = ${f} HP (now beats ${g})`)}else console.log(`🔧 OK: ${p.name} ${l[p.name]} units = ${f} HP (beats ${g})`)}let d=0;for(const[m,u]of Object.entries(l)){const p=this.unitsByName.get(m);p&&p.cost_type==="Leadership"&&(d+=u*(p.leadership_cost??0))}if(console.log(`🔧 Base pattern leadership cost: ${d}`),d===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[m,u]of Object.entries(l))n[m]=u}else{const m=Math.floor(t/d);console.log(`🔧 Can afford ${m} base stacks (${t} / ${d})`);for(const[u,p]of Object.entries(l)){const g=this.unitsByName.get(u);if(g&&v.isMercenary(g)){const f=p*m,y=i[u]||1;n[u]=Math.min(f,y),f>y?console.log(`🔧 Mercenary ${u}: wanted ${f}, capped at limit ${y}`):console.log(`🔧 Mercenary ${u}: scaled to ${f} (under limit ${y})`)}else n[u]=p*m}}return console.log("🔧 SIMPLE STACKING: Final composition:",n),n}calculateProperStackingQuantitiesForDominance(e,t){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${t}`);const i={},n=[...e].sort((c,d)=>d.strength-c.strength);if(n.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),i;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${n.length} dominance units`);const s=n[0],a={};a[s.name]=1;const r=s.health*1;console.log(`🔧 Base: 1x ${s.name} = ${r} HP (strongest)`);for(let c=1;c<n.length;c++){const d=n[c],m=Math.ceil((r+1)/d.health);a[d.name]=m,console.log(`🔧 Base: ${m}x ${d.name} = ${m*d.health} HP (beats ${r})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let c=0;c<n.length-1;c++){const d=n[c],m=n[c+1],u=d.health*a[d.name];let p=m.health*a[m.name];if(p<=u){const g=Math.ceil((u+1)/m.health);a[m.name]=g,p=m.health*g,console.log(`🔧 Fixed: ${m.name} increased to ${g} units = ${p} HP (now beats ${u})`)}else console.log(`🔧 OK: ${m.name} ${a[m.name]} units = ${p} HP (beats ${u})`)}let o=0;for(const[c,d]of Object.entries(a)){const m=this.unitsByName.get(c);m&&m.cost_type==="Dominance"&&(o+=d*m.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${o}`),o===0)return console.log("🔧 No dominance costs found"),i;const l=Math.floor(t/o);console.log(`🔧 Can afford ${l} base stacks (${t} / ${o})`);for(const[c,d]of Object.entries(a))i[c]=d*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",i),i}calculateLeadershipCost(e){return Object.entries(e).reduce((t,[i,n])=>{const s=this.unitsByName.get(i);return s&&s.cost_type==="Leadership"?t+n*s.leadership_cost:t},0)}calculateMaxStacksByMercenaries(e,t){let i=1/0;for(const[n,s]of Object.entries(e)){const a=this.unitsByName.get(n);if(a&&v.isMercenary(a)){const r=t[n]||1,o=Math.floor(r/s);i=Math.min(i,o),console.log(`🗡️ ${n}: limit ${r}, base need ${s}, allows ${o} stacks`)}}return i===1/0?100:i}generateDominanceMercenaryCompositions(e,t,i,n){const s=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...e,...t].sort((m,u)=>u.strength-m.strength);if(a.length===0)return s;const r=this.calculateCleanStackingPattern(a,n);console.log("📊 Dominance + Mercenary base pattern:",r);const o=Object.entries(r).reduce((m,[u,p])=>{const g=this.unitsByName.get(u);return g&&g.cost_type==="Dominance"?m+p*g.dominance_cost:m},0);if(console.log(`💰 Dominance cost per stack: ${o}`),o>i){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const m={};for(const u of t)m[u.name]=n[u.name]||1;return s.push(m),e.length>0&&s.push(...this.generateStackedCompositions(e,i,"dominance_cost")),s}const l=Math.floor(i/o),c=this.calculateMaxStacksByMercenaries(r,n),d=Math.min(l,c);console.log(`🔢 Max Dominance+Mercenary stacks: ${d}`);for(let m=1;m<=Math.min(d,5);m++){const u={};for(const[p,g]of Object.entries(r)){const f=this.unitsByName.get(p);f&&v.isMercenary(f)?u[p]=Math.min(g*m,n[p]||1):u[p]=g*m}s.push(u)}if(c<l&&e.length>0){const m=i-d*o,u=this.generateStackedCompositions(e,m,"dominance_cost"),p={};for(const g of t)p[g.name]=n[g.name]||1;for(const g of u.slice(0,3)){const f={...p,...g};s.push(f)}}return s}generateStackedCompositions(e,t,i){const n=[];if(e.length===0||t<=0)return n;const s=e[0];console.log(`🎯 Strongest unit: ${s.name} (STR: ${s.strength})`);const a=this.calculateStackingPattern(e);console.log("📊 Base stacking pattern:",a);const r=Object.entries(a).reduce((l,[c,d])=>{const m=this.unitsByName.get(c);if(m){const u=m[i];return l+d*u}return l},0);if(console.log(`💰 Base pattern cost: ${r}`),r<=0)return n;const o=Math.floor(t/r);console.log(`🔢 Max multiplier: ${o}`);for(let l=1;l<=Math.min(o,10);l++){const c={};for(const[d,m]of Object.entries(a))c[d]=m*l;n.push(c)}return e.length>1&&n.push(...this.generateStackingVariations(e,t,i)),n}calculateStackingPattern(e){const t={};if(e.length===0)return t;const i=e[0];t[i.name]=1;for(let n=1;n<e.length;n++){const s=e[n],a=e[n-1],r=a.health*(t[a.name]||1),o=Math.ceil((r+1)/s.health);t[s.name]=o,console.log(`📋 ${s.name}: need ${o} units (${o*s.health} HP) to exceed ${a.name} (${r} HP)`)}return t}generateCombinedStackedCompositions(e,t,i,n,s={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const r=e.filter($=>$.cost_type==="Leadership"),o=e.filter($=>v.isMercenary($));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...r,...o],d=[this.calculateProperStackingQuantities(l,i,s)];if(d.length===0)return a;const m=d[d.length-1];if(!m)return a;console.log("🎯 Using maximum Leadership composition for combination");const u=m,p=t[0];console.log(`🎯 Strongest Dominance unit: ${p.name} (STR: ${p.strength})`);const g=this.findClosestStrengthUnit(p,e);if(!g)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${g.name} (STR: ${g.strength})`);const f=u[g.name]||0,y=g.health*f;if(console.log(`📊 Comparison unit total health: ${y} (${f}x ${g.health})`),y<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const S=p.health;S>=y&&(console.log(`⚠️ Single Dominance unit too strong: ${S} HP >= ${y} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const L=[this.calculateProperStackingQuantitiesForDominance(t,n)];if(L.length>0){const $=L[L.length-1],O={...u,...$};a.push(O),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(u);return a}findClosestStrengthUnit(e,t){if(t.length===0)return null;let i=t[0],n=Math.abs(e.strength-i.strength);for(const s of t){const a=Math.abs(e.strength-s.strength);a<n&&(n=a,i=s)}return console.log(`🎯 Closest match: ${i.name} (STR: ${i.strength}) vs ${e.name} (STR: ${e.strength}), diff: ${n}`),i}calculateConstrainedDominanceStack(e,t,i){const n={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${i}`),e.length===0||t<=0||i<=0)return n;const s=e[0],a=Math.floor((i-1)/s.health),r=Math.floor(t/s.dominance_cost),o=Math.min(a,r);if(o<=0)return console.log(`❌ Cannot fit any ${s.name} within constraints`),n;for(let l=Math.min(o,3);l>=1;l--){const c={};c[s.name]=l;let d=l*s.dominance_cost,m=l*s.health;console.log(`🧪 Testing ${l}x ${s.name} (${m} HP, ${d} cost)`);for(let p=1;p<e.length&&d<t;p++){const g=e[p],f=t-d,y=Math.ceil((m+1)/g.health),S=Math.floor(f/g.dominance_cost),x=Math.min(y,S);x>0&&(c[g.name]=x,d+=x*g.dominance_cost,console.log(`  ➕ Added ${x}x ${g.name} (${x*g.health} HP)`))}const u=Object.entries(c).reduce((p,[g,f])=>{const y=this.unitsByName.get(g);return y?p+f*y.health:p},0);if(u<i)return console.log(`✅ Valid Dominance stack: ${u} HP < ${i} HP limit`),c;console.log(`❌ Dominance stack too strong: ${u} HP >= ${i} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),n}generateMercenaryMixedCompositions(e,t,i,n,s){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const r=this.generateStackedCompositions(e,i,s);if(r.length===0)return a;for(const o of r.slice(0,3)){const l=t.sort((y,S)=>S.strength-y.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const c=this.findClosestStrengthUnit(l,e);if(!c){console.log("❌ No suitable base unit found for comparison");continue}const d=o[c.name]||0,m=c.health*d;if(console.log(`📊 Comparison base unit total health: ${m}`),m<=0){console.log("❌ Comparison unit not in base composition");continue}const u=l.health,p=n[l.name]||1,g=u*p;if(g>=m){console.log(`⚠️ Mercenary too strong: ${g} HP >= ${m} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const y=Math.floor((m-1)/u);if(y>0){console.log(`✅ Using ${y}x ${l.name} instead of ${p}`);const S={...o};S[l.name]=y;for(const x of t)if(x.name!==l.name){const L=n[x.name]||1;S[x.name]=L}a.push(S),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(o);continue}const f={...o};for(const y of t){const S=n[y.name]||1;f[y.name]=S}a.push(f),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(e,t,i){const n={};console.log(`🔄 Creating alternative Dominance stack with max health: ${i}`);const s=[...e].sort((o,l)=>o.health-l.health);let a=0,r=0;for(const o of s){const l=Math.floor((i-r-1)/o.health),c=Math.floor((t-a)/o.dominance_cost),d=Math.min(l,c);d>0&&(n[o.name]=d,a+=d*o.dominance_cost,r+=d*o.health,console.log(`➕ Added ${d}x ${o.name} (${d*o.health} HP, ${d*o.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${r} HP total, ${a} cost`),n}calculateMaximizedDominanceStack(e,t,i){console.log(`💰 Maximizing Dominance budget: ${t} with health limit: ${i}`);const n=this.createAlternativeDominanceStack(e,t,i);return Object.keys(n).length>0?n:this.calculateConstrainedDominanceStack(e,t,i)}generateStackingVariations(e,t,i){const n=[],s={},a=e[0],r=a[i];if(r>0){const o=Math.floor(t/r);s[a.name]=Math.min(o,5);let l=t-s[a.name]*r;for(let c=1;c<e.length&&l>0;c++){const d=e[c],m=d[i];if(m>0&&m<=l){const u=Math.floor(l/m/(e.length-c));u>0&&(s[d.name]=u,l-=u*m)}}n.push(s)}return n}generateGuaranteedDiverseCompositions_OLD(e){const t=[],i=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),n=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),s=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&v.isMercenary(l)),a={};let r=0,o=0;for(const l of i)r+l.leadership_cost<=e.leadershipBudget&&(a[l.name]=1,r+=l.leadership_cost);for(const l of n)o+l.dominance_cost<=e.dominanceBudget&&(a[l.name]=1,o+=l.dominance_cost);for(const l of s){const c=e.mercenaryLimits[l.name]||1;a[l.name]=Math.min(1,c)}if(Object.keys(a).length>0&&t.push(a),i.length>0&&e.leadershipBudget>0){const l=i.sort((d,m)=>d.leadership_cost-m.leadership_cost)[0],c=Math.floor(e.leadershipBudget/l.leadership_cost);if(c>0){const d={};d[l.name]=Math.min(c,20);const m=e.leadershipBudget-d[l.name]*l.leadership_cost;for(const u of i.slice(1,3)){const p=Math.floor(m/u.leadership_cost/2);p>0&&(d[u.name]=p)}t.push(d)}}if(i.length>0||n.length>0){const l={};if(i.length>0&&e.leadershipBudget>0){const c=Math.floor(e.leadershipBudget/i.length);for(const d of i){const m=Math.floor(c/d.leadership_cost);m>0&&(l[d.name]=m)}}if(n.length>0&&e.dominanceBudget>0){const c=Math.floor(e.dominanceBudget/n.length);for(const d of n){const m=Math.floor(c/d.dominance_cost);m>0&&(l[d.name]=m)}}for(const c of s){const d=e.mercenaryLimits[c.name]||1;l[c.name]=Math.max(1,Math.floor(d/2))}Object.keys(l).length>0&&t.push(l)}return t}generateMercenaryCombinations(e){if(Object.keys(e).length===0)return[{}];let t=[{}];for(const[i,n]of Object.entries(e)){if(!this.unitsByName.has(i))continue;const s=[];for(const a of t)for(let r=0;r<=n;r++){const o={...a};r>0&&(o[i]=r),s.push(o)}t=s}return t}evaluateComposition(e){let t=0,i=0,n=0,s=0,a=0;const r=[];for(const[f,y]of Object.entries(e)){const S=this.unitsByName.get(f);if(!S)continue;const x=S.health*y,L=S.strength*y;t+=L,i+=x,n+=S.leadership_cost*y,s+=S.dominance_cost*y,v.isMercenary(S)&&(a+=y),r.push({unit:S,count:y,totalHealth:x,unitStrength:S.strength})}r.sort((f,y)=>f.unitStrength-y.unitStrength);let o=!0;const l=[];for(let f=0;f<r.length;f++){const{unit:y,count:S,totalHealth:x}=r[f];l.push({unitName:y.name,count:S,totalHealth:x,unitStrength:y.strength});for(let L=f+1;L<r.length;L++){const $=r[L].unit,O=r[L].totalHealth;if(y.strength===$.strength){const te=Math.max(x,O)*.1;if(Math.abs(x-O)<=te)continue}x<=O&&console.log(`❌ Stacking violation: ${y.name} (STR:${y.strength}, ${x} HP) <= ${$.name} (STR:${$.strength}, ${O} HP)`)}}const c=n+s+a;let d=c>0?t/c:0;d*=1.2;const u=1+(Object.keys(e).length-1)*.05;d*=u;let p=0;n>0&&p++,s>0&&p++,a>0&&p++;const g=1+(p-1)*.1;return d*=g,{units:e,totalStrength:t,totalHealth:i,totalLeadershipCost:n,totalDominanceCost:s,totalMercenaryCount:a,stackingOrder:l,isValidStacking:o,efficiencyScore:d}}explainStacking(e){const t=[],i=[],n=[],s=[];return e.stackingOrder.forEach(a=>{const r=this.unitsByName.get(a.unitName);if(!r)return;const o={name:a.unitName,count:a.count,totalHealth:a.totalHealth,strength:r.strength};v.isMercenary(r)?s.push(o):r.cost_type==="Leadership"?i.push(o):r.cost_type==="Dominance"&&n.push(o)}),t.push("🏆 OPTIMIZED ARMY COMPOSITION"),t.push("═".repeat(60)),t.push(""),t.push("📊 ARMY SUMMARY"),t.push("─".repeat(30)),t.push(`Total Units: ${Object.values(e.units).reduce((a,r)=>a+r,0).toLocaleString()}`),t.push(`Total Strength: ${e.totalStrength.toLocaleString()}`),t.push(`Total Health: ${e.totalHealth.toLocaleString()}`),t.push(`Budget Usage: L:${e.totalLeadershipCost} D:${e.totalDominanceCost} M:${e.totalMercenaryCount}`),t.push(""),s.length>0&&(t.push("🗡️ MERCENARY FORCES"),t.push("─".repeat(30)),s.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),i.length>0&&(t.push("👑 LEADERSHIP FORCES"),t.push("─".repeat(30)),i.sort((a,r)=>r.strength-a.strength),i.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),n.length>0&&(t.push("⚡ DOMINANCE FORCES"),t.push("─".repeat(30)),n.sort((a,r)=>r.strength-a.strength),n.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),t.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),t.push("─".repeat(40)),e.stackingOrder.forEach((a,r)=>{const o=this.unitsByName.get(a.unitName);if(!o)return;const l=v.isMercenary(o)?"🗡️":o.cost_type==="Leadership"?"👑":o.cost_type==="Dominance"?"⚡":"❓";t.push(`${r+1}. ${l} ${a.count.toLocaleString()}x ${a.unitName} (${a.totalHealth.toLocaleString()} HP)`)}),t.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class w{static formatGroupForLog(e){return`${e.count} ${e.unitName}`}static formatEnemyGroupForLog(e){return`Enemy Group ${e+1}`}static calculateDamageDealt(e){return e.count*e.unitStrength}static createPlayerAttackAction(e,t,i){const n=w.calculateDamageDealt(t);return{turn:e,attacker:w.formatGroupForLog(t),target:w.formatEnemyGroupForLog(i),action:`attack and deal ${n.toLocaleString()} damage`,damageDealt:n,eliminated:!1}}static createEnemyAttackAction(e,t,i){return{turn:e,attacker:w.formatEnemyGroupForLog(t),target:w.formatGroupForLog(i),action:`attack and kill ${w.formatGroupForLog(i)}`,eliminated:!0}}static formatCombatLogForDisplay(e){return e.map(t=>t.eliminated?`${t.attacker} ${t.action}`:`${t.attacker} ${t.action}`)}static calculateBattleStatistics(e,t){const i=e.filter(r=>!r.eliminated),n=e.filter(r=>r.eliminated),s={},a={};return i.forEach(r=>{const o=r.attacker.split(" ").slice(1).join(" "),l=r.damageDealt||0;s[o]=(s[o]||0)+l,a[o]=(a[o]||0)+1}),{totalPlayerAttacks:i.length,totalEnemyAttacks:n.length,averageDamagePerAttack:i.length>0?t/i.length:0,damageByUnitType:s,attacksByUnitType:a,eliminationRate:n.length>0?n.length/e.length:0}}static getBattleSummary(e){const t=e.statistics||w.calculateBattleStatistics(e.combatLog,e.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${e.battleDuration} battle phases
- Player unit turns taken: ${t.totalPlayerAttacks}
- Enemy unit turns taken: ${t.totalEnemyAttacks}
- Total damage dealt to enemies: ${e.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(t.averageDamagePerAttack).toLocaleString()}
- Scenario: ${e.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const de={MAX_BATTLE_TURNS:1e3};class me{constructor(){h(this,"attackOrderCache",new Map);h(this,"targetOrderCache",new Map)}simulateBattle(e){this.validateConfiguration(e);const t=this.initializeBattleState(e);return this.runBattleLoop(t,e),this.generateBattleResult(t,e)}simulateBothScenarios(e,t){const i=this.simulateBattle({playerArmy:e,enemyGroupCount:t,playerGoesFirst:!0}),n=this.simulateBattle({playerArmy:JSON.parse(JSON.stringify(e)),enemyGroupCount:t,playerGoesFirst:!1}),s={damageDifference:i.totalDamageDealtToEnemies-n.totalDamageDealtToEnemies,survivalDifference:i.playerSurvivalTurns-n.playerSurvivalTurns,averageDamage:(i.totalDamageDealtToEnemies+n.totalDamageDealtToEnemies)/2,averageSurvival:(i.playerSurvivalTurns+n.playerSurvivalTurns)/2};return{bestCase:i,worstCase:n,comparison:s}}calculateAttackOrder(e){const t=this.generateCacheKey(e,"attack"),i=this.attackOrderCache.get(t);if(i)return[...i];const n=[...e].sort((s,a)=>a.unitStrength-s.unitStrength);return this.attackOrderCache.set(t,n),n}calculateEnemyTargetOrder(e){const t=this.generateCacheKey(e,"target"),i=this.targetOrderCache.get(t);if(i)return[...i];const n=[...e].sort((s,a)=>s.totalHealth-a.totalHealth);return this.targetOrderCache.set(t,n),n}shouldBattleEnd(e){return e.playerGroups.length===0||e.currentTurn>=de.MAX_BATTLE_TURNS||e.battleEnded}processTurn(e,t){t?(this.processPlayerActions(e),this.shouldBattleEnd(e)||this.processEnemyActions(e)):(this.processEnemyActions(e),this.shouldBattleEnd(e)||this.processPlayerActions(e)),e.currentTurn++}validateConfiguration(e){if(!e)throw new Error("Battle configuration is required");if(!e.playerArmy)throw new Error("Player army is required");if(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group")}initializeBattleState(e){return{currentTurn:0,playerGroups:[...e.playerArmy.stackingOrder],enemyGroupCount:this.getEnemyGroupCount(e),totalDamageDealt:0,battleEnded:!1,combatLog:[]}}runBattleLoop(e,t){for(;!this.shouldBattleEnd(e);)this.processTurn(e,t.playerGoesFirst??!0)}generateBattleResult(e,t){const i=w.calculateBattleStatistics(e.combatLog,e.totalDamageDealt);return{outcome:"player_eliminated",combatLog:e.combatLog,totalDamageDealtToEnemies:e.totalDamageDealt,battleDuration:e.currentTurn,playerSurvivalTurns:e.currentTurn,scenario:t.playerGoesFirst?"best_case":"worst_case",configuration:t,statistics:i}}generateCacheKey(e,t){return`${t}-${e.map(i=>`${i.unitName}:${i.count}:${i.totalHealth}:${i.unitStrength}`).join("|")}`}}class H extends me{validateConfiguration(e){super.validateConfiguration(e);const t=v.validateBattleConfiguration({playerArmy:e.playerArmy,enemyGroupCount:e.enemyGroupCount});if(!t.isValid)throw new Error(t.errors[0]);for(const i of e.playerArmy.stackingOrder){if(i.count<=0)throw new Error(`Unit group "${i.unitName}" must have a positive count`);if(i.unitStrength<=0)throw new Error(`Unit group "${i.unitName}" must have positive strength`);if(i.totalHealth<=0)throw new Error(`Unit group "${i.unitName}" must have positive health`)}}getEnemyGroupCount(e){return e.enemyGroupCount}calculateInitialEnemyHealth(e){return 0}simulateBothScenarios(e,t){const i=v.validateBattleConfiguration({playerArmy:e,enemyGroupCount:t});if(!i.isValid)throw new Error(i.errors[0]);this.attackOrderCache.clear(),this.targetOrderCache.clear();const n=super.simulateBothScenarios(e,t);return this.attackOrderCache.clear(),this.targetOrderCache.clear(),n}calculateAttackOrder(e){const t=this.generateCacheKey(e,"attack"),i=this.attackOrderCache.get(t);if(i)return[...i];const n=[...e].sort((s,a)=>{const r=w.calculateDamageDealt(s);return w.calculateDamageDealt(a)-r});return this.attackOrderCache.set(t,n),n}calculateEnemyAttackOrder(e){return Array.from({length:e.enemyGroupCount},(i,n)=>n).reverse()}generateCacheKey(e,t){return`${t}-${e.map(i=>`${i.unitName}:${i.count}:${i.totalHealth}:${i.unitStrength}`).join("|")}`}calculateEnemyTargetOrder(e){const t=this.generateCacheKey(e,"target"),i=this.targetOrderCache.get(t);if(i)return[...i];const n=[...e].sort((s,a)=>a.totalHealth-s.totalHealth);return this.targetOrderCache.set(t,n),n}shouldBattleEnd(e){return e.playerGroups.length===0||e.battleEnded}processTurn(e,t){if(console.log(`🔥 BattleSimulationService.processTurn called - playerGoesFirst: ${t}, turn: ${e.currentTurn}`),e.playerGroups.length===0){e.battleEnded=!0;return}let i=0,n=0;const s=e.enemyGroupCount,a=this.calculateEnemyAttackOrder(e),o=e.playerGroups.length,l=o+s;for(let c=0;c<l&&!this.shouldBattleEnd(e);c++){const d=t?c%2===0:c%2===1;if(d&&i<o&&e.playerGroups.length>0){console.log(`  Action ${c}: PLAYER turn (${i+1}/${o})`);const m=this.calculateAttackOrder(e.playerGroups);if(m.length>0){const u=m[0];console.log(`    → ${u.unitName} attacks (Turn ${e.currentTurn})`),this.processSinglePlayerAttackByGroup(e,u,i)}i++}else if(!d&&n<s&&e.playerGroups.length>0){console.log(`  Action ${c}: ENEMY turn (${n+1}/${s})`);const m=a[n];console.log(`    → Enemy Group ${m+1} attacks (Turn ${e.currentTurn})`),this.processSingleEnemyAttack(e,m),n++}if(e.playerGroups.length===0){e.battleEnded=!0;break}if(i>=o&&n>=s)break}e.currentTurn++}processPlayerActions(e){throw console.error("🚨 ERROR: processPlayerActions called instead of processTurn override!"),new Error("processPlayerActions should not be called - using overridden processTurn instead")}processEnemyActions(e){throw console.error("🚨 ERROR: processEnemyActions called instead of processTurn override!"),new Error("processEnemyActions should not be called - using overridden processTurn instead")}processSinglePlayerAttackByGroup(e,t,i){if(e.playerGroups.length===0)return;const n=i%e.enemyGroupCount,s=w.calculateDamageDealt(t),a=w.createPlayerAttackAction(e.currentTurn,t,n);console.log(`📝 Adding PLAYER action to combat log: ${a.action} (Turn ${a.turn})`),e.combatLog.push(a),e.totalDamageDealt+=s}processSingleEnemyAttack(e,t){if(e.playerGroups.length===0)return;const i=this.calculateEnemyTargetOrder(e.playerGroups);if(i.length===0)return;const n=i[0],s=w.createEnemyAttackAction(e.currentTurn,t,n);console.log(`📝 Adding ENEMY action to combat log: ${s.action} (Turn ${s.turn})`),e.combatLog.push(s);const a=e.playerGroups.findIndex(r=>r.unitName===n.unitName&&r.count===n.count&&r.totalHealth===n.totalHealth);a!==-1&&e.playerGroups.splice(a,1),e.playerGroups.length===0&&(e.battleEnded=!0)}}class ue{constructor(e,t){h(this,"battleSimulator");h(this,"algorithm");h(this,"unitLoader",null);this.battleSimulator=e||new H,this.algorithm=t||new he}initialize(e){this.unitLoader=e}setAlgorithm(e){this.algorithm=e}reportProgress(e,t){e.onProgress&&e.onProgress(t)}checkCancellation(e){var t;if((t=e.signal)!=null&&t.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(e,t){const i=performance.now(),n=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${e.leadershipBudget} D:${e.dominanceBudget} vs ${e.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${n/1e3} seconds`),this.reportProgress(e,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(e),this.reportProgress(e,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-i});const s=await this.algorithm.generateCombinations(e,t);console.log(`🔄 Generated ${s.length} army combinations to evaluate`),this.reportProgress(e,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:0,totalToEvaluate:s.length,elapsedMs:performance.now()-i});const a=[];let r=0;for(let d=0;d<s.length;d++){this.checkCancellation(e);const m=performance.now();if(m-i>n){console.warn(`⏱️ Optimization timeout after ${(m-i)/1e3}s - stopping at ${r} combinations`);break}const u=s[d];try{const p=await this.evaluateArmyComposition(u,e.enemyGroupCount,t,e.specificEnemyUnits);a.push(p),r++}catch(p){console.warn("⚠️ Failed to evaluate army composition:",p)}if(r%3===0&&await new Promise(p=>setTimeout(p,0)),r%10===0||r===s.length){const p=performance.now()-i,g=20+Math.floor(r/s.length*60),f=r>0?p/r*(s.length-r):void 0;this.reportProgress(e,{phase:"evaluating",progress:g,message:`Evaluating combinations... (${r}/${s.length})`,combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:p,estimatedRemainingMs:f})}if(r%25===0){const p=(performance.now()-i)/1e3;console.log(`📊 Progress: ${r}/${s.length} combinations (${p.toFixed(1)}s elapsed)`)}}this.reportProgress(e,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:performance.now()-i});const o=a.sort((d,m)=>{const u=m.averageDamagePerBattle-d.averageDamagePerBattle;return Math.abs(u)>.01?u:m.damageEfficiencyScore-d.damageEfficiencyScore}),c=performance.now()-i;return console.log(`✅ Optimization complete: ${o.length} valid results in ${c.toFixed(2)}ms`),this.reportProgress(e,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:c}),{rankedResults:o,combinationsEvaluated:r,optimizationTimeMs:c,algorithmUsed:this.algorithm.name,wasTruncated:s.length>(e.maxCombinations||50)}}async evaluateArmyComposition(e,t,i,n){let s;if(n&&n.length>0){const{optimizedBattleSimulationService:p}=await R(async()=>{const{optimizedBattleSimulationService:g}=await Promise.resolve().then(()=>fe);return{optimizedBattleSimulationService:g}},void 0);this.unitLoader&&p.initialize(this.unitLoader),s=p.simulateBothScenariosWithEnemyUnits(e,n)}else s=this.battleSimulator.simulateBothScenarios(e,t);const a=this.calculateSilverCost(e,i),r=this.calculateFoodConsumption(e,i),o=this.calculateRevivalCost(e,i),l=s.bestCase.totalDamageDealtToEnemies,c=s.worstCase.totalDamageDealtToEnemies,d=(l+c)/2,m=e.totalLeadershipCost+e.totalDominanceCost+a,u=m>0?d/m:0;return{armyComposition:e,battleAnalysis:s,totalSilverCost:a,totalFoodConsumption:r,totalRevivalCost:o,averageDamagePerBattle:d,damageEfficiencyScore:u}}calculateSilverCost(e,t){const i=new Map(t.map(s=>[s.name,s]));let n=0;for(const[s,a]of Object.entries(e.units)){const r=i.get(s);r&&(n+=(r.revival_cost_silver??0)*a)}return n}calculateFoodConsumption(e,t){const i=new Map(t.map(s=>[s.name,s]));let n=0;for(const[s,a]of Object.entries(e.units)){const r=i.get(s);r&&(n+=(r.food_consumption??0)*a)}return n}calculateRevivalCost(e,t){return this.calculateSilverCost(e,t)}validateOptimizationConstraints(e){if(e.enemyGroupCount<1||e.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(e.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(e.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!e.availableUnits||e.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(e.maxCombinations&&e.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class he{constructor(){h(this,"name","Systematic Combination Testing")}async generateCombinations(e,t){const i=performance.now(),n=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const s=t.filter(l=>e.availableUnits.includes(l.name));console.log(`📋 Available units for optimization: ${s.length}`);const a=e.maxCombinations||50,r=this.generateUnitCombinations(s.map(l=>l.name),a);console.log(`🔄 Testing ${r.length} different unit combinations (user requested: ${a})`);const o=[];for(let l=0;l<r.length;l++){const c=performance.now();if(c-i>n){console.warn(`⏱️ Generation timeout after ${(c-i)/1e3}s - stopping at ${l} combinations`);break}const d=r[l];try{const m=await this.testCombinationWithStackingAlgorithm(d,e,t);m&&o.push(m)}catch(m){console.warn(`⚠️ Failed to test combination [${d.join(", ")}]:`,m)}if(l%5===0&&await new Promise(m=>setTimeout(m,0)),l%20===0&&l>0){const m=(performance.now()-i)/1e3;console.log(`🔄 Generation progress: ${l}/${r.length} combinations tested (${m.toFixed(1)}s)`)}}return console.log(`✅ Generated ${o.length} valid army combinations for evaluation`),o}generateUnitCombinations(e,t){const i=Math.pow(2,e.length)-1;if(console.log(`📊 Total possible combinations: ${i}, user requested: ${t}`),i>t)return this.generateLimitedCombinations(e,t);const n=[];for(let s=1;s<=i;s++){const a=[];for(let r=0;r<e.length;r++)s&1<<r&&a.push(e[r]);n.push(a)}return n.sort((s,a)=>a.length-s.length),console.log(`🎯 Generated all ${n.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${t} combinations (all possible combinations fit within limit)`),n}generateLimitedCombinations(e,t){const i=[];i.push([...e]);for(let n=0;n<e.length&&i.length<t;n++){const s=e.filter((a,r)=>r!==n);i.push(s)}for(let n=0;n<e.length&&i.length<t;n++)for(let s=n+1;s<e.length&&i.length<t;s++){const a=e.filter((r,o)=>o!==n&&o!==s);a.length>0&&i.push(a)}for(let n=0;n<e.length&&i.length<t;n++)for(let s=n+1;s<e.length&&i.length<t;s++)for(let a=s+1;a<e.length&&i.length<t;a++){const r=e.filter((o,l)=>l!==n&&l!==s&&l!==a);r.length>0&&i.push(r)}if(i.length<t){const n=Math.floor(e.length/2);for(let a=0;a<10&&i.length<t;a++){const r=this.getRandomCombination(e,n);i.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||i.push(r)}const s=Math.max(1,Math.floor(e.length/4));for(let a=0;a<5&&i.length<t;a++){const r=this.getRandomCombination(e,s);i.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||i.push(r)}}return console.log(`🎯 Generated ${i.length} top-down combinations from ${e.length} units`),console.log(`   Strategy: Started with all ${e.length} units, then systematically removed units`),console.log(`   User requested: ${t} combinations (time-based limits still apply)`),i}getRandomCombination(e,t){return[...e].sort(()=>Math.random()-.5).slice(0,t)}async testCombinationWithStackingAlgorithm(e,t,i){try{const n=new q(i),s={leadershipBudget:t.leadershipBudget,dominanceBudget:t.dominanceBudget,mercenaryLimits:t.mercenaryLimits,availableUnits:e},a=await n.optimizeArmy(s);return a.compositions&&a.compositions.length>0?a.compositions[0]:null}catch(n){return console.warn(`Failed to test combination [${e.join(", ")}]:`,n),null}}}class pe{constructor(){h(this,"unitLoader",null)}initialize(e){this.unitLoader=e}getUnitTypes(e){if(!this.unitLoader)throw new Error("Unit loader not initialized");const t=this.unitLoader.getUnitByName(e);return t?t.unit_types||[]:(console.warn(`Unit not found: ${e}`),[])}getUnit(e){if(!this.unitLoader)throw new Error("Unit loader not initialized");return this.unitLoader.getUnitByName(e)}getFullUnitData(e){return this.getUnit(e)}hasUnitType(e,t){return this.getUnitTypes(e).some(n=>n.toLowerCase()===t.toLowerCase())}getAllUnitTypes(){if(!this.unitLoader)throw new Error("Unit loader not initialized");return this.unitLoader.getUniqueUnitTypes()}validateStackingGroups(e){const t=[],i=[];for(const n of e){const s=this.getUnit(n.unitName);s?(!s.unit_types||s.unit_types.length===0)&&i.push(`Unit ${n.unitName} has no unit types defined`):t.push(n.unitName)}return{isValid:t.length===0,missingUnits:t,warnings:i}}}const N=new pe;class X{constructor(){h(this,"unitLoader",null);h(this,"coreBattleService");this.coreBattleService=new H}initialize(e){this.unitLoader=e,N.initialize(e)}simulateBattle(e){return this.coreBattleService.simulateBattle(e)}simulateBothScenarios(e,t){return this.coreBattleService.simulateBothScenarios(e,t)}calculateEnemyAttackOrderWithUnits(e,t){const i=e.map((n,s)=>{const a=n.strength;let r=a;return n.attack_modifiers&&n.attack_modifiers.length>0&&n.attack_modifiers.forEach(o=>{if(t.stackingOrder.some(c=>this.playerUnitMatchesModifierTarget(c.unitName,o.target_type))){const c=a*(o.value/100),d=a+c;d>r&&(r=d)}}),{index:s,enemy:n,baseDamage:a,maxDamage:r}});return i.sort((n,s)=>s.maxDamage-n.maxDamage),console.log("🎯 Enemy Attack Order by Max Damage:"),i.forEach((n,s)=>{if(console.log(`  ${s+1}. ${n.enemy.name}: ${n.maxDamage.toLocaleString()} damage`),n.maxDamage>n.baseDamage){const a=n.maxDamage-n.baseDamage;console.log(`     (${n.baseDamage.toLocaleString()} base + ${a.toLocaleString()} bonus)`)}}),i.map(n=>n.index)}playerUnitMatchesModifierTarget(e,t){const i=e.toLowerCase();switch(t.toLowerCase()){case"mounted":return i.includes("rider")||i.includes("knight");case"melee":return i.includes("spearman")||i.includes("knight")||i.includes("guardian");case"ranged":return i.includes("archer")||i.includes("hunter");case"flying":return i.includes("dragon")||i.includes("phoenix")||i.includes("griffen");case"magic":return i.includes("magic")||i.includes("phoenix");default:return!1}}calculateAttackOrder(e){return this.coreBattleService.calculateAttackOrder(e)}calculateEnemyTargetOrder(e){return this.coreBattleService.calculateEnemyTargetOrder(e)}shouldBattleEnd(e){return this.coreBattleService.shouldBattleEnd(e)}processTurn(e,t){return this.coreBattleService.processTurn(e,t)}simulateBattleWithEnemyUnits(e){var r;this.validateEnemyUnitBattleConfiguration(e),console.log("🎯 Enemy Battle Simulation Debug:",{playerGoesFirst:e.playerGoesFirst,playerGroups:((r=e.playerArmy.stackingOrder)==null?void 0:r.length)||0,enemyUnits:e.enemyUnits.length,useEnemyModifiers:e.useEnemyModifiers});const i=this.calculateEnemyAttackOrderWithUnits(e.enemyUnits,e.playerArmy).map(o=>e.enemyUnits[o]),n={playerArmy:e.playerArmy,enemyGroupCount:i.length,playerGoesFirst:e.playerGoesFirst},s=this.coreBattleService.simulateBattle(n);console.log("📋 Standard combat log BEFORE enhancement:"),s.combatLog.forEach((o,l)=>{console.log(`  ${l}: Turn ${o.turn} - ${o.action}`)});const a=this.enhanceCombatLogWithEnemyUnits(s.combatLog,i,e.playerArmy,e.useEnemyModifiers!==!1);return console.log("📋 Enhanced combat log AFTER enhancement:"),a.forEach((o,l)=>{console.log(`  ${l}: Turn ${o.turn} - ${o.action}`)}),{...s,combatLog:a}}simulateBothScenariosWithEnemyUnits(e,t,i=!0){var c,d,m,u,p,g,f,y,S;console.log("🔄 simulateBothScenariosWithEnemyUnits called with:",{playerStackingGroups:((c=e.stackingOrder)==null?void 0:c.length)||0,enemyUnitsCount:t.length,useEnemyModifiers:i});const n=v.validateBattleConfiguration({playerArmy:e,enemyUnits:t});if(!n.isValid)throw new Error(n.errors[0]);(m=(d=this.coreBattleService.attackOrderCache)==null?void 0:d.clear)==null||m.call(d),(p=(u=this.coreBattleService.targetOrderCache)==null?void 0:u.clear)==null||p.call(u);const s={playerArmy:e,enemyUnits:t,playerGoesFirst:!0,useEnemyModifiers:i},a=this.simulateBattleWithEnemyUnits(s);(f=(g=this.coreBattleService.attackOrderCache)==null?void 0:g.clear)==null||f.call(g),(S=(y=this.coreBattleService.targetOrderCache)==null?void 0:y.clear)==null||S.call(y);const r={playerArmy:JSON.parse(JSON.stringify(e)),enemyUnits:JSON.parse(JSON.stringify(t)),playerGoesFirst:!1,useEnemyModifiers:i},o=this.simulateBattleWithEnemyUnits(r),l={damageDifference:a.totalDamageDealtToEnemies-o.totalDamageDealtToEnemies,survivalDifference:a.playerSurvivalTurns-o.playerSurvivalTurns,averageDamage:(a.totalDamageDealtToEnemies+o.totalDamageDealtToEnemies)/2,averageSurvival:(a.playerSurvivalTurns+o.playerSurvivalTurns)/2};return{bestCase:a,worstCase:o,comparison:l}}enhanceCombatLogWithEnemyUnits(e,t,i,n){return e.map((s,a)=>{const r={...s},o=!s.eliminated,l=s.eliminated;if(o){const c=this.extractEnemyGroupIndex(s.target);if(c>=0&&c<t.length){const d=t[c];r.enemyUnit=d;const m=this.extractUnitNameFromAttacker(s.attacker),u=s.damageDealt||0;if(n&&m){const{enhancedDamage:p,modifiersApplied:g}=this.calculatePlayerModifiers(m,d,u);if(p!==u){r.damageDealt=p,r.modifiersApplied=g;const f=Math.floor(p/d.health);let y=`attack ${d.name} and deal ${p.toLocaleString()} damage`;if(f>0&&(y+=` (${f} ${d.name}${f>1?"s":""} killed)`),g.length>0){const S=g.map(x=>{const L=Math.round(x.value/u*100);return`+${Math.round(x.value)} bonus damage (+${L}%) vs ${x.type}`}).join(", ");y+=` (${S})`}r.action=y}else r.target=d.name,r.action=s.action.replace(/Enemy Group \d+/,d.name)}else r.target=d.name,r.action=s.action.replace(/Enemy Group \d+/,d.name)}}else if(l){const c=this.extractEnemyGroupIndex(s.attacker);if(c>=0&&c<t.length){const d=t[c];if(r.enemyUnit=d,r.effectiveStrength=d.strength,n&&d.attack_modifiers){const m=this.extractUnitNameFromTarget(s.target);if(m){const{enhancedStrength:u,modifiersApplied:p}=this.calculateEnemyModifiers(d,m);if(u!==d.strength){r.effectiveStrength=u,r.modifiersApplied=p;let g=`attack and kill ${s.target}`;if(p.length>0){const f=p.map(y=>{const S=Math.round(y.value/d.strength*100);return`+${Math.round(y.value)} bonus damage (+${S}%) vs ${y.type}`}).join(", ");g+=` (${f})`}r.action=g}}}r.attacker=d.name}}return r})}calculatePlayerModifiers(e,t,i){let n=i;const s=[];try{const a=this.unitLoader?this.unitLoader.getUnitByName(e):null;if(a&&a.attack_modifiers){for(const r of a.attack_modifiers)if(t.unit_types.some(o=>o.toLowerCase()===r.target_type.toLowerCase())){const o=i*(r.value/100);n+=o,s.push({type:r.target_type,value:o})}}}catch(a){console.warn("Unit type lookup failed for player unit:",e,a)}return{enhancedDamage:n,modifiersApplied:s}}calculateEnemyModifiers(e,t){let i=e.strength;const n=[];try{const s=N.getUnitTypes(t);for(const a of e.attack_modifiers||[])if(s.includes(a.target_type)){const r=e.strength*(a.value/100);i+=r,n.push({type:a.target_type,value:r})}}catch(s){console.warn("Unit type lookup failed for target unit:",t,s)}return{enhancedStrength:i,modifiersApplied:n}}extractEnemyGroupIndex(e){const t=e.match(/Enemy Group (\d+)/);return t?parseInt(t[1])-1:-1}extractUnitNameFromAttacker(e){const t=e.match(/^\d+\s+(.+)$/);return t?t[1]:null}extractUnitNameFromTarget(e){const t=e.match(/^\d+\s+(.+)$/);return t?t[1]:null}validateEnemyUnitBattleConfiguration(e){if(!e)throw new Error("Battle configuration is required");const t=v.validateBattleConfiguration({playerArmy:e.playerArmy,enemyUnits:e.enemyUnits});if(!t.isValid)throw new Error(t.errors[0]);for(const i of e.playerArmy.stackingOrder){if(!i.unitName||i.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(i.count<=0)throw new Error(`Unit group "${i.unitName}" must have a positive count`);if(i.unitStrength<=0)throw new Error(`Unit group "${i.unitName}" must have positive strength`);if(i.totalHealth<=0)throw new Error(`Unit group "${i.unitName}" must have positive health`)}for(const i of e.enemyUnits){if(!i.name||i.name.trim()==="")throw new Error("All enemy units must have a valid name");if(i.health<=0)throw new Error(`Enemy unit "${i.name}" must have positive health`);if(i.strength<0)throw new Error(`Enemy unit "${i.name}" cannot have negative strength`)}}getEnemyUnitBattleStatistics(e){const t=w.calculateBattleStatistics(e.combatLog,e.totalDamageDealtToEnemies),i=e.combatLog.filter(r=>r.enemyUnit!==void 0),n={},s={},a={};return i.forEach(r=>{if(r.enemyUnit){const o=r.enemyUnit.name;if(r.eliminated)s[o]=(s[o]||0)+1,r.modifiersApplied&&r.modifiersApplied.forEach(l=>{const c=`${o} vs ${l.type}`;a[c]=(a[c]||0)+l.value});else{const l=r.damageDealt||0;n[o]=(n[o]||0)+l}}}),{...t,damageByEnemyUnit:n,attacksByEnemyUnit:s,modifiersUsed:a,totalEnemyUnitsInvolved:Object.keys(s).length,totalModifierApplications:Object.keys(a).length}}}class A{static isPlayerUnit(e){return"unitName"in e&&"count"in e}static isEnemyUnit(e){return"name"in e&&"unit_types"in e&&!("count"in e)}static getUnitName(e){return A.isPlayerUnit(e)?e.unitName:e.name}static getUnitTypes(e,t){return A.isEnemyUnit(e)?e.unit_types:t?t.unitTypes[e.unitName]||[]:[]}static getBaseStrength(e){return A.isPlayerUnit(e)?e.unitStrength:e.strength}static getHealth(e){return A.isPlayerUnit(e)?e.totalHealth:e.health}static calculateTotalHealth(e){return A.isPlayerUnit(e)?e.totalHealth*e.count:e.health}static calculateBaseDamage(e){return A.isPlayerUnit(e)?e.count*e.unitStrength:e.strength}static formatForDisplay(e){return A.isPlayerUnit(e)?`${e.count} ${e.unitName}`:e.name}}const I={optimizePlayerOrder:!0,optimizeEnemyOrder:!0,useUnitModifiers:!0,maxCalculationTimeMs:5e3,enableCaching:!0,algorithm:"greedy"},K={MAX_UNITS_FOR_EXACT_OPTIMIZATION:50,MAX_CACHE_SIZE:1e4};class ge{constructor(){h(this,"damageCalculationCache",new Map);h(this,"modifierCache",new Map);h(this,"metrics",this.initializeMetrics())}initializeMetrics(){return{totalUnitsProcessed:0,totalCalculations:0,cacheHitRate:0,memoryUsageBytes:0,timeBreakdown:{damageCalculation:0,matrixGeneration:0,optimization:0,caching:0}}}async optimizeBidirectional(e,t,i=I){const n=performance.now();this.metrics=this.initializeMetrics();let s,a;i.optimizePlayerOrder?s=await this.optimizeAttackOrder(e,t,"player",i):s=this.createNoOptimizationResult(e,t,"player"),i.optimizeEnemyOrder?a=await this.optimizeAttackOrder(t,e,"enemy",i):a=this.createNoOptimizationResult(t,e,"enemy");const r=performance.now()-n;return{playerOptimization:s,enemyOptimization:a,combinedMetrics:{totalDamageImprovement:s.optimizedTotalDamage-s.originalTotalDamage+a.optimizedTotalDamage-a.originalTotalDamage,averageImprovementPercentage:(s.improvementPercentage+a.improvementPercentage)/2,totalOptimizationTimeMs:r}}}async optimizeAttackOrder(e,t,i,n){const s=performance.now(),a=await this.generateDamageMatrix(e,t,i,n),r=this.calculateTotalDamage(e,t,a),o=this.optimizeOrder(e,t,a,n),l=this.calculateTotalDamage(o,t,a),c=performance.now()-s,d=r>0?(l-r)/r*100:0;return{originalOrder:[...e],optimizedOrder:o,damageMatrix:a,originalTotalDamage:r,optimizedTotalDamage:l,improvementPercentage:d,side:i,optimizationTimeMs:c}}async generateDamageMatrix(e,t,i,n){const s=performance.now(),a=[];for(let o=0;o<e.length;o++){a[o]=[];for(let l=0;l<t.length;l++){const c=e[o],d=t[l];a[o][l]=await this.calculateEffectiveDamage(c,d,i,i==="player"?"enemy":"player",n),this.metrics.totalCalculations++}}const r=performance.now()-s;return this.metrics.timeBreakdown.matrixGeneration+=r,{calculations:a,attackers:[...e],targets:[...t],calculationTimeMs:r}}async calculateEffectiveDamage(e,t,i,n,s){const a=performance.now(),r=A.calculateBaseDamage(e);let o=r;const l=[];if(s.useUnitModifiers){const m=await this.applyUnitModifiers(e,t,r);o=m.modifiedValue,l.push(...m.appliedModifiers)}const c=A.calculateTotalHealth(t),d=Math.min(o,c);return this.metrics.timeBreakdown.damageCalculation+=performance.now()-a,{attacker:e,target:t,baseDamage:r,effectiveDamage:d,modifiersApplied:l,attackerSide:i,targetSide:n}}async applyUnitModifiers(e,t,i){const n=A.getUnitName(e),s=A.getUnitName(t),a=`${n}:${s}:${i}`;if(this.modifierCache.has(a))return this.modifierCache.get(a);let r=i;const o=[],l=A.isEnemyUnit(t)?t.unit_types:this.getPlayerUnitTypes(t.unitName);if(A.isEnemyUnit(e)){const d=e;if(d.attack_modifiers){for(const m of d.attack_modifiers)if(l.some(u=>u.toLowerCase()===m.target_type.toLowerCase())){const u=m.value;r+=u,o.push({type:`vs ${m.target_type}`,value:u,source:d.name})}}}else if(A.isEnemyUnit(t)){const d=await this.getPlayerUnitData(e.unitName);if(d&&d.attack_modifiers){for(const m of d.attack_modifiers)if(l.some(u=>u.toLowerCase()===m.target_type.toLowerCase())){const u=m.value;r+=u,o.push({type:`vs ${m.target_type}`,value:u,source:e.unitName})}}}r=Math.max(0,r);const c={baseValue:i,modifiedValue:r,appliedModifiers:o,hasModifiers:o.length>0};return this.modifierCache.size<K.MAX_CACHE_SIZE&&this.modifierCache.set(a,c),c}optimizeOrder(e,t,i,n){const s=performance.now();let a;switch(n.algorithm){case"greedy":a=this.greedyOptimization(e,t,i);break;case"dynamic":a=this.dynamicOptimization(e,t,i);break;case"heuristic":a=this.heuristicOptimization(e,t,i);break;default:a=this.greedyOptimization(e,t,i)}return this.metrics.timeBreakdown.optimization+=performance.now()-s,a}greedyOptimization(e,t,i){const n=[],s=[...e];for(;s.length>0;){let a=-1,r=0;for(let o=0;o<s.length;o++){const l=e.indexOf(s[o]);let c=0;for(let d=0;d<t.length;d++)c+=i.calculations[l][d].effectiveDamage;c>a&&(a=c,r=o)}n.push(s[r]),s.splice(r,1)}return n}dynamicOptimization(e,t,i){return this.greedyOptimization(e,t,i)}heuristicOptimization(e,t,i){return e.length>K.MAX_UNITS_FOR_EXACT_OPTIMIZATION?[...e].sort((n,s)=>A.calculateBaseDamage(s)-A.calculateBaseDamage(n)):this.greedyOptimization(e,t,i)}calculateTotalDamage(e,t,i){let n=0;for(let s=0;s<e.length;s++){const a=i.attackers.indexOf(e[s]);if(a>=0)for(let r=0;r<t.length;r++)n+=i.calculations[a][r].effectiveDamage}return n}createNoOptimizationResult(e,t,i){const n={calculations:[],attackers:[...e],targets:[...t],calculationTimeMs:0};return{originalOrder:[...e],optimizedOrder:[...e],damageMatrix:n,originalTotalDamage:0,optimizedTotalDamage:0,improvementPercentage:0,side:i,optimizationTimeMs:0}}getMetrics(){const e=this.metrics.totalCalculations,t=this.damageCalculationCache.size+this.modifierCache.size;return this.metrics.cacheHitRate=e>0?t/e:0,this.metrics.memoryUsageBytes=this.damageCalculationCache.size*64+this.modifierCache.size*128,{...this.metrics}}clearCache(){this.damageCalculationCache.clear(),this.modifierCache.clear()}getPlayerUnitTypes(e){return N.getUnitTypes(e)}async getPlayerUnitData(e){return N.getFullUnitData(e)}initialize(e){N.initialize(e)}}const F=new ge;class j extends X{constructor(){super(...arguments);h(this,"optimizationCache",new Map)}initialize(t){super.initialize(t),F.initialize(t)}simulateOptimizedBattle(t){if(!t.useOptimization)return{...this.simulateBattle(t),optimizationUsed:!1};const i=Array.from({length:t.enemyGroupCount},(n,s)=>({name:`Enemy Group ${s+1}`,unit_types:["Generic"],health:1e6,strength:1e3,attack_modifiers:[]}));return this.simulateOptimizedBattleWithEnemyUnits({...t,enemyUnits:i,optimizationConfig:t.optimizationConfig||I,useOptimization:!0})}simulateOptimizedBattleWithEnemyUnits(t){if(!t.useOptimization)return{...this.simulateBattleWithEnemyUnits(t),optimizationUsed:!1};const i=t.optimizationConfig||I,n=this.createOptimizationCacheKey(t.playerArmy.stackingOrder,t.enemyUnits,i);let s;if(this.optimizationCache.has(n))s=this.optimizationCache.get(n);else try{s=this.performSynchronousOptimization(t.playerArmy.stackingOrder,t.enemyUnits,i),this.optimizationCache.size<100&&this.optimizationCache.set(n,s)}catch(l){return console.warn("Attack order optimization failed, falling back to standard simulation:",l),{...this.simulateBattleWithEnemyUnits(t),optimizationUsed:!1}}const a={...t,playerArmy:{...t.playerArmy,stackingOrder:(s==null?void 0:s.playerOptimization.optimizedOrder)||t.playerArmy.stackingOrder}},r=this.simulateBattleWithEnemyUnits(a),o=F.getMetrics();return{...r,optimizationResult:s,optimizationUsed:!0,optimizationMetrics:o}}performSynchronousOptimization(t,i,n){const s=this.optimizePlayerOrder(t,i,n),a=this.optimizeEnemyOrder(i,t,n);return{playerOptimization:s,enemyOptimization:a,combinedMetrics:{totalDamageImprovement:s.optimizedTotalDamage-s.originalTotalDamage+a.optimizedTotalDamage-a.originalTotalDamage,averageImprovementPercentage:(s.improvementPercentage+a.improvementPercentage)/2,totalOptimizationTimeMs:s.optimizationTimeMs+a.optimizationTimeMs}}}optimizePlayerOrder(t,i,n){const s=performance.now();if(!n.optimizePlayerOrder)return this.createNoOptimizationResult(t,"player",s);const a=[...t].sort((c,d)=>{const m=this.calculateSimpleDamage(c,i);return this.calculateSimpleDamage(d,i)-m}),r=this.calculateTotalSimpleDamage(t,i),o=this.calculateTotalSimpleDamage(a,i),l=r>0?(o-r)/r*100:0;return{originalOrder:[...t],optimizedOrder:a,damageMatrix:{calculations:[],attackers:[],targets:[],calculationTimeMs:0},originalTotalDamage:r,optimizedTotalDamage:o,improvementPercentage:l,side:"player",optimizationTimeMs:performance.now()-s}}optimizeEnemyOrder(t,i,n){const s=performance.now();if(!n.optimizeEnemyOrder)return this.createNoOptimizationResult(t,"enemy",s);const a=[...t].sort((c,d)=>d.strength-c.strength),r=t.reduce((c,d)=>c+d.strength,0),o=a.reduce((c,d)=>c+d.strength,0);return{originalOrder:[...t],optimizedOrder:a,damageMatrix:{calculations:[],attackers:[],targets:[],calculationTimeMs:0},originalTotalDamage:r,optimizedTotalDamage:o,improvementPercentage:0,side:"enemy",optimizationTimeMs:performance.now()-s}}calculateSimpleDamage(t,i){const n=t.count*t.unitStrength;let s=0;for(const a of i){let r=n;const o=this.unitLoader?this.unitLoader.getUnitByName(t.unitName):null;if(o&&o.attack_modifiers)for(const l of o.attack_modifiers)a.unit_types.some(c=>c.toLowerCase()===l.target_type.toLowerCase())&&(r+=l.value*t.count);s+=Math.max(0,r)}return s}calculateTotalSimpleDamage(t,i){return t.reduce((n,s)=>n+this.calculateSimpleDamage(s,i),0)}createNoOptimizationResult(t,i,n){return{originalOrder:[...t],optimizedOrder:[...t],damageMatrix:{calculations:[],attackers:[],targets:[],calculationTimeMs:0},originalTotalDamage:0,optimizedTotalDamage:0,improvementPercentage:0,side:i,optimizationTimeMs:performance.now()-n}}createOptimizationCacheKey(t,i,n){const s=t.map(o=>`${o.unitName}:${o.count}:${o.unitStrength}`).join("|"),a=i.map(o=>`${o.name}:${o.strength}`).join("|"),r=`${n.optimizePlayerOrder}:${n.optimizeEnemyOrder}:${n.useUnitModifiers}`;return`${s}::${a}::${r}`}calculateOptimizedAttackOrder(t,i,n=I){if(!n.optimizePlayerOrder||!i||i.length===0)return this.calculateAttackOrder(t);try{return this.optimizePlayerOrder(t,i,n).optimizedOrder}catch(s){return console.warn("Attack order optimization failed, using standard calculation:",s),this.calculateAttackOrder(t)}}compareOptimizationBenefit(t,i,n=I){var u;const s={playerArmy:t,enemyUnits:i,playerGoesFirst:!0,useEnemyModifiers:!0},a=this.simulateBattleWithEnemyUnits(s),r={...s,useOptimization:!0,optimizationConfig:n},o=this.simulateOptimizedBattleWithEnemyUnits(r),l=o.totalDamageDealtToEnemies-a.totalDamageDealtToEnemies,c=a.totalDamageDealtToEnemies>0?l/a.totalDamageDealtToEnemies*100:0,d=o.playerSurvivalTurns-a.playerSurvivalTurns,m=((u=o.optimizationResult)==null?void 0:u.combinedMetrics.totalOptimizationTimeMs)||0;return{standardResult:a,optimizedResult:o,improvement:{damageIncrease:l,damageIncreasePercentage:c,survivalIncrease:d,optimizationTimeMs:m}}}simulateBothScenariosWithEnemyUnits(t,i,n=!0){const s={playerArmy:t,enemyUnits:i,playerGoesFirst:!0,useEnemyModifiers:n,useOptimization:!0,optimizationConfig:I},a=this.simulateOptimizedBattleWithEnemyUnits({...s,playerGoesFirst:!0}),r=this.simulateOptimizedBattleWithEnemyUnits({...s,playerGoesFirst:!1}),o=a.totalDamageDealtToEnemies-r.totalDamageDealtToEnemies,l=a.playerSurvivalTurns-r.playerSurvivalTurns,c=(a.totalDamageDealtToEnemies+r.totalDamageDealtToEnemies)/2,d=(a.playerSurvivalTurns+r.playerSurvivalTurns)/2;return{bestCase:a,worstCase:r,comparison:{damageDifference:o,survivalDifference:l,averageDamage:c,averageSurvival:d}}}clearOptimizationCache(){this.optimizationCache.clear(),F.clearCache()}}const ye=new j,fe=Object.freeze(Object.defineProperty({__proto__:null,OptimizedBattleSimulationService:j,optimizedBattleSimulationService:ye},Symbol.toStringTag,{value:"Module"}));class Z{constructor(){h(this,"enemyUnits",[]);h(this,"enemyUnitsByName",new Map);h(this,"enemyUnitsByType",new Map);this.resetData()}async loadPresetEnemyUnits(){return this.loadEnemyUnits(J.ENEMY_UNITS)}async loadEnemyUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading enemy units from: ${e}`);const i=await fetch(e);if(!i.ok)throw new Error(`Failed to fetch enemy units: ${i.status} ${i.statusText}`);t=await i.json()}else t=e;if(!Array.isArray(t))throw new Error("Enemy unit data must be an array");return this.enemyUnits=t.map(i=>this.validateAndNormalizeEnemyUnit(i)),this.buildLookups(),console.log(`✅ Loaded ${this.enemyUnits.length} enemy units successfully`),this.enemyUnits}catch(t){throw console.error("❌ Error loading enemy units:",t),t}}validateAndNormalizeEnemyUnit(e){const t={name:e.name||"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],health:Number(e.health)||0,strength:Number(e.strength)||0,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers:[]};return(!Array.isArray(t.unit_types)||t.unit_types.length===0)&&(console.warn(`Enemy unit ${t.name} has no unit types, adding 'Unknown'`),t.unit_types=["Unknown"]),t.health<=0&&(console.warn(`Enemy unit ${t.name} has invalid health: ${t.health}`),t.health=1),t.strength<0&&(console.warn(`Enemy unit ${t.name} has negative strength: ${t.strength}`),t.strength=0),t.attack_modifiers&&Array.isArray(t.attack_modifiers)&&(t.attack_modifiers=t.attack_modifiers.filter(i=>!i||typeof i!="object"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier object`),!1):!i.target_type||typeof i.value!="number"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier: ${JSON.stringify(i)}`),!1):!0)),t}buildLookups(){this.resetData(),this.enemyUnitsByName=new Map(this.enemyUnits.map(e=>[e.name,e])),this.enemyUnits.forEach(e=>{e.unit_types.forEach(t=>{this.enemyUnitsByType.has(t)||this.enemyUnitsByType.set(t,[]),this.enemyUnitsByType.get(t).push(e)})}),this.enemyUnitsByType.forEach(e=>{e.sort((t,i)=>i.strength-t.strength)})}resetData(){this.enemyUnitsByName.clear(),this.enemyUnitsByType.clear()}getAllEnemyUnits(){return[...this.enemyUnits]}getEnemyUnitByName(e){return this.enemyUnitsByName.get(e)}getEnemyUnitsByType(e){return[...this.enemyUnitsByType.get(e)||[]]}getUniqueEnemyUnitTypes(){return Array.from(this.enemyUnitsByType.keys()).sort()}filterEnemyUnits(e){let t=this.enemyUnits;return e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(i=>e.unitTypes.some(n=>i.unit_types.includes(n)))),e.minStrength!==void 0&&(t=t.filter(i=>i.strength>=e.minStrength)),e.maxStrength!==void 0&&(t=t.filter(i=>i.strength<=e.maxStrength)),e.minHealth!==void 0&&(t=t.filter(i=>i.health>=e.minHealth)),e.maxHealth!==void 0&&(t=t.filter(i=>i.health<=e.maxHealth)),t}searchEnemyUnits(e){if(!e.trim())return this.getAllEnemyUnits();const t=e.toLowerCase();return this.enemyUnits.filter(i=>i.name.toLowerCase().includes(t))}getEnhancedEnemyUnits(){return this.enemyUnits.map(e=>({...e,get strengthPerHealth(){return v.getStrengthPerHealth(e)},get effectivenessScore(){return v.getEffectivenessScore(e)}}))}getEnemyUnitSummary(){if(this.enemyUnits.length===0)return{totalUnits:0,byUnitType:{},strengthRange:{min:0,max:0,average:0},healthRange:{min:0,max:0,average:0}};const e=this.enemyUnits.map(n=>n.strength),t=this.enemyUnits.map(n=>n.health),i={};return this.enemyUnitsByType.forEach((n,s)=>{i[s]=n.length}),{totalUnits:this.enemyUnits.length,byUnitType:i,strengthRange:{min:Math.min(...e),max:Math.max(...e),average:Math.round(e.reduce((n,s)=>n+s,0)/e.length)},healthRange:{min:Math.min(...t),max:Math.max(...t),average:Math.round(t.reduce((n,s)=>n+s,0)/t.length)}}}getStatistics(){if(this.enemyUnits.length===0)return{totalUnits:0,unitTypeDistribution:{},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[],unitsWithAttackModifiers:0};const e=this.enemyUnits.map(s=>s.strength),t=this.enemyUnits.map(s=>s.health),i={};this.enemyUnitsByType.forEach((s,a)=>{i[a]=s.length});const n=this.enemyUnits.filter(s=>s.attack_modifiers&&Array.isArray(s.attack_modifiers)&&s.attack_modifiers.length>0).length;return{totalUnits:this.enemyUnits.length,unitTypeDistribution:i,strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((s,a)=>s+a,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((s,a)=>s+a,0)/t.length)},topUnitsByStrength:[...this.enemyUnits].sort((s,a)=>a.strength-s.strength).slice(0,10),topUnitsByHealth:[...this.enemyUnits].sort((s,a)=>a.health-s.health).slice(0,10),unitsWithAttackModifiers:n}}getEnemyUnitsWithModifiersAgainst(e){return this.enemyUnits.filter(t=>!t.attack_modifiers||!Array.isArray(t.attack_modifiers)?!1:e.some(i=>t.attack_modifiers.some(n=>n.target_type.toLowerCase()===i.toLowerCase())))}getMostEffectiveAgainst(e,t=5){return this.enemyUnits.map(i=>({unit:i,effectiveness:this.calculateEffectivenessAgainst(i,e)})).sort((i,n)=>n.effectiveness-i.effectiveness).slice(0,t).map(i=>i.unit)}calculateEffectivenessAgainst(e,t){let i=v.getEffectivenessScore(e);return e.attack_modifiers&&Array.isArray(e.attack_modifiers)&&t.forEach(n=>{const s=v.getAttackModifierAgainst(e,n);i+=s*.1}),i}}class B{static validateEnemyUnit(e){return v.validateEnemyUnit(e)}static validateUserEnemyUnit(e){const t=v.validateEnemyUnit(e),i=[...t.errors],n=[...t.warnings||[]];return(!e.id||typeof e.id!="string"||e.id.trim()==="")&&i.push("User enemy unit must have a valid ID"),(!e.createdAt||!(e.createdAt instanceof Date))&&i.push("User enemy unit must have a valid creation date"),(!e.modifiedAt||!(e.modifiedAt instanceof Date))&&i.push("User enemy unit must have a valid modification date"),e.createdAt&&e.modifiedAt&&e.createdAt instanceof Date&&e.modifiedAt instanceof Date&&e.modifiedAt<e.createdAt&&i.push("Modification date cannot be before creation date"),{isValid:i.length===0,errors:i,warnings:n.length>0?n:void 0}}static validateName(e){if(!e||typeof e!="string")return{isValid:!1,error:"Name must be a non-empty string"};const t=e.trim();return t.length===0?{isValid:!1,error:"Name cannot be empty or only whitespace"}:t.length>100?{isValid:!1,error:"Name cannot exceed 100 characters"}:/[<>\"'&]/.test(t)?{isValid:!1,error:`Name contains invalid characters (<, >, ", ', &)`}:{isValid:!0}}static validateUnitTypes(e){const t=[];if(!Array.isArray(e))return{isValid:!1,error:"Unit types must be an array"};if(e.length===0)return{isValid:!1,error:"At least one unit type is required"};if(e.length>10)return{isValid:!1,error:"Cannot have more than 10 unit types"};for(let n=0;n<e.length;n++){const s=e[n];if(typeof s!="string"||s.trim()==="")return{isValid:!1,error:`Unit type ${n+1} must be a non-empty string`};re.includes(s)||t.push(`Unit type '${s}' is not a standard type`)}return new Set(e).size!==e.length?{isValid:!1,error:"Unit types cannot contain duplicates"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateHealth(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Health must be a number"}:Number.isFinite(e)?e<=0?{isValid:!1,error:"Health must be greater than 0"}:e>5e7?{isValid:!1,error:"Health cannot exceed 50,000,000"}:(e<100&&t.push("Health value is unusually low (less than 100)"),e>1e7&&t.push("Health value is unusually high (greater than 10,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Health must be a finite number"}}static validateStrength(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Strength must be a number"}:Number.isFinite(e)?e<0?{isValid:!1,error:"Strength cannot be negative"}:e>25e6?{isValid:!1,error:"Strength cannot exceed 25,000,000"}:(e===0&&t.push("Strength value of 0 means this unit cannot deal damage"),e<50&&t.push("Strength value is unusually low (less than 50)"),e>5e6&&t.push("Strength value is unusually high (greater than 5,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Strength must be a finite number"}}static validateAttackModifiers(e){const t=[];if(e==null)return{isValid:!0};if(!Array.isArray(e))return{isValid:!1,error:"Attack modifiers must be an array"};if(e.length>20)return{isValid:!1,error:"Cannot have more than 20 attack modifiers"};for(let s=0;s<e.length;s++){const a=e[s];if(!a||typeof a!="object")return{isValid:!1,error:`Attack modifier ${s+1} must be an object`};if(!a.target_type||typeof a.target_type!="string")return{isValid:!1,error:`Attack modifier ${s+1}: target_type is required and must be a string`};if(le.includes(a.target_type)||t.push(`Attack modifier ${s+1}: '${a.target_type}' is not a standard target type`),!a.modifier_type||!oe.includes(a.modifier_type))return{isValid:!1,error:`Attack modifier ${s+1}: modifier_type must be 'Strength'`};if(typeof a.value!="number"||!Number.isFinite(a.value))return{isValid:!1,error:`Attack modifier ${s+1}: value must be a finite number`};if(a.value<0)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot be negative`};if(a.value>1e7)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot exceed 10,000,000`};a.value>1e6&&t.push(`Attack modifier ${s+1}: value is unusually high (${a.value})`)}const i=e.map(s=>{var a;return(a=s.target_type)==null?void 0:a.toLowerCase()}).filter(Boolean);return new Set(i).size!==i.length?{isValid:!1,error:"Attack modifiers cannot have duplicate target types"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateForImport(e){const t=[],i=[];if(!e||typeof e!="object")return{isValid:!1,errors:["Data must be an object"]};const n=this.validateName(e.name);n.isValid||t.push(n.error);const s=this.validateUnitTypes(e.unit_types);s.isValid?s.warnings&&i.push(...s.warnings):t.push(s.error);const a=this.validateHealth(e.health);a.isValid?a.warnings&&i.push(...a.warnings):t.push(a.error);const r=this.validateStrength(e.strength);r.isValid?r.warnings&&i.push(...r.warnings):t.push(r.error);const o=this.validateAttackModifiers(e.attack_modifiers);return o.isValid?o.warnings&&i.push(...o.warnings):t.push(o.error),{isValid:t.length===0,errors:t,warnings:i.length>0?i:void 0}}static validateMultipleUnits(e){if(!Array.isArray(e))return{isValid:!1,results:[],summary:{total:0,valid:0,invalid:0,warnings:0}};const t=e.map((n,s)=>({index:s,validation:this.validateForImport(n)})),i={total:e.length,valid:t.filter(n=>n.validation.isValid).length,invalid:t.filter(n=>!n.validation.isValid).length,warnings:t.filter(n=>n.validation.warnings&&n.validation.warnings.length>0).length};return{isValid:i.invalid===0,results:t,summary:i}}static sanitizeEnemyUnit(e){const t={name:typeof e.name=="string"?e.name.trim():"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types.filter(i=>typeof i=="string"&&i.trim()!==""):["Epic Monster"],health:typeof e.health=="number"&&e.health>0?Math.min(e.health,5e7):1e4,strength:typeof e.strength=="number"&&e.strength>=0?Math.min(e.strength,25e6):5e3,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers.filter(i=>i&&typeof i=="object"&&typeof i.target_type=="string"&&typeof i.value=="number"&&i.value>=0).map(i=>({target_type:i.target_type,modifier_type:"Strength",value:Math.min(i.value,1e7)})):[]};return t.name.length===0&&(t.name="Unknown Enemy"),t.unit_types.length===0&&(t.unit_types=["Epic Monster"]),t}}const D=class D{constructor(e={}){h(this,"storageKey");h(this,"metadataKey");h(this,"maxUnits");h(this,"validateOnLoad");this.storageKey=e.storagePrefix?`${e.storagePrefix}_user_enemy_units`:D.DEFAULT_STORAGE_KEY,this.metadataKey=e.storagePrefix?`${e.storagePrefix}_enemy_units_metadata`:D.METADATA_KEY,this.maxUnits=e.maxUnits||D.DEFAULT_MAX_UNITS,this.validateOnLoad=e.validateOnLoad!==!1}isStorageAvailable(){try{const e="__storage_test__";return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch{return!1}}getAllUserEnemyUnits(){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),[];try{const e=localStorage.getItem(this.storageKey);if(!e)return[];const i=JSON.parse(e).map(n=>({...n,createdAt:new Date(n.createdAt),modifiedAt:new Date(n.modifiedAt)}));return this.validateOnLoad?i.filter(n=>{const s=B.validateUserEnemyUnit(n);return s.isValid?!0:(console.warn(`Invalid stored enemy unit removed: ${n.name}`,s.errors),!1)}):i}catch(e){return console.error("Error loading user enemy units from storage:",e),[]}}saveAllUserEnemyUnits(e){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),!1;try{return localStorage.setItem(this.storageKey,JSON.stringify(e)),this.updateMetadata(),!0}catch(t){return console.error("Error saving user enemy units to storage:",t),!1}}addUserEnemyUnit(e){const t=B.validateEnemyUnit(e);if(!t.isValid)return{success:!1,error:`Validation failed: ${t.errors.join(", ")}`};const i=this.getAllUserEnemyUnits();if(i.length>=this.maxUnits)return{success:!1,error:`Maximum number of units (${this.maxUnits}) reached`};if(i.some(a=>a.name.toLowerCase()===e.name.toLowerCase()))return{success:!1,error:`A unit with the name "${e.name}" already exists`};const n=v.createUserEnemyUnit(e);return i.push(n),this.saveAllUserEnemyUnits(i)?{success:!0,unit:n}:{success:!1,error:"Failed to save unit to storage"}}updateUserEnemyUnit(e,t){const i=this.getAllUserEnemyUnits(),n=i.findIndex(c=>c.id===e);if(n===-1)return{success:!1,error:"Unit not found"};const s=i[n],a={...s,...t},r=B.validateUserEnemyUnit(a);if(!r.isValid)return{success:!1,error:`Validation failed: ${r.errors.join(", ")}`};if(t.name&&i.some((c,d)=>d!==n&&c.name.toLowerCase()===t.name.toLowerCase()))return{success:!1,error:`A unit with the name "${t.name}" already exists`};const o=v.updateUserEnemyUnit(s,t);return i[n]=o,this.saveAllUserEnemyUnits(i)?{success:!0,unit:o}:{success:!1,error:"Failed to save updated unit to storage"}}deleteUserEnemyUnit(e){const t=this.getAllUserEnemyUnits(),i=t.findIndex(s=>s.id===e);return i===-1?{success:!1,error:"Unit not found"}:(t.splice(i,1),this.saveAllUserEnemyUnits(t)?{success:!0}:{success:!1,error:"Failed to save changes to storage"})}getUserEnemyUnitById(e){return this.getAllUserEnemyUnits().find(i=>i.id===e)||null}searchUserEnemyUnits(e){const t=this.getAllUserEnemyUnits();if(!e.trim())return t;const i=e.toLowerCase();return t.filter(n=>n.name.toLowerCase().includes(i))}clearAllUserEnemyUnits(){if(!this.isStorageAvailable())return{success:!1,error:"localStorage is not available"};try{return localStorage.removeItem(this.storageKey),localStorage.removeItem(this.metadataKey),{success:!0}}catch{return{success:!1,error:"Failed to clear storage"}}}exportUserEnemyUnits(){try{const e=this.getAllUserEnemyUnits(),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(i=>{var n,s;return{name:i.name,unit_types:i.unit_types,health:i.health,strength:i.strength,attack_modifiers:i.attack_modifiers,createdAt:((n=i.createdAt)==null?void 0:n.toISOString())??new Date().toISOString(),modifiedAt:((s=i.modifiedAt)==null?void 0:s.toISOString())??new Date().toISOString()}})};return{success:!0,data:JSON.stringify(t,null,2)}}catch{return{success:!1,error:"Failed to export units"}}}importUserEnemyUnits(e,t={}){try{const i=JSON.parse(e);if(!i.units||!Array.isArray(i.units))return{success:!1,errors:["Invalid import format: units array not found"]};const n=t.replace?[]:this.getAllUserEnemyUnits(),s=[];let a=0,r=0;for(const l of i.units){const c=B.validateForImport(l);if(!c.isValid){s.push(`Unit "${l.name||"Unknown"}": ${c.errors.join(", ")}`),r++;continue}if(n.some(u=>u.name.toLowerCase()===l.name.toLowerCase()))if(t.skipDuplicates){r++;continue}else{s.push(`Unit "${l.name}" already exists`),r++;continue}if(n.length>=this.maxUnits){s.push(`Maximum number of units (${this.maxUnits}) reached`);break}const m=v.createUserEnemyUnit({name:l.name,unit_types:l.unit_types,health:l.health,strength:l.strength,attack_modifiers:l.attack_modifiers||[]});n.push(m),a++}return this.saveAllUserEnemyUnits(n)?{success:!0,imported:a,skipped:r,errors:s.length>0?s:void 0}:{success:!1,errors:["Failed to save imported units to storage"]}}catch{return{success:!1,errors:["Invalid JSON format"]}}}getStorageStats(){var a;const e=this.getAllUserEnemyUnits(),t=new Date;t.setHours(0,0,0,0);const i=e.filter(r=>r.createdAt&&r.createdAt>=t).length;let n=null;e.length>0&&(n=new Date(Math.max(...e.map(r=>{var o;return((o=r.modifiedAt)==null?void 0:o.getTime())??0}))));const s=this.isStorageAvailable()?(((a=localStorage.getItem(this.storageKey))==null?void 0:a.length)||0)*2:0;return{totalUnits:e.length,storageSize:s,lastModified:n,unitsCreatedToday:i}}updateMetadata(){if(this.isStorageAvailable())try{const e={lastModified:new Date().toISOString(),version:"1.0"};localStorage.setItem(this.metadataKey,JSON.stringify(e))}catch(e){console.warn("Failed to update metadata:",e)}}getAvailableSpace(){return Math.max(0,this.maxUnits-this.getAllUserEnemyUnits().length)}isNearCapacity(e=.9){return this.getAllUserEnemyUnits().length>=this.maxUnits*e}};h(D,"DEFAULT_STORAGE_KEY","army_calculator_user_enemy_units"),h(D,"METADATA_KEY","army_calculator_enemy_units_metadata"),h(D,"DEFAULT_MAX_UNITS",100);let _=D;class ee{constructor(e){h(this,"container",null);h(this,"props");h(this,"loader");h(this,"storage");h(this,"presetUnits",[]);h(this,"userUnits",[]);h(this,"filteredUnits",[]);h(this,"currentFilter","");h(this,"currentCategory","all");h(this,"currentSelectedUnits",[]);this.props=e,this.loader=new Z,this.storage=new _,this.currentSelectedUnits=e.selectedUnits?[...e.selectedUnits]:[]}async mount(e){this.container=e,await this.loadData(),this.render(),this.attachEventListeners()}async loadData(){try{this.presetUnits=await this.loader.loadPresetEnemyUnits(),this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}catch(e){console.error("Error loading enemy unit data:",e),this.presetUnits=[],this.userUnits=[],this.filteredUnits=[]}}updateFilteredUnits(){let e=[];switch(this.currentCategory){case"preset":e=[...this.presetUnits];break;case"user":e=[...this.userUnits];break;case"all":default:e=[...this.presetUnits,...this.userUnits];break}if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();this.filteredUnits=e.filter(i=>i.name.toLowerCase().includes(t)||i.unit_types.some(n=>n.toLowerCase().includes(t)))}else this.filteredUnits=e;this.filteredUnits.sort((t,i)=>t.name.localeCompare(i.name))}render(){if(!this.container)return;const e=this.props.title||"Select Enemy Unit";this.container.innerHTML=`
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
      `:this.filteredUnits.map(e=>{var n;const t=this.props.mode==="multiple"?this.currentSelectedUnits.some(s=>s.name===e.name):((n=this.props.selectedUnit)==null?void 0:n.name)===e.name,i="id"in e;return`
        <div class="unit-card ${t?"selected":""}" data-unit-name="${e.name}">
          <div class="unit-card-header">
            <div class="unit-info">
              <h4 class="unit-name">
                ${e.name}
                ${i?'<span class="user-badge">👤</span>':'<span class="preset-badge">🏛️</span>'}
              </h4>
              <div class="unit-types">
                ${e.unit_types.map(s=>`<span class="unit-type-tag">${s}</span>`).join("")}
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
                  ${e.attack_modifiers.map(s=>`<span class="modifier-tag">+${s.value.toLocaleString()} vs ${s.target_type}</span>`).join("")}
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
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-selector");e&&e.addEventListener("click",this.handleCancel.bind(this));const t=document.getElementById("cancel-selection");t&&t.addEventListener("click",this.handleCancel.bind(this));const i=document.getElementById("confirm-selection");i&&i.addEventListener("click",this.handleConfirm.bind(this));const n=document.getElementById("unit-search");n&&n.addEventListener("input",this.handleSearch.bind(this));const s=document.getElementById("clear-search");s&&s.addEventListener("click",this.handleClearSearch.bind(this)),document.querySelectorAll(".filter-tab").forEach(r=>{r.addEventListener("click",this.handleFilterChange.bind(this))}),document.querySelectorAll(".select-unit-btn").forEach(r=>{r.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(r=>{r.addEventListener("click",this.handleCardClick.bind(this))});const a=document.querySelector(".modal-overlay");a&&a.addEventListener("click",r=>{r.target===a&&this.handleCancel()}),document.addEventListener("keydown",this.handleKeyDown.bind(this))}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitList()}handleFilterChange(e){const i=e.target.dataset.category;i&&i!==this.currentCategory&&(this.currentCategory=i,this.updateFilteredUnits(),this.refreshFilterTabs(),this.refreshUnitList())}handleUnitSelect(e){e.stopPropagation();const i=e.target.dataset.unitName;if(i){const n=this.filteredUnits.find(s=>s.name===i);if(n){if(this.props.mode==="multiple"){const s=this.currentSelectedUnits.findIndex(a=>a.name===n.name);if(s>=0)this.currentSelectedUnits.splice(s,1);else{const a=this.props.maxSelections||5;this.currentSelectedUnits.length<a?this.currentSelectedUnits.push(n):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(n))}this.refreshUnitList()}this.props.onSelect(n)}}}handleCardClick(e){const i=e.target.closest(".unit-card");if(i){const n=i.dataset.unitName;if(n){const s=this.filteredUnits.find(a=>a.name===n);if(s){if(this.props.mode==="multiple"){const a=this.currentSelectedUnits.findIndex(r=>r.name===s.name);if(a>=0)this.currentSelectedUnits.splice(a,1);else{const r=this.props.maxSelections||5;this.currentSelectedUnits.length<r?this.currentSelectedUnits.push(s):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(s))}this.refreshUnitList()}this.props.onSelect(s)}}}}handleCancel(){this.props.onCancel()}handleConfirm(){this.props.selectedUnit&&this.props.onSelect(this.props.selectedUnit)}handleKeyDown(e){e.key==="Escape"&&this.handleCancel()}refreshUnitList(){const e=document.getElementById("unit-list");e&&(e.innerHTML=this.renderUnitList(),document.querySelectorAll(".select-unit-btn").forEach(i=>{i.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(i=>{i.addEventListener("click",this.handleCardClick.bind(this))}));const t=document.querySelector(".results-count");t&&(t.textContent=`${this.filteredUnits.length} unit${this.filteredUnits.length!==1?"s":""} found`)}refreshFilterTabs(){document.querySelectorAll(".filter-tab").forEach(e=>{e.getAttribute("data-category")===this.currentCategory?e.classList.add("active"):e.classList.remove("active")})}unmount(){document.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.container&&(this.container.innerHTML="")}updateTitle(e){this.props.title=e;const t=document.getElementById("modal-title");t&&(t.textContent=`⚔️ ${e}`)}updateSelectedUnits(e){this.currentSelectedUnits=[...e],this.refreshUnitList()}}const be=Object.freeze(Object.defineProperty({__proto__:null,EnemyUnitSelector:ee},Symbol.toStringTag,{value:"Module"}));class W{constructor(){h(this,"container",null);h(this,"battleService");h(this,"enemyBattleService");h(this,"optimizedBattleService");h(this,"currentArmy",null);h(this,"currentAnalysis",null);h(this,"selectedEnemyUnit",null);h(this,"enemyUnitSelector",null);h(this,"optimizationEnabled",!0);h(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.battleService=new H,this.enemyBattleService=new X,this.optimizedBattleService=new j}mount(e,t){this.container=e,this.currentArmy=t,this.render(),this.attachEventListeners(),this.showSimulationControls()}initialize(e){this.optimizedBattleService.initialize(e),this.enemyBattleService.initialize(e)}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const e=document.getElementById("run-simulation-btn"),t=document.getElementById("clear-simulation-btn"),i=document.getElementById("enemy-groups"),n=document.getElementById("select-enemy-btn"),s=document.getElementById("clear-enemy-btn");e&&e.addEventListener("click",()=>this.runSimulation()),t&&t.addEventListener("click",()=>this.clearResults()),i&&i.addEventListener("input",()=>this.validateInput()),n&&n.addEventListener("click",()=>this.openEnemyUnitSelector()),s&&s.addEventListener("click",()=>this.clearSelectedEnemyUnit()),document.querySelectorAll('input[name="enemy-type"]').forEach(r=>{r.addEventListener("change",o=>this.handleEnemyTypeChange(o))}),this.attachTooltipListeners()}handleEnemyTypeChange(e){const i=e.target.value,n=document.getElementById("generic-enemy-input"),s=document.getElementById("specific-enemy-input");i==="generic"?(n==null||n.classList.remove("hidden"),s==null||s.classList.add("hidden")):i==="specific"&&(n==null||n.classList.add("hidden"),s==null||s.classList.remove("hidden")),this.validateInput()}async openEnemyUnitSelector(){const e=document.createElement("div");e.id="enemy-unit-selector-modal",document.body.appendChild(e),this.enemyUnitSelector=new ee({onSelect:t=>{this.selectedEnemyUnit=t,this.displaySelectedEnemyUnit(),this.validateInput(),this.closeEnemyUnitSelector()},onCancel:()=>{this.closeEnemyUnitSelector()},selectedUnit:this.selectedEnemyUnit,mode:"single",title:"Select Enemy Unit for Battle"}),await this.enemyUnitSelector.mount(e)}closeEnemyUnitSelector(){this.enemyUnitSelector&&(this.enemyUnitSelector.unmount(),this.enemyUnitSelector=null);const e=document.getElementById("enemy-unit-selector-modal");e&&e.remove()}clearSelectedEnemyUnit(){this.selectedEnemyUnit=null,this.displaySelectedEnemyUnit(),this.validateInput()}displaySelectedEnemyUnit(){const e=document.getElementById("no-enemy-selected"),t=document.getElementById("selected-enemy-info"),i=document.getElementById("clear-enemy-btn");if(!(!e||!t||!i))if(!this.selectedEnemyUnit)e.classList.remove("hidden"),t.classList.add("hidden"),i.style.display="none";else{e.classList.add("hidden"),t.classList.remove("hidden"),i.style.display="inline-block";const n=this.selectedEnemyUnit,s=n.attack_modifiers&&Object.keys(n.attack_modifiers).length>0?Object.entries(n.attack_modifiers).map(([a,r])=>`+${r} vs ${a}`).join(", "):"None";t.innerHTML=`
        <div class="enemy-unit-card">
          <div class="enemy-unit-header">
            <h5 class="enemy-unit-name">${n.name}</h5>
            <div class="enemy-unit-types">
              ${n.unit_types.map(a=>`<span class="unit-type-tag">${a}</span>`).join("")}
            </div>
          </div>
          <div class="enemy-unit-stats">
            <div class="stat-item">
              <span class="stat-label">Health:</span>
              <span class="stat-value">${n.health.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Strength:</span>
              <span class="stat-value">${n.strength.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Attack Modifiers:</span>
              <span class="stat-value">${s}</span>
            </div>
          </div>
        </div>
      `}}validateInput(){const e=document.getElementById("run-simulation-btn");if(!e)return!1;const t=document.querySelector('input[name="enemy-type"]:checked'),i=(t==null?void 0:t.value)||"generic";let n=!0,s="";if(i==="generic"){const a=document.getElementById("enemy-groups");if(!a)return!1;const r=a.value.trim();r?isNaN(Number(r))||!Number.isInteger(Number(r))?(n=!1,s="Please enter a valid whole number"):parseInt(r)<1&&(n=!1,s="Number of enemy groups must be at least 1"):(n=!1,s="Please enter the number of enemy groups"),n?(a.classList.remove("error"),this.hideInputError("enemy-groups")):(a.classList.add("error"),this.showInputError("enemy-groups",s))}else i==="specific"&&(this.selectedEnemyUnit||(n=!1,s="Please select an enemy unit for the battle simulation"));return e.disabled=!n||!this.validateArmyComposition(),n}validateArmyComposition(){if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const e of this.currentArmy.stackingOrder)if(!e.unitName||e.count<=0||e.unitStrength<=0||e.totalHealth<=0)return!1;return!0}showInputError(e,t){var s;const i=document.getElementById(e);if(!i)return;this.hideInputError(e);const n=document.createElement("div");n.className="input-error-message",n.id=`${e}-error`,n.textContent=t,(s=i.parentNode)==null||s.insertBefore(n,i.nextSibling)}hideInputError(e){const t=document.getElementById(`${e}-error`);t&&t.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(t=>{t.addEventListener("mouseenter",i=>this.showTooltip(i)),t.addEventListener("mouseleave",()=>this.hideTooltip()),t.addEventListener("click",i=>{i.preventDefault(),this.toggleTooltip(i)})}),document.addEventListener("click",t=>{const i=t.target;!i.closest(".help-icon")&&!i.closest("#tooltip")&&this.hideTooltip()})}showTooltip(e){const t=e.target,i=t.getAttribute("data-tooltip");if(!i||!this.tooltipData[i])return;const n=document.getElementById("tooltip"),s=n==null?void 0:n.querySelector(".tooltip-content");!n||!s||(s.innerHTML=this.tooltipData[i],n.classList.remove("hidden"),this.positionTooltip(n,t))}hideTooltip(){const e=document.getElementById("tooltip");e&&e.classList.add("hidden")}toggleTooltip(e){const t=document.getElementById("tooltip");t!=null&&t.classList.contains("hidden")?this.showTooltip(e):this.hideTooltip()}positionTooltip(e,t){const i=t.getBoundingClientRect(),n=e;n.style.top="",n.style.left="",n.style.transform="";const s=e.getBoundingClientRect(),a=window.innerWidth,r=window.innerHeight;let o=i.bottom+10,l=i.left+i.width/2-s.width/2;l<10?l=10:l+s.width>a-10&&(l=a-s.width-10),o+s.height>r-10&&(o=i.top-s.height-10),n.style.top=`${o}px`,n.style.left=`${l}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const e=document.querySelector('input[name="enemy-type"]:checked'),t=(e==null?void 0:e.value)||"generic";this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const i=new Promise((a,r)=>{try{if(t==="specific"&&this.selectedEnemyUnit){const o={...this.currentArmy};o.stackingOrder=this.optimizedBattleService.calculateOptimizedAttackOrder(this.currentArmy.stackingOrder,[this.selectedEnemyUnit],I),this.currentAnalysis=this.optimizedBattleService.simulateBothScenariosWithEnemyUnits(o,[this.selectedEnemyUnit])}else{const o=document.getElementById("enemy-groups"),l=parseInt(o.value);l>this.currentArmy.stackingOrder.length*10&&console.warn(`Warning: ${l} enemy groups vs ${this.currentArmy.stackingOrder.length} player groups may result in a very short battle.`),this.currentAnalysis=this.optimizedBattleService.simulateBothScenarios(this.currentArmy,l)}a()}catch(o){r(o)}}),n=new Promise((a,r)=>{setTimeout(()=>r(new Error("Simulation timed out")),3e4)});if(await Promise.race([i,n]),!this.currentAnalysis||!this.currentAnalysis.bestCase||!this.currentAnalysis.worstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const s=document.getElementById("clear-simulation-btn");s&&(s.style.display="inline-block")}catch(i){console.error("Battle simulation failed:",i),this.showLoading(!1);let n="An unexpected error occurred during simulation.";i instanceof Error&&(i.message.includes("timeout")?n="Simulation timed out. Try reducing the complexity or check your army composition.":i.message.includes("invalid")?n="Invalid data detected. Please refresh the page and try again.":i.message.includes("Army composition")?n="Army composition error. Please re-optimize your army and try again.":i.message.includes("Enemy unit")&&(n="Enemy unit configuration error. Please select a valid enemy unit.")),this.showError(n)}}displayResults(){if(!this.currentAnalysis)return;const e=document.getElementById("simulation-results");if(!e)return;const{bestCase:t,worstCase:i,comparison:n}=this.currentAnalysis;e.innerHTML=`
      <div class="results-header">
        <h3>📊 Battle Analysis Results
          <span class="help-icon" data-tooltip="battle-results">ℹ️</span>
        </h3>
        <p class="results-summary">
          Simulation complete! Here's how your army performs against ${t.configuration.enemyGroupCount} enemy groups.
        </p>
      </div>

      <div class="scenario-comparison">
        <div class="scenario-card best-case">
          <h4>🟢 Best Case Scenario
            <span class="help-icon" data-tooltip="best-case-scenario">ℹ️</span>
          </h4>
          <p class="scenario-description">Your army attacks first</p>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${t.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${t.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${t.statistics.totalPlayerAttacks}</span>
            </div>
          </div>
        </div>

        <div class="scenario-card worst-case">
          <h4>🔴 Worst Case Scenario
            <span class="help-icon" data-tooltip="worst-case-scenario">ℹ️</span>
          </h4>
          <p class="scenario-description">Enemy attacks first</p>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${i.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${i.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${i.statistics.totalPlayerAttacks}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-summary">
        <h4>📈 Comparison Analysis</h4>
        <div class="comparison-stats">
          <div class="comparison-stat">
            <span class="stat-label">Damage Difference:</span>
            <span class="stat-value ${n.damageDifference>=0?"positive":"negative"}">
              ${n.damageDifference>=0?"+":""}${n.damageDifference.toLocaleString()}
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Average Damage:</span>
            <span class="stat-value">${Math.round(n.averageDamage).toLocaleString()}</span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Survival Difference:</span>
            <span class="stat-value ${n.survivalDifference>=0?"positive":"negative"}">
              ${n.survivalDifference>=0?"+":""}${n.survivalDifference} turns
            </span>
          </div>
        </div>
      </div>

      <div class="detailed-logs">
        <div class="log-tabs">
          <button class="log-tab active" data-scenario="best">Best Case Combat Log</button>
          <button class="log-tab" data-scenario="worst">Worst Case Combat Log</button>
        </div>
        <div class="log-content">
          <div id="best-case-log" class="combat-log active">
            ${this.formatCombatLog(t.combatLog)}
          </div>
          <div id="worst-case-log" class="combat-log hidden">
            ${this.formatCombatLog(i.combatLog)}
          </div>
        </div>
      </div>
    `,this.attachLogTabListeners(),this.attachTooltipListeners()}formatCombatLog(e){return e.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${e.map(i=>`
        <div class="${!i.eliminated?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${i.turn}:</span>
          <span class="action-text">${i.attacker} ${i.action}</span>
        </div>
      `).join("")}</div>`}attachLogTabListeners(){const e=document.querySelectorAll(".log-tab");e.forEach(t=>{t.addEventListener("click",i=>{const n=i.target,s=n.dataset.scenario;e.forEach(o=>o.classList.remove("active")),n.classList.add("active"),document.querySelectorAll(".combat-log").forEach(o=>{o.classList.remove("active"),o.classList.add("hidden")});const r=document.getElementById(`${s}-case-log`);r&&(r.classList.add("active"),r.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const e=document.getElementById("clear-simulation-btn");e&&(e.style.display="none")}showLoading(e){const t=document.getElementById("simulation-loading");t&&t.classList.toggle("hidden",!e)}showResults(e){const t=document.getElementById("simulation-results");t&&t.classList.toggle("hidden",!e)}showError(e){this.hideError();const t=document.createElement("div");t.className="simulation-error",t.id="simulation-error",t.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${e}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;const i=document.getElementById("simulation-results");i&&i.parentNode?i.parentNode.insertBefore(t,i):this.container&&this.container.appendChild(t),setTimeout(()=>{this.hideError()},1e4)}hideError(){const e=document.getElementById("simulation-error");e&&e.remove()}addBattleSimulationStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}displayPreCalculatedResults(e){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",e),!this.container){console.log("BattleSimulationComponent: no container");return}this.currentAnalysis=e;const t=this.container.querySelector("#simulation-results");if(!t){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",t),t.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const i=this.container.querySelector(".simulation-controls"),n=this.container.querySelector(".enemy-input-container");i&&(i.style.display="none"),n&&(n.style.display="none");const s=this.container.querySelector("#simulation-note");s&&(s.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,s.classList.remove("hidden"))}showSimulationControls(){if(!this.container)return;const e=this.container.querySelector(".simulation-controls"),t=this.container.querySelector(".enemy-input-container");e&&(e.style.display="block"),t&&(t.style.display="block")}}class U{static convertToStackingGroups(e){return e.units.filter(t=>t.quantity>0||t.isInfinite).map(t=>({unitName:t.unit.name,count:t.isInfinite?999999:t.quantity,totalHealth:t.isInfinite?t.unit.health*999999:t.unit.health*t.quantity,unitStrength:t.unit.strength})).sort((t,i)=>t.totalHealth-i.totalHealth)}static convertToBattleConfiguration(e){const t=this.convertToStackingGroups(e.playerArmy),i=e.enemyArmy.units.filter(n=>n.quantity>0||n.isInfinite).reduce((n,s)=>n+(s.isInfinite?100:s.quantity),0);return{playerArmy:{units:{},stackingOrder:t,totalStrength:t.reduce((n,s)=>n+s.count*s.unitStrength,0),totalHealth:t.reduce((n,s)=>n+s.totalHealth,0),totalLeadershipCost:0,totalDominanceCost:0,totalMercenaryCount:0,isValidStacking:!0,efficiencyScore:0},enemyGroupCount:Math.min(i,100),playerGoesFirst:e.playerGoesFirst}}static validateArmyConfiguration(e){const t=[],i=[];let n=0,s=!1;e.units.length===0&&t.push("Army must have at least one unit type");for(const o of e.units){if(!o.unit){t.push("Invalid unit configuration");continue}o.isInfinite?e.side!=="enemy"?t.push("Infinite units are only allowed for enemy armies"):(s=!0,n+=999999):(o.quantity<=0?t.push(`Unit "${o.unit.name}" must have a positive quantity`):o.quantity>1e4&&i.push(`Unit "${o.unit.name}" has a very large quantity (${o.quantity})`),n+=o.quantity)}!s&&n>5e4&&i.push(`Army size is very large (${n} total units). This may affect performance.`);const a=e.units.map(o=>o.unit.name),r=a.filter((o,l)=>a.indexOf(o)!==l);return r.length>0&&t.push(`Duplicate units found: ${Array.from(new Set(r)).join(", ")}`),{isValid:t.length===0,errors:t,warnings:i,totalUnits:n,hasInfiniteUnits:s}}static createEmptyArmy(e,t){return{units:[],name:t,side:e}}static addUnitToArmy(e,t,i,n=!1){const s=e.units.findIndex(r=>r.unit.name===t.name),a=[...e.units];return s>=0?a[s]={unit:t,quantity:n?0:i,isInfinite:n}:a.push({unit:t,quantity:n?0:i,isInfinite:n}),{...e,units:a}}static removeUnitFromArmy(e,t){return{...e,units:e.units.filter(i=>i.unit.name!==t)}}static getArmySummary(e){if(e.units.length===0)return"No units configured";const t=e.units.length,i=e.units.filter(s=>s.isInfinite).length,n=e.units.filter(s=>!s.isInfinite).reduce((s,a)=>s+a.quantity,0);return i>0?`${t} unit types (${i} infinite, ${n} finite)`:`${t} unit types, ${n} total units`}}const Y={MAX_FINITE_UNITS:1e4};class ve{constructor(e){h(this,"container",null);h(this,"props");h(this,"playerUnitSelection",this.createEmptySelection());h(this,"enemyUnitSelection",this.createEmptySelection());this.props=e}mount(e){this.container=e,this.render(),this.attachEventListeners()}unmount(){this.container&&(this.container.innerHTML="",this.container=null)}updateProps(e){this.props={...this.props,...e},this.container&&((e.playerArmy||e.enemyArmy)&&this.updateArmyLists(),(e.availableUnits||e.availableEnemyUnits||e.disabled!==void 0)&&(this.render(),this.attachEventListeners()))}createEmptySelection(){return{selectedUnit:null,quantity:1,isInfinite:!1,isValid:!1}}render(){this.container&&(this.container.innerHTML=`
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
                    max="${Y.MAX_FINITE_UNITS}"
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
                      max="${Y.MAX_FINITE_UNITS}"
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
    `,this.addStyles())}renderUnitOptions(e="player"){return(e==="player"?this.props.availableUnits:this.props.availableEnemyUnits||this.props.availableUnits).sort((i,n)=>i.name.localeCompare(n.name)).map(i=>`
        <option value="${i.name}" title="${this.getUnitTooltip(i)}">
          ${i.name} (${i.strength} STR, ${i.health} HP)
        </option>
      `).join("")}getUnitTooltip(e){return`Health: ${e.health}, Strength: ${e.strength}, Types: ${e.unit_types.join(", ")}`}renderArmyList(e,t){return e.units.length===0?'<p class="empty-army">No units added</p>':e.units.map(i=>`
      <div class="army-unit-item" data-unit-name="${i.unit.name}">
        <div class="unit-info">
          <span class="unit-name">${i.unit.name}</span>
          <span class="unit-stats">${i.unit.strength} STR • ${i.unit.health} HP</span>
        </div>
        <div class="unit-quantity">
          ${i.isInfinite?'<span class="infinite-badge">∞ Infinite</span>':`<span class="quantity-badge">${i.quantity.toLocaleString()}</span>`}
        </div>
        <div class="unit-actions">
          <button class="btn-remove" data-side="${t}" data-unit="${i.unit.name}">
            🗑️
          </button>
        </div>
      </div>
    `).join("")}attachEventListeners(){if(!this.container)return;const e=this.container.querySelector("#player-unit-select"),t=this.container.querySelector("#player-quantity"),i=this.container.querySelector("#add-player-unit"),n=this.container.querySelector("#enemy-unit-select"),s=this.container.querySelector("#enemy-quantity"),a=this.container.querySelector("#enemy-infinite"),r=this.container.querySelector("#add-enemy-unit"),o=this.container.querySelector("#clear-all-armies"),l=this.container.querySelector("#validate-armies");e&&e.addEventListener("change",()=>this.handlePlayerUnitSelection()),t&&t.addEventListener("input",()=>this.handlePlayerQuantityChange()),i&&i.addEventListener("click",()=>this.handleAddPlayerUnit()),n&&n.addEventListener("change",()=>this.handleEnemyUnitSelection()),s&&s.addEventListener("input",()=>this.handleEnemyQuantityChange()),a&&a.addEventListener("change",()=>this.handleEnemyInfiniteToggle()),r&&r.addEventListener("click",()=>this.handleAddEnemyUnit()),o&&o.addEventListener("click",()=>this.handleClearAllArmies()),l&&l.addEventListener("click",()=>this.handleValidateArmies()),this.container.addEventListener("click",c=>{const d=c.target;if(d.classList.contains("btn-remove")){const m=d.dataset.side,u=d.dataset.unit;m&&u&&this.handleRemoveUnit(m,u)}})}handlePlayerUnitSelection(){var n;const e=(n=this.container)==null?void 0:n.querySelector("#player-unit-select");if(!e)return;const t=e.value,i=this.props.availableUnits.find(s=>s.name===t)||null;this.playerUnitSelection={...this.playerUnitSelection,selectedUnit:i,isValid:i!==null&&this.playerUnitSelection.quantity>0},this.updateAddButton("player")}handlePlayerQuantityChange(){var i;const e=(i=this.container)==null?void 0:i.querySelector("#player-quantity");if(!e)return;const t=parseInt(e.value)||0;this.playerUnitSelection={...this.playerUnitSelection,quantity:t,isValid:this.playerUnitSelection.selectedUnit!==null&&t>0},this.updateAddButton("player")}handleEnemyUnitSelection(){var s;const e=(s=this.container)==null?void 0:s.querySelector("#enemy-unit-select");if(!e)return;const t=e.value,n=(this.props.availableEnemyUnits||this.props.availableUnits).find(a=>a.name===t)||null;this.enemyUnitSelection={...this.enemyUnitSelection,selectedUnit:n,isValid:n!==null&&(this.enemyUnitSelection.isInfinite||this.enemyUnitSelection.quantity>0)},this.updateAddButton("enemy")}handleEnemyQuantityChange(){var i;const e=(i=this.container)==null?void 0:i.querySelector("#enemy-quantity");if(!e)return;const t=parseInt(e.value)||0;this.enemyUnitSelection={...this.enemyUnitSelection,quantity:t,isValid:this.enemyUnitSelection.selectedUnit!==null&&(this.enemyUnitSelection.isInfinite||t>0)},this.updateAddButton("enemy")}handleEnemyInfiniteToggle(){var n,s;const e=(n=this.container)==null?void 0:n.querySelector("#enemy-infinite"),t=(s=this.container)==null?void 0:s.querySelector("#enemy-quantity");if(!e||!t)return;const i=e.checked;this.enemyUnitSelection={...this.enemyUnitSelection,isInfinite:i,isValid:this.enemyUnitSelection.selectedUnit!==null&&(i||this.enemyUnitSelection.quantity>0)},t.disabled=i,i&&(t.value="0"),this.updateAddButton("enemy")}updateAddButton(e){var n;const t=(n=this.container)==null?void 0:n.querySelector(`#add-${e}-unit`);if(!t)return;const i=e==="player"?this.playerUnitSelection:this.enemyUnitSelection;t.disabled=!i.isValid||this.props.disabled||!1}handleAddPlayerUnit(){if(!this.playerUnitSelection.selectedUnit||!this.playerUnitSelection.isValid)return;const e=U.addUnitToArmy(this.props.playerArmy,this.playerUnitSelection.selectedUnit,this.playerUnitSelection.quantity,!1);this.props.onPlayerArmyChange(e),this.props={...this.props,playerArmy:e},this.resetPlayerSelection(),this.updateArmyLists()}handleAddEnemyUnit(){if(!this.enemyUnitSelection.selectedUnit||!this.enemyUnitSelection.isValid)return;const e=U.addUnitToArmy(this.props.enemyArmy,this.enemyUnitSelection.selectedUnit,this.enemyUnitSelection.quantity,this.enemyUnitSelection.isInfinite);this.props.onEnemyArmyChange(e),this.props={...this.props,enemyArmy:e},this.resetEnemySelection(),this.updateArmyLists()}handleRemoveUnit(e,t){if(e==="player"){const i=U.removeUnitFromArmy(this.props.playerArmy,t);this.props.onPlayerArmyChange(i),this.props={...this.props,playerArmy:i}}else{const i=U.removeUnitFromArmy(this.props.enemyArmy,t);this.props.onEnemyArmyChange(i),this.props={...this.props,enemyArmy:i}}this.updateArmyLists()}handleClearAllArmies(){const e=U.createEmptyArmy("player","Player Army"),t=U.createEmptyArmy("enemy","Enemy Army");this.props.onPlayerArmyChange(e),this.props.onEnemyArmyChange(t),this.props={...this.props,playerArmy:e,enemyArmy:t},this.updateArmyLists()}handleValidateArmies(){const e=U.validateArmyConfiguration(this.props.playerArmy),t=U.validateArmyConfiguration(this.props.enemyArmy);this.displayValidationResults(e,t)}updateArmyLists(){if(!this.container)return;const e=this.container.querySelector("#player-army-list");e&&(e.innerHTML=this.renderArmyList(this.props.playerArmy,"player"));const t=this.container.querySelector("#enemy-army-list");t&&(t.innerHTML=this.renderArmyList(this.props.enemyArmy,"enemy"));const i=this.container.querySelector(".player-army .army-summary-text");i&&(i.textContent=U.getArmySummary(this.props.playerArmy));const n=this.container.querySelector(".enemy-army .army-summary-text");n&&(n.textContent=U.getArmySummary(this.props.enemyArmy)),this.attachRemoveEventListeners()}attachRemoveEventListeners(){if(!this.container)return;this.container.querySelectorAll(".btn-remove").forEach(t=>{var n;const i=t.cloneNode(!0);(n=t.parentNode)==null||n.replaceChild(i,t),i.addEventListener("click",s=>{const a=s.target,r=a.dataset.side||i.dataset.side,o=a.dataset.unit||i.dataset.unit;r&&o&&this.handleRemoveUnit(r,o)})})}displayValidationResults(e,t){var r;const i=(r=this.container)==null?void 0:r.querySelector("#validation-results");if(!i)return;const n=[...e.errors,...t.errors],s=[...e.warnings,...t.warnings],a=n.length===0;i.innerHTML=`
      <div class="validation-summary ${a?"valid":"invalid"}">
        <h4>${a?"✅ Armies Valid":"❌ Validation Errors"}</h4>
        
        ${n.length>0?`
          <div class="errors">
            <h5>Errors:</h5>
            <ul>
              ${n.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </div>
        `:""}
        
        ${s.length>0?`
          <div class="warnings">
            <h5>Warnings:</h5>
            <ul>
              ${s.map(o=>`<li>${o}</li>`).join("")}
            </ul>
          </div>
        `:""}
        
        <div class="summary-stats">
          <p><strong>Player Army:</strong> ${U.getArmySummary(this.props.playerArmy)}</p>
          <p><strong>Enemy Army:</strong> ${U.getArmySummary(this.props.enemyArmy)}</p>
        </div>
      </div>
    `,i.classList.remove("hidden")}resetPlayerSelection(){var i,n;this.playerUnitSelection=this.createEmptySelection();const e=(i=this.container)==null?void 0:i.querySelector("#player-unit-select"),t=(n=this.container)==null?void 0:n.querySelector("#player-quantity");e&&(e.value=""),t&&(t.value="1")}resetEnemySelection(){var n,s,a;this.enemyUnitSelection=this.createEmptySelection();const e=(n=this.container)==null?void 0:n.querySelector("#enemy-unit-select"),t=(s=this.container)==null?void 0:s.querySelector("#enemy-quantity"),i=(a=this.container)==null?void 0:a.querySelector("#enemy-infinite");e&&(e.value=""),t&&(t.value="1",t.disabled=!1),i&&(i.checked=!1)}addStyles(){const e="dual-army-input-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
    `,document.head.appendChild(t)}}class Se{constructor(e){h(this,"container",null);h(this,"props");h(this,"dualArmyForm",null);h(this,"availableUnits",[]);h(this,"enemyUnits",[]);h(this,"enemyUnitLoader");h(this,"enemyUnitStorage");h(this,"currentBattleConfig",null);h(this,"currentAnalysis",null);h(this,"isLoading",!1);this.props=e,this.enemyUnitLoader=new Z,this.enemyUnitStorage=new _,this.initializeDefaultBattleConfig()}async mount(e){this.container=e,await this.loadUnits(),this.render(),this.attachEventListeners()}unmount(){this.dualArmyForm&&(this.dualArmyForm.unmount(),this.dualArmyForm=null),this.container&&(this.container.innerHTML="",this.container=null)}updateProps(e){this.props={...this.props,...e}}initializeDefaultBattleConfig(){this.currentBattleConfig={playerArmy:U.createEmptyArmy("player","Player Army"),enemyArmy:U.createEmptyArmy("enemy","Enemy Army"),playerGoesFirst:!0,battleName:"Custom Battle"}}async loadUnits(){try{this.availableUnits=this.props.unitLoader.getAllUnits(),this.availableUnits.length===0&&(this.availableUnits=await this.props.unitLoader.loadPresetUnits());try{this.enemyUnits=await this.enemyUnitLoader.loadPresetEnemyUnits()}catch(e){console.warn("Could not load enemy_units.json, continuing with regular units only:",e),this.enemyUnits=[]}try{const t=this.enemyUnitStorage.getAllUserEnemyUnits().map(i=>({name:i.name,unit_types:i.unit_types,health:i.health,strength:i.strength,attack_modifiers:i.attack_modifiers}));this.enemyUnits.push(...t)}catch(e){console.warn("Could not load user enemy units:",e)}console.log(`Loaded ${this.availableUnits.length} regular units and ${this.enemyUnits.length} enemy units`)}catch(e){console.error("Failed to load units:",e),this.showError("Failed to load unit data. Please refresh the page.")}}convertEnemyUnitToUnit(e){var t;return{name:`${e.name} [Enemy]`,unit_types:e.unit_types,cost_type:"Leadership",health:e.health,strength:e.strength,leadership_cost:0,dominance_cost:0,authority_cost:0,food_consumption:0,carrying_capacity:0,revival_cost_gold:0,revival_cost_silver:0,source_file:"enemy_units",attack_modifiers:((t=e.attack_modifiers)==null?void 0:t.map(i=>({target_type:i.target_type,modifier_type:i.modifier_type,value:i.value})))||void 0}}getEnemyArmyUnits(){const e=this.availableUnits,t=this.enemyUnits.map(i=>this.convertEnemyUnitToUnit(i));return[...e,...t]}render(){!this.container||!this.currentBattleConfig||(this.container.innerHTML=`
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
    `,this.addStyles(),this.mountDualArmyForm(),this.updateSimulateButton())}mountDualArmyForm(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#dual-army-form-container");!e||!this.currentBattleConfig||(this.dualArmyForm&&this.dualArmyForm.unmount(),this.dualArmyForm=new ve({availableUnits:this.availableUnits,availableEnemyUnits:this.getEnemyArmyUnits(),playerArmy:this.currentBattleConfig.playerArmy,enemyArmy:this.currentBattleConfig.enemyArmy,onPlayerArmyChange:i=>this.handlePlayerArmyChange(i),onEnemyArmyChange:i=>this.handleEnemyArmyChange(i),disabled:this.isLoading||this.props.disabled}),this.dualArmyForm.mount(e))}attachEventListeners(){if(!this.container)return;const e=this.container.querySelector("#battle-name");e&&e.addEventListener("input",()=>this.handleBattleNameChange()),this.container.querySelectorAll('input[name="initiative"]').forEach(a=>{a.addEventListener("change",()=>this.handleInitiativeChange())});const i=this.container.querySelector("#simulate-battle"),n=this.container.querySelector("#clear-all"),s=this.container.querySelector("#save-config");i&&i.addEventListener("click",()=>this.handleSimulateBattle()),n&&n.addEventListener("click",()=>this.handleClearAll()),s&&s.addEventListener("click",()=>this.handleSaveConfig())}handlePlayerArmyChange(e){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,playerArmy:e},this.updateSimulateButton(),this.clearResults())}handleEnemyArmyChange(e){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,enemyArmy:e},this.updateSimulateButton(),this.clearResults())}handleBattleNameChange(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#battle-name");!e||!this.currentBattleConfig||(this.currentBattleConfig={...this.currentBattleConfig,battleName:e.value.trim()||"Custom Battle"})}handleInitiativeChange(){var i;const e=(i=this.container)==null?void 0:i.querySelector('input[name="initiative"]:checked');if(!e||!this.currentBattleConfig)return;const t=e.value;(t==="player"||t==="enemy")&&(this.currentBattleConfig={...this.currentBattleConfig,playerGoesFirst:t==="player"})}updateSimulateButton(){var s;const e=(s=this.container)==null?void 0:s.querySelector("#simulate-battle");if(!e||!this.currentBattleConfig)return;const t=this.currentBattleConfig.playerArmy.units.length>0,i=this.currentBattleConfig.enemyArmy.units.length>0,n=t&&i&&!this.isLoading&&!this.props.disabled;e.disabled=!n,!t&&!i?e.textContent="🎯 Configure armies to simulate":t?i?this.isLoading?e.textContent="⏳ Simulating...":e.textContent="🎯 Simulate Battle":e.textContent="🎯 Add enemy units to simulate":e.textContent="🎯 Add player units to simulate"}async handleSimulateBattle(){var i;if(!this.currentBattleConfig||this.isLoading)return;const e=U.validateArmyConfiguration(this.currentBattleConfig.playerArmy),t=U.validateArmyConfiguration(this.currentBattleConfig.enemyArmy);if(!e.isValid||!t.isValid){const n=[...e.errors,...t.errors];this.showError(`Cannot simulate battle: ${n.join(", ")}`);return}this.setLoading(!0),this.hideError(),this.clearResults();try{const n=(i=this.container)==null?void 0:i.querySelector('input[name="initiative"]:checked'),s=(n==null?void 0:n.value)||"both",{ManualBattleSimulationService:a}=await R(async()=>{const{ManualBattleSimulationService:l}=await import("./manualBattleSimulation-BPlInVVb.js");return{ManualBattleSimulationService:l}},[]),r=new a(this.props.unitLoader);let o;if(s==="both")o=await r.simulateBothScenarios(this.currentBattleConfig);else{const l={...this.currentBattleConfig,playerGoesFirst:s==="player"},c=await r.simulateBattle(l);o={bestCase:c,worstCase:c,comparison:{damageDifference:0,survivalDifference:0,averageDamage:c.totalDamageDealtToEnemies,averageSurvival:c.playerSurvivalTurns},manualConfiguration:this.currentBattleConfig}}this.currentAnalysis=o,this.displayResults(),this.props.onBattleComplete&&this.props.onBattleComplete(o)}catch(n){console.error("Battle simulation failed:",n),this.showError(n instanceof Error?`Battle simulation failed: ${n.message}`:"Battle simulation failed with an unknown error")}finally{this.setLoading(!1)}}handleClearAll(){this.initializeDefaultBattleConfig(),this.clearResults(),this.hideError(),this.render(),this.attachEventListeners()}handleSaveConfig(){if(!this.currentBattleConfig)return;const e=JSON.stringify(this.currentBattleConfig,null,2);console.log("Battle Configuration:",e),this.showStatus("Configuration saved to console (feature in development)","info")}displayResults(){if(!this.currentAnalysis||!this.container)return;const e=this.container.querySelector("#battle-results");if(!e)return;const{bestCase:t,worstCase:i,comparison:n,manualConfiguration:s}=this.currentAnalysis;e.innerHTML=`
      <div class="results-header">
        <h3>📊 Battle Results: ${s.battleName}</h3>
        <p class="battle-summary">
          ${s.playerArmy.name} vs ${s.enemyArmy.name}
        </p>
      </div>

      <div class="army-summaries">
        <div class="army-summary player-summary">
          <h4>👤 ${s.playerArmy.name}</h4>
          <p>${U.getArmySummary(s.playerArmy)}</p>
        </div>
        <div class="army-summary enemy-summary">
          <h4>👹 ${s.enemyArmy.name}</h4>
          <p>${U.getArmySummary(s.enemyArmy)}</p>
        </div>
      </div>

      <div class="scenario-comparison">
        <div class="scenario-card best-case">
          <h4>🟢 Best Case (Player First)</h4>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${t.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${t.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${t.statistics.totalPlayerAttacks}</span>
            </div>
          </div>
        </div>

        <div class="scenario-card worst-case">
          <h4>🔴 Worst Case (Enemy First)</h4>
          <div class="scenario-stats">
            <div class="stat">
              <span class="stat-label">Damage Dealt:</span>
              <span class="stat-value">${i.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${i.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${i.statistics.totalPlayerAttacks}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-analysis">
        <h4>📈 Scenario Comparison</h4>
        <div class="comparison-stats">
          <div class="comparison-stat">
            <span class="stat-label">Damage Difference:</span>
            <span class="stat-value ${n.damageDifference>=0?"positive":"negative"}">
              ${n.damageDifference>=0?"+":""}${n.damageDifference.toLocaleString()}
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Average Damage:</span>
            <span class="stat-value">${Math.round(n.averageDamage).toLocaleString()}</span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Survival Difference:</span>
            <span class="stat-value ${n.survivalDifference>=0?"positive":"negative"}">
              ${n.survivalDifference>=0?"+":""}${n.survivalDifference} turns
            </span>
          </div>
        </div>
      </div>

      <div class="combat-logs">
        <div class="log-tabs">
          <button class="log-tab active" data-scenario="best">Best Case Combat Log</button>
          <button class="log-tab" data-scenario="worst">Worst Case Combat Log</button>
        </div>
        <div class="log-content">
          <div id="best-case-log" class="combat-log active">
            ${this.formatCombatLog(t.combatLog)}
          </div>
          <div id="worst-case-log" class="combat-log hidden">
            ${this.formatCombatLog(i.combatLog)}
          </div>
        </div>
      </div>

      <div class="results-actions">
        <button id="export-results" class="btn btn-outline">
          📄 Export Results
        </button>
        <button id="simulate-again" class="btn btn-secondary">
          🔄 Simulate Again
        </button>
      </div>
    `,e.classList.remove("hidden"),this.attachResultsEventListeners()}formatCombatLog(e){return e.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${e.map(i=>`
        <div class="${!i.eliminated?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${i.turn}:</span>
          <span class="action-text">${i.attacker} ${i.action}</span>
        </div>
      `).join("")}</div>`}attachResultsEventListeners(){if(!this.container)return;const e=this.container.querySelectorAll(".log-tab");e.forEach(n=>{n.addEventListener("click",s=>{const a=s.target,r=a.dataset.scenario;e.forEach(c=>c.classList.remove("active")),a.classList.add("active"),this.container.querySelectorAll(".combat-log").forEach(c=>{c.classList.remove("active"),c.classList.add("hidden")});const l=this.container.querySelector(`#${r}-case-log`);l&&(l.classList.add("active"),l.classList.remove("hidden"))})});const t=this.container.querySelector("#export-results"),i=this.container.querySelector("#simulate-again");t&&t.addEventListener("click",()=>this.handleExportResults()),i&&i.addEventListener("click",()=>this.handleSimulateAgain())}handleExportResults(){if(!this.currentAnalysis)return;const e=JSON.stringify(this.currentAnalysis,null,2);console.log("Battle Results:",e),this.showStatus("Results exported to console (feature in development)","info")}handleSimulateAgain(){this.clearResults(),this.handleSimulateBattle()}setLoading(e){var n,s;this.isLoading=e;const t=(n=this.container)==null?void 0:n.querySelector("#loading-state"),i=(s=this.container)==null?void 0:s.querySelector("#battle-results");t&&t.classList.toggle("hidden",!e),e&&i&&i.classList.add("hidden"),this.updateSimulateButton(),this.dualArmyForm&&this.dualArmyForm.updateProps({disabled:e||this.props.disabled})}clearResults(){var t;this.currentAnalysis=null;const e=(t=this.container)==null?void 0:t.querySelector("#battle-results");e&&e.classList.add("hidden")}showError(e){var i;const t=(i=this.container)==null?void 0:i.querySelector("#error-display");t&&(t.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${e}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.classList.add('hidden')">×</button>
      </div>
    `,t.classList.remove("hidden"),setTimeout(()=>this.hideError(),1e4))}hideError(){var t;const e=(t=this.container)==null?void 0:t.querySelector("#error-display");e&&e.classList.add("hidden")}showStatus(e,t="info"){var n;const i=(n=this.container)==null?void 0:n.querySelector("#battle-status");i&&(i.innerHTML=`
      <div class="status-message ${t}">
        ${e}
      </div>
    `,i.classList.remove("hidden"),setTimeout(()=>{i.classList.add("hidden")},5e3))}addStyles(){const e="manual-battle-simulation-styles";if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
    `,document.head.appendChild(t)}}class Ee{constructor(e){h(this,"container",null);h(this,"props");h(this,"storage");h(this,"attackModifiers",{});this.props=e,this.storage=new _}mount(e){this.container=e,this.initializeForm(),this.render(),this.attachEventListeners()}initializeForm(){var e;(e=this.props.editingUnit)!=null&&e.attack_modifiers?(this.attackModifiers={},this.props.editingUnit.attack_modifiers.forEach(t=>{this.attackModifiers[t.target_type]=t.value})):this.attackModifiers={}}render(){var i;if(!this.container)return;const e=this.props.mode==="edit",t=this.props.editingUnit;this.container.innerHTML=`
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
                    value="${((i=t==null?void 0:t.unit_types)==null?void 0:i.join(", "))||""}"
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
      `;return}e.innerHTML=Object.entries(this.attackModifiers).map(([t,i])=>`
        <div class="modifier-item" data-unit-type="${t}">
          <div class="modifier-info">
            <span class="modifier-type">${t}</span>
            <span class="modifier-value">+${i.toLocaleString()} strength</span>
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
      `).join(""),this.attachModifierEventListeners()}}attachEventListeners(){const e=document.getElementById("enemy-unit-form"),t=document.getElementById("save-btn"),i=document.getElementById("cancel-btn"),n=document.getElementById("delete-btn"),s=document.getElementById("add-modifier-btn");e&&e.addEventListener("submit",this.handleSubmit.bind(this)),t&&t.addEventListener("click",this.handleSubmit.bind(this)),i&&i.addEventListener("click",this.handleCancel.bind(this)),n&&n.addEventListener("click",this.handleDelete.bind(this)),s&&s.addEventListener("click",this.handleAddModifier.bind(this)),this.addValidationListeners();const a=document.getElementById("new-modifier-value");a&&a.addEventListener("keypress",r=>{r.key==="Enter"&&(r.preventDefault(),this.handleAddModifier())})}attachModifierEventListeners(){document.querySelectorAll(".edit-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const i=t.target.dataset.unitType;i&&this.handleEditModifier(i)})}),document.querySelectorAll(".remove-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const i=t.target.dataset.unitType;i&&this.handleRemoveModifier(i)})})}addValidationListeners(){["enemy-name","enemy-health","enemy-strength","enemy-unit-types"].forEach(t=>{const i=document.getElementById(t);i&&(i.addEventListener("blur",()=>this.validateField(t)),i.addEventListener("input",()=>this.clearFieldError(t)))})}validateField(e){const t=document.getElementById(e),i=document.getElementById(`${e}-error`);if(!t||!i)return!0;let n;switch(e){case"enemy-name":n=B.validateName(t.value);break;case"enemy-health":n=B.validateHealth(parseInt(t.value));break;case"enemy-strength":n=B.validateStrength(parseInt(t.value));break;case"enemy-unit-types":const s=t.value.split(",").map(a=>a.trim()).filter(a=>a);n=B.validateUnitTypes(s);break;default:return!0}return n.isValid?(t.classList.remove("error"),i.textContent="",!0):(t.classList.add("error"),i.textContent=n.error||"",!1)}clearFieldError(e){const t=document.getElementById(e),i=document.getElementById(`${e}-error`);t&&i&&(t.classList.remove("error"),i.textContent="")}handleAddModifier(){const e=document.getElementById("new-modifier-type"),t=document.getElementById("new-modifier-value");if(!e||!t)return;const i=e.value.trim(),n=parseInt(t.value);if(!i){alert("Please enter a unit type"),e.focus();return}if(isNaN(n)||n<0){alert("Please enter a valid bonus value (0 or greater)"),t.focus();return}this.attackModifiers[i]&&!confirm(`A modifier for "${i}" already exists. Replace it?`)||(this.attackModifiers[i]=n,e.value="",t.value="",this.populateAttackModifiers(),e.focus())}handleEditModifier(e){const t=this.attackModifiers[e],i=prompt(`Edit strength bonus for "${e}":`,t.toString());if(i===null)return;const n=parseInt(i);if(isNaN(n)||n<0){alert("Please enter a valid bonus value (0 or greater)");return}this.attackModifiers[e]=n,this.populateAttackModifiers()}handleRemoveModifier(e){confirm(`Remove attack modifier for "${e}"?`)&&(delete this.attackModifiers[e],this.populateAttackModifiers())}handleSubmit(e){if(e.preventDefault(),!this.validateForm())return;const t=this.collectFormData();t&&this.props.onSave(t)}handleCancel(){this.hasUnsavedChanges()?confirm("You have unsaved changes. Are you sure you want to cancel?")&&this.props.onCancel():this.props.onCancel()}handleDelete(){if(!this.props.editingUnit)return;const e=this.props.editingUnit.name;if(confirm(`Are you sure you want to delete "${e}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(this.props.editingUnit.id??"");t.success?this.props.onCancel():alert(`Failed to delete unit: ${t.error}`)}}validateForm(){const e=["enemy-name","enemy-health","enemy-strength","enemy-unit-types"];let t=!0;return e.forEach(i=>{this.validateField(i)||(t=!1)}),t}collectFormData(){var e,t;try{const i=document.getElementById("enemy-name"),n=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength"),a=document.getElementById("enemy-unit-types"),r=i.value.trim(),o=parseInt(n.value),l=parseInt(s.value),c=a.value.split(",").map(p=>p.trim()).filter(p=>p),d=Object.keys(this.attackModifiers).length>0?Object.entries(this.attackModifiers).map(([p,g])=>({target_type:p,modifier_type:"Strength",value:g})):void 0,m={id:((e=this.props.editingUnit)==null?void 0:e.id)||`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,name:r,unit_types:c,health:o,strength:l,attack_modifiers:d,createdAt:((t=this.props.editingUnit)==null?void 0:t.createdAt)||new Date,modifiedAt:new Date},u=B.validateUserEnemyUnit(m);return u.isValid?m:(alert(`Validation failed: ${u.errors.join(", ")}`),null)}catch(i){return console.error("Error collecting form data:",i),alert("Error collecting form data. Please check your inputs."),null}}hasUnsavedChanges(){if(!this.props.editingUnit){const i=document.getElementById("enemy-name"),n=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength");return!!(i!=null&&i.value.trim()||n!=null&&n.value||s!=null&&s.value)}const e=this.collectFormData();if(!e)return!1;const t=this.props.editingUnit;return e.name!==t.name||e.health!==t.health||e.strength!==t.strength||JSON.stringify(e.unit_types)!==JSON.stringify(t.unit_types)||JSON.stringify(e.attack_modifiers)!==JSON.stringify(t.attack_modifiers)}unmount(){this.container&&(this.container.innerHTML="")}}class xe{constructor(e){h(this,"container",null);h(this,"props");h(this,"storage");h(this,"userUnits",[]);h(this,"filteredUnits",[]);h(this,"currentFilter","");h(this,"sortBy","name");h(this,"sortOrder","asc");h(this,"selectedUnits",new Set);h(this,"showingForm",!1);h(this,"editingUnit",null);this.props=e,this.storage=new _}mount(e){this.container=e,this.loadData(),this.render(),this.attachEventListeners()}loadData(){this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}updateFilteredUnits(){let e=[...this.userUnits];if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();e=e.filter(i=>i.name.toLowerCase().includes(t)||i.unit_types.some(n=>n.toLowerCase().includes(t)))}e.sort((t,i)=>{var s,a,r,o;let n=0;switch(this.sortBy){case"name":n=t.name.localeCompare(i.name);break;case"created":n=(((s=t.createdAt)==null?void 0:s.getTime())??0)-(((a=i.createdAt)==null?void 0:a.getTime())??0);break;case"modified":n=(((r=t.modifiedAt)==null?void 0:r.getTime())??0)-(((o=i.modifiedAt)==null?void 0:o.getTime())??0);break;case"health":n=t.health-i.health;break;case"strength":n=t.strength-i.strength;break}return this.sortOrder==="desc"?-n:n}),this.filteredUnits=e}render(){if(!this.container)return;if(this.showingForm){this.renderForm();return}const e=this.props.mode==="standalone",t=this.storage.getStorageStats();this.container.innerHTML=`
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
    `,this.addStyles()}renderForm(){if(!this.container)return;const e=document.createElement("div");this.container.innerHTML="",this.container.appendChild(e),new Ee({onSave:this.handleFormSave.bind(this),onCancel:this.handleFormCancel.bind(this),editingUnit:this.editingUnit,mode:this.editingUnit?"edit":"create"}).mount(e)}renderUnitsList(){return this.filteredUnits.length===0?`
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
                  ${e.unit_types.map(i=>`<span class="unit-type-tag">${i}</span>`).join("")}
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
                    ${e.attack_modifiers.map(i=>`<span class="modifier-tag">+${i.value.toLocaleString()} vs ${i.target_type}</span>`).join("")}
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
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-manager");e&&e.addEventListener("click",()=>{var c,d;return(d=(c=this.props).onClose)==null?void 0:d.call(c)});const t=document.getElementById("unit-search");t&&t.addEventListener("input",this.handleSearch.bind(this));const i=document.getElementById("clear-search");i&&i.addEventListener("click",this.handleClearSearch.bind(this));const n=document.getElementById("create-unit-btn");n&&n.addEventListener("click",this.handleCreateUnit.bind(this));const s=document.getElementById("create-first-unit");s&&s.addEventListener("click",this.handleCreateUnit.bind(this));const a=document.getElementById("sort-by");a&&a.addEventListener("change",this.handleSortChange.bind(this));const r=document.getElementById("sort-order-btn");r&&r.addEventListener("click",this.handleSortOrderToggle.bind(this));const o=document.getElementById("select-all");o&&o.addEventListener("click",this.handleSelectAll.bind(this));const l=document.getElementById("select-none");l&&l.addEventListener("click",this.handleSelectNone.bind(this)),document.querySelectorAll(".unit-select-checkbox").forEach(c=>{c.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",this.handleUnitAction.bind(this))}),this.attachDropdownListeners(),this.attachImportExportListeners()}attachDropdownListeners(){document.querySelectorAll(".dropdown-toggle").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const i=e.closest(".dropdown");i&&(document.querySelectorAll(".dropdown.open").forEach(n=>{n!==i&&n.classList.remove("open")}),i.classList.toggle("open"))})}),document.addEventListener("click",()=>{document.querySelectorAll(".dropdown.open").forEach(e=>{e.classList.remove("open")})})}attachImportExportListeners(){const e=document.getElementById("import-units");e&&e.addEventListener("click",this.handleImportUnits.bind(this));const t=document.getElementById("export-all");t&&t.addEventListener("click",this.handleExportAll.bind(this));const i=document.getElementById("export-selected");i&&i.addEventListener("click",this.handleExportSelected.bind(this));const n=document.getElementById("delete-selected");n&&n.addEventListener("click",this.handleDeleteSelected.bind(this));const s=document.getElementById("clear-all");s&&s.addEventListener("click",this.handleClearAll.bind(this));const a=document.getElementById("import-file-input");a&&a.addEventListener("change",this.handleFileImport.bind(this))}formatDate(e){const i=new Date().getTime()-e.getTime(),n=Math.floor(i/(1e3*60*60*24));return n===0?"Today":n===1?"Yesterday":n<7?`${n} days ago`:e.toLocaleDateString()}handleFormSave(e){if(this.editingUnit){const t=this.storage.updateUserEnemyUnit(this.editingUnit.id??"",e);t.success?(this.showingForm=!1,this.editingUnit=null,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to update unit: ${t.error}`)}else{const t=this.storage.addUserEnemyUnit(e);t.success?(this.showingForm=!1,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to create unit: ${t.error}`)}}handleFormCancel(){this.showingForm=!1,this.editingUnit=null,this.render(),this.attachEventListeners()}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitsList()}handleCreateUnit(){this.showingForm=!0,this.editingUnit=null,this.render()}handleSortChange(e){const t=e.target;this.sortBy=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleSortOrderToggle(){this.sortOrder=this.sortOrder==="asc"?"desc":"asc",this.updateFilteredUnits(),this.refreshUnitsList();const e=document.getElementById("sort-order-btn");e&&(e.textContent=this.sortOrder==="asc"?"⬆️ Ascending":"⬇️ Descending")}handleSelectAll(){this.selectedUnits.clear(),this.filteredUnits.forEach(e=>{e.id&&this.selectedUnits.add(e.id)}),this.refreshSelectionUI()}handleSelectNone(){this.selectedUnits.clear(),this.refreshSelectionUI()}handleCheckboxChange(e){const t=e.target,i=t.dataset.unitId;i&&(t.checked?this.selectedUnits.add(i):this.selectedUnits.delete(i),this.refreshSelectionUI())}handleUnitAction(e){var a,r;const t=e.target,i=t.dataset.action,n=t.dataset.unitId;if(!i||!n)return;const s=this.userUnits.find(o=>o.id===n);if(s)switch(i){case"select":(r=(a=this.props).onUnitSelect)==null||r.call(a,s);break;case"edit":this.editingUnit=s,this.showingForm=!0,this.render();break;case"duplicate":this.handleDuplicateUnit(s);break;case"delete":this.handleDeleteUnit(s);break}}handleDuplicateUnit(e){const i={name:`${e.name} (Copy)`,unit_types:[...e.unit_types],health:e.health,strength:e.strength,attack_modifiers:e.attack_modifiers?[...e.attack_modifiers]:void 0},n=this.storage.addUserEnemyUnit(i);n.success?(this.loadData(),this.refreshUnitsList()):alert(`Failed to duplicate unit: ${n.error}`)}handleDeleteUnit(e){if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(e.id??"");t.success?(e.id&&this.selectedUnits.delete(e.id),this.loadData(),this.refreshUnitsList()):alert(`Failed to delete unit: ${t.error}`)}}handleImportUnits(){const e=document.getElementById("import-file-input");e&&e.click()}handleFileImport(e){var s;const t=e.target,i=(s=t.files)==null?void 0:s[0];if(!i)return;const n=new FileReader;n.onload=a=>{var r,o;try{const l=(r=a.target)==null?void 0:r.result,c=this.storage.importUserEnemyUnits(l,{skipDuplicates:!0});if(c.success){let d=`Successfully imported ${c.imported} units.`;c.skipped&&c.skipped>0&&(d+=` ${c.skipped} units were skipped.`),c.errors&&c.errors.length>0&&(d+=`

Errors:
${c.errors.join(`
`)}`),alert(d),this.loadData(),this.refreshUnitsList()}else alert(`Import failed: ${((o=c.errors)==null?void 0:o.join(", "))||"Unknown error"}`)}catch{alert("Failed to read file. Please ensure it's a valid JSON file.")}},n.readAsText(i),t.value=""}handleExportAll(){const e=this.storage.exportUserEnemyUnits();e.success&&e.data?this.downloadJson(e.data,"enemy-units-export.json"):alert(`Export failed: ${e.error}`)}handleExportSelected(){if(this.selectedUnits.size===0){alert("No units selected for export.");return}const e=this.userUnits.filter(n=>n.id&&this.selectedUnits.has(n.id)),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(n=>{var s,a;return{name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers,createdAt:((s=n.createdAt)==null?void 0:s.toISOString())??new Date().toISOString(),modifiedAt:((a=n.modifiedAt)==null?void 0:a.toISOString())??new Date().toISOString()}})},i=JSON.stringify(t,null,2);this.downloadJson(i,`enemy-units-selected-${this.selectedUnits.size}.json`)}handleDeleteSelected(){if(this.selectedUnits.size===0){alert("No units selected for deletion.");return}const e=this.selectedUnits.size;if(confirm(`Are you sure you want to delete ${e} selected unit${e>1?"s":""}? This action cannot be undone.`)){let t=0;const i=[];this.selectedUnits.forEach(s=>{const a=this.storage.deleteUserEnemyUnit(s);a.success?t++:i.push(`Failed to delete unit: ${a.error}`)}),this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList();let n=`Successfully deleted ${t} unit${t>1?"s":""}.`;i.length>0&&(n+=`

Errors:
${i.join(`
`)}`),alert(n)}}handleClearAll(){if(this.userUnits.length===0){alert("No units to clear.");return}if(confirm(`Are you sure you want to delete ALL ${this.userUnits.length} custom enemy units? This action cannot be undone.`)){const e=this.storage.clearAllUserEnemyUnits();e.success?(this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList(),alert("All custom enemy units have been deleted.")):alert(`Failed to clear units: ${e.error}`)}}downloadJson(e,t){const i=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(i),s=document.createElement("a");s.href=n,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(n)}refreshUnitsList(){const e=document.getElementById("units-list");e&&(e.innerHTML=this.renderUnitsList(),document.querySelectorAll(".unit-select-checkbox").forEach(i=>{i.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(i=>{i.addEventListener("click",this.handleUnitAction.bind(this))}));const t=document.querySelector(".results-info");t&&(t.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}refreshSelectionUI(){document.querySelectorAll(".unit-select-checkbox").forEach(n=>{const s=n,a=s.dataset.unitId;a&&(s.checked=this.selectedUnits.has(a))}),document.querySelectorAll(".unit-item").forEach(n=>{const s=n.dataset.unitId;s&&(this.selectedUnits.has(s)?n.classList.add("selected"):n.classList.remove("selected"))});const e=document.getElementById("bulk-actions-btn");e&&(e.textContent=`📋 Bulk Actions (${this.selectedUnits.size})`,e.disabled=this.selectedUnits.size===0);const t=document.getElementById("select-none");t&&(t.disabled=this.selectedUnits.size===0);const i=document.querySelector(".results-info");i&&(i.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}unmount(){this.container&&(this.container.innerHTML="")}}const Q={tabletSmall:768,tabletLarge:1024};class Ce{constructor(){h(this,"currentMode","desktop");h(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(e){this.listeners.push(e)}removeLayoutChangeListener(e){const t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)}updateLayoutMode(){const e=this.getViewportWidth();let t;e<Q.tabletSmall?t="mobile":e<Q.tabletLarge?t="tablet":t="desktop",t!==this.currentMode&&(this.currentMode=t,this.notifyListeners())}setupResizeListener(){let e;window.addEventListener("resize",()=>{clearTimeout(e),e=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(e=>e(this.currentMode))}}class P{static addSwipeSupport(e,t,i,n=50){if(!("ontouchstart"in window))return;let s=0,a=0,r=0;e.addEventListener("touchstart",o=>{const l=o.touches[0];s=l.clientX,a=l.clientY,r=Date.now()},{passive:!0}),e.addEventListener("touchend",o=>{if(o.changedTouches.length===0)return;const l=o.changedTouches[0],c=l.clientX,d=l.clientY,m=Date.now(),u=c-s,p=d-a;m-r<500&&Math.abs(u)>n&&Math.abs(p)<Math.abs(u)*.5&&(u>0&&i?(o.preventDefault(),i()):u<0&&t&&(o.preventDefault(),t()))},{passive:!1})}static addTouchSupport(e,t){if(e.addEventListener("click",t),"ontouchstart"in window){let i;e.addEventListener("touchstart",n=>{i=Date.now(),e.classList.add("touch-active")}),e.addEventListener("touchend",n=>{e.classList.remove("touch-active"),Date.now()-i<200&&(n.preventDefault(),t())}),e.addEventListener("touchcancel",()=>{e.classList.remove("touch-active")})}}static optimizeScrolling(e){e.style.webkitOverflowScrolling="touch",e.style.scrollBehavior="smooth",e.classList.add("scroll-momentum")}static addHapticFeedback(e){e.addEventListener("touchstart",()=>{e.style.transform="scale(0.98)",e.style.transition="transform 0.1s ease"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e.addEventListener("touchcancel",()=>{e.style.transform="scale(1)"})}static addPullToRefresh(e,t,i=80){if(!("ontouchstart"in window))return;let n=0,s=0,a=!1,r=null;const o=()=>{r||(r=document.createElement("div"),r.className="pull-refresh-indicator",r.innerHTML=`
        <div class="refresh-spinner"></div>
        <span class="refresh-text">Pull to refresh</span>
      `,e.insertBefore(r,e.firstChild))};e.addEventListener("touchstart",l=>{e.scrollTop===0&&!a&&(n=l.touches[0].clientY,o())},{passive:!0}),e.addEventListener("touchmove",l=>{if(e.scrollTop===0&&!a&&r){s=l.touches[0].clientY;const c=Math.max(0,s-n);if(c>0){l.preventDefault();const d=Math.min(c/i,1);r.style.transform=`translateY(${c*.5}px)`,r.style.opacity=d.toString(),c>i?r.querySelector(".refresh-text").textContent="Release to refresh":r.querySelector(".refresh-text").textContent="Pull to refresh"}}},{passive:!1}),e.addEventListener("touchend",async()=>{if(r&&!a)if(s-n>i){a=!0,r.querySelector(".refresh-text").textContent="Refreshing...",r.querySelector(".refresh-spinner").classList.add("spinning");try{await t()}finally{a=!1,r&&(r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300))}}else r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300)})}}class z{static updateBodyClasses(e){const t=document.body;t.classList.remove("layout-mobile","layout-tablet","layout-desktop"),t.classList.add(`layout-${e.getCurrentMode()}`),e.isTouchDevice()&&t.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(t=>{t instanceof HTMLElement&&P.optimizeScrolling(t)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&P.addHapticFeedback(t)})}}const E=new Ce;E.addLayoutChangeListener(()=>{z.updateBodyClasses(E)});z.updateBodyClasses(E);class Ue{constructor(){h(this,"sections",[]);h(this,"currentActiveSection",null);h(this,"tabContainer",null);h(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var i;const e=document.querySelector(".main-content");if(!e)return;const t=document.createElement("div");t.className="mobile-tab-navigation mobile-only",t.innerHTML=`
      <div class="tab-nav-container">
        ${this.sections.map(n=>`
          <button class="tab-nav-item ${n.id==="config-section"?"active":""}" 
                  data-section="${n.id}">
            <span class="tab-icon">${n.icon}</span>
            <span class="tab-label">${n.title}</span>
          </button>
        `).join("")}
      </div>
    `,(i=e.parentNode)==null||i.insertBefore(t,e),this.tabContainer=t,this.attachTabListeners(),this.addSwipeSupport()}createTabletCollapsibleHeaders(){this.sections.forEach(e=>{if(!e.element)return;const t=document.createElement("div");t.className="collapsible-header tablet-only",t.innerHTML=`
        <div class="collapsible-title">
          <span class="section-icon">${e.icon}</span>
          <h2>${e.title}</h2>
          <span class="collapse-indicator">▼</span>
        </div>
      `,e.element.insertBefore(t,e.element.firstChild),t.addEventListener("click",()=>{this.toggleSectionCollapse(e.id)})})}setupInitialLayout(){const e=E.getCurrentMode();this.applyLayoutMode(e),this.updateTabVisibility()}applyLayoutMode(e){switch(e){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(e=>{e.element&&(e.id===this.currentActiveSection||this.currentActiveSection===null&&e.id==="config-section"?e.element.classList.remove("hidden"):e.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden"):e.element.classList.add("hidden"),e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden","collapsed"):e.element.classList.add("hidden"),e.isCollapsed=!1)})}switchToSection(e){this.currentActiveSection=e,E.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(e){const t=this.sections.find(n=>n.id===e);if(!t||!t.element)return;t.isCollapsed=!t.isCollapsed,t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed");const i=t.element.querySelector(".collapse-indicator");i&&(i.textContent=t.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{t.addEventListener("click",()=>{if(t.classList.contains("disabled"))return;const i=t.getAttribute("data-section");i&&this.switchToSection(i)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const i=t.getAttribute("data-section");i===this.currentActiveSection||this.currentActiveSection===null&&i==="config-section"?t.classList.add("active"):t.classList.remove("active")})}setupLayoutListener(){E.addLayoutChangeListener(e=>{this.initialized&&this.applyLayoutMode(e)})}showSection(e){const t=this.sections.find(i=>i.id===e);t&&(!t.element&&(t.element=document.getElementById(e),!t.element)||(t.element.classList.remove("hidden"),t.isAvailable=!0,E.isMobile()&&this.switchToSection(e),this.updateTabVisibility()))}hideSection(e){const t=this.sections.find(i=>i.id===e);!t||!t.element||(t.element.classList.add("hidden"),t.isAvailable=!1,this.updateTabVisibility(),E.isMobile()&&this.currentActiveSection===e&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const i=t.getAttribute("data-section"),n=this.sections.find(s=>s.id===i);n&&(n.isAvailable?(t.classList.remove("disabled"),t.disabled=!1):(t.classList.add("disabled"),t.disabled=!0))})}addSwipeSupport(){if(!E.isMobile())return;const e=document.querySelector(".main-content");e&&P.addSwipeSupport(e,()=>this.swipeToNextSection(),()=>this.swipeToPreviousSection())}swipeToNextSection(){const e=this.sections.filter(i=>i.isAvailable),t=e.findIndex(i=>i.id===this.currentActiveSection);if(t<e.length-1){const i=e[t+1];this.switchToSection(i.id)}}swipeToPreviousSection(){const e=this.sections.filter(i=>i.isAvailable),t=e.findIndex(i=>i.id===this.currentActiveSection);if(t>0){const i=e[t-1];this.switchToSection(i.id)}}}const C=new Ue;class T{static createFloatingActionButton(e){const t=document.createElement("button");return t.className=`floating-action-button fab-${e.position||"bottom-right"} fab-${e.color||"primary"}`,t.innerHTML=`
      <span class="fab-icon">${e.icon}</span>
      <span class="fab-label">${e.label}</span>
    `,t.addEventListener("click",e.onClick),t.addEventListener("touchstart",()=>{t.style.transform="scale(0.95)"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t}static showFloatingActionButton(e){if(!E.isMobile())return;this.hideFloatingActionButton(),this.fabContainer||(this.fabContainer=document.createElement("div"),this.fabContainer.className="fab-container",document.body.appendChild(this.fabContainer));const t=this.createFloatingActionButton(e);this.fabContainer.appendChild(t),setTimeout(()=>{t.classList.add("fab-visible")},10)}static hideFloatingActionButton(){this.fabContainer&&this.fabContainer.querySelectorAll(".floating-action-button").forEach(t=>{t.classList.remove("fab-visible"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)})}static showBottomSheet(e){return new Promise(t=>{if(!E.isMobile()){this.showDesktopModal(e),t();return}this.hideBottomSheet();const i=document.createElement("div");i.className="bottom-sheet-backdrop";const n=document.createElement("div");n.className="bottom-sheet";const s=document.createElement("div");s.className="bottom-sheet-header",s.innerHTML=`
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">${e.title}</h3>
        ${e.dismissible!==!1?'<button class="bottom-sheet-close">×</button>':""}
      `;const a=document.createElement("div");a.className="bottom-sheet-content",typeof e.content=="string"?a.innerHTML=e.content:a.appendChild(e.content);const r=document.createElement("div");if(r.className="bottom-sheet-actions",e.actions&&e.actions.forEach(o=>{const l=document.createElement("button");l.className=`btn btn-${o.style||"secondary"}`,l.textContent=o.label,l.addEventListener("click",()=>{o.onClick(),this.hideBottomSheet(),t()}),r.appendChild(l)}),n.appendChild(s),n.appendChild(a),e.actions&&e.actions.length>0&&n.appendChild(r),this.bottomSheetContainer||(this.bottomSheetContainer=document.createElement("div"),this.bottomSheetContainer.className="bottom-sheet-container",document.body.appendChild(this.bottomSheetContainer)),this.bottomSheetContainer.appendChild(i),this.bottomSheetContainer.appendChild(n),e.dismissible!==!1){i.addEventListener("click",()=>{this.hideBottomSheet(),t()});const o=s.querySelector(".bottom-sheet-close");o&&o.addEventListener("click",()=>{this.hideBottomSheet(),t()})}setTimeout(()=>{i.classList.add("visible"),n.classList.add("visible")},10)})}static hideBottomSheet(){if(this.bottomSheetContainer){const e=this.bottomSheetContainer.querySelector(".bottom-sheet-backdrop"),t=this.bottomSheetContainer.querySelector(".bottom-sheet");e&&t&&(e.classList.remove("visible"),t.classList.remove("visible"),setTimeout(()=>{this.bottomSheetContainer&&(this.bottomSheetContainer.innerHTML="")},300))}}static showDesktopModal(e){const t=typeof e.content=="string"?e.content:e.title;alert(t)}static createMobileDropdown(e,t){E.isMobile()&&e.addEventListener("click",()=>{const i=document.createElement("div");i.className="mobile-dropdown-content",t.forEach(n=>{const s=document.createElement("button");s.className="mobile-dropdown-item",s.textContent=n.label,s.addEventListener("click",()=>{n.onClick(),this.hideBottomSheet()}),i.appendChild(s)}),this.showBottomSheet({title:"Select Option",content:i,dismissible:!0})})}static showMobileLoading(e="Loading..."){if(!E.isMobile())return;const t=document.createElement("div");t.className="mobile-loading-overlay",t.innerHTML=`
      <div class="mobile-loading-content">
        <div class="mobile-loading-spinner"></div>
        <p class="mobile-loading-text">${e}</p>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("visible")},10)}static hideMobileLoading(){const e=document.querySelector(".mobile-loading-overlay");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300))}}h(T,"fabContainer",null),h(T,"bottomSheetContainer",null);E.addLayoutChangeListener(b=>{b!=="mobile"&&(T.hideFloatingActionButton(),T.hideBottomSheet())});class M{static initialize(){E.isMobile()&&(this.setupLazyLoading(),this.optimizeScrolling(),this.monitorInteractions(),this.setupMemoryMonitoring())}static setupLazyLoading(){const e=document.querySelectorAll("[data-lazy]");if(e.length===0)return;const t=new IntersectionObserver(i=>{i.forEach(n=>{if(n.isIntersecting){const s=n.target;this.loadElement(s),t.unobserve(s)}})},{rootMargin:"50px",threshold:.1});e.forEach(i=>t.observe(i)),this.observers.set("lazy-loading",t)}static loadElement(e){const t=performance.now(),i=e.dataset.lazy;i&&(e.innerHTML=i,e.removeAttribute("data-lazy"));const n=performance.now();this.metrics.renderTime+=n-t}static optimizeScrolling(){document.querySelectorAll(".combat-log, .unit-family-content, .main-content").forEach(t=>{let i=!1,n;t.addEventListener("scroll",()=>{i||(i=!0,this.requestOptimizedFrame(()=>{this.optimizeScrollFrame(t),i=!1})),clearTimeout(n),n=window.setTimeout(()=>{this.onScrollEnd(t)},150)},{passive:!0})})}static optimizeScrollFrame(e){const t=performance.now();e.getBoundingClientRect();const i=e.children;for(let s=0;s<i.length;s++){const a=i[s],r=a.getBoundingClientRect(),o=r.bottom>-window.innerHeight*2&&r.top<window.innerHeight*3;!o&&!a.classList.contains("scroll-hidden")?(a.classList.add("scroll-hidden"),a.style.visibility="hidden"):o&&a.classList.contains("scroll-hidden")&&(a.classList.remove("scroll-hidden"),a.style.visibility="visible")}const n=performance.now();this.metrics.scrollPerformance+=n-t}static onScrollEnd(e){e.querySelectorAll(".scroll-hidden").forEach(i=>{i.classList.remove("scroll-hidden"),i.style.visibility="visible"})}static requestOptimizedFrame(e){this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{e(),this.rafId=null})}static monitorInteractions(){let e;document.addEventListener("touchstart",()=>{e=performance.now()},{passive:!0}),document.addEventListener("touchend",()=>{if(e){const t=performance.now()-e;this.metrics.interactionTime=Math.max(this.metrics.interactionTime,t)}},{passive:!0})}static setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const e=performance.memory;this.metrics.memoryUsage=e.usedJSHeapSize/e.jsHeapSizeLimit,this.metrics.memoryUsage>.8&&(console.warn("High memory usage detected:",this.metrics.memoryUsage),this.optimizeMemory())},1e4)}static optimizeMemory(){this.observers.forEach((e,t)=>{t!=="lazy-loading"&&(e.disconnect(),this.observers.delete(t))}),"gc"in window&&window.gc()}static getMetrics(){return{...this.metrics}}static resetMetrics(){this.metrics={renderTime:0,interactionTime:0,scrollPerformance:0}}static addMobileCSSOptimizations(){if(!E.isMobile())return;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}static cleanup(){this.observers.forEach(e=>e.disconnect()),this.observers.clear(),this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}h(M,"metrics",{renderTime:0,interactionTime:0,scrollPerformance:0}),h(M,"observers",new Map),h(M,"rafId",null);E.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{M.initialize(),M.addMobileCSSOptimizations()});E.addLayoutChangeListener(b=>{b!=="mobile"?M.cleanup():(M.initialize(),M.addMobileCSSOptimizations())});class k{static initialize(){this.createScreenReaderAnnouncer(),this.setupFocusManagement(),this.enhanceTabNavigation(),this.addTouchAccessibility(),this.setupKeyboardNavigation()}static createScreenReaderAnnouncer(){this.announcer||(this.announcer=document.createElement("div"),this.announcer.setAttribute("aria-live","polite"),this.announcer.setAttribute("aria-atomic","true"),this.announcer.className="sr-only",this.announcer.style.cssText=`
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `,document.body.appendChild(this.announcer))}static announce(e,t="polite"){this.announcer||this.createScreenReaderAnnouncer(),this.announcer.setAttribute("aria-live",t),this.announcer.textContent=e,setTimeout(()=>{this.announcer&&(this.announcer.textContent="")},1e3)}static setupFocusManagement(){document.addEventListener("focusin",e=>{this.focusTracker=e.target}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&E.isMobile()&&this.restoreFocus()})}static restoreFocus(){if(this.focusTracker&&document.contains(this.focusTracker))this.focusTracker.focus();else{const e=document.querySelector(".main-content > :not(.hidden)");if(e){const t=e.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');t&&t.focus()}}}static enhanceTabNavigation(){const e=document.querySelector(".mobile-tab-navigation");if(!e)return;e.setAttribute("role","tablist"),e.setAttribute("aria-label","Main navigation");const t=e.querySelectorAll(".tab-nav-item");t.forEach((i,n)=>{i.setAttribute("role","tab"),i.setAttribute("aria-selected",n===0?"true":"false"),i.setAttribute("tabindex",n===0?"0":"-1");const s=i.getAttribute("data-section");s&&(i.setAttribute("aria-controls",s),i.id=`tab-${s}`),i.addEventListener("keydown",a=>{this.handleTabKeydown(a,t,n)}),i.addEventListener("click",()=>{var r;const a=((r=i.querySelector(".tab-label"))==null?void 0:r.textContent)||"Section";this.announce(`Switched to ${a} section`),this.updateTabAria(t,n)})})}static handleTabKeydown(e,t,i){let n=i;switch(e.key){case"ArrowLeft":e.preventDefault(),n=i>0?i-1:t.length-1;break;case"ArrowRight":e.preventDefault(),n=i<t.length-1?i+1:0;break;case"Home":e.preventDefault(),n=0;break;case"End":e.preventDefault(),n=t.length-1;break;case"Enter":case" ":e.preventDefault(),t[i].click();return}n!==i&&(this.updateTabAria(t,n),t[n].focus())}static updateTabAria(e,t){e.forEach((i,n)=>{i.setAttribute("aria-selected",n===t?"true":"false"),i.setAttribute("tabindex",n===t?"0":"-1")})}static addTouchAccessibility(){document.addEventListener("touchstart",t=>{const i=t.target;i.matches("button, .unit-card, .tab-nav-item")&&i.setAttribute("aria-pressed","true")},{passive:!0}),document.addEventListener("touchend",t=>{const i=t.target;i.matches("button, .unit-card, .tab-nav-item")&&i.removeAttribute("aria-pressed")},{passive:!0});let e=0;document.addEventListener("touchend",t=>{const i=new Date().getTime(),n=i-e;n<500&&n>0&&t.target.matches(".unit-card, .army-composition")&&this.announce("Double tap to activate","assertive"),e=i})}static setupKeyboardNavigation(){this.addSkipLinks(),document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".bottom-sheet.visible, .mobile-loading-overlay.visible");if(t){e.preventDefault(),this.announce("Modal closed");const i=t.querySelector(".bottom-sheet-close");i&&i.click()}}})}static addSkipLinks(){const e=document.createElement("div");e.className="skip-links",e.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#mobile-navigation" class="skip-link">Skip to navigation</a>
    `,document.body.insertBefore(e,document.body.firstChild);const t=document.querySelector(".main-content");t&&!t.id&&(t.id="main-content");const i=document.querySelector(".mobile-tab-navigation");i&&!i.id&&(i.id="mobile-navigation")}static enhanceFormAccessibility(){document.querySelectorAll("form").forEach(t=>{t.querySelectorAll("input, select, textarea").forEach(n=>{var a;if(!t.querySelector(`label[for="${n.id}"]`)&&n.id){const r=document.createElement("label");r.setAttribute("for",n.id),r.textContent=n.getAttribute("placeholder")||"Input field",r.className="sr-only",(a=n.parentNode)==null||a.insertBefore(r,n)}n.hasAttribute("required")&&(n.setAttribute("aria-required","true"),n.addEventListener("invalid",()=>{this.announce("Required field is empty","assertive")}))}),t.addEventListener("submit",()=>{this.announce("Form submitted")})})}static addDynamicLabels(){document.querySelectorAll(".unit-card").forEach(n=>{var a;const s=(a=n.querySelector(".unit-name"))==null?void 0:a.textContent;s&&!n.getAttribute("aria-label")&&(n.setAttribute("aria-label",`Unit: ${s}`),n.setAttribute("role","button"))}),document.querySelectorAll(".army-composition").forEach((n,s)=>{n.getAttribute("aria-label")||(n.setAttribute("aria-label",`Army composition ${s+1}`),n.setAttribute("role","article"))}),document.querySelectorAll(".combat-action").forEach((n,s)=>{var a;if(!n.getAttribute("aria-label")){const r=((a=n.textContent)==null?void 0:a.substring(0,50))||"Combat action";n.setAttribute("aria-label",`Combat action ${s+1}: ${r}`)}})}static cleanup(){this.announcer&&this.announcer.parentNode&&(this.announcer.parentNode.removeChild(this.announcer),this.announcer=null);const e=document.querySelector(".skip-links");e&&e.parentNode&&e.parentNode.removeChild(e)}}h(k,"focusTracker",null),h(k,"announcer",null);E.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{k.initialize()});E.addLayoutChangeListener(b=>{b!=="mobile"?k.cleanup():k.initialize()});class Ae{constructor(){h(this,"container",null);h(this,"unitLoader");h(this,"optimizer",null);h(this,"damageOptimizer",null);h(this,"selectedUnits",new Set);h(this,"mercenaryLimits",{});h(this,"battleSimulation",null);h(this,"manualBattleSimulation",null);h(this,"currentOptimizedArmy",null);h(this,"currentMode","stacking");h(this,"enemyUnitManager",null);h(this,"selectedEnemyUnits",[]);h(this,"currentEnemyUnitSelector",null);h(this,"currentEnemyUnitSelectorContainer",null);h(this,"optimizationAbortController",null);h(this,"optimizationStartTime",0);h(this,"progressUpdateInterval",null);this.unitLoader=new ce}async mount(e){this.container=e,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),C.initialize(),this.initializeAdvancedMobileFeatures()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(e)}async loadInitialData(){try{await this.unitLoader.loadPresetUnits(),this.displayUnitList(),this.updateOptimizeButton()}catch(e){console.error("Failed to load unit data:",e)}}attachEventListeners(){const e=document.getElementById("stacking-mode-btn"),t=document.getElementById("damage-mode-btn"),i=document.getElementById("enemy-units-btn"),n=document.getElementById("unit-search"),s=document.getElementById("unit-type-filter"),a=document.getElementById("optimize-btn"),r=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),c=document.getElementById("leadership-budget"),d=document.getElementById("dominance-budget"),m=document.getElementById("select-enemy-units-btn"),u=document.getElementById("enemy-count");e&&e.addEventListener("click",()=>this.switchMode("stacking")),t&&t.addEventListener("click",()=>this.switchMode("damage")),i&&i.addEventListener("click",()=>this.switchMode("enemy-units"));const p=document.getElementById("manual-battle-btn");p&&p.addEventListener("click",()=>this.switchMode("manual-battle")),m&&m.addEventListener("click",()=>this.openEnemyUnitSelector()),n&&n.addEventListener("input",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("change",()=>this.filterAndDisplayUnits()),a&&a.addEventListener("click",()=>this.optimizeArmy()),r&&r.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),c&&c.addEventListener("input",()=>this.updateOptimizeButton()),d&&d.addEventListener("input",()=>this.updateOptimizeButton()),u&&u.addEventListener("input",()=>this.handleEnemyGroupsChange()),document.addEventListener("click",g=>{const f=g.target;f.classList.contains("filter-tab")&&this.handleFilterTabClick(f)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const e=document.getElementById("unit-type-filter");if(!e)return;const t=this.unitLoader.getUniqueUnitTypes();e.innerHTML='<option value="">All Unit Types</option>',t.forEach(i=>{const n=document.createElement("option");n.value=i,n.textContent=i,e.appendChild(n)})}updateFilterTabCounts(){const e=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(i=>{const n=i.getAttribute("data-filter");let s=0;n==="all"?s=e.length:s=e.filter(a=>this.getMainCategory(a)===n).length,i.textContent=`${n==="all"?"All":n} (${s})`})}handleFilterTabClick(e){document.querySelectorAll(".filter-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var s,a,r;const e=((s=document.getElementById("unit-search"))==null?void 0:s.value)||"",t=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",i=((r=document.getElementById("unit-type-filter"))==null?void 0:r.value)||"";let n=this.unitLoader.getAllUnits();if(t!=="all"&&(n=n.filter(o=>this.getMainCategory(o)===t)),i&&(n=n.filter(o=>o.unit_types.includes(i))),e){const o=e.toLowerCase();n=n.filter(l=>l.name.toLowerCase().includes(o)||l.unit_types.some(c=>c.toLowerCase().includes(o)))}this.renderGroupedUnits(n),this.updateSelectedSummary()}renderGroupedUnits(e){const t=document.getElementById("unit-groups");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML='<div class="no-units">No units match your filters</div>';return}const i=this.createHierarchicalGroups(e);Object.entries(i).forEach(([n,s])=>{const a=this.createMainCategoryElement(n,s);t.appendChild(a)}),this.attachAllEventListeners(i)}createHierarchicalGroups(e){const t={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return e.forEach(i=>{const n=this.getMainCategory(i),s=this.getSubCategory(i),a=this.getUnitFamily(i);t[n][s]||(t[n][s]={}),t[n][s][a]||(t[n][s][a]=[]),t[n][s][a].push(i)}),Object.values(t).forEach(i=>{Object.values(i).forEach(n=>{Object.values(n).forEach(s=>{s.sort((a,r)=>a.strength-r.strength)})})}),t}getMainCategory(e){if(e.cost_type==="Mercenary"||(e.authority_cost??0)>0)return"Mercenaries";const t=e.unit_types;return t.includes("Engineer corps")||t.includes("Siege engine")?"Engineer Corps":t.includes("Guardsman")?"Guardsmen":t.includes("Specialist")?"Specialists":t.includes("Beast")||t.includes("Dragon")||t.includes("Giant")||t.includes("Elemental")||t.includes("ELEMENTAL")||t.includes("Flying")&&!t.includes("Human")?"Monsters":t.includes("Human")&&(t.includes("Melee")||t.includes("Ranged")||t.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(e){const t=e.unit_types,i=e.name.toUpperCase(),n=this.getMainCategory(e);if(n==="Mercenaries")return t.includes("Guardsman")?"Elite Forces":"Special Forces";if(n==="Engineer Corps"){if(i.includes("CATAPULT"))return"Catapults";if(i.includes("BALLISTA"))return"Ballistae";if(i.includes("JOSEPHINE"))return"Heavy Artillery";if(t.includes("Siege engine"))return"Siege Engines"}if(n==="Monsters"){if(t.includes("Dragon"))return"Dragons";if(t.includes("Giant"))return"Giants";if(t.includes("Beast"))return"Beasts";if(t.includes("Elemental")||t.includes("ELEMENTAL"))return"Elementals";if(t.includes("Flying"))return"Flying"}if(n==="Guardsmen"||n==="Specialists"){if(t.includes("Ranged"))return"Ranged";if(t.includes("Melee"))return"Melee";if(t.includes("Mounted"))return"Mounted";if(t.includes("Flying")||t.includes("Beast"))return"Flying";if(t.includes("Scout"))return"Scouts"}return t.includes("Human")?"Infantry":"Other"}getUnitFamily(e){let t=e.name;return t=t.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),t.includes("HEAVY "),t}createMainCategoryElement(e,t){const i=document.createElement("div");i.className="main-category";const n=this.countUnitsInCategory(t),s=this.countSelectedUnitsInCategory(t);return i.innerHTML=`
      <div class="main-category-header" data-category="${e}">
        <div class="category-title">
          <h3>${e} (${s}/${n})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${e}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${e}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(t).map(([a,r])=>this.createSubCategoryHTML(e,a,r)).join("")}
      </div>
    `,i}createSubCategoryHTML(e,t,i){const n=Object.values(i).reduce((a,r)=>a+r.length,0),s=Object.values(i).reduce((a,r)=>a+r.filter(o=>this.selectedUnits.has(o.name)).length,0);return`
      <div class="sub-category" data-category="${e}" data-subcategory="${t}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${t} (${s}/${n})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(i).map(([a,r])=>this.createUnitFamilyHTML(a,r)).join("")}
        </div>
      </div>
    `}createUnitFamilyHTML(e,t){const i=t.filter(n=>this.selectedUnits.has(n.name)).length;return`
      <div class="unit-family" data-family="${e}">
        <div class="unit-family-header">
          <div class="family-title">
            <h5>${e} (${i}/${t.length})</h5>
            <span class="expand-icon">▼</span>
          </div>
          <div class="family-actions">
            <button class="btn btn-xs select-family">Select All</button>
            <button class="btn btn-xs deselect-family">Deselect All</button>
          </div>
        </div>
        <div class="unit-family-content collapsed">
          ${t.map(n=>this.createUnitCard(n)).join("")}
        </div>
      </div>
    `}createUnitCard(e){const t=this.selectedUnits.has(e.name),i=this.getUnitCost(e);return`
      <div class="unit-card ${t?"selected":""}" data-unit="${e.name}">
        <div class="unit-card-header">
          <div class="unit-name">${e.name}</div>
          <div class="unit-cost">${e.cost_type}: ${i}</div>
        </div>
        <div class="unit-stats">
          <span class="stat">HP: ${e.health.toLocaleString()}</span>
          <span class="stat">STR: ${e.strength.toLocaleString()}</span>
        </div>
        <div class="unit-types">${e.unit_types.slice(0,3).join(", ")}${e.unit_types.length>3?"...":""}</div>
      </div>
    `}attachAllEventListeners(e){document.querySelectorAll(".main-category").forEach((t,i)=>{const s=Object.keys(e)[i];if(s){const a=e[s];this.attachMainCategoryListeners(t,s,a)}}),document.querySelectorAll(".sub-category").forEach(t=>{var s;const i=t.getAttribute("data-category"),n=t.getAttribute("data-subcategory");if(i&&n&&((s=e[i])!=null&&s[n])){const a=e[i][n];this.attachSubCategoryListeners(t,a)}}),document.querySelectorAll(".unit-family").forEach(t=>{const i=t.getAttribute("data-family");let n=[];Object.values(e).forEach(s=>{Object.values(s).forEach(a=>{a[i]&&(n=a[i])})}),n.length>0&&this.attachUnitFamilyListeners(t,n)})}countUnitsInCategory(e){return Object.values(e).reduce((t,i)=>t+Object.values(i).reduce((n,s)=>n+s.length,0),0)}countSelectedUnitsInCategory(e){return Object.values(e).reduce((t,i)=>t+Object.values(i).reduce((n,s)=>n+s.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(e,t,i){const n=e.querySelector(".main-category-header"),s=e.querySelector(".main-category-content"),a=e.querySelector(".expand-icon");if(!n||!s||!a){console.warn("Missing main-category elements for",t,{header:!!n,content:!!s,expandIcon:!!a});return}n.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",t,"collapsed:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲"});const r=e.querySelector(".select-category"),o=e.querySelector(".deselect-category");r&&r.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(i)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(i)})}attachSubCategoryListeners(e,t){const i=e.querySelector(".sub-category-header"),n=e.querySelector(".sub-category-content"),s=e.querySelector(".expand-icon");if(!i||!n||!s){console.warn("Missing sub-category elements:",{header:!!i,content:!!n,expandIcon:!!s});return}i.addEventListener("click",o=>{if(o.target.classList.contains("btn")){o.stopPropagation();return}console.log("Sub-category header clicked, toggling:",n.classList.contains("collapsed")),n.classList.toggle("collapsed"),s.textContent=n.classList.contains("collapsed")?"▼":"▲"});const a=e.querySelector(".select-subcategory"),r=e.querySelector(".deselect-subcategory");a&&a.addEventListener("click",o=>{o.stopPropagation(),this.selectAllInFamilies(t)}),r&&r.addEventListener("click",o=>{o.stopPropagation(),this.deselectAllInFamilies(t)})}attachUnitFamilyListeners(e,t){const i=e.querySelector(".unit-family-header"),n=e.querySelector(".unit-family-content"),s=e.querySelector(".expand-icon");i.addEventListener("click",l=>{l.target.classList.contains("btn")||(n.classList.toggle("collapsed"),s.textContent=n.classList.contains("collapsed")?"▼":"▲")});const a=e.querySelector(".select-family"),r=e.querySelector(".deselect-family");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(t)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(t)}),e.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-unit");if(c){const d=this.unitLoader.getUnitByName(c);d&&this.toggleUnitSelection(d)}})})}getUnitCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost??0;case"Dominance":return e.dominance_cost??0;case"Authority":case"Mercenary":return e.authority_cost??0;default:return 0}}toggleUnitSelection(e){this.selectedUnits.has(e.name)?(this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]):(this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton(),E.isMobile()&&this.addFloatingActionButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(e=>{const t=e.getAttribute("data-unit");t&&(this.selectedUnits.has(t)?e.classList.add("selected"):e.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((e,t)=>{const i=e.querySelector(".category-title h3");if(i){const s=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][t];if(s){const{selected:a,total:r}=this.countUnitsInMainCategory(s),l=(i.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");i.textContent=`${l} (${a}/${r})`}}}),document.querySelectorAll(".sub-category").forEach(e=>{const t=e.querySelector(".subcategory-title h4"),i=e.getAttribute("data-category"),n=e.getAttribute("data-subcategory");if(t&&i&&n){const{selected:s,total:a}=this.countUnitsInSubCategory(i,n),o=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${o} (${s}/${a})`}}),document.querySelectorAll(".unit-family").forEach(e=>{const t=e.querySelector(".family-title h5"),i=e.getAttribute("data-family");if(t&&i){const{selected:n,total:s}=this.countUnitsInFamily(i),r=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${r} (${n}/${s})`}})}countUnitsInMainCategory(e){const i=this.unitLoader.getAllUnits().filter(s=>this.getMainCategory(s)===e);return{selected:i.filter(s=>this.selectedUnits.has(s.name)).length,total:i.length}}countUnitsInSubCategory(e,t){const n=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===e&&this.getSubCategory(a)===t);return{selected:n.filter(a=>this.selectedUnits.has(a.name)).length,total:n.length}}countUnitsInFamily(e){const i=this.unitLoader.getAllUnits().filter(s=>this.getUnitFamily(s)===e);return{selected:i.filter(s=>this.selectedUnits.has(s.name)).length,total:i.length}}updateSelectedSummary(){const e=document.getElementById("selected-count");e&&(e.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(t=>{const i=t.getAttribute("data-unit");if(i){const n=this.unitLoader.getUnitByName(i);n&&(this.selectedUnits.add(n.name),(n.cost_type==="Mercenary"||n.cost_type==="Authority")&&(this.mercenaryLimits[n.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(e){Object.values(e).forEach(t=>{this.selectAllInFamilies(t)})}deselectAllInCategory(e){Object.values(e).forEach(t=>{this.deselectAllInFamilies(t)})}selectAllInFamilies(e){Object.values(e).forEach(t=>{this.selectAllUnits(t)})}deselectAllInFamilies(e){Object.values(e).forEach(t=>{this.deselectAllUnits(t)})}selectAllUnits(e){e.forEach(t=>{this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(e){e.forEach(t=>{this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const e=document.getElementById("mercenary-limits");if(!e)return;const t=Array.from(this.selectedUnits).map(i=>this.unitLoader.getUnitByName(i)).filter(i=>i&&(i.cost_type==="Mercenary"||i.cost_type==="Authority"));if(t.length===0){e.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}e.innerHTML="",t.forEach(i=>{if(!i)return;const n=document.createElement("div");n.className="mercenary-item";const s=i.cost_type==="Authority"?"⚔️":"🗡️",a=i.cost_type==="Authority"?`AUTH: ${i.authority_cost}`:`AUTH: ${i.authority_cost}`;n.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${s} ${i.name}</span>
          <span class="unit-stats">(STR: ${i.strength}, HP: ${i.health}, ${a})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${i.name}">Max Available:</label>
          <input type="number" id="merc-${i.name}" min="1" max="100" value="${this.mercenaryLimits[i.name]||1}"
                 data-unit="${i.name}" class="input" placeholder="1">
        </div>
      `,n.querySelector("input").addEventListener("change",o=>{const l=o.target;this.mercenaryLimits[l.dataset.unit]=parseInt(l.value)||1}),e.appendChild(n)})}updateOptimizeButton(){const e=document.getElementById("optimize-btn"),t=document.getElementById("leadership-budget"),i=document.getElementById("dominance-budget");if(!e||!t||!i)return;const n=this.selectedUnits.size>0,s=parseInt(t.value)>0||parseInt(i.value)>0||Object.keys(this.mercenaryLimits).length>0;e.disabled=!n||!s}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(e){console.error("Optimization failed:",e),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new q(e);const t=document.getElementById("leadership-budget"),i=document.getElementById("dominance-budget"),n={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(i.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},s=await this.optimizer.optimizeArmy(n);this.displayStackingResults(s)}async optimizeForDamage(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),t=document.getElementById("leadership-budget"),i=document.getElementById("dominance-budget"),n=document.getElementById("enemy-count"),s=document.getElementById("max-combinations"),a={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(i.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(n.value)||5,maxCombinations:parseInt(s.value)||50,specificEnemyUnits:this.selectedEnemyUnits.length>0?[...this.selectedEnemyUnits]:void 0};await this.runDamageOptimizationWithProgress(a,e)}async runDamageOptimizationWithProgress(e,t){this.optimizationAbortController=new AbortController,E.isMobile()?T.showMobileLoading("Optimizing army composition..."):this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new ue,this.damageOptimizer.initialize(this.unitLoader));const i={...e,signal:this.optimizationAbortController.signal,onProgress:s=>{this.updateProgressModal(s.progress,s.message,{combinationsEvaluated:s.combinationsEvaluated,totalToEvaluate:s.totalToEvaluate,phase:s.phase,estimatedRemainingMs:s.estimatedRemainingMs})}},n=await this.damageOptimizer.optimizeForDamage(i,t);await this.delay(500),E.isMobile()?T.hideMobileLoading():this.hideProgressModal(),this.displayDamageResults(n)}catch(i){E.isMobile()?T.hideMobileLoading():this.hideProgressModal(),i instanceof Error&&i.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",i),alert(`Optimization failed: ${i instanceof Error?i.message:"Unknown error"}`))}}delay(e){return new Promise(t=>setTimeout(t,e))}displayStackingResults(e){const t=document.getElementById("optimization-stats"),i=document.getElementById("army-compositions"),n=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");!t||!i||!n||(s&&s.classList.remove("hidden"),a&&a.classList.add("hidden"),t.innerHTML=`
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
    `,i.innerHTML="",e.compositions.length===0?i.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.compositions.forEach((r,o)=>{const l=this.createCompositionElement(r,o+1);i.appendChild(l)}),n.classList.remove("hidden"),C.showSection("results-section"),e.compositions.length>0&&(this.currentOptimizedArmy=e.compositions[0]))}displayDamageResults(e){const t=document.getElementById("optimization-stats"),i=document.getElementById("damage-army-list"),n=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");if(!t||!i||!n)return;s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const r=document.getElementById("battle-simulation-container");r&&(r.classList.add("hidden"),C.hideSection("battle-simulation-container")),t.innerHTML=`
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
    `,i.innerHTML="",e.rankedResults.length===0?i.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.rankedResults.slice(0,10).forEach((o,l)=>{const c=this.createDamageArmyElement(o,l+1);i.appendChild(c)}),n.classList.remove("hidden"),C.showSection("results-section"),E.isMobile()||setTimeout(()=>{n.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(e){const t=document.getElementById("battle-simulation-container");!t||!this.currentOptimizedArmy||(t.classList.remove("hidden"),C.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new W,this.battleSimulation.initialize(this.unitLoader),this.battleSimulation.mount(t,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(e),E.isMobile()||t.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const e=document.getElementById("battle-simulation-container");e&&(e.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new W,this.battleSimulation.initialize(this.unitLoader)),this.battleSimulation.mount(e,this.currentOptimizedArmy),C.showSection("battle-simulation-container"),E.isMobile()||setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(e,t){var l;const i=document.createElement("div");i.className="army-composition";const n=((l=this.optimizer)==null?void 0:l.explainStacking(e))||"No stacking explanation available",s=`
      <div class="composition-header">
        <div class="composition-title">Solution ${t} ${e.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${e.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=n.split(`
`).map(c=>c.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${c}</h3>`:c.includes("═".repeat(60))?'<hr class="title-divider">':c.includes("📊 ARMY SUMMARY")||c.includes("🗡️ MERCENARY FORCES")||c.includes("👑 LEADERSHIP FORCES")||c.includes("⚡ DOMINANCE FORCES")||c.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${c}</h4>`:c.includes("─".repeat(30))||c.includes("─".repeat(40))?'<hr class="section-divider">':c.includes("└─")?`<div class="unit-detail">${c}</div>`:c.trim()&&!c.includes("═")&&!c.includes("─")?`<div class="unit-line">${c}</div>`:c.trim()===""?'<div class="spacing"></div>':"").filter(c=>c!=="").join(""),r=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${t-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;i.innerHTML=s+'<div class="composition-content">'+a+"</div>"+r;const o=i.querySelector(".simulate-btn");return o&&o.addEventListener("click",()=>{this.currentOptimizedArmy=e,this.showBattleSimulation()}),i}createDamageArmyElement(e,t){const i=document.createElement("div");i.className="damage-army-card",i.setAttribute("data-army-index",(t-1).toString());const n=e.armyComposition.totalDominanceCost===0?"Leadership":e.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",s=n==="Leadership"?"🛡️":n==="Dominance"?"👹":"⚔️";return i.addEventListener("click",()=>this.selectDamageArmy(e,t-1)),i.innerHTML=`
      <div class="damage-army-header">
        <div class="army-rank">#${t}</div>
        <div class="army-strategy">
          <span class="strategy-icon">${s}</span>
          <span class="strategy-label">${n} Strategy</span>
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
            ${Object.entries(e.armyComposition.units).map(([a,r])=>`<div class="unit-item">
                <span class="unit-count">${r.toLocaleString()}x</span>
                <span class="unit-name">${a}</span>
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
            <span class="stat-value">${e.battleAnalysis.worstCase.totalDamageDealtToEnemies.toLocaleString()} - ${e.battleAnalysis.bestCase.totalDamageDealtToEnemies.toLocaleString()} damage</span>
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
    `,i}selectDamageArmy(e,t){document.querySelectorAll(".damage-army-card").forEach((n,s)=>{n.classList.toggle("selected",s===t)}),this.showSelectedArmyDetails(e),this.currentOptimizedArmy=e.armyComposition,this.showBattleSimulationWithResults(e.battleAnalysis)}showSelectedArmyDetails(e){const t=document.getElementById("selected-army-details"),i=document.getElementById("selected-army-composition");if(!t||!i)return;const n=e.armyComposition,s=this.unitLoader.getAvailableUnits(Object.keys(n.units)),r=new q(s).explainStacking(n);i.innerHTML=`
      <div class="selected-army-header">
        <h4>Army Composition Details</h4>
        <div class="army-summary-stats">
          <span class="summary-stat">
            <strong>Total Damage:</strong> ${e.averageDamagePerBattle.toLocaleString()}/battle
          </span>
          <span class="summary-stat">
            <strong>Total Strength:</strong> ${n.totalStrength.toLocaleString()}
          </span>
          <span class="summary-stat">
            <strong>Army Size:</strong> ${Object.values(n.units).reduce((o,l)=>o+l,0).toLocaleString()} units
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
            <span class="performance-value">${e.battleAnalysis.bestCase.totalDamageDealtToEnemies.toLocaleString()} damage in ${e.battleAnalysis.bestCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Worst Case:</span>
            <span class="performance-value">${e.battleAnalysis.worstCase.totalDamageDealtToEnemies.toLocaleString()} damage in ${e.battleAnalysis.worstCase.battleDuration} turns</span>
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
    `,t.classList.remove("hidden"),t.scrollIntoView({behavior:"smooth",block:"nearest"})}formatCombatLog(e){return!e||e.length===0?'<div class="no-combat-log">No combat actions recorded</div>':e.map((t,i)=>{const n=t.attacker&&!t.attacker.includes("Enemy");return`
        <div class="combat-action ${n?"player-action":"enemy-action"}">
          <div class="action-header">
            <span class="turn-number">Turn ${t.turn}</span>
            <span class="action-type">${n?"⚔️ Player Attack":"🛡️ Enemy Attack"}</span>
          </div>
          <div class="action-details">
            <strong>${t.attacker}</strong> ${t.action} <strong>${t.target}</strong>
            ${t.damageDealt?`<span class="damage-dealt">(${t.damageDealt.toLocaleString()} damage)</span>`:""}
            ${t.eliminated?'<span class="eliminated-indicator">💀 Eliminated</span>':""}
          </div>
        </div>
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const e=document.getElementById("leadership-budget"),t=document.getElementById("dominance-budget"),i=document.getElementById("results-section"),n=document.getElementById("battle-simulation-container");e&&(e.value="0"),t&&(t.value="0"),i&&(i.classList.add("hidden"),C.hideSection("results-section")),n&&(n.classList.add("hidden"),C.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(e){this.currentMode=e;const t=document.getElementById("stacking-mode-btn"),i=document.getElementById("damage-mode-btn"),n=document.getElementById("enemy-units-btn"),s=document.getElementById("manual-battle-btn");t&&i&&n&&s&&(t.classList.toggle("active",e==="stacking"),i.classList.toggle("active",e==="damage"),n.classList.toggle("active",e==="enemy-units"),s.classList.toggle("active",e==="manual-battle"));const a=document.getElementById("stacking-description"),r=document.getElementById("damage-description");a&&r&&(a.classList.toggle("hidden",e!=="stacking"),r.classList.toggle("hidden",e!=="damage"));const o=document.getElementById("damage-controls");o&&o.classList.toggle("hidden",e!=="damage");const l=document.getElementById("optimize-btn-text");l&&(e==="stacking"?l.textContent="🚀 Optimize Army":e==="damage"?l.textContent="⚔️ Optimize for Damage":e==="enemy-units"?l.textContent="👹 Manage Enemy Units":e==="manual-battle"&&(l.textContent="⚔️ Configure Battle"));const c=document.getElementById("results-title");c&&(e==="stacking"?c.textContent="🎯 Stacking Results":e==="damage"?c.textContent="⚔️ Damage Optimization Results":e==="enemy-units"?c.textContent="👹 Enemy Units Management":e==="manual-battle"&&(c.textContent="⚔️ Manual Battle Results"));const d=document.getElementById("config-section"),m=document.getElementById("results-section"),u=document.getElementById("enemy-units-section"),p=document.getElementById("manual-battle-section"),g=document.getElementById("battle-simulation-container");e==="enemy-units"?(d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.remove("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),this.initializeEnemyUnitsManager(),C.hideSection("config-section"),C.hideSection("results-section"),C.showSection("enemy-units-section"),C.hideSection("manual-battle-section"),C.hideSection("battle-simulation-container")):e==="manual-battle"?(d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),p&&p.classList.remove("hidden"),g&&g.classList.add("hidden"),this.initializeManualBattleSimulation(),C.hideSection("config-section"),C.hideSection("results-section"),C.hideSection("enemy-units-section"),C.showSection("manual-battle-section"),C.hideSection("battle-simulation-container")):(d&&d.classList.remove("hidden"),u&&u.classList.add("hidden"),p&&p.classList.add("hidden"),m&&m.classList.add("hidden"),g&&g.classList.add("hidden"),C.showSection("config-section"),C.hideSection("enemy-units-section"),C.hideSection("manual-battle-section"),C.hideSection("results-section"),C.hideSection("battle-simulation-container"))}showLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.remove("hidden")}hideLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.add("hidden")}showProgressModal(){let e=document.getElementById("progress-modal");if(!e){e=document.createElement("div"),e.id="progress-modal",e.className="modal",e.innerHTML=`
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
      `,document.body.appendChild(e);const t=document.getElementById("cancel-optimization-btn");t&&t.addEventListener("click",()=>{this.cancelOptimization()})}e.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(e,t,i){const n=document.getElementById("progress-fill"),s=document.getElementById("progress-text"),a=document.getElementById("progress-percentage"),r=document.getElementById("progress-combinations"),o=document.getElementById("progress-phase"),l=document.getElementById("progress-remaining");if(n&&(n.style.width=`${e}%`),s&&(s.textContent=t),a&&(a.textContent=`${Math.round(e)}%`),r&&i){const c=i.combinationsEvaluated||0,d=i.totalToEvaluate||0;r.textContent=`${c.toLocaleString()} / ${d.toLocaleString()} combinations`}if(o&&(i!=null&&i.phase)&&(o.textContent=i.phase.charAt(0).toUpperCase()+i.phase.slice(1)),l&&(i!=null&&i.estimatedRemainingMs)){const c=Math.ceil(i.estimatedRemainingMs/1e3),d=Math.floor(c/60),m=c%60;l.textContent=`(~${d}:${m.toString().padStart(2,"0")} remaining)`}else l&&(l.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const e=performance.now()-this.optimizationStartTime,t=Math.floor(e/1e3),i=Math.floor(t/60),n=t%60,s=document.getElementById("progress-elapsed");s&&(s.textContent=`${i.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const e=document.getElementById("progress-modal");e&&e.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){z.optimizeCombatLogs(),z.optimizeUnitCards(),this.addTouchSupportToUnitCards(),E.addLayoutChangeListener(e=>{this.handleLayoutModeChange(e)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&P.addHapticFeedback(t)})}handleLayoutModeChange(e){setTimeout(()=>{z.optimizeCombatLogs(),z.optimizeUnitCards(),this.addTouchSupportToUnitCards(),e==="mobile"&&this.initializeAdvancedMobileFeatures()},100)}initializeAdvancedMobileFeatures(){E.isMobile()&&(M.initialize(),k.initialize(),this.addPullToRefresh(),this.addFloatingActionButton(),k.enhanceFormAccessibility(),setTimeout(()=>{k.addDynamicLabels()},500))}addPullToRefresh(){const e=document.querySelector(".main-content");e&&P.addPullToRefresh(e,async()=>{k.announce("Refreshing data..."),await new Promise(t=>setTimeout(t,1e3)),z.optimizeCombatLogs(),z.optimizeUnitCards(),k.addDynamicLabels(),k.announce("Data refreshed")})}addFloatingActionButton(){this.selectedUnits.size>0?T.showFloatingActionButton({icon:"⚡",label:"Quick Optimize",onClick:()=>{k.announce("Starting quick optimization"),this.optimizeArmy()},position:"bottom-right",color:"primary"}):T.hideFloatingActionButton()}initializeEnemyUnitsManager(){const e=document.getElementById("enemy-units-container");e&&(this.enemyUnitManager||(this.enemyUnitManager=new xe({mode:"embedded"})),this.enemyUnitManager.mount(e))}async initializeManualBattleSimulation(){const e=document.getElementById("manual-battle-container");e&&(this.manualBattleSimulation||(this.manualBattleSimulation=new Se({unitLoader:this.unitLoader,onBattleComplete:t=>{console.log("Manual battle completed:",t)}})),await this.manualBattleSimulation.mount(e))}openEnemyUnitSelector(){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5");R(async()=>{const{EnemyUnitSelector:i}=await Promise.resolve().then(()=>be);return{EnemyUnitSelector:i}},void 0).then(({EnemyUnitSelector:i})=>{const n=document.createElement("div");n.id="enemy-unit-selector-modal",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.right="0",n.style.bottom="0",n.style.zIndex="2000",document.body.appendChild(n);const s=new i({onSelect:a=>{this.handleEnemyUnitSelected(a)},onCancel:()=>{this.closeEnemyUnitSelector(n,s)},mode:"multiple",title:`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`,maxSelections:t,selectedUnits:[...this.selectedEnemyUnits]});this.currentEnemyUnitSelector=s,this.currentEnemyUnitSelectorContainer=n,s.mount(n)}).catch(i=>{console.error("Failed to load EnemyUnitSelector:",i),alert("Failed to open enemy unit selector. Please try again.")})}handleEnemyUnitSelected(e){const t=document.getElementById("enemy-count"),i=parseInt((t==null?void 0:t.value)||"5"),n=this.selectedEnemyUnits.findIndex(s=>s.name===e.name);n>=0?this.selectedEnemyUnits.splice(n,1):this.selectedEnemyUnits.length<i?this.selectedEnemyUnits.push(e):(this.selectedEnemyUnits.shift(),this.selectedEnemyUnits.push(e)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}closeEnemyUnitSelector(e,t){try{t&&typeof t.unmount=="function"&&t.unmount(),e&&e.parentNode&&e.parentNode.removeChild(e),this.currentEnemyUnitSelector=null,this.currentEnemyUnitSelectorContainer=null}catch(i){console.error("Error closing enemy unit selector:",i)}}updateEnemyUnitSelectorTitle(){if(this.currentEnemyUnitSelector&&typeof this.currentEnemyUnitSelector.updateTitle=="function"){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5"),i=`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`;this.currentEnemyUnitSelector.updateTitle(i),typeof this.currentEnemyUnitSelector.updateSelectedUnits=="function"&&this.currentEnemyUnitSelector.updateSelectedUnits(this.selectedEnemyUnits)}}handleEnemyGroupsChange(){if(this.currentMode==="damage"){const e=document.getElementById("enemy-count"),t=e&&parseInt(e.value)||1;this.selectedEnemyUnits.length>t&&(this.selectedEnemyUnits=this.selectedEnemyUnits.slice(0,t)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}}updateEnemyUnitDisplay(){const e=document.getElementById("select-enemy-units-btn");if(e){const t=document.getElementById("enemy-count"),i=parseInt((t==null?void 0:t.value)||"5");if(this.selectedEnemyUnits.length===0)e.innerHTML=`
          👹 Select Enemy Units
        `,e.classList.remove("enemy-selected");else if(this.selectedEnemyUnits.length===1){const n=this.selectedEnemyUnits[0];e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${n.name}
          <small class="enemy-stats">(STR: ${n.strength.toLocaleString()}, HP: ${n.health.toLocaleString()})</small>
        `,e.classList.add("enemy-selected")}else e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${this.selectedEnemyUnits.length} Enemy Units Selected
          <small class="enemy-stats">(${this.selectedEnemyUnits.length}/${i} selected)</small>
        `,e.classList.add("enemy-selected")}}}document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("app");if(!b)throw new Error("App container not found");new Ae().mount(b),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});export{X as E,U as M};
//# sourceMappingURL=main-CYf8LqqZ.js.map
