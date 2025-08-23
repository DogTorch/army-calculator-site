const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ImprovedDamageOptimizer-DKf0zO97.css"])))=>i.map(i=>d[i]);
var Z=Object.defineProperty;var tt=(b,t,e)=>t in b?Z(b,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):b[t]=e;var u=(b,t,e)=>tt(b,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const et="modulepreload",nt=function(b){return"/army-calculator-site/"+b},G={},J=function(t,e,n){let i=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),r=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(e.map(o=>{if(o=nt(o),o in G)return;G[o]=!0;const l=o.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${c}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":et,l||(m.as="script"),m.crossOrigin="",m.href=o,r&&m.setAttribute("nonce",r),document.head.appendChild(m),l)return new Promise((d,h)=>{m.addEventListener("load",d),m.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${o}`)))})}))}function s(a){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=a,window.dispatchEvent(r),!r.defaultPrevented)throw a}return i.then(a=>{for(const r of a||[])r.status==="rejected"&&s(r.reason);return t().catch(s)})};class y{static isPlayerUnit(t){return t.cost_type!==void 0||t.context==="player"}static isEnemyUnit(t){return t.cost_type===void 0||t.context==="enemy"}static isMortalEnemy(t){return y.isEnemyUnit(t)&&(t.isMortal===!0||t.count!==void 0)}static isImmortalEnemy(t){return y.isEnemyUnit(t)&&!y.isMortalEnemy(t)}static getRemainingEnemyCount(t){return y.isMortalEnemy(t)?t.count:void 0}static getCurrentEnemyHealth(t){return t.currentHealth!==void 0?t.currentHealth:(t.count??1)*t.health}static isMercenary(t){return t.cost_type==="Mercenary"||(t.authority_cost??0)>0}static getPrimaryCost(t){if(!y.isPlayerUnit(t))return 0;switch(t.cost_type){case"Leadership":return t.leadership_cost??0;case"Dominance":return t.dominance_cost??0;case"Authority":case"Mercenary":return t.authority_cost??0;default:return 0}}static getEfficiencyRatio(t){if(y.isPlayerUnit(t)){const e=y.getPrimaryCost(t);return e>0?t.strength/e:0}else return t.health>0?t.strength/t.health:0}static getStrengthPerCost(t){const e=y.getPrimaryCost(t);return e>0?t.strength/e:0}static getHealthPerCost(t){const e=y.getPrimaryCost(t);return e>0?t.health/e:0}static getStrengthPerHealth(t){return t.health>0?t.strength/t.health:0}static getEffectivenessScore(t){if(y.isPlayerUnit(t)){const e=y.getPrimaryCost(t);return e>0?t.strength*t.health/e:0}else return t.strength*t.health/1e3}static hasUnitType(t,e){return t.unit_types.some(n=>n.toLowerCase()===e.toLowerCase())}static getAttackModifierAgainst(t,e){if(!t.attack_modifiers)return 0;const n=t.attack_modifiers.find(i=>i.target_type.toLowerCase()===e.toLowerCase());return n?n.value:0}static getTotalStrengthAgainst(t,e){const n=t.strength,i=y.getAttackModifierAgainst(t,e);return n+i}static createUserEnemyUnit(t){const e=new Date;return{name:t.name??"Unnamed Enemy",unit_types:t.unit_types??["Epic Monster"],health:t.health??1e4,strength:t.strength??5e3,attack_modifiers:t.attack_modifiers??[],context:"enemy",id:`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,createdAt:e,modifiedAt:e}}static updateUserUnit(t,e){return{...t,...e,modifiedAt:new Date}}static validateUnit(t){const e=[],n=[],i=y.validateName(t.name);i.isValid||e.push(i.error);const s=y.validateUnitTypes(t.unit_types);s.isValid?s.warnings&&n.push(...s.warnings):e.push(s.error);const a=y.validateHealth(t.health);a.isValid?a.warnings&&n.push(...a.warnings):e.push(a.error);const r=y.validateStrength(t.strength);r.isValid?r.warnings&&n.push(...r.warnings):e.push(r.error);const o=y.validateAttackModifiers(t.attack_modifiers);return o.isValid?o.warnings&&n.push(...o.warnings):e.push(o.error),(t.cost_type||t.context==="player")&&t.cost_type&&!["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)&&e.push("Invalid cost_type. Must be Leadership, Dominance, Authority, or Mercenary"),{isValid:e.length===0,errors:e,warnings:n.length>0?n:void 0}}static validateEnemyUnit(t){return y.validateUnit(t)}static validateName(t){if(!t||typeof t!="string")return{isValid:!1,error:"Name must be a non-empty string"};const e=t.trim();return e.length===0?{isValid:!1,error:"Name cannot be empty or only whitespace"}:e.length>100?{isValid:!1,error:"Name cannot exceed 100 characters"}:/[<>"'&]/.test(e)?{isValid:!1,error:`Name contains invalid characters (<, >, ", ', &)`}:{isValid:!0}}static validateUnitTypes(t){const e=[];if(!Array.isArray(t))return{isValid:!1,error:"Unit types must be an array"};if(t.length===0)return{isValid:!1,error:"At least one unit type is required"};if(t.length>10)return{isValid:!1,error:"Cannot have more than 10 unit types"};for(let i=0;i<t.length;i++){const s=t[i];if(typeof s!="string"||s.trim()==="")return{isValid:!1,error:`Unit type ${i+1} must be a non-empty string`};it.includes(s)||e.push(`Unit type '${s}' is not a standard type`)}return new Set(t).size!==t.length?{isValid:!1,error:"Unit types cannot contain duplicates"}:{isValid:!0,warnings:e.length>0?e:void 0}}static validateHealth(t){const e=[];return typeof t!="number"?{isValid:!1,error:"Health must be a number"}:Number.isFinite(t)?t<=0?{isValid:!1,error:"Health must be greater than 0"}:t>5e7?{isValid:!1,error:"Health cannot exceed 50,000,000"}:(t<100&&e.push("Health value is unusually low (less than 100)"),t>1e7&&e.push("Health value is unusually high (greater than 10,000,000)"),{isValid:!0,warnings:e.length>0?e:void 0}):{isValid:!1,error:"Health must be a finite number"}}static validateStrength(t){const e=[];return typeof t!="number"?{isValid:!1,error:"Strength must be a number"}:Number.isFinite(t)?t<0?{isValid:!1,error:"Strength cannot be negative"}:t>25e6?{isValid:!1,error:"Strength cannot exceed 25,000,000"}:(t===0&&e.push("Strength value of 0 means this unit cannot deal damage"),t<50&&e.push("Strength value is unusually low (less than 50)"),t>5e6&&e.push("Strength value is unusually high (greater than 5,000,000)"),{isValid:!0,warnings:e.length>0?e:void 0}):{isValid:!1,error:"Strength must be a finite number"}}static validateAttackModifiers(t){const e=[];if(t==null)return{isValid:!0};if(!Array.isArray(t))return{isValid:!1,error:"Attack modifiers must be an array"};if(t.length>20)return{isValid:!1,error:"Cannot have more than 20 attack modifiers"};for(let s=0;s<t.length;s++){const a=t[s];if(!a||typeof a!="object")return{isValid:!1,error:`Attack modifier ${s+1} must be an object`};if(!a.target_type||typeof a.target_type!="string")return{isValid:!1,error:`Attack modifier ${s+1}: target_type is required and must be a string`};if(at.includes(a.target_type)||e.push(`Attack modifier ${s+1}: '${a.target_type}' is not a standard target type`),!a.modifier_type||!st.includes(a.modifier_type))return{isValid:!1,error:`Attack modifier ${s+1}: modifier_type must be 'Strength'`};if(typeof a.value!="number"||!Number.isFinite(a.value))return{isValid:!1,error:`Attack modifier ${s+1}: value must be a finite number`};if(a.value<0)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot be negative`};if(a.value>1e7)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot exceed 10,000,000`};a.value>1e6&&e.push(`Attack modifier ${s+1}: value is unusually high (${a.value})`)}const n=t.map(s=>{var a;return(a=s.target_type)==null?void 0:a.toLowerCase()}).filter(Boolean);return new Set(n).size!==n.length?{isValid:!1,error:"Attack modifiers cannot have duplicate target types"}:{isValid:!0,warnings:e.length>0?e:void 0}}static validateUserEnemyUnit(t){const e=y.validateUnit(t),n=[...e.errors],i=[...e.warnings||[]];return(!t.id||typeof t.id!="string"||t.id.trim()==="")&&n.push("User enemy unit must have a valid ID"),(!t.createdAt||!(t.createdAt instanceof Date))&&n.push("User enemy unit must have a valid creation date"),(!t.modifiedAt||!(t.modifiedAt instanceof Date))&&n.push("User enemy unit must have a valid modification date"),t.createdAt&&t.modifiedAt&&t.createdAt instanceof Date&&t.modifiedAt instanceof Date&&t.modifiedAt<t.createdAt&&n.push("Modification date cannot be before creation date"),{isValid:n.length===0,errors:n,warnings:i.length>0?i:void 0}}static validateForImport(t){const e=[],n=[];if(!t||typeof t!="object")return{isValid:!1,errors:["Data must be an object"]};const i=y.validateName(t.name);i.isValid||e.push(i.error);const s=y.validateUnitTypes(t.unit_types);s.isValid?s.warnings&&n.push(...s.warnings):e.push(s.error);const a=y.validateHealth(t.health);a.isValid?a.warnings&&n.push(...a.warnings):e.push(a.error);const r=y.validateStrength(t.strength);r.isValid?r.warnings&&n.push(...r.warnings):e.push(r.error);const o=y.validateAttackModifiers(t.attack_modifiers);return o.isValid?o.warnings&&n.push(...o.warnings):e.push(o.error),{isValid:e.length===0,errors:e,warnings:n.length>0?n:void 0}}static validateMultipleUnits(t){if(!Array.isArray(t))return{isValid:!1,results:[],summary:{total:0,valid:0,invalid:0,warnings:0}};const e=t.map((i,s)=>({index:s,validation:y.validateForImport(i)})),n={total:t.length,valid:e.filter(i=>i.validation.isValid).length,invalid:e.filter(i=>!i.validation.isValid).length,warnings:e.filter(i=>i.validation.warnings&&i.validation.warnings.length>0).length};return{isValid:n.invalid===0,results:e,summary:n}}static sanitizeEnemyUnit(t){const e={name:typeof t.name=="string"?t.name.trim():"Unknown Enemy",unit_types:Array.isArray(t.unit_types)?t.unit_types.filter(n=>typeof n=="string"&&n.trim()!==""):["Epic Monster"],health:typeof t.health=="number"&&t.health>0?Math.min(t.health,5e7):1e4,strength:typeof t.strength=="number"&&t.strength>=0?Math.min(t.strength,25e6):5e3,attack_modifiers:Array.isArray(t.attack_modifiers)?t.attack_modifiers.filter(n=>n&&typeof n=="object"&&typeof n.target_type=="string"&&typeof n.value=="number"&&n.value>=0).map(n=>({target_type:n.target_type,modifier_type:"Strength",value:Math.min(n.value,1e7)})):[]};return e.name.length===0&&(e.name="Unknown Enemy"),e.unit_types.length===0&&(e.unit_types=["Epic Monster"]),e}static validateBattleConfiguration(t){const e=[],n=[];return t.playerArmy?(!t.playerArmy.stackingOrder||t.playerArmy.stackingOrder.length===0)&&e.push("Player army must have at least one unit group"):e.push("Player army is required"),t.enemyGroupCount!==void 0&&t.enemyGroupCount<1&&e.push("Enemy group count must be at least 1"),t.enemyUnits!==void 0&&(!Array.isArray(t.enemyUnits)||t.enemyUnits.length===0)&&e.push("At least one enemy unit is required"),t.enemyGroupCount===void 0&&t.enemyUnits===void 0?e.push("Either enemy group count or enemy units must be specified"):t.enemyUnits!==void 0&&t.enemyUnits.length===0&&e.push("Enemy units array is empty - check that enemy army has valid units selected"),{isValid:e.length===0,errors:e,warnings:n.length>0?n:void 0}}}const it=["Human","Beast","Undead","Demon","Elemental","Construct","Melee","Ranged","Magic","Siege","Mounted","Flying","Aquatic","Guardsman","Monster","Mercenary","Specialist","Elite","Heavy","Light","Epic Monster","Giant","Dragon","Fortification"],st=["Strength"],at=["Melee","Ranged","Flying","Mounted","Beast","Human","Siege","Dragon","Elemental","Giant","Fortification","Undead","Demon"];class U{}u(U,"validateEnemyUnit",y.validateUnit),u(U,"validateUserEnemyUnit",y.validateUserEnemyUnit),u(U,"validateName",y.validateName),u(U,"validateUnitTypes",y.validateUnitTypes),u(U,"validateHealth",y.validateHealth),u(U,"validateStrength",y.validateStrength),u(U,"validateAttackModifiers",y.validateAttackModifiers),u(U,"validateForImport",y.validateForImport),u(U,"validateMultipleUnits",y.validateMultipleUnits),u(U,"sanitizeEnemyUnit",y.sanitizeEnemyUnit);const j="/army-calculator-site/",W={FINAL_UNITS:`${j}final_units.json`,ENEMY_UNITS:`${j}enemy_units.json`};class K{constructor(){u(this,"units",[]);u(this,"unitsByName",new Map);u(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadPresetUnits(){return this.loadUnits(W.FINAL_UNITS)}async loadUnits(t){try{let e;if(typeof t=="string"){console.log(`Loading units from: ${t}`);const n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);e=await n.json()}else e=t;if(!Array.isArray(e))throw new Error("Unit data must be an array");return this.units=e.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(e){throw console.error("❌ Error loading units:",e),e}}validateAndNormalizeUnit(t){const e={name:t.name||"Unknown",unit_types:Array.isArray(t.unit_types)?t.unit_types:[],cost_type:t.cost_type||"Leadership",health:Number(t.health)||0,strength:Number(t.strength)||0,leadership_cost:Number(t.leadership_cost)||0,dominance_cost:Number(t.dominance_cost)||0,authority_cost:Number(t.authority_cost)||0,food_consumption:Number(t.food_consumption)||0,carrying_capacity:Number(t.carrying_capacity)||0,revival_cost_gold:Number(t.revival_cost_gold)||0,revival_cost_silver:Number(t.revival_cost_silver)||0,source_file:t.source_file||"",attack_modifiers:Array.isArray(t.attack_modifiers)?t.attack_modifiers:void 0};return["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)||(console.warn(`Invalid cost type for unit ${e.name}: ${e.cost_type}`),e.cost_type="Leadership"),e}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(t=>[t.name,t])),this.units.forEach(t=>{y.isMercenary(t)?this.unitsByCostType.Mercenary.push(t):t.cost_type in this.unitsByCostType&&this.unitsByCostType[t.cost_type].push(t)}),Object.keys(this.unitsByCostType).forEach(t=>{this.unitsByCostType[t].sort((e,n)=>e.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(t){return this.unitsByName.get(t)}getUnitsByCostType(t){return[...this.unitsByCostType[t]]}getAvailableUnits(t){const e=[];for(const n of t){const i=this.getUnitByName(n);i?e.push(i):console.warn(`Unit '${n}' not found in loaded data`)}return e}filterUnits(t){let e=this.units;return t.costType&&(e=e.filter(n=>n.cost_type===t.costType)),t.unitTypes&&t.unitTypes.length>0&&(e=e.filter(n=>t.unitTypes.some(i=>n.unit_types.includes(i)))),t.minStrength!==void 0&&(e=e.filter(n=>n.strength>=t.minStrength)),t.maxCost!==void 0&&(e=e.filter(n=>y.getPrimaryCost(n)<=t.maxCost)),e}searchUnits(t){if(!t.trim())return this.getAllUnits();const e=t.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(e))}getEnhancedUnits(){return this.units.map(t=>({...t,get isMercenary(){return y.isMercenary(t)},get primaryCost(){return y.getPrimaryCost(t)},get strengthPerCost(){return y.getStrengthPerCost(t)},get healthPerCost(){return y.getHealthPerCost(t)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...t),max:Math.max(...t)},healthRange:{min:Math.min(...e),max:Math.max(...e)}}}getUniqueUnitTypes(){const t=new Set;return this.units.forEach(e=>{e.unit_types.forEach(n=>t.add(n))}),Array.from(t).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,i)=>n+i,0)/t.length)},healthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,i)=>n+i,0)/e.length)},topUnitsByStrength:[...this.units].sort((n,i)=>i.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,i)=>i.health-n.health).slice(0,10)}}}class O{constructor(t){u(this,"availableUnits");u(this,"unitsByName");u(this,"leadershipUnits");u(this,"dominanceUnits");u(this,"mercenaryUnits");this.availableUnits=[...t],this.unitsByName=new Map(t.map(e=>[e.name,e])),this.leadershipUnits=t.filter(e=>e.cost_type==="Leadership").sort((e,n)=>e.strength-n.strength),this.dominanceUnits=t.filter(e=>e.cost_type==="Dominance").sort((e,n)=>e.strength-n.strength),this.mercenaryUnits=t.filter(e=>y.isMercenary(e)).sort((e,n)=>e.strength-n.strength)}async optimizeArmy(t){const e=performance.now();console.log(`🔍 Optimizing army with L:${t.leadershipBudget} D:${t.dominanceBudget} M:${Object.keys(t.mercenaryLimits).length}`),console.log(`📋 Selected units: ${t.availableUnits.join(", ")}`);const n=[],i=this.generateGuaranteedValidCompositions(t);console.log(`Generated ${i.length} guaranteed valid army combinations`);let s=0;for(const d of i){s++;const h=this.evaluateComposition(d);n.push(h)}const a=performance.now();console.log(`Evaluated ${s} combinations, found ${n.length} valid stackings`);const r=this.availableUnits.filter(d=>t.availableUnits.includes(d.name)&&d.cost_type==="Leadership"),o=this.availableUnits.filter(d=>t.availableUnits.includes(d.name)&&d.cost_type==="Dominance"),l=this.availableUnits.filter(d=>t.availableUnits.includes(d.name)&&y.isMercenary(d)),c=n.filter(d=>{const h=r.some(f=>d.units[f.name]&&d.units[f.name]>0),p=o.some(f=>d.units[f.name]&&d.units[f.name]>0),g=l.some(f=>d.units[f.name]&&d.units[f.name]>0);return[r.length>0?h:!0,o.length>0?p:!0,l.length>0?g:!0].every(f=>f)});return c.sort((d,h)=>{const p=d.totalLeadershipCost/t.leadershipBudget+d.totalDominanceCost/t.dominanceBudget;return h.totalLeadershipCost/t.leadershipBudget+h.totalDominanceCost/t.dominanceBudget-p}),{compositions:c.length>0?[c[0]]:n.slice(0,1),totalCombinationsEvaluated:s,validStackingsFound:n.length,executionTimeMs:a-e}}generateGuaranteedValidCompositions(t){const e=[],n=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,r)=>r.strength-a.strength),i=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,r)=>r.strength-a.strength),s=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&y.isMercenary(a));if(console.log(`Selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log("Leadership units:",n.map(a=>a.name)),console.log("Dominance units:",i.map(a=>a.name)),console.log("Mercenary units:",s.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log(`Budgets: Leadership:${t.leadershipBudget} Dominance:${t.dominanceBudget}`),n.length>0&&i.length>0&&s.length>0&&t.leadershipBudget>0&&t.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...n,...s];e.push(...this.generateCombinedStackedCompositions(a,i,t.leadershipBudget,t.dominanceBudget,t.mercenaryLimits))}else if(n.length>0&&s.length>0&&i.length===0&&t.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...n,...s],r=this.calculateProperStackingQuantities(a,t.leadershipBudget,t.mercenaryLimits);e.push(r)}else if(i.length>0&&s.length>0&&n.length===0&&t.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,t.dominanceBudget),r={};for(const l of s)r[l.name]=t.mercenaryLimits[l.name]||1;const o={...a,...r};e.push(o)}else if(n.length>0&&i.length>0&&s.length===0&&t.leadershipBudget>0&&t.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),e.push(...this.generateCombinedStackedCompositions(n,i,t.leadershipBudget,t.dominanceBudget,{}));else if(n.length>0&&i.length===0&&s.length===0&&t.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(n,t.leadershipBudget,{});e.push(a)}else if(i.length>0&&n.length===0&&s.length===0&&t.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,t.dominanceBudget);e.push(a)}else if(s.length>0&&n.length===0&&i.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const r of s){const o=t.mercenaryLimits[r.name]||1;a[r.name]=o}Object.keys(a).length>0&&e.push(a)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&s.length>0&&t.leadershipBudget>0&&e.push(...this.generateMercenaryMixedCompositions(n,s,t.leadershipBudget,t.mercenaryLimits,"leadership_cost")),i.length>0&&s.length>0&&t.dominanceBudget>0&&e.push(...this.generateMercenaryMixedCompositions(i,s,t.dominanceBudget,t.mercenaryLimits,"dominance_cost")),e}generateStackedCompositionsWithMercenaries(t,e,n,i){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const s=[...t,...e];console.log(`🚨 About to call calculateProperStackingQuantities with ${s.length} units`);const a=this.calculateProperStackingQuantities(s,n,i);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(t,e){const n={};if(t.length===0)return n;const i=t[0];n[i.name]=1,console.log(`🎯 Starting with 1x ${i.name} (STR: ${i.strength})`);for(let s=1;s<t.length;s++){const a=t[s],r=t[s-1],o=r.health*(n[r.name]||1),l=Math.ceil((o+1)/a.health);n[a.name]=l,console.log(`📋 ${a.name}: need ${l} units (${l*a.health} HP) to exceed ${r.name} (${o} HP)`)}return n}calculateProperStackingQuantities(t,e,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${e}`);const i={},s=[...t].sort((d,h)=>h.strength-d.strength),a=s.filter(d=>d.cost_type==="Leadership"),r=s.filter(d=>y.isMercenary(d));if(s.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),i;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${s.length} units (${a.length} leadership + ${r.length} mercenary)`);const o=s[0],l={};l[o.name]=1;const c=o.health*1;console.log(`🔧 Base: 1x ${o.name} = ${c} HP (strongest)`);for(let d=1;d<s.length;d++){const h=s[d],p=Math.ceil((c+1)/h.health);l[h.name]=p;const g=y.isMercenary(h)?"mercenary":"leadership";console.log(`🔧 Base: ${p}x ${h.name} = ${p*h.health} HP (beats ${c}) [${g}]`)}console.log("🔧 Validating base pattern stacking order...");for(let d=0;d<s.length-1;d++){const h=s[d],p=s[d+1],g=h.health*l[h.name];let v=p.health*l[p.name];if(v<=g)if(y.isMercenary(p))console.log(`🔧 WARNING: ${p.name} mercenary limit (${l[p.name]}) gives ${v} HP, can't beat ${g} HP`);else{const f=Math.ceil((g+1)/p.health);l[p.name]=f,v=p.health*f,console.log(`🔧 Fixed: ${p.name} increased to ${f} units = ${v} HP (now beats ${g})`)}else console.log(`🔧 OK: ${p.name} ${l[p.name]} units = ${v} HP (beats ${g})`)}let m=0;for(const[d,h]of Object.entries(l)){const p=this.unitsByName.get(d);p&&p.cost_type==="Leadership"&&(m+=h*(p.leadership_cost??0))}if(console.log(`🔧 Base pattern leadership cost: ${m}`),m===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[d,h]of Object.entries(l))i[d]=h}else{const d=Math.floor(e/m);console.log(`🔧 Can afford ${d} base stacks (${e} / ${m})`);for(const[h,p]of Object.entries(l)){const g=this.unitsByName.get(h);if(g&&y.isMercenary(g)){const v=p*d,f=n[h]||1;i[h]=Math.min(v,f),v>f?console.log(`🔧 Mercenary ${h}: wanted ${v}, capped at limit ${f}`):console.log(`🔧 Mercenary ${h}: scaled to ${v} (under limit ${f})`)}else i[h]=p*d}}return console.log("🔧 SIMPLE STACKING: Final composition:",i),i}calculateProperStackingQuantitiesForDominance(t,e){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${e}`);const n={},i=[...t].sort((c,m)=>m.strength-c.strength);if(i.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${i.length} dominance units`);const s=i[0],a={};a[s.name]=1;const r=s.health*1;console.log(`🔧 Base: 1x ${s.name} = ${r} HP (strongest)`);for(let c=1;c<i.length;c++){const m=i[c],d=Math.ceil((r+1)/m.health);a[m.name]=d,console.log(`🔧 Base: ${d}x ${m.name} = ${d*m.health} HP (beats ${r})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let c=0;c<i.length-1;c++){const m=i[c],d=i[c+1],h=m.health*a[m.name];let p=d.health*a[d.name];if(p<=h){const g=Math.ceil((h+1)/d.health);a[d.name]=g,p=d.health*g,console.log(`🔧 Fixed: ${d.name} increased to ${g} units = ${p} HP (now beats ${h})`)}else console.log(`🔧 OK: ${d.name} ${a[d.name]} units = ${p} HP (beats ${h})`)}let o=0;for(const[c,m]of Object.entries(a)){const d=this.unitsByName.get(c);d&&d.cost_type==="Dominance"&&(o+=m*d.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${o}`),o===0)return console.log("🔧 No dominance costs found"),n;const l=Math.floor(e/o);console.log(`🔧 Can afford ${l} base stacks (${e} / ${o})`);for(const[c,m]of Object.entries(a))n[c]=m*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(t){return Object.entries(t).reduce((e,[n,i])=>{const s=this.unitsByName.get(n);return s&&s.cost_type==="Leadership"?e+i*s.leadership_cost:e},0)}calculateMaxStacksByMercenaries(t,e){let n=1/0;for(const[i,s]of Object.entries(t)){const a=this.unitsByName.get(i);if(a&&y.isMercenary(a)){const r=e[i]||1,o=Math.floor(r/s);n=Math.min(n,o),console.log(`🗡️ ${i}: limit ${r}, base need ${s}, allows ${o} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(t,e,n,i){const s=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...t,...e].sort((d,h)=>h.strength-d.strength);if(a.length===0)return s;const r=this.calculateCleanStackingPattern(a,i);console.log("📊 Dominance + Mercenary base pattern:",r);const o=Object.entries(r).reduce((d,[h,p])=>{const g=this.unitsByName.get(h);return g&&g.cost_type==="Dominance"?d+p*g.dominance_cost:d},0);if(console.log(`💰 Dominance cost per stack: ${o}`),o>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const d={};for(const h of e)d[h.name]=i[h.name]||1;return s.push(d),t.length>0&&s.push(...this.generateStackedCompositions(t,n,"dominance_cost")),s}const l=Math.floor(n/o),c=this.calculateMaxStacksByMercenaries(r,i),m=Math.min(l,c);console.log(`🔢 Max Dominance+Mercenary stacks: ${m}`);for(let d=1;d<=Math.min(m,5);d++){const h={};for(const[p,g]of Object.entries(r)){const v=this.unitsByName.get(p);v&&y.isMercenary(v)?h[p]=Math.min(g*d,i[p]||1):h[p]=g*d}s.push(h)}if(c<l&&t.length>0){const d=n-m*o,h=this.generateStackedCompositions(t,d,"dominance_cost"),p={};for(const g of e)p[g.name]=i[g.name]||1;for(const g of h.slice(0,3)){const v={...p,...g};s.push(v)}}return s}generateStackedCompositions(t,e,n){const i=[];if(t.length===0||e<=0)return i;const s=t[0];console.log(`🎯 Strongest unit: ${s.name} (STR: ${s.strength})`);const a=this.calculateStackingPattern(t);console.log("📊 Base stacking pattern:",a);const r=Object.entries(a).reduce((l,[c,m])=>{const d=this.unitsByName.get(c);if(d){const h=d[n];return l+m*h}return l},0);if(console.log(`💰 Base pattern cost: ${r}`),r<=0)return i;const o=Math.floor(e/r);console.log(`🔢 Max multiplier: ${o}`);for(let l=1;l<=Math.min(o,10);l++){const c={};for(const[m,d]of Object.entries(a))c[m]=d*l;i.push(c)}return t.length>1&&i.push(...this.generateStackingVariations(t,e,n)),i}calculateStackingPattern(t){const e={};if(t.length===0)return e;const n=t[0];e[n.name]=1;for(let i=1;i<t.length;i++){const s=t[i],a=t[i-1],r=a.health*(e[a.name]||1),o=Math.ceil((r+1)/s.health);e[s.name]=o,console.log(`📋 ${s.name}: need ${o} units (${o*s.health} HP) to exceed ${a.name} (${r} HP)`)}return e}generateCombinedStackedCompositions(t,e,n,i,s={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const r=t.filter(k=>k.cost_type==="Leadership"),o=t.filter(k=>y.isMercenary(k));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...r,...o],m=[this.calculateProperStackingQuantities(l,n,s)];if(m.length===0)return a;const d=m[m.length-1];if(!d)return a;console.log("🎯 Using maximum Leadership composition for combination");const h=d,p=e[0];console.log(`🎯 Strongest Dominance unit: ${p.name} (STR: ${p.strength})`);const g=this.findClosestStrengthUnit(p,t);if(!g)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${g.name} (STR: ${g.strength})`);const v=h[g.name]||0,f=g.health*v;if(console.log(`📊 Comparison unit total health: ${f} (${v}x ${g.health})`),f<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const S=p.health;S>=f&&(console.log(`⚠️ Single Dominance unit too strong: ${S} HP >= ${f} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const C=[this.calculateProperStackingQuantitiesForDominance(e,i)];if(C.length>0){const k=C[C.length-1],M={...h,...k};a.push(M),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(h);return a}findClosestStrengthUnit(t,e){if(e.length===0)return null;let n=e[0],i=Math.abs(t.strength-n.strength);for(const s of e){const a=Math.abs(t.strength-s.strength);a<i&&(i=a,n=s)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${t.name} (STR: ${t.strength}), diff: ${i}`),n}calculateConstrainedDominanceStack(t,e,n){const i={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),t.length===0||e<=0||n<=0)return i;const s=t[0],a=Math.floor((n-1)/s.health),r=Math.floor(e/s.dominance_cost),o=Math.min(a,r);if(o<=0)return console.log(`❌ Cannot fit any ${s.name} within constraints`),i;for(let l=Math.min(o,3);l>=1;l--){const c={};c[s.name]=l;let m=l*s.dominance_cost,d=l*s.health;console.log(`🧪 Testing ${l}x ${s.name} (${d} HP, ${m} cost)`);for(let p=1;p<t.length&&m<e;p++){const g=t[p],v=e-m,f=Math.ceil((d+1)/g.health),S=Math.floor(v/g.dominance_cost),E=Math.min(f,S);E>0&&(c[g.name]=E,m+=E*g.dominance_cost,console.log(`  ➕ Added ${E}x ${g.name} (${E*g.health} HP)`))}const h=Object.entries(c).reduce((p,[g,v])=>{const f=this.unitsByName.get(g);return f?p+v*f.health:p},0);if(h<n)return console.log(`✅ Valid Dominance stack: ${h} HP < ${n} HP limit`),c;console.log(`❌ Dominance stack too strong: ${h} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),i}generateMercenaryMixedCompositions(t,e,n,i,s){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const r=this.generateStackedCompositions(t,n,s);if(r.length===0)return a;for(const o of r.slice(0,3)){const l=e.sort((f,S)=>S.strength-f.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const c=this.findClosestStrengthUnit(l,t);if(!c){console.log("❌ No suitable base unit found for comparison");continue}const m=o[c.name]||0,d=c.health*m;if(console.log(`📊 Comparison base unit total health: ${d}`),d<=0){console.log("❌ Comparison unit not in base composition");continue}const h=l.health,p=i[l.name]||1,g=h*p;if(g>=d){console.log(`⚠️ Mercenary too strong: ${g} HP >= ${d} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const f=Math.floor((d-1)/h);if(f>0){console.log(`✅ Using ${f}x ${l.name} instead of ${p}`);const S={...o};S[l.name]=f;for(const E of e)if(E.name!==l.name){const C=i[E.name]||1;S[E.name]=C}a.push(S),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(o);continue}const v={...o};for(const f of e){const S=i[f.name]||1;v[f.name]=S}a.push(v),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(t,e,n){const i={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const s=[...t].sort((o,l)=>o.health-l.health);let a=0,r=0;for(const o of s){const l=Math.floor((n-r-1)/o.health),c=Math.floor((e-a)/o.dominance_cost),m=Math.min(l,c);m>0&&(i[o.name]=m,a+=m*o.dominance_cost,r+=m*o.health,console.log(`➕ Added ${m}x ${o.name} (${m*o.health} HP, ${m*o.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${r} HP total, ${a} cost`),i}calculateMaximizedDominanceStack(t,e,n){console.log(`💰 Maximizing Dominance budget: ${e} with health limit: ${n}`);const i=this.createAlternativeDominanceStack(t,e,n);return Object.keys(i).length>0?i:this.calculateConstrainedDominanceStack(t,e,n)}generateStackingVariations(t,e,n){const i=[],s={},a=t[0],r=a[n];if(r>0){const o=Math.floor(e/r);s[a.name]=Math.min(o,5);let l=e-s[a.name]*r;for(let c=1;c<t.length&&l>0;c++){const m=t[c],d=m[n];if(d>0&&d<=l){const h=Math.floor(l/d/(t.length-c));h>0&&(s[m.name]=h,l-=h*d)}}i.push(s)}return i}generateGuaranteedDiverseCompositions_OLD(t){const e=[],n=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),i=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),s=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&y.isMercenary(l)),a={};let r=0,o=0;for(const l of n)r+l.leadership_cost<=t.leadershipBudget&&(a[l.name]=1,r+=l.leadership_cost);for(const l of i)o+l.dominance_cost<=t.dominanceBudget&&(a[l.name]=1,o+=l.dominance_cost);for(const l of s){const c=t.mercenaryLimits[l.name]||1;a[l.name]=Math.min(1,c)}if(Object.keys(a).length>0&&e.push(a),n.length>0&&t.leadershipBudget>0){const l=n.sort((m,d)=>m.leadership_cost-d.leadership_cost)[0],c=Math.floor(t.leadershipBudget/l.leadership_cost);if(c>0){const m={};m[l.name]=Math.min(c,20);const d=t.leadershipBudget-m[l.name]*l.leadership_cost;for(const h of n.slice(1,3)){const p=Math.floor(d/h.leadership_cost/2);p>0&&(m[h.name]=p)}e.push(m)}}if(n.length>0||i.length>0){const l={};if(n.length>0&&t.leadershipBudget>0){const c=Math.floor(t.leadershipBudget/n.length);for(const m of n){const d=Math.floor(c/m.leadership_cost);d>0&&(l[m.name]=d)}}if(i.length>0&&t.dominanceBudget>0){const c=Math.floor(t.dominanceBudget/i.length);for(const m of i){const d=Math.floor(c/m.dominance_cost);d>0&&(l[m.name]=d)}}for(const c of s){const m=t.mercenaryLimits[c.name]||1;l[c.name]=Math.max(1,Math.floor(m/2))}Object.keys(l).length>0&&e.push(l)}return e}generateMercenaryCombinations(t){if(Object.keys(t).length===0)return[{}];let e=[{}];for(const[n,i]of Object.entries(t)){if(!this.unitsByName.has(n))continue;const s=[];for(const a of e)for(let r=0;r<=i;r++){const o={...a};r>0&&(o[n]=r),s.push(o)}e=s}return e}evaluateComposition(t){let e=0,n=0,i=0,s=0,a=0;const r=[];for(const[v,f]of Object.entries(t)){const S=this.unitsByName.get(v);if(!S)continue;const E=S.health*f,C=S.strength*f;e+=C,n+=E,i+=S.leadership_cost*f,s+=S.dominance_cost*f,y.isMercenary(S)&&(a+=f),r.push({unit:S,count:f,totalHealth:E,unitStrength:S.strength})}r.sort((v,f)=>v.unit.strength-f.unit.strength);let o=!0;const l=[];for(let v=0;v<r.length;v++){const{unit:f,count:S,totalHealth:E}=r[v];l.push({count:S,totalHealth:E,unit:f});for(let C=v+1;C<r.length;C++){const k=r[C].unit,M=r[C].totalHealth;if(f.strength===k.strength){const F=Math.max(E,M)*.1;if(Math.abs(E-M)<=F)continue}E<=M&&console.log(`❌ Stacking violation: ${f.name} (STR:${f.strength}, ${E} HP) <= ${k.name} (STR:${k.strength}, ${M} HP)`)}}const c=i+s+a;let m=c>0?e/c:0;m*=1.2;const h=1+(Object.keys(t).length-1)*.05;m*=h;let p=0;i>0&&p++,s>0&&p++,a>0&&p++;const g=1+(p-1)*.1;return m*=g,{units:t,totalStrength:e,totalHealth:n,totalLeadershipCost:i,totalDominanceCost:s,totalMercenaryCount:a,stackingOrder:l,isValidStacking:o,efficiencyScore:m}}explainStacking(t){const e=[],n=[],i=[],s=[];return t.stackingOrder.forEach(a=>{const r=a.unit;if(!r)return;const o={name:a.unit.name,count:a.count,totalHealth:a.totalHealth,strength:r.strength};y.isMercenary(r)?s.push(o):r.cost_type==="Leadership"?n.push(o):r.cost_type==="Dominance"&&i.push(o)}),e.push("🏆 OPTIMIZED ARMY COMPOSITION"),e.push("═".repeat(60)),e.push(""),e.push("📊 ARMY SUMMARY"),e.push("─".repeat(30)),e.push(`Total Units: ${Object.values(t.units).reduce((a,r)=>a+r,0).toLocaleString()}`),e.push(`Total Strength: ${t.totalStrength.toLocaleString()}`),e.push(`Total Health: ${t.totalHealth.toLocaleString()}`),e.push(`Budget Usage: L:${t.totalLeadershipCost} D:${t.totalDominanceCost} M:${t.totalMercenaryCount}`),e.push(""),s.length>0&&(e.push("🗡️ MERCENARY FORCES"),e.push("─".repeat(30)),s.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),n.length>0&&(e.push("👑 LEADERSHIP FORCES"),e.push("─".repeat(30)),n.sort((a,r)=>r.strength-a.strength),n.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),i.length>0&&(e.push("⚡ DOMINANCE FORCES"),e.push("─".repeat(30)),i.sort((a,r)=>r.strength-a.strength),i.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),e.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),e.push("─".repeat(40)),t.stackingOrder.forEach((a,r)=>{const o=a.unit;if(!o)return;const l=y.isMercenary(o)?"🗡️":o.cost_type==="Leadership"?"👑":o.cost_type==="Dominance"?"⚡":"❓";e.push(`${r+1}. ${l} ${a.count.toLocaleString()}x ${a.unit.name} (${a.totalHealth.toLocaleString()} HP)`)}),e.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}const $={MAX_BATTLE_TURNS:5e4,MAX_ACTIONS_PER_TURN:1e3,GENERIC_ENEMY_DAMAGE:999999999};class rt{constructor(t=!0){u(this,"logs",[]);u(this,"startTime",0);u(this,"detailedLogging",!0);this.detailedLogging=t,this.startTime=Date.now()}logPlayerAction(t,e,n,i,s,a){const o=`${this.getEnemyCount(e)}x ${this.getEnemyDisplayName(e)}`,l={turn:i,attacker:`${t.count}x ${t.unit.name}`,target:o,action:`attack ${o} for ${n.damageDealt} damage${n.bonusDamageDealt?` including ${n.bonusDamageDealt} bonus damage vs ${n.modifierName}`:""}${n.targetEliminated?" (ELIMINATED)":""}`,damageDealt:n.damageDealt,eliminated:n.targetEliminated,attackerSide:"player",timestamp:Date.now()-this.startTime};return this.detailedLogging&&(l.turnSummary=this.generateTurnSummary(i,s),l.actionDetails=this.generatePlayerActionDetails(t,e,n),a&&(l.stateSnapshot=this.createStateSnapshot(a))),this.logs.push(l),l}logEnemyAction(t,e,n,i,s,a){const o=`${this.getEnemyCount(t)}x ${this.getEnemyDisplayName(t)}`,l=`${e.count}x ${e.unit.name}`,c={turn:i,attacker:o,target:l,action:`attack ${l} for ${n.damageDealt} damage${n.bonusDamageDealt?` including ${n.bonusDamageDealt} bonus damage vs ${n.modifierName}`:""}${n.targetEliminated?" (ELIMINATED)":""}`,damageDealt:n.damageDealt,eliminated:n.targetEliminated,attackerSide:"enemy",timestamp:Date.now()-this.startTime};return this.detailedLogging&&(c.turnSummary=this.generateTurnSummary(i,s),c.actionDetails=this.generateEnemyActionDetails(t,e,n),a&&(c.stateSnapshot=this.createStateSnapshot(a))),this.logs.push(c),c}logTurnTransition(t,e,n){if(!this.detailedLogging)return;const i={turn:e,actionIndex:0,attackerName:"SYSTEM",attackerCount:0,targetName:"TURN_TRANSITION",targetType:"system",damageDealt:0,targetEliminated:!1,attackerSide:"system",timestamp:Date.now()-this.startTime,turnSummary:`Turn ${t} completed, advancing to Turn ${e}`,actionDetails:`Battle continues with ${this.countAlivePlayerGroups(n)} player groups vs ${this.countAttackableEnemies(n)} enemies`,stateSnapshot:this.createStateSnapshot(n)};this.logs.push(i)}logBattleStart(t,e,n){const i={turn:1,actionIndex:0,attackerName:"SYSTEM",attackerCount:0,targetName:"BATTLE_START",targetType:"system",damageDealt:0,targetEliminated:!1,attackerSide:"system",timestamp:0,turnSummary:"Battle begins",actionDetails:`${t.length} player groups vs ${e.length} enemies, ${n?"Player":"Enemy"} goes first`,stateSnapshot:{alivePlayerGroups:t.length,attackableEnemies:e.length,totalPlayerHealth:t.reduce((s,a)=>s+a.totalHealth,0)}};this.logs.push(i)}logBattleEnd(t,e,n="Battle completed"){const i={turn:e.currentTurn,actionIndex:e.currentAction,attackerName:"SYSTEM",attackerCount:0,targetName:"BATTLE_END",targetType:"system",damageDealt:e.totalDamageDealt,targetEliminated:!1,attackerSide:"system",timestamp:Date.now()-this.startTime,turnSummary:`Battle ended: ${t}`,actionDetails:`${n}. Total damage dealt: ${e.totalDamageDealt}`,stateSnapshot:this.createStateSnapshot(e)};this.logs.push(i)}getBattleLogs(){return[...this.logs]}getLogsForTurn(t){return this.logs.filter(e=>e.turn===t)}getLogsBySide(t){return this.logs.filter(e=>e.attackerSide===t)}generateBattleSummary(){const t=this.logs.filter(r=>r.attackerSide==="player"),e=this.logs.filter(r=>r.attackerSide==="enemy"),n=this.logs.filter(r=>r.targetEliminated),i=this.logs[this.logs.length-1],s=i?i.turn:0,a=this.logs.filter(r=>r.attackerSide!=="system").reduce((r,o)=>r+o.damageDealt,0);return{totalTurns:s,totalActions:t.length+e.length,totalDamageDealt:a,playerActionsCount:t.length,enemyActionsCount:e.length,eliminationsCount:n.length,battleDuration:s,outcome:this.determineBattleOutcome()}}exportLogs(t="json"){switch(t){case"json":return JSON.stringify(this.logs,null,2);case"csv":return this.exportToCSV();case"text":return this.exportToText();default:return JSON.stringify(this.logs,null,2)}}clearLogs(){this.logs=[],this.startTime=Date.now()}setDetailedLogging(t){this.detailedLogging=t}searchLogs(t){return this.logs.filter(e=>!(t.attacker&&!e.attackerName.toLowerCase().includes(t.attacker.toLowerCase())||t.target&&!e.targetName.toLowerCase().includes(t.target.toLowerCase())||t.minDamage&&e.damageDealt<t.minDamage||t.turnRange&&(e.turn<t.turnRange[0]||e.turn>t.turnRange[1])||t.eliminationOnly&&!e.targetEliminated))}getEnemyDisplayName(t){var e,n;switch(t.type){case"generic":return t.name||"Generic Enemy";case"infinite":return((e=t.unit)==null?void 0:e.name)||"Infinite Enemy";case"mortal":return((n=t.unit)==null?void 0:n.name)||"Mortal Enemy";default:return"Unknown Enemy"}}getEnemyCount(t){switch(t.type){case"generic":return 1;case"infinite":return 999999;case"mortal":return t.currentCount;default:return 0}}generateTurnSummary(t,e){return`Turn ${t}, Action ${e}`}generatePlayerActionDetails(t,e,n){const i=this.getEnemyDisplayName(e);let s=`${t.count}x ${t.unitName} attacks ${i}`;return s+=` for ${n.damageDealt} damage`,n.targetEliminated&&(s+=" (ELIMINATED)"),s}generateEnemyActionDetails(t,e,n){let s=`${this.getEnemyDisplayName(t)}`;return t.type==="mortal"&&(s+=` (${t.currentCount} units)`),s+=` attacks ${e.count}x ${e.unitName}`,s+=` for ${n.damageDealt} damage`,n.targetEliminated&&(s+=" (ELIMINATED)"),s}createStateSnapshot(t){return{alivePlayerGroups:this.countAlivePlayerGroups(t),attackableEnemies:this.countAttackableEnemies(t),totalPlayerHealth:t.playerGroups.reduce((e,n)=>e+n.totalHealth,0)}}countAlivePlayerGroups(t){return t.playerGroups.filter(e=>e.totalHealth>0).length}countAttackableEnemies(t){return t.enemies.filter(e=>{switch(e.type){case"generic":case"infinite":return!0;case"mortal":return e.currentCount>0;default:return!1}}).length}determineBattleOutcome(){const t=[...this.logs].reverse().find(e=>e.attackerSide==="system"&&e.targetName==="BATTLE_END");return t&&t.turnSummary?t.turnSummary.replace("Battle ended: ",""):"Unknown"}exportToCSV(){const t=["Turn","Action","Attacker Side","Attacker","Target","Damage","Eliminated","Timestamp"],e=this.logs.map(n=>[n.turn,n.actionIndex,n.attackerSide,`${n.attackerCount}x ${n.attackerName}`,n.targetName,n.damageDealt,n.targetEliminated?"Yes":"No",n.timestamp]);return[t,...e].map(n=>n.join(",")).join(`
`)}exportToText(){const t=this.generateBattleSummary();let e=`Battle Summary:
`;e+=`Total Turns: ${t.totalTurns}
`,e+=`Total Actions: ${t.totalActions}
`,e+=`Total Damage: ${t.totalDamageDealt}
`,e+=`Player Actions: ${t.playerActionsCount}
`,e+=`Enemy Actions: ${t.enemyActionsCount}
`,e+=`Eliminations: ${t.eliminationsCount}
`,e+=`Outcome: ${t.outcome}

`,e+=`Detailed Combat Log:
`,e+=`${"=".repeat(50)}
`;for(const n of this.logs)n.attackerSide==="system"?e+=`[SYSTEM] ${n.turnSummary}: ${n.actionDetails}
`:e+=`[Turn ${n.turn}.${n.actionIndex}] ${n.actionDetails}
`;return e}}class ot{constructor(t){u(this,"state");u(this,"battleLogger");this.state=this.initializeBattleState(t),this.battleLogger=new rt}initializeBattleState(t){return{currentTurn:1,currentAction:0,playerGroups:t.playerArmy.stackingOrder.map(e=>({...e})),enemies:t.enemies.map(e=>({...e})),unitsActedThisTurn:{players:new Set,enemies:new Set},combatLog:[],battleEnded:!1,totalDamageDealt:0}}deepCloneState(t){return{...t,unitsActedThisTurn:{players:new Set(t.unitsActedThisTurn.players),enemies:new Set(t.unitsActedThisTurn.enemies)},playerGroups:t.playerGroups.map(e=>({...e})),enemies:t.enemies.map(e=>({...e})),combatLog:[...t.combatLog]}}getBattleState(){return this.deepCloneState(this.state)}applyStateUpdate(t){if(!t||typeof t.currentTurn!="number"||typeof t.currentAction!="number")throw new Error("Invalid state update: missing required fields");this.state=t}getAlivePlayerGroups(){return this.state.playerGroups.filter(t=>t.totalHealth>0)}getAttackableEnemies(){return this.state.enemies.filter(t=>{switch(t.type){case"generic":return!0;case"infinite":return!0;case"mortal":return t.currentCount>0;default:return!1}})}updatePlayerGroup(t,e,n=0){const i=this.state.playerGroups.find(s=>s.unit.name===t);i&&(i.totalHealth=Math.max(0,e),n>0&&(i.count=Math.max(0,i.count-n)))}updateMortalEnemy(t,e){const n=this.state.enemies[t];n&&n.type==="mortal"&&(n.currentCount=Math.max(0,n.currentCount-e))}applyCompleteAttack(t,e){var a,r;const n=this.deepCloneState(t),i={damageDealt:e.damageDealt,bonusDamageDealt:(a=e.damageBreakdown)==null?void 0:a.bonusDamage,modifierName:(r=e.damageBreakdown)!=null&&r.appliedModifiers&&e.damageBreakdown.appliedModifiers.length>0?e.damageBreakdown.appliedModifiers[0].target_type:void 0,targetEliminated:e.targetEliminated,attackerEliminated:!1,combatAction:e.combatAction},s=this.isPlayerGroup(e.attacker)?this.battleLogger.logPlayerAction(e.attacker,e.target,i,t.currentTurn,t.currentAction,t):this.battleLogger.logEnemyAction(e.attacker,e.target,i,t.currentTurn,t.currentAction,t);if(n.combatLog.push(s),n.totalDamageDealt+=e.damageDealt,this.isPlayerGroup(e.attacker))n.unitsActedThisTurn.players.add(e.attacker.unit.name);else{const o=n.enemies.findIndex(l=>l.groupIndex===e.attacker.groupIndex);o>=0&&n.unitsActedThisTurn.enemies.add(o)}if(n.currentAction++,e.targetEliminated){if(this.isPlayerGroup(e.target)){const o=n.playerGroups.find(l=>l.unit.name===e.target.unit.name);o&&(o.totalHealth=0,o.count=0)}else if(e.target.type==="mortal"){const o=n.enemies.findIndex(l=>l.groupIndex===e.target.groupIndex);o>=0&&n.enemies[o].type==="mortal"&&(n.enemies[o].currentCount=0)}}else if(this.isPlayerGroup(e.target)){const o=n.playerGroups.find(l=>l.unit.name===e.target.unit.name);if(o&&e.damageDealt>0){o.totalHealth=Math.max(0,o.totalHealth-e.damageDealt);const l=o.unit.health,c=Math.floor(e.damageDealt/l);o.count=Math.max(0,o.count-c)}}else if(e.target.type==="mortal"){const o=n.enemies.findIndex(l=>l.groupIndex===e.target.groupIndex);if(o>=0&&n.enemies[o].type==="mortal"){const l=n.enemies[o],c=Math.floor(e.damageDealt/l.unit.health);l.currentCount=Math.max(0,l.currentCount-c)}}return n}isPlayerGroup(t){return"unit"in t&&"totalHealth"in t&&!("type"in t)}applyAttackResult(t,e){const n=this.deepCloneState(t);if(n.combatLog.push({...e.combatAction,turn:t.currentTurn}),n.totalDamageDealt+=e.damageDealt,e.targetEliminated)if(e.combatAction.attacker.includes("x ")){const i=n.enemies.findIndex(s=>s.type==="mortal"&&this.getEnemyDisplayName(s)===e.combatAction.target);i>=0&&n.enemies[i].type==="mortal"&&(n.enemies[i].currentCount=0)}else{const i=n.playerGroups.find(s=>s.unit.name===e.combatAction.target);i&&(i.totalHealth=0,i.count=0)}else{const i=n.playerGroups.find(s=>s.unit.name===e.combatAction.target);if(i&&e.damageDealt>0){i.totalHealth=Math.max(0,i.totalHealth-e.damageDealt);const s=i.unit.health,a=Math.floor(e.damageDealt/s);i.count=Math.max(0,i.count-a)}}return n}getEnemyDisplayName(t){switch(t.type){case"generic":return t.name;case"infinite":return t.unit.name;case"mortal":return t.unit.name;default:return"Unknown Enemy"}}addCombatAction(t){this.state.combatLog.push({...t,turn:this.state.currentTurn})}addDamageDealt(t){this.state.totalDamageDealt+=t}checkBattleEndPure(t,e=$.MAX_BATTLE_TURNS){const n=t.playerGroups.filter(c=>c.totalHealth>0),i=t.enemies.filter(c=>{switch(c.type){case"generic":return!0;case"infinite":return!0;case"mortal":return c.currentCount>0;default:return!1}}),s=n.length===0,r=t.enemies.every(c=>c.type==="mortal")&&i.length===0,o=t.currentTurn>=e;return{...t,battleEnded:s||r||o}}checkBattleEnd(){const t=this.getBattleState(),e=this.checkBattleEndPure(t);this.applyStateUpdate(e)}canEnemyAttack(t){switch(t.type){case"generic":return!0;case"infinite":return!0;case"mortal":return t.currentCount>0;default:return!1}}getBattleOutcome(t=$.MAX_BATTLE_TURNS){const e=this.getAlivePlayerGroups(),n=this.getAttackableEnemies();return e.length===0?"player_eliminated":n.length===0&&this.state.enemies.every(i=>i.type==="mortal")?"player_victory":(this.state.currentTurn>=t,"stalemate")}isBattleEnded(){return this.state.battleEnded}getCurrentTurn(){return this.state.currentTurn}getCurrentAction(){return this.state.currentAction}getTotalDamageDealt(){return this.state.totalDamageDealt}getCombatLog(){return[...this.state.combatLog]}endBattle(){this.state.battleEnded=!0}resetBattle(t){this.state=this.initializeBattleState(t)}}class lt{selectNextPlayerAttack(t){const e=t.playerGroups.filter(a=>a.totalHealth>0&&!t.unitsActedThisTurn.players.has(a.unit.name));if(e.length===0)return null;const n=this.getAttackableEnemies(t);if(n.length===0)return null;let i=null,s=0;for(const a of e)for(const r of n){const o=this.calculatePlayerDamageToEnemy(a,r);if(o.finalDamage>s){s=o.finalDamage;let l=!1;if(r.type==="mortal"){const c=r.unit.health*r.currentCount;l=o.finalDamage>=c}i={attacker:a,target:r,damageDealt:o.finalDamage,damageBreakdown:o,targetEliminated:l,combatAction:{}}}}return i}selectNextEnemyAttack(t){const e=t.enemies.filter((a,r)=>this.canEnemyAttack(a)&&!t.unitsActedThisTurn.enemies.has(r));if(e.length===0)return null;const n=t.playerGroups.filter(a=>a.totalHealth>0);if(n.length===0)return null;let i=null,s=0;for(const a of e)for(const r of n){const o=this.calculateEnemyDamageToPlayer(a,r);if(o.finalDamage>s){s=o.finalDamage;const l=o.finalDamage>=r.totalHealth;i={attacker:a,target:r,damageDealt:o.finalDamage,damageBreakdown:o,targetEliminated:l,combatAction:{}}}}return i}getEnemyDisplayName(t){switch(t.type){case"generic":return t.name;case"infinite":return t.unit.name;case"mortal":return`${t.unit.name} (${t.currentCount}/${t.count})`;default:return"Unknown Enemy"}}calculatePlayerDamageToEnemy(t,e){const n=t.count*t.unit.strength;let i=n;const s=this.createDamageBreakdown(n);if((e.type==="infinite"||e.type==="mortal")&&e.unit){const a=this.getBestAttackModifier(t,e.unit);if(a){const o=(t.unit.originalStrength||t.unit.strength)*t.count*(a.value/100);s.bonusDamage=o,s.appliedModifiers=[a],i=n+o}}if(e.type==="mortal"){const a=e.unit.health*e.currentCount;i=Math.min(i,a)}return s.finalDamage=i,s}calculateEnemyDamageToPlayer(t,e){let n,i;if(t.type==="generic")n=$.GENERIC_ENEMY_DAMAGE,i=this.createDamageBreakdown(n);else if(t.type==="infinite"){const s=e.totalHealth;i=this.createDamageBreakdown(s);const a=this.getBestEnemyAttackModifier(t.unit,e);a&&a.value>0?n=this.applyAttackModifiers(s,a,i):n=s}else if(t.type==="mortal"){const s=t.currentCount*t.unit.strength;i=this.createDamageBreakdown(s);const a=this.getBestEnemyAttackModifier(t.unit,e);a&&a.value>0?n=this.applyAttackModifiers(s,a,i):n=s}else n=0,i=this.createDamageBreakdown(0);return i.finalDamage=Math.min(n,e.totalHealth),i}getBestAttackModifier(t,e){if(!t.unit||!t.unit.attack_modifiers||t.unit.attack_modifiers.length===0)return null;let n=null,i=0;for(const s of t.unit.attack_modifiers)e.unit_types&&e.unit_types.includes(s.target_type)&&(i=Math.max(i,s.value),n=s);return n}getBestEnemyAttackModifier(t,e){if(!t||!t.attack_modifiers||t.attack_modifiers.length===0)return null;let n=null,i=0;for(const s of t.attack_modifiers)e.unit.unit_types&&e.unit.unit_types.includes(s.target_type)&&(i=Math.max(i,s.value),n=s);return n}getAttackableEnemies(t){return t.enemies.filter(e=>this.canEnemyAttack(e))}canEnemyAttack(t){switch(t.type){case"generic":return!0;case"infinite":return!0;case"mortal":return t.currentCount>0;default:return!1}}createDamageBreakdown(t){return{baseDamage:t,bonusDamage:0,finalDamage:t,appliedModifiers:[]}}applyAttackModifiers(t,e,n){const i=1+e.value/100,s=Math.floor(t*i);return n.bonusDamage=Math.round(t*(e.value/100)),n.appliedModifiers=[e],s}}class ct{canAttack(t){return!0}calculateDamage(t,e){return $.GENERIC_ENEMY_DAMAGE}processAttack(t,e){const n=this.calculateDamage(t,e),i=!0,s={turn:0,attacker:this.getDisplayName(t),target:e.unit.name,action:`attack and eliminate ${e.unit.name}`,damageDealt:n,eliminated:i};return{damageDealt:n,targetEliminated:i,attackerEliminated:!1,combatAction:s}}isEliminated(t){return!1}getDisplayName(t){return t.name}getStrength(t){return $.GENERIC_ENEMY_DAMAGE}getEnemyType(){return"generic"}getMaxPotentialDamage(t,e){return $.GENERIC_ENEMY_DAMAGE}calculateTotalPotentialDamage(t,e){return $.GENERIC_ENEMY_DAMAGE*e.length}calculateActualDamage(t,e){return{healthLost:e.totalHealth,unitsKilled:e.count}}hasTargetPreference(t){return!1}getTargetPriority(t,e){return 1}canBeCounterAttacked(t){return!1}}class dt{canAttack(t){return!0}calculateDamage(t,e){const n=t.unit.strength,i=this.getBestAttackModifier(t,e);if(i!==0){const s=t.unit.originalStrength||t.unit.strength,a=Math.floor(s*(i/100));return n+a}return n}processAttack(t,e){const i=this.calculateActualDamage(t,e).healthLost,s=i>=e.totalHealth,a={turn:0,attacker:this.getDisplayName(t),target:e.unit.name,action:`attack ${e.unit.name} for ${i} damage${s?" (ELIMINATED)":""}`,damageDealt:i,eliminated:s};return{damageDealt:i,targetEliminated:s,attackerEliminated:!1,combatAction:a}}isEliminated(t){return!1}getDisplayName(t){return t.unit.name}getStrength(t){return t.unit.strength}calculateActualDamage(t,e){const n=this.calculateDamage(t,e),i=Math.min(Math.floor(n/e.unit.health),e.count);return{healthLost:Math.min(n,e.totalHealth),unitsKilled:i}}getBestAttackModifier(t,e){var n;if(!t.unit.attack_modifiers||t.unit.attack_modifiers.length===0)return 0;if((n=e.unit)!=null&&n.unit_types){let i=0;for(const s of t.unit.attack_modifiers)e.unit.unit_types.includes(s.target_type)&&s.modifier_type==="Strength"&&(i=Math.max(i,s.value));return i}return 0}hasTargetPreference(t){return t.unit.attack_modifiers&&t.unit.attack_modifiers.length>0}getTargetPriority(t,e){const i=this.getBestAttackModifier(t,e);return i>0?1+i/100:1}canBeCounterAttacked(t){return!0}getHealth(t){return t.unit.health}getUnitTypes(t){return t.unit.unit_types||[]}getAttackModifiers(t){return t.unit.attack_modifiers||[]}getEnemyType(){return"infinite"}getMaxPotentialDamage(t,e){const n=t.unit.strength;if(!e||e.length===0)return n;let i=n;for(const s of e){const a=this.calculateDamage(t,s);i=Math.max(i,a)}return i}calculateTotalPotentialDamage(t,e){let n=0;for(const i of e)n+=this.calculateDamage(t,i);return n}}class mt{canAttack(t){return t.currentCount>0}calculateDamage(t,e){if(t.currentCount<=0)return 0;const n=t.currentCount*t.unit.strength,i=this.getBestAttackModifier(t,e);if(i!==0){const s=t.unit.originalStrength||t.unit.strength,a=Math.floor(t.currentCount*s*(i/100));return n+a}return n}processAttack(t,e){const i=this.calculateActualDamage(t,e).healthLost,s=i>=e.totalHealth,a={turn:0,attacker:this.getDisplayName(t),target:e.unit.name,action:`attack ${e.unit.name} for ${i} damage${s?" (ELIMINATED)":""}`,damageDealt:i,eliminated:s};return{damageDealt:i,targetEliminated:s,attackerEliminated:!1,combatAction:a}}isEliminated(t){return t.currentCount<=0}getDisplayName(t){return`${t.unit.name} (${t.currentCount}/${t.count})`}getStrength(t){return t.currentCount*t.unit.strength}calculateActualDamage(t,e){const n=this.calculateDamage(t,e),i=Math.min(Math.floor(n/e.unit.health),e.count);return{healthLost:Math.min(n,e.totalHealth),unitsKilled:i}}processDamageTaken(t,e){if(e<=0||t.currentCount<=0)return{unitsKilled:0,remainingCount:t.currentCount,enemyEliminated:this.isEliminated(t)};const n=Math.min(Math.floor(e/t.unit.health),t.currentCount);return t.currentCount=Math.max(0,t.currentCount-n),{unitsKilled:n,remainingCount:t.currentCount,enemyEliminated:this.isEliminated(t)}}getBestAttackModifier(t,e){var n;if(!t.unit.attack_modifiers||t.unit.attack_modifiers.length===0)return 0;if((n=e.unit)!=null&&n.unit_types){let i=0;for(const s of t.unit.attack_modifiers)e.unit.unit_types.includes(s.target_type)&&s.modifier_type==="Strength"&&(i=Math.max(i,s.value));return i}return 0}hasTargetPreference(t){return t.unit.attack_modifiers&&t.unit.attack_modifiers.length>0}getTargetPriority(t,e){const i=this.getBestAttackModifier(t,e);return i>0?1+i/100:1}canBeCounterAttacked(t){return t.currentCount>0}getTotalHealth(t){return t.currentCount*t.unit.health}getUnitHealth(t){return t.unit.health}getUnitTypes(t){return t.unit.unit_types||[]}getAttackModifiers(t){return t.unit.attack_modifiers||[]}getCurrentCount(t){return t.currentCount}getOriginalCount(t){return t.count}getEnemyType(){return"mortal"}getMaxPotentialDamage(t,e){if(t.currentCount<=0)return 0;const n=t.currentCount*t.unit.strength;if(!e||e.length===0)return n;let i=n;for(const s of e){const a=this.calculateDamage(t,s);i=Math.max(i,a)}return i}calculateTotalPotentialDamage(t,e){if(t.currentCount<=0)return 0;let n=0;for(const i of e)n+=this.calculateDamage(t,i);return n}resetToOriginalCount(t){t.currentCount=t.count}}const z=class z{constructor(){u(this,"handlers",new Map);this.initializeHandlers()}static getInstance(){return z.instance||(z.instance=new z),z.instance}initializeHandlers(){this.handlers.set("generic",new ct),this.handlers.set("infinite",new dt),this.handlers.set("mortal",new mt)}getHandler(t){const e=this.handlers.get(t);if(!e)throw new Error(`No handler found for enemy type: ${t}`);return e}getHandlerForEnemy(t){return this.getHandler(t.type)}hasHandler(t){return this.handlers.has(t)}getSupportedEnemyTypes(){return Array.from(this.handlers.keys())}validateHandlers(){const t=["generic","infinite","mortal"],e=[];for(const n of t)this.hasHandler(n)||e.push(n);return{isValid:e.length===0,missingTypes:e}}createEnemyConfiguration(t){if(!t.type||typeof t.type!="string")throw new Error("Enemy configuration must have a valid type");const e=t.type;if(!this.hasHandler(e))throw new Error(`Unsupported enemy type: ${e}`);switch(e){case"generic":return this.createGenericEnemy(t);case"infinite":return this.createInfiniteEnemy(t);case"mortal":return this.createMortalEnemy(t);default:throw new Error(`Unknown enemy type: ${e}`)}}createGenericEnemy(t){if(!t.name||typeof t.name!="string")throw new Error("Generic enemy must have a name");return{type:"generic",name:t.name,groupIndex:t.groupIndex||0}}createInfiniteEnemy(t){if(!t.unit||typeof t.unit!="object")throw new Error("Infinite enemy must have unit data");const e=t.unit;if(!e.name||typeof e.name!="string")throw new Error("Infinite enemy unit must have a name");if(typeof e.strength!="number"||e.strength<0)throw new Error("Infinite enemy unit must have valid strength");if(typeof e.health!="number"||e.health<=0)throw new Error("Infinite enemy unit must have valid health");return{type:"infinite",unit:{...e,unit_types:e.unit_types||[],attack_modifiers:e.attack_modifiers||[]},groupIndex:t.groupIndex||0}}createMortalEnemy(t){if(!t.unit||typeof t.unit!="object")throw new Error("Mortal enemy must have unit data");if(typeof t.count!="number"||t.count<=0)throw new Error("Mortal enemy must have a positive count");const e=t.unit;if(!e.name||typeof e.name!="string")throw new Error("Mortal enemy unit must have a name");if(typeof e.strength!="number"||e.strength<0)throw new Error("Mortal enemy unit must have valid strength");if(typeof e.health!="number"||e.health<=0)throw new Error("Mortal enemy unit must have valid health");return{type:"mortal",unit:{...e,unit_types:e.unit_types||[],attack_modifiers:e.attack_modifiers||[]},count:t.count,currentCount:t.currentCount||t.count,groupIndex:t.groupIndex||0}}resetHandlers(){}getHandlerStats(){const t={};for(const[e,n]of this.handlers)t[e]={type:n.getEnemyType(),available:!0};return t}cloneEnemy(t){switch(t.type){case"generic":return{...t};case"infinite":return{...t,unit:{...t.unit}};case"mortal":return{...t,unit:{...t.unit},currentCount:t.count};default:throw new Error(`Cannot clone unknown enemy type: ${t.type}`)}}createMultipleEnemies(t){const e=[];for(let n=0;n<t.length;n++)try{const i=this.createEnemyConfiguration({...t[n],groupIndex:t[n].groupIndex||n});e.push(i)}catch(i){throw new Error(`Error creating enemy at index ${n}: ${i}`)}return e}};u(z,"instance");let q=z;class ut{shouldPlayerActNext(t,e){const n=this.getAvailablePlayerGroups(t),i=this.getAvailableEnemies(t);if(n.length===0)return!1;if(i.length===0)return!0;const s=t.currentAction%2===0;return e?s:!s}getAvailablePlayerGroups(t){return t.playerGroups.filter(e=>e.totalHealth>0&&!t.unitsActedThisTurn.players.has(e.unit.name))}getAvailableEnemies(t){return t.enemies.filter((e,n)=>this.canEnemyAttack(e)&&!t.unitsActedThisTurn.enemies.has(n))}markUnitAsActed(t,e){const n={players:new Set(t.unitsActedThisTurn.players),enemies:new Set(t.unitsActedThisTurn.enemies)};if(this.isPlayerGroup(e))n.players.add(e.unit.name);else{const i=t.enemies.findIndex(s=>s.groupIndex===e.groupIndex);i>=0?n.enemies.add(i):console.warn("Could not find enemy index for marking as acted:",e)}return{...t,currentAction:t.currentAction+1,unitsActedThisTurn:n}}isTurnComplete(t){const e=this.getAvailablePlayerGroups(t),n=this.getAvailableEnemies(t);return e.length===0&&n.length===0}shouldBattleEnd(t){const e=t.playerGroups.filter(i=>i.totalHealth>0),n=t.enemies.filter(i=>this.canEnemyAttack(i));return e.length===0||n.length===0}advanceToNextTurn(t){return{...t,currentTurn:t.currentTurn+1,currentAction:0,unitsActedThisTurn:{players:new Set,enemies:new Set}}}canEnemyAttack(t){switch(t.type){case"generic":return!0;case"infinite":return!0;case"mortal":return t.currentCount>0;default:return!1}}isPlayerGroup(t){return"unit"in t&&"count"in t&&"totalHealth"in t}getTurnStats(t){return{currentTurn:t.currentTurn,currentAction:t.currentAction,actionsThisTurn:t.unitsActedThisTurn.players.size+t.unitsActedThisTurn.enemies.size,playersActedThisTurn:t.unitsActedThisTurn.players.size,enemiesActedThisTurn:t.unitsActedThisTurn.enemies.size,availablePlayerGroups:this.getAvailablePlayerGroups(t).length,availableEnemies:this.getAvailableEnemies(t).length,turnComplete:this.isTurnComplete(t)}}validateTurnState(t){const e=[],n=[];t.currentTurn<1&&e.push(`Invalid turn number: ${t.currentTurn} (should be >= 1)`),t.currentAction<0&&e.push(`Invalid action number: ${t.currentAction} (should be >= 0)`);const i=t.unitsActedThisTurn.players.size+t.unitsActedThisTurn.enemies.size;i>t.currentAction&&n.push(`More units marked as acted (${i}) than current action count (${t.currentAction})`);for(const s of t.unitsActedThisTurn.players){const a=t.playerGroups.find(r=>r.unit.name===s);a?a.totalHealth<=0&&n.push(`Dead player ${s} marked as acted this turn`):n.push(`Player ${s} marked as acted but not found in battle`)}for(const s of t.unitsActedThisTurn.enemies){const a=t.enemies[s];a?this.canEnemyAttack(a)||n.push(`Enemy ${a.type} at index ${s} marked as acted but cannot attack`):n.push(`Enemy at index ${s} marked as acted but not found`)}return{isValid:e.length===0,errors:e,warnings:n}}getAlternationAnalysis(t,e){const n=this.getAvailablePlayerGroups(t),i=this.getAvailableEnemies(t);let s="";const a=n.length+t.unitsActedThisTurn.players.size,r=i.length+t.unitsActedThisTurn.enemies.size,o=Math.max(a+r,t.currentAction);for(let m=0;m<o;m++){const d=this.shouldPlayerActNext({...t,currentAction:m},e);s+=d?"P":"E"}const l="P".repeat(t.unitsActedThisTurn.players.size)+"E".repeat(t.unitsActedThisTurn.enemies.size),c=this.shouldPlayerActNext(t,e)?"player":"enemy";return{expectedPattern:s,actualPattern:l,isCorrectAlternation:!0,nextShouldBe:c}}resetTurn(t){return{...t,currentTurn:1,currentAction:0,unitsActedThisTurn:{players:new Set,enemies:new Set}}}getTurnSummary(t){const e=this.getTurnStats(t);return`Turn ${e.currentTurn}, Action ${e.currentAction}: ${e.playersActedThisTurn}P + ${e.enemiesActedThisTurn}E acted, ${e.availablePlayerGroups}P + ${e.availableEnemies}E available`}}class H{constructor(){u(this,"battleState");u(this,"attackerSelector");u(this,"enemyFactory");u(this,"turnManager");this.attackerSelector=new lt,this.enemyFactory=q.getInstance(),this.turnManager=new ut,this.validateEnemyHandlers()}simulateBattle(t){return this.battleState=new ot(t),this.validateConfiguration(t),this.runBattleLoop(t.playerGoesFirst,t),this.buildBattleResult(t)}runBattleLoop(t,e){let n=0;const i=e.maxBattleTurns??$.MAX_BATTLE_TURNS,s=e.maxActionsPerTurn??$.MAX_ACTIONS_PER_TURN,a=i*s;for(;!this.battleState.isBattleEnded()&&n<a;){const r=this.battleState.getBattleState();this.turnManager.shouldPlayerActNext(r,t)?this.processPlayerAction(r):this.processEnemyAction(r),n++;const l=this.battleState.getBattleState();if(this.turnManager.shouldBattleEnd(l)){const d=this.battleState.checkBattleEndPure(l,i);this.battleState.applyStateUpdate(d);break}const c=this.battleState.checkBattleEndPure(l,i);this.battleState.applyStateUpdate(c);const m=this.battleState.getBattleState();if(!this.battleState.isBattleEnded()&&this.turnManager.isTurnComplete(m)){const d=this.turnManager.advanceToNextTurn(m);this.battleState.applyStateUpdate(d)}}n>=a&&this.battleState.endBattle()}processPlayerAction(t){const e=this.attackerSelector.selectNextPlayerAttack(t);if(!e)return;const n=this.battleState.applyCompleteAttack(t,e);this.battleState.applyStateUpdate(n)}processEnemyAction(t){const e=this.attackerSelector.selectNextEnemyAttack(t);if(!e)return;const n=this.battleState.applyCompleteAttack(t,e);this.battleState.applyStateUpdate(n)}validateEnemyHandlers(){const t=this.enemyFactory.validateHandlers();if(!t.isValid)throw new Error(`Missing enemy type handlers: ${t.missingTypes.join(", ")}`)}validateConfiguration(t){var e;if(!t.playerArmy||!t.playerArmy.stackingOrder||t.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(!t.enemies||t.enemies.length===0)throw new Error("Battle must have at least one enemy");for(const n of t.enemies)if(n.type==="mortal"&&(!n.count||n.count<=0))throw new Error(`Mortal enemy ${((e=n.unit)==null?void 0:e.name)||"Unknown"} must have a positive count`)}buildBattleResult(t){const e=this.battleState.getBattleState(),n=t.maxBattleTurns??$.MAX_BATTLE_TURNS,s={result:this.battleState.getBattleOutcome(n),survivingPlayerGroups:this.battleState.getAlivePlayerGroups(),survivingEnemies:this.battleState.getAttackableEnemies(),totalTurns:this.battleState.getCurrentTurn(),totalActions:e.currentAction+(this.battleState.getCurrentTurn()-1)*$.MAX_ACTIONS_PER_TURN};return{outcome:s,combatLog:this.battleState.getCombatLog(),totalDamageDealt:this.battleState.getTotalDamageDealt(),battleDuration:Math.ceil(s.totalTurns)}}getBattleState(){var t;return((t=this.battleState)==null?void 0:t.getBattleState())||{}}isBattleActive(){return this.battleState?!this.battleState.isBattleEnded():!1}}class ht{constructor(t){u(this,"algorithm");this.algorithm=t||new pt}setAlgorithm(t){this.algorithm=t}reportProgress(t,e){t.onProgress&&t.onProgress(e)}checkCancellation(t){var e;if((e=t.signal)!=null&&e.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(t,e){const n=performance.now(),i=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${t.leadershipBudget} D:${t.dominanceBudget} vs ${t.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${i/1e3} seconds`),this.reportProgress(t,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(t),this.reportProgress(t,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const s=await this.algorithm.generateCombinations(t,e);console.log(`🔄 Generated ${s.length} army combinations to evaluate`),this.reportProgress(t,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:0,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const a=[];let r=0;for(let m=0;m<s.length;m++){this.checkCancellation(t);const d=performance.now();if(d-n>i){console.warn(`⏱️ Optimization timeout after ${(d-n)/1e3}s - stopping at ${r} combinations`);break}const h=s[m];try{const p=await this.evaluateArmyComposition(h,t.enemyGroupCount,e,t.specificEnemyUnits);a.push(p),r++}catch(p){console.warn("⚠️ Failed to evaluate army composition:",p)}if(r%3===0&&await new Promise(p=>setTimeout(p,0)),r%10===0||r===s.length){const p=performance.now()-n,g=20+Math.floor(r/s.length*60),v=r>0?p/r*(s.length-r):void 0;this.reportProgress(t,{phase:"evaluating",progress:g,message:`Evaluating combinations... (${r}/${s.length})`,combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:p,estimatedRemainingMs:v})}if(r%25===0){const p=(performance.now()-n)/1e3;console.log(`📊 Progress: ${r}/${s.length} combinations (${p.toFixed(1)}s elapsed)`)}}this.reportProgress(t,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const o=a.sort((m,d)=>{const h=d.averageDamagePerBattle-m.averageDamagePerBattle;return Math.abs(h)>.01?h:d.damageEfficiencyScore-m.damageEfficiencyScore}),c=performance.now()-n;return console.log(`✅ Optimization complete: ${o.length} valid results in ${c.toFixed(2)}ms`),this.reportProgress(t,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:r,totalToEvaluate:s.length,elapsedMs:c}),{rankedResults:o,combinationsEvaluated:r,optimizationTimeMs:c,algorithmUsed:this.algorithm.name,wasTruncated:s.length>(t.maxCombinations||50)}}async evaluateArmyComposition(t,e,n,i){const s=new H;let a;if(i&&i.length>0){const g=i.map((C,k)=>({type:C.isMortal?"mortal":"infinite",unit:{name:C.name,strength:C.strength,health:C.health,unit_types:C.unit_types||[],attack_modifiers:C.attack_modifiers||[]},count:C.count||1,currentCount:C.count||1,groupIndex:k})),v={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!0},f=s.simulateBattle(v),S={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!1},E=s.simulateBattle(S);a={bestCase:f,worstCase:E}}else{const g=Array.from({length:e},(C,k)=>({type:"generic",name:`Generic Enemy ${k+1}`,groupIndex:k})),v={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!0},f=s.simulateBattle(v),S={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(g)),playerGoesFirst:!1},E=s.simulateBattle(S);a={bestCase:f,worstCase:E}}const r=this.calculateSilverCost(t,n),o=this.calculateFoodConsumption(t,n),l=this.calculateRevivalCost(t,n),c=a.bestCase.totalDamageDealt,m=a.worstCase.totalDamageDealt,d=(c+m)/2,h=t.totalLeadershipCost+t.totalDominanceCost+r,p=h>0?d/h:0;return{armyComposition:t,battleAnalysis:a,totalSilverCost:r,totalFoodConsumption:o,totalRevivalCost:l,averageDamagePerBattle:d,damageEfficiencyScore:p}}calculateSilverCost(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const r=n.get(s);r&&(i+=(r.revival_cost_silver??0)*a)}return i}calculateFoodConsumption(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const r=n.get(s);r&&(i+=(r.food_consumption??0)*a)}return i}calculateRevivalCost(t,e){return this.calculateSilverCost(t,e)}validateOptimizationConstraints(t){if(t.enemyGroupCount<1||t.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(t.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(t.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!t.availableUnits||t.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(t.maxCombinations&&t.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class pt{constructor(){u(this,"name","Systematic Combination Testing")}async generateCombinations(t,e){const n=performance.now(),i=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const s=e.filter(l=>t.availableUnits.includes(l.name));console.log(`📋 Available units for optimization: ${s.length}`);const a=t.maxCombinations||50,r=this.generateUnitCombinations(s.map(l=>l.name),a);console.log(`🔄 Testing ${r.length} different unit combinations (user requested: ${a})`);const o=[];for(let l=0;l<r.length;l++){const c=performance.now();if(c-n>i){console.warn(`⏱️ Generation timeout after ${(c-n)/1e3}s - stopping at ${l} combinations`);break}const m=r[l];try{const d=await this.testCombinationWithStackingAlgorithm(m,t,e);d&&o.push(d)}catch(d){console.warn(`⚠️ Failed to test combination [${m.join(", ")}]:`,d)}if(l%5===0&&await new Promise(d=>setTimeout(d,0)),l%20===0&&l>0){const d=(performance.now()-n)/1e3;console.log(`🔄 Generation progress: ${l}/${r.length} combinations tested (${d.toFixed(1)}s)`)}}return console.log(`✅ Generated ${o.length} valid army combinations for evaluation`),o}generateUnitCombinations(t,e){const n=Math.pow(2,t.length)-1;if(console.log(`📊 Total possible combinations: ${n}, user requested: ${e}`),n>e)return this.generateLimitedCombinations(t,e);const i=[];for(let s=1;s<=n;s++){const a=[];for(let r=0;r<t.length;r++)s&1<<r&&a.push(t[r]);i.push(a)}return i.sort((s,a)=>a.length-s.length),console.log(`🎯 Generated all ${i.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${e} combinations (all possible combinations fit within limit)`),i}generateLimitedCombinations(t,e){const n=[];n.push([...t]);for(let i=0;i<t.length&&n.length<e;i++){const s=t.filter((a,r)=>r!==i);n.push(s)}for(let i=0;i<t.length&&n.length<e;i++)for(let s=i+1;s<t.length&&n.length<e;s++){const a=t.filter((r,o)=>o!==i&&o!==s);a.length>0&&n.push(a)}for(let i=0;i<t.length&&n.length<e;i++)for(let s=i+1;s<t.length&&n.length<e;s++)for(let a=s+1;a<t.length&&n.length<e;a++){const r=t.filter((o,l)=>l!==i&&l!==s&&l!==a);r.length>0&&n.push(r)}if(n.length<e){const i=Math.floor(t.length/2);for(let a=0;a<10&&n.length<e;a++){const r=this.getRandomCombination(t,i);n.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||n.push(r)}const s=Math.max(1,Math.floor(t.length/4));for(let a=0;a<5&&n.length<e;a++){const r=this.getRandomCombination(t,s);n.some(o=>o.length===r.length&&o.every(l=>r.includes(l)))||n.push(r)}}return console.log(`🎯 Generated ${n.length} top-down combinations from ${t.length} units`),console.log(`   Strategy: Started with all ${t.length} units, then systematically removed units`),console.log(`   User requested: ${e} combinations (time-based limits still apply)`),n}getRandomCombination(t,e){return[...t].sort(()=>Math.random()-.5).slice(0,e)}async testCombinationWithStackingAlgorithm(t,e,n){try{const i=new O(n),s={leadershipBudget:e.leadershipBudget,dominanceBudget:e.dominanceBudget,mercenaryLimits:e.mercenaryLimits,availableUnits:t},a=await i.optimizeArmy(s);return a.compositions&&a.compositions.length>0?a.compositions[0]:null}catch(i){return console.warn(`Failed to test combination [${t.join(", ")}]:`,i),null}}}class R{constructor(){u(this,"enemyUnits",[]);u(this,"enemyUnitsByName",new Map);u(this,"enemyUnitsByType",new Map);this.resetData()}async loadPresetEnemyUnits(){return this.loadEnemyUnits(W.ENEMY_UNITS)}async loadEnemyUnits(t){try{let e;if(typeof t=="string"){console.log(`Loading enemy units from: ${t}`);const n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch enemy units: ${n.status} ${n.statusText}`);e=await n.json()}else e=t;if(!Array.isArray(e))throw new Error("Enemy unit data must be an array");return this.enemyUnits=e.map(n=>this.validateAndNormalizeEnemyUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.enemyUnits.length} enemy units successfully`),this.enemyUnits}catch(e){throw console.error("❌ Error loading enemy units:",e),e}}validateAndNormalizeEnemyUnit(t){const e={name:t.name||"Unknown Enemy",unit_types:Array.isArray(t.unit_types)?t.unit_types:[],health:Number(t.health)||0,strength:Number(t.strength)||0,attack_modifiers:Array.isArray(t.attack_modifiers)?t.attack_modifiers:[]};return(!Array.isArray(e.unit_types)||e.unit_types.length===0)&&(console.warn(`Enemy unit ${e.name} has no unit types, adding 'Unknown'`),e.unit_types=["Unknown"]),e.health<=0&&(console.warn(`Enemy unit ${e.name} has invalid health: ${e.health}`),e.health=1),e.strength<0&&(console.warn(`Enemy unit ${e.name} has negative strength: ${e.strength}`),e.strength=0),e.attack_modifiers&&Array.isArray(e.attack_modifiers)&&(e.attack_modifiers=e.attack_modifiers.filter(n=>!n||typeof n!="object"?(console.warn(`Enemy unit ${e.name} has invalid attack modifier object`),!1):!n.target_type||typeof n.value!="number"?(console.warn(`Enemy unit ${e.name} has invalid attack modifier: ${JSON.stringify(n)}`),!1):!0)),e}buildLookups(){this.resetData(),this.enemyUnitsByName=new Map(this.enemyUnits.map(t=>[t.name,t])),this.enemyUnits.forEach(t=>{t.unit_types.forEach(e=>{this.enemyUnitsByType.has(e)||this.enemyUnitsByType.set(e,[]),this.enemyUnitsByType.get(e).push(t)})}),this.enemyUnitsByType.forEach(t=>{t.sort((e,n)=>n.strength-e.strength)})}resetData(){this.enemyUnitsByName.clear(),this.enemyUnitsByType.clear()}getAllEnemyUnits(){return[...this.enemyUnits]}getEnemyUnitByName(t){return this.enemyUnitsByName.get(t)}getEnemyUnitsByType(t){return[...this.enemyUnitsByType.get(t)||[]]}getUniqueEnemyUnitTypes(){return Array.from(this.enemyUnitsByType.keys()).sort()}filterEnemyUnits(t){let e=this.enemyUnits;return t.unitTypes&&t.unitTypes.length>0&&(e=e.filter(n=>t.unitTypes.some(i=>n.unit_types.includes(i)))),t.minStrength!==void 0&&(e=e.filter(n=>n.strength>=t.minStrength)),t.maxStrength!==void 0&&(e=e.filter(n=>n.strength<=t.maxStrength)),t.minHealth!==void 0&&(e=e.filter(n=>n.health>=t.minHealth)),t.maxHealth!==void 0&&(e=e.filter(n=>n.health<=t.maxHealth)),e}searchEnemyUnits(t){if(!t.trim())return this.getAllEnemyUnits();const e=t.toLowerCase();return this.enemyUnits.filter(n=>n.name.toLowerCase().includes(e))}getEnhancedEnemyUnits(){return this.enemyUnits.map(t=>({...t,get strengthPerHealth(){return y.getStrengthPerHealth(t)},get effectivenessScore(){return y.getEffectivenessScore(t)}}))}getEnemyUnitSummary(){if(this.enemyUnits.length===0)return{totalUnits:0,byUnitType:{},strengthRange:{min:0,max:0,average:0},healthRange:{min:0,max:0,average:0}};const t=this.enemyUnits.map(i=>i.strength),e=this.enemyUnits.map(i=>i.health),n={};return this.enemyUnitsByType.forEach((i,s)=>{n[s]=i.length}),{totalUnits:this.enemyUnits.length,byUnitType:n,strengthRange:{min:Math.min(...t),max:Math.max(...t),average:Math.round(t.reduce((i,s)=>i+s,0)/t.length)},healthRange:{min:Math.min(...e),max:Math.max(...e),average:Math.round(e.reduce((i,s)=>i+s,0)/e.length)}}}getStatistics(){if(this.enemyUnits.length===0)return{totalUnits:0,unitTypeDistribution:{},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[],unitsWithAttackModifiers:0};const t=this.enemyUnits.map(s=>s.strength),e=this.enemyUnits.map(s=>s.health),n={};this.enemyUnitsByType.forEach((s,a)=>{n[a]=s.length});const i=this.enemyUnits.filter(s=>s.attack_modifiers&&Array.isArray(s.attack_modifiers)&&s.attack_modifiers.length>0).length;return{totalUnits:this.enemyUnits.length,unitTypeDistribution:n,strengthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((s,a)=>s+a,0)/t.length)},healthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((s,a)=>s+a,0)/e.length)},topUnitsByStrength:[...this.enemyUnits].sort((s,a)=>a.strength-s.strength).slice(0,10),topUnitsByHealth:[...this.enemyUnits].sort((s,a)=>a.health-s.health).slice(0,10),unitsWithAttackModifiers:i}}getEnemyUnitsWithModifiersAgainst(t){return this.enemyUnits.filter(e=>!e.attack_modifiers||!Array.isArray(e.attack_modifiers)?!1:t.some(n=>e.attack_modifiers.some(i=>i.target_type.toLowerCase()===n.toLowerCase())))}getMostEffectiveAgainst(t,e=5){return this.enemyUnits.map(n=>({unit:n,effectiveness:this.calculateEffectivenessAgainst(n,t)})).sort((n,i)=>i.effectiveness-n.effectiveness).slice(0,e).map(n=>n.unit)}calculateEffectivenessAgainst(t,e){let n=y.getEffectivenessScore(t);return t.attack_modifiers&&Array.isArray(t.attack_modifiers)&&e.forEach(i=>{const s=y.getAttackModifierAgainst(t,i);n+=s*.1}),n}}const I=class I{constructor(t={}){u(this,"storageKey");u(this,"metadataKey");u(this,"maxUnits");u(this,"validateOnLoad");this.storageKey=t.storagePrefix?`${t.storagePrefix}_user_enemy_units`:I.DEFAULT_STORAGE_KEY,this.metadataKey=t.storagePrefix?`${t.storagePrefix}_enemy_units_metadata`:I.METADATA_KEY,this.maxUnits=t.maxUnits||I.DEFAULT_MAX_UNITS,this.validateOnLoad=t.validateOnLoad!==!1}isStorageAvailable(){try{const t="__storage_test__";return localStorage.setItem(t,t),localStorage.removeItem(t),!0}catch{return!1}}getAllUserEnemyUnits(){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),[];try{const t=localStorage.getItem(this.storageKey);if(!t)return[];const n=JSON.parse(t).map(i=>({...i,createdAt:new Date(i.createdAt),modifiedAt:new Date(i.modifiedAt)}));return this.validateOnLoad?n.filter(i=>{const s=U.validateUserEnemyUnit(i);return s.isValid?!0:(console.warn(`Invalid stored enemy unit removed: ${i.name}`,s.errors),!1)}):n}catch(t){return console.error("Error loading user enemy units from storage:",t),[]}}saveAllUserEnemyUnits(t){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),!1;try{return localStorage.setItem(this.storageKey,JSON.stringify(t)),this.updateMetadata(),!0}catch(e){return console.error("Error saving user enemy units to storage:",e),!1}}addUserEnemyUnit(t){const e=U.validateEnemyUnit(t);if(!e.isValid)return{success:!1,error:`Validation failed: ${e.errors.join(", ")}`};const n=this.getAllUserEnemyUnits();if(n.length>=this.maxUnits)return{success:!1,error:`Maximum number of units (${this.maxUnits}) reached`};if(n.some(a=>a.name.toLowerCase()===t.name.toLowerCase()))return{success:!1,error:`A unit with the name "${t.name}" already exists`};const i=y.createUserEnemyUnit(t);return n.push(i),this.saveAllUserEnemyUnits(n)?{success:!0,unit:i}:{success:!1,error:"Failed to save unit to storage"}}updateUserEnemyUnit(t,e){const n=this.getAllUserEnemyUnits(),i=n.findIndex(c=>c.id===t);if(i===-1)return{success:!1,error:"Unit not found"};const s=n[i],a={...s,...e},r=U.validateUserEnemyUnit(a);if(!r.isValid)return{success:!1,error:`Validation failed: ${r.errors.join(", ")}`};if(e.name&&n.some((c,m)=>m!==i&&c.name.toLowerCase()===e.name.toLowerCase()))return{success:!1,error:`A unit with the name "${e.name}" already exists`};const o=y.updateUserEnemyUnit(s,e);return n[i]=o,this.saveAllUserEnemyUnits(n)?{success:!0,unit:o}:{success:!1,error:"Failed to save updated unit to storage"}}deleteUserEnemyUnit(t){const e=this.getAllUserEnemyUnits(),n=e.findIndex(s=>s.id===t);return n===-1?{success:!1,error:"Unit not found"}:(e.splice(n,1),this.saveAllUserEnemyUnits(e)?{success:!0}:{success:!1,error:"Failed to save changes to storage"})}getUserEnemyUnitById(t){return this.getAllUserEnemyUnits().find(n=>n.id===t)||null}searchUserEnemyUnits(t){const e=this.getAllUserEnemyUnits();if(!t.trim())return e;const n=t.toLowerCase();return e.filter(i=>i.name.toLowerCase().includes(n))}clearAllUserEnemyUnits(){if(!this.isStorageAvailable())return{success:!1,error:"localStorage is not available"};try{return localStorage.removeItem(this.storageKey),localStorage.removeItem(this.metadataKey),{success:!0}}catch{return{success:!1,error:"Failed to clear storage"}}}exportUserEnemyUnits(){try{const t=this.getAllUserEnemyUnits(),e={version:"1.0",exportDate:new Date().toISOString(),units:t.map(n=>{var i,s;return{name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers,createdAt:((i=n.createdAt)==null?void 0:i.toISOString())??new Date().toISOString(),modifiedAt:((s=n.modifiedAt)==null?void 0:s.toISOString())??new Date().toISOString()}})};return{success:!0,data:JSON.stringify(e,null,2)}}catch{return{success:!1,error:"Failed to export units"}}}importUserEnemyUnits(t,e={}){try{const n=JSON.parse(t);if(!n.units||!Array.isArray(n.units))return{success:!1,errors:["Invalid import format: units array not found"]};const i=e.replace?[]:this.getAllUserEnemyUnits(),s=[];let a=0,r=0;for(const l of n.units){const c=U.validateForImport(l);if(!c.isValid){s.push(`Unit "${l.name||"Unknown"}": ${c.errors.join(", ")}`),r++;continue}if(i.some(h=>h.name.toLowerCase()===l.name.toLowerCase()))if(e.skipDuplicates){r++;continue}else{s.push(`Unit "${l.name}" already exists`),r++;continue}if(i.length>=this.maxUnits){s.push(`Maximum number of units (${this.maxUnits}) reached`);break}const d=y.createUserEnemyUnit({name:l.name,unit_types:l.unit_types,health:l.health,strength:l.strength,attack_modifiers:l.attack_modifiers||[]});i.push(d),a++}return this.saveAllUserEnemyUnits(i)?{success:!0,imported:a,skipped:r,errors:s.length>0?s:void 0}:{success:!1,errors:["Failed to save imported units to storage"]}}catch{return{success:!1,errors:["Invalid JSON format"]}}}getStorageStats(){var a;const t=this.getAllUserEnemyUnits(),e=new Date;e.setHours(0,0,0,0);const n=t.filter(r=>r.createdAt&&r.createdAt>=e).length;let i=null;t.length>0&&(i=new Date(Math.max(...t.map(r=>{var o;return((o=r.modifiedAt)==null?void 0:o.getTime())??0}))));const s=this.isStorageAvailable()?(((a=localStorage.getItem(this.storageKey))==null?void 0:a.length)||0)*2:0;return{totalUnits:t.length,storageSize:s,lastModified:i,unitsCreatedToday:n}}updateMetadata(){if(this.isStorageAvailable())try{const t={lastModified:new Date().toISOString(),version:"1.0"};localStorage.setItem(this.metadataKey,JSON.stringify(t))}catch(t){console.warn("Failed to update metadata:",t)}}getAvailableSpace(){return Math.max(0,this.maxUnits-this.getAllUserEnemyUnits().length)}isNearCapacity(t=.9){return this.getAllUserEnemyUnits().length>=this.maxUnits*t}};u(I,"DEFAULT_STORAGE_KEY","army_calculator_user_enemy_units"),u(I,"METADATA_KEY","army_calculator_enemy_units_metadata"),u(I,"DEFAULT_MAX_UNITS",100);let _=I;class Q{constructor(t){u(this,"container",null);u(this,"props");u(this,"loader");u(this,"storage");u(this,"presetUnits",[]);u(this,"userUnits",[]);u(this,"filteredUnits",[]);u(this,"currentFilter","");u(this,"currentCategory","all");u(this,"currentSelectedUnits",[]);this.props=t,this.loader=new R,this.storage=new _,this.currentSelectedUnits=t.selectedUnits?[...t.selectedUnits]:[]}async mount(t){this.container=t,await this.loadData(),this.render(),this.attachEventListeners()}async loadData(){try{this.presetUnits=await this.loader.loadPresetEnemyUnits(),this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}catch(t){console.error("Error loading enemy unit data:",t),this.presetUnits=[],this.userUnits=[],this.filteredUnits=[]}}updateFilteredUnits(){let t=[];switch(this.currentCategory){case"preset":t=[...this.presetUnits];break;case"user":t=[...this.userUnits];break;case"all":default:t=[...this.presetUnits,...this.userUnits];break}if(this.currentFilter.trim()){const e=this.currentFilter.toLowerCase();this.filteredUnits=t.filter(n=>n.name.toLowerCase().includes(e)||n.unit_types.some(i=>i.toLowerCase().includes(e)))}else this.filteredUnits=t;this.filteredUnits.sort((e,n)=>e.name.localeCompare(n.name))}render(){if(!this.container)return;const t=this.props.title||"Select Enemy Unit";this.container.innerHTML=`
      <div class="enemy-unit-selector">
        <div class="modal-overlay">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="modal-title">⚔️ ${t}</h2>
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
      `:this.filteredUnits.map(t=>{var i;const e=this.props.mode==="multiple"?this.currentSelectedUnits.some(s=>s.name===t.name):((i=this.props.selectedUnit)==null?void 0:i.name)===t.name,n="id"in t;return`
        <div class="unit-card ${e?"selected":""}" data-unit-name="${t.name}">
          <div class="unit-card-header">
            <div class="unit-info">
              <h4 class="unit-name">
                ${t.name}
                ${n?'<span class="user-badge">👤</span>':'<span class="preset-badge">🏛️</span>'}
              </h4>
              <div class="unit-types">
                ${t.unit_types.map(s=>`<span class="unit-type-tag">${s}</span>`).join("")}
              </div>
            </div>
            <div class="unit-actions">
              <button class="btn btn-primary btn-sm select-unit-btn" data-unit-name="${t.name}">
                ${e?"✅ Selected":"👆 Select"}
              </button>
            </div>
          </div>
          
          <div class="unit-stats">
            <div class="stat-group">
              <div class="stat-item">
                <span class="stat-label">❤️ Health</span>
                <span class="stat-value">${t.health.toLocaleString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">⚔️ Strength</span>
                <span class="stat-value">${t.strength.toLocaleString()}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">📊 Ratio</span>
                <span class="stat-value">${(t.strength/t.health).toFixed(3)}</span>
              </div>
            </div>
            
            ${t.attack_modifiers&&t.attack_modifiers.length>0?`
              <div class="attack-modifiers">
                <span class="modifiers-label">🎯 Attack Bonuses:</span>
                <div class="modifiers-list">
                  ${t.attack_modifiers.map(s=>`<span class="modifier-tag">+${s.value.toLocaleString()} vs ${s.target_type}</span>`).join("")}
                </div>
              </div>
            `:""}
          </div>
        </div>
      `}).join("")}addStyles(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}attachEventListeners(){const t=document.getElementById("close-selector");t&&t.addEventListener("click",this.handleCancel.bind(this));const e=document.getElementById("cancel-selection");e&&e.addEventListener("click",this.handleCancel.bind(this));const n=document.getElementById("confirm-selection");n&&n.addEventListener("click",this.handleConfirm.bind(this));const i=document.getElementById("unit-search");i&&i.addEventListener("input",this.handleSearch.bind(this));const s=document.getElementById("clear-search");s&&s.addEventListener("click",this.handleClearSearch.bind(this)),document.querySelectorAll(".filter-tab").forEach(r=>{r.addEventListener("click",this.handleFilterChange.bind(this))}),document.querySelectorAll(".select-unit-btn").forEach(r=>{r.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(r=>{r.addEventListener("click",this.handleCardClick.bind(this))});const a=document.querySelector(".modal-overlay");a&&a.addEventListener("click",r=>{r.target===a&&this.handleCancel()}),document.addEventListener("keydown",this.handleKeyDown.bind(this))}handleSearch(t){const e=t.target;this.currentFilter=e.value,this.updateFilteredUnits(),this.refreshUnitList()}handleClearSearch(){this.currentFilter="";const t=document.getElementById("unit-search");t&&(t.value=""),this.updateFilteredUnits(),this.refreshUnitList()}handleFilterChange(t){const n=t.target.dataset.category;n&&n!==this.currentCategory&&(this.currentCategory=n,this.updateFilteredUnits(),this.refreshFilterTabs(),this.refreshUnitList())}handleUnitSelect(t){t.stopPropagation();const n=t.target.dataset.unitName;if(n){const i=this.filteredUnits.find(s=>s.name===n);if(i){if(this.props.mode==="multiple"){const s=this.currentSelectedUnits.findIndex(a=>a.name===i.name);if(s>=0)this.currentSelectedUnits.splice(s,1);else{const a=this.props.maxSelections||5;this.currentSelectedUnits.length<a?this.currentSelectedUnits.push(i):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(i))}this.refreshUnitList()}this.props.onSelect(i)}}}handleCardClick(t){const n=t.target.closest(".unit-card");if(n){const i=n.dataset.unitName;if(i){const s=this.filteredUnits.find(a=>a.name===i);if(s){if(this.props.mode==="multiple"){const a=this.currentSelectedUnits.findIndex(r=>r.name===s.name);if(a>=0)this.currentSelectedUnits.splice(a,1);else{const r=this.props.maxSelections||5;this.currentSelectedUnits.length<r?this.currentSelectedUnits.push(s):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(s))}this.refreshUnitList()}this.props.onSelect(s)}}}}handleCancel(){this.props.onCancel()}handleConfirm(){this.props.selectedUnit&&this.props.onSelect(this.props.selectedUnit)}handleKeyDown(t){t.key==="Escape"&&this.handleCancel()}refreshUnitList(){const t=document.getElementById("unit-list");t&&(t.innerHTML=this.renderUnitList(),document.querySelectorAll(".select-unit-btn").forEach(n=>{n.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(n=>{n.addEventListener("click",this.handleCardClick.bind(this))}));const e=document.querySelector(".results-count");e&&(e.textContent=`${this.filteredUnits.length} unit${this.filteredUnits.length!==1?"s":""} found`)}refreshFilterTabs(){document.querySelectorAll(".filter-tab").forEach(t=>{t.getAttribute("data-category")===this.currentCategory?t.classList.add("active"):t.classList.remove("active")})}unmount(){document.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.container&&(this.container.innerHTML="")}updateTitle(t){this.props.title=t;const e=document.getElementById("modal-title");e&&(e.textContent=`⚔️ ${t}`)}updateSelectedUnits(t){this.currentSelectedUnits=[...t],this.refreshUnitList()}}const gt=Object.freeze(Object.defineProperty({__proto__:null,EnemyUnitSelector:Q},Symbol.toStringTag,{value:"Module"}));class X{static generateResultsHTML(t,e,n={}){const{showComparison:i=!0,title:s="Battle Analysis Results",subtitle:a}=n,r=t.totalDamageDealt-e.totalDamageDealt,o=t.battleDuration-e.battleDuration,l=(t.totalDamageDealt+e.totalDamageDealt)/2,c=`
      <div class="results-header">
        <h3>📊 ${s}
          <span class="help-icon" data-tooltip="battle-results">ℹ️</span>
        </h3>
        ${a?`<p class="results-summary">${a}</p>`:`
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

        <div class="scenario-card worst-case">
          <h4>🔴 Worst Case Scenario
            <span class="help-icon" data-tooltip="worst-case-scenario">ℹ️</span>
          </h4>
          <p class="scenario-description">Enemy forces attack first</p>
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
    `:"",h=`
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
            ${this.formatCombatLog(e.combatLog)}
          </div>
        </div>
      </div>
    `;return c+m+d+h}static displayResults(t,e,n,i={}){t.innerHTML=this.generateResultsHTML(e,n,i),this.attachLogTabListeners(t,i.onLogTabChange)}static formatCombatLog(t){return t.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${t.map(n=>`
        <div class="${n.attackerSide==="player"?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${n.turn}:</span>
          <span class="action-text">${n.attacker} ${n.action}</span>
        </div>
      `).join("")}</div>`}static attachLogTabListeners(t,e){const n=t.querySelectorAll(".log-tab");n.forEach(i=>{i.addEventListener("click",s=>{const a=s.target,r=a.dataset.scenario;n.forEach(c=>c.classList.remove("active")),a.classList.add("active"),t.querySelectorAll(".combat-log").forEach(c=>{c.classList.remove("active"),c.classList.add("hidden")});const l=t.querySelector(`#${r}-case-log`);l&&(l.classList.add("active"),l.classList.remove("hidden")),e&&e()})})}}class V{constructor(){u(this,"container",null);u(this,"unifiedBattleService");u(this,"currentArmy",null);u(this,"currentBestCase",null);u(this,"currentWorstCase",null);u(this,"selectedEnemyUnit",null);u(this,"enemyUnitSelector",null);u(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.unifiedBattleService=new H}mount(t,e){this.container=t,this.currentArmy=e,this.render(),this.attachEventListeners(),this.showSimulationControls()}initialize(t){}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const t=document.getElementById("run-simulation-btn"),e=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups"),i=document.getElementById("select-enemy-btn"),s=document.getElementById("clear-enemy-btn");t&&t.addEventListener("click",()=>this.runSimulation()),e&&e.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),i&&i.addEventListener("click",()=>this.openEnemyUnitSelector()),s&&s.addEventListener("click",()=>this.clearSelectedEnemyUnit()),document.querySelectorAll('input[name="enemy-type"]').forEach(r=>{r.addEventListener("change",o=>this.handleEnemyTypeChange(o))}),this.attachTooltipListeners()}handleEnemyTypeChange(t){const n=t.target.value,i=document.getElementById("generic-enemy-input"),s=document.getElementById("specific-enemy-input");n==="generic"?(i==null||i.classList.remove("hidden"),s==null||s.classList.add("hidden")):n==="specific"&&(i==null||i.classList.add("hidden"),s==null||s.classList.remove("hidden")),this.validateInput()}async openEnemyUnitSelector(){const t=document.createElement("div");t.id="enemy-unit-selector-modal",document.body.appendChild(t),this.enemyUnitSelector=new Q({onSelect:e=>{this.selectedEnemyUnit=e,this.displaySelectedEnemyUnit(),this.validateInput(),this.closeEnemyUnitSelector()},onCancel:()=>{this.closeEnemyUnitSelector()},selectedUnit:this.selectedEnemyUnit,mode:"single",title:"Select Enemy Unit for Battle"}),await this.enemyUnitSelector.mount(t)}closeEnemyUnitSelector(){this.enemyUnitSelector&&(this.enemyUnitSelector.unmount(),this.enemyUnitSelector=null);const t=document.getElementById("enemy-unit-selector-modal");t&&t.remove()}clearSelectedEnemyUnit(){this.selectedEnemyUnit=null,this.displaySelectedEnemyUnit(),this.validateInput()}displaySelectedEnemyUnit(){const t=document.getElementById("no-enemy-selected"),e=document.getElementById("selected-enemy-info"),n=document.getElementById("clear-enemy-btn");if(!(!t||!e||!n))if(!this.selectedEnemyUnit)t.classList.remove("hidden"),e.classList.add("hidden"),n.style.display="none";else{t.classList.add("hidden"),e.classList.remove("hidden"),n.style.display="inline-block";const i=this.selectedEnemyUnit,s=i.attack_modifiers&&Object.keys(i.attack_modifiers).length>0?Object.entries(i.attack_modifiers).map(([a,r])=>`+${r} vs ${a}`).join(", "):"None";e.innerHTML=`
        <div class="enemy-unit-card">
          <div class="enemy-unit-header">
            <h5 class="enemy-unit-name">${i.name}</h5>
            <div class="enemy-unit-types">
              ${i.unit_types.map(a=>`<span class="unit-type-tag">${a}</span>`).join("")}
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
              <span class="stat-value">${s}</span>
            </div>
          </div>
        </div>
      `}}validateInput(){const t=document.getElementById("run-simulation-btn");if(!t)return!1;const e=document.querySelector('input[name="enemy-type"]:checked'),n=(e==null?void 0:e.value)||"generic";let i=!0,s="";if(n==="generic"){const a=document.getElementById("enemy-groups");if(!a)return!1;const r=a.value.trim();r?isNaN(Number(r))||!Number.isInteger(Number(r))?(i=!1,s="Please enter a valid whole number"):parseInt(r)<1&&(i=!1,s="Number of enemy groups must be at least 1"):(i=!1,s="Please enter the number of enemy groups"),i?(a.classList.remove("error"),this.hideInputError("enemy-groups")):(a.classList.add("error"),this.showInputError("enemy-groups",s))}else n==="specific"&&(this.selectedEnemyUnit||(i=!1,s="Please select an enemy unit for the battle simulation"));return t.disabled=!i||!this.validateArmyComposition(),i}validateArmyComposition(){var t,e;if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const n of this.currentArmy.stackingOrder)if(!((t=n.unit)!=null&&t.name)||n.count<=0||!((e=n.unit)!=null&&e.strength)||n.unit.strength<=0||n.totalHealth<=0)return!1;return!0}showInputError(t,e){var s;const n=document.getElementById(t);if(!n)return;this.hideInputError(t);const i=document.createElement("div");i.className="input-error-message",i.id=`${t}-error`,i.textContent=e,(s=n.parentNode)==null||s.insertBefore(i,n.nextSibling)}hideInputError(t){const e=document.getElementById(`${t}-error`);e&&e.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(e=>{e.addEventListener("mouseenter",n=>this.showTooltip(n)),e.addEventListener("mouseleave",()=>this.hideTooltip()),e.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",e=>{const n=e.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(t){const e=t.target,n=e.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const i=document.getElementById("tooltip"),s=i==null?void 0:i.querySelector(".tooltip-content");!i||!s||(s.innerHTML=this.tooltipData[n],i.classList.remove("hidden"),this.positionTooltip(i,e))}hideTooltip(){const t=document.getElementById("tooltip");t&&t.classList.add("hidden")}toggleTooltip(t){const e=document.getElementById("tooltip");e!=null&&e.classList.contains("hidden")?this.showTooltip(t):this.hideTooltip()}positionTooltip(t,e){const n=e.getBoundingClientRect(),i=t;i.style.top="",i.style.left="",i.style.transform="";const s=t.getBoundingClientRect(),a=window.innerWidth,r=window.innerHeight;let o=n.bottom+10,l=n.left+n.width/2-s.width/2;l<10?l=10:l+s.width>a-10&&(l=a-s.width-10),o+s.height>r-10&&(o=n.top-s.height-10),i.style.top=`${o}px`,i.style.left=`${l}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const t=document.querySelector('input[name="enemy-type"]:checked'),e=(t==null?void 0:t.value)||"generic";this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((a,r)=>{try{if(e==="specific"&&this.selectedEnemyUnit){const o=[{type:this.selectedEnemyUnit.isMortal?"mortal":"infinite",unit:{name:this.selectedEnemyUnit.name,strength:this.selectedEnemyUnit.strength,health:this.selectedEnemyUnit.health,unit_types:this.selectedEnemyUnit.unit_types||[],attack_modifiers:this.selectedEnemyUnit.attack_modifiers||[]},count:this.selectedEnemyUnit.count||1,currentCount:this.selectedEnemyUnit.count||1,groupIndex:0}],l={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(this.currentArmy.stackingOrder)),totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:JSON.parse(JSON.stringify(o)),playerGoesFirst:!0};this.currentBestCase=this.unifiedBattleService.simulateBattle(l);const c={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(this.currentArmy.stackingOrder)),totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:JSON.parse(JSON.stringify(o)),playerGoesFirst:!1};this.currentWorstCase=this.unifiedBattleService.simulateBattle(c)}else{const o=document.getElementById("enemy-groups"),l=parseInt(o.value),c=[];for(let h=0;h<l;h++)c.push({type:"generic",name:`Enemy Group ${h+1}`,groupIndex:h});const m={playerArmy:{stackingOrder:this.currentArmy.stackingOrder,totalStrength:this.currentArmy.totalStrength,totalHealth:this.currentArmy.totalHealth},enemies:c,playerGoesFirst:!0};this.currentBestCase=this.unifiedBattleService.simulateBattle(m);const d={...m,playerGoesFirst:!1};this.currentWorstCase=this.unifiedBattleService.simulateBattle(d)}a()}catch(o){r(o)}}),i=new Promise((a,r)=>{setTimeout(()=>r(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,i]),!this.currentBestCase||!this.currentWorstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const s=document.getElementById("clear-simulation-btn");s&&(s.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let i="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?i="Simulation timed out. Try reducing the complexity or check your army composition.":n.message.includes("invalid")?i="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")?i="Army composition error. Please re-optimize your army and try again.":n.message.includes("Enemy unit")&&(i="Enemy unit configuration error. Please select a valid enemy unit.")),this.showError(i)}}displayResults(){if(!this.currentBestCase||!this.currentWorstCase)return;const t=document.getElementById("simulation-results");t&&(X.displayResults(t,this.currentBestCase,this.currentWorstCase,{includeTooltips:!0,onLogTabChange:()=>this.attachTooltipListeners()}),this.attachTooltipListeners())}clearResults(){this.currentBestCase=null,this.currentWorstCase=null,this.showResults(!1);const t=document.getElementById("clear-simulation-btn");t&&(t.style.display="none")}showLoading(t){const e=document.getElementById("simulation-loading");e&&e.classList.toggle("hidden",!t)}showResults(t){const e=document.getElementById("simulation-results");e&&e.classList.toggle("hidden",!t)}showError(t){this.hideError();const e=document.createElement("div");e.className="simulation-error",e.id="simulation-error",e.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${t}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;const n=document.getElementById("simulation-results");n&&n.parentNode?n.parentNode.insertBefore(e,n):this.container&&this.container.appendChild(e),setTimeout(()=>{this.hideError()},1e4)}hideError(){const t=document.getElementById("simulation-error");t&&t.remove()}addBattleSimulationStyles(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}displayPreCalculatedResults(t){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",t),console.log("BattleSimulationComponent: bestCase structure:",t.bestCase),console.log("BattleSimulationComponent: worstCase structure:",t.worstCase),!this.container){console.log("BattleSimulationComponent: no container");return}if(t.bestCase&&t.worstCase)this.currentBestCase=t.bestCase,this.currentWorstCase=t.worstCase,console.log("BattleSimulationComponent: currentBestCase totalDamageDealt:",this.currentBestCase.totalDamageDealt),console.log("BattleSimulationComponent: currentWorstCase totalDamageDealt:",this.currentWorstCase.totalDamageDealt);else{console.warn("BattleSimulationComponent: Invalid battle analysis format");return}const e=this.container.querySelector("#simulation-results");if(!e){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",e),e.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const n=this.container.querySelector(".simulation-controls"),i=this.container.querySelector(".enemy-input-container");n&&(n.style.display="none"),i&&(i.style.display="none");const s=this.container.querySelector("#simulation-note");s&&(s.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,s.classList.remove("hidden"))}showSimulationControls(){if(!this.container)return;const t=this.container.querySelector(".simulation-controls"),e=this.container.querySelector(".enemy-input-container");t&&(t.style.display="block"),e&&(e.style.display="block")}}class w{static convertToStackingGroups(t){return t.stackingOrder.filter(e=>e.count>0).sort((e,n)=>e.totalHealth-n.totalHealth)}static convertToBattleConfiguration(t){const e=this.convertToStackingGroups(t.playerArmy),n=t.enemyArmy.stackingOrder.filter(i=>i.count>0).reduce((i,s)=>i+Math.min(s.count,100),0);return{playerArmy:{units:{},stackingOrder:e,totalStrength:e.reduce((i,s)=>i+s.count*s.unit.strength,0),totalHealth:e.reduce((i,s)=>i+s.totalHealth,0),totalLeadershipCost:0,totalDominanceCost:0,totalMercenaryCount:0,isValidStacking:!0,efficiencyScore:0},enemyGroupCount:Math.min(n,100),playerGoesFirst:t.playerGoesFirst}}static validateArmyConfiguration(t){const e=[],n=[];let i=0,s=!1;t.stackingOrder.length===0&&e.push("Army must have at least one unit type");for(const o of t.stackingOrder){if(!o.unit){e.push("Invalid unit configuration");continue}o.count<=0?e.push(`Unit "${o.unit.name}" must have a positive quantity`):o.count>1e4&&n.push(`Unit "${o.unit.name}" has a very large quantity (${o.count})`),i+=o.count,o.count>1e5&&(s=!0)}!s&&i>5e4&&n.push(`Army size is very large (${i} total units). This may affect performance.`);const a=t.stackingOrder.map(o=>o.unit.name),r=a.filter((o,l)=>a.indexOf(o)!==l);return r.length>0&&e.push(`Duplicate units found: ${Array.from(new Set(r)).join(", ")}`),{isValid:e.length===0,errors:e,warnings:n,totalUnits:i,hasInfiniteUnits:s}}static createEmptyArmy(t,e){return{stackingOrder:[],totalStrength:0,totalHealth:0,name:e,side:t}}static addUnitToArmy(t,e,n,i=!1){const s=i?N.INFINITE_UNIT_VALUE:n,a=e.health*s,r=t.stackingOrder.findIndex(d=>d.unit.name===e.name),o=[...t.stackingOrder],l={count:s,totalHealth:a,unit:e};r>=0?o[r]=l:o.push(l);const c=o.reduce((d,h)=>d+h.count*h.unit.strength,0),m=o.reduce((d,h)=>d+h.totalHealth,0);return{...t,stackingOrder:o,totalStrength:c,totalHealth:m}}static removeUnitFromArmy(t,e){const n=t.stackingOrder.filter(a=>a.unit.name!==e),i=n.reduce((a,r)=>a+r.count*r.unit.strength,0),s=n.reduce((a,r)=>a+r.totalHealth,0);return{...t,stackingOrder:n,totalStrength:i,totalHealth:s}}static getArmySummary(t){if(t.stackingOrder.length===0)return"No units configured";const e=t.stackingOrder.length,n=t.stackingOrder.filter(s=>s.count>1e5).length,i=t.stackingOrder.filter(s=>s.count<=1e5).reduce((s,a)=>s+a.count,0);return n>0?`${e} unit types (${n} infinite, ${i} finite)`:`${e} unit types, ${i} total units`}}const N={MAX_FINITE_UNITS:1e4,INFINITE_UNIT_VALUE:999999999};class ft{constructor(t){u(this,"container",null);u(this,"props");u(this,"playerUnitSelection",this.createEmptySelection());u(this,"enemyUnitSelection",this.createEmptySelection());this.props=t}mount(t){this.container=t,this.render(),this.attachEventListeners()}unmount(){this.container&&(this.container.innerHTML="",this.container=null)}updateProps(t){this.props={...this.props,...t},this.container&&((t.playerArmy||t.enemyArmy)&&this.updateArmyLists(),(t.availableUnits||t.availableEnemyUnits||t.disabled!==void 0)&&(this.render(),this.attachEventListeners()))}createEmptySelection(){return{selectedUnit:null,quantity:1,isInfinite:!1,isValid:!1}}render(){this.container&&(this.container.innerHTML=`
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
                <span class="army-summary-text">${w.getArmySummary(this.props.playerArmy)}</span>
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
                    max="${N.MAX_FINITE_UNITS}"
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
                <span class="army-summary-text">${w.getArmySummary(this.props.enemyArmy)}</span>
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
                      max="${N.MAX_FINITE_UNITS}"
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
    `,this.addStyles())}renderUnitOptions(t="player"){return(t==="player"?this.props.availableUnits:this.props.availableEnemyUnits||this.props.availableUnits).sort((n,i)=>n.name.localeCompare(i.name)).map(n=>`
        <option value="${n.name}" title="${this.getUnitTooltip(n)}">
          ${n.name} (${n.strength} STR, ${n.health} HP)
        </option>
      `).join("")}getUnitTooltip(t){return`Health: ${t.health}, Strength: ${t.strength}, Types: ${t.unit_types.join(", ")}`}renderArmyList(t,e){return t.stackingOrder.length===0?'<p class="empty-army">No units added</p>':t.stackingOrder.map(n=>{const i=n.count>=N.INFINITE_UNIT_VALUE;return`
        <div class="army-unit-item" data-unit-name="${n.unit.name}">
          <div class="unit-info">
            <span class="unit-name">${n.unit.name}</span>
            <span class="unit-stats">${n.unit.strength} STR • ${n.unit.health} HP</span>
          </div>
          <div class="unit-quantity">
            ${i?'<span class="infinite-badge">∞ Infinite</span>':`<span class="quantity-badge">${n.count.toLocaleString()}</span>`}
          </div>
          <div class="unit-actions">
            <button class="btn-remove" data-side="${e}" data-unit="${n.unit.name}">
              🗑️
            </button>
          </div>
        </div>
      `}).join("")}attachEventListeners(){if(!this.container)return;const t=this.container.querySelector("#player-unit-select"),e=this.container.querySelector("#player-quantity"),n=this.container.querySelector("#add-player-unit"),i=this.container.querySelector("#enemy-unit-select"),s=this.container.querySelector("#enemy-quantity"),a=this.container.querySelector("#enemy-infinite"),r=this.container.querySelector("#add-enemy-unit"),o=this.container.querySelector("#clear-all-armies"),l=this.container.querySelector("#validate-armies");t&&t.addEventListener("change",()=>this.handlePlayerUnitSelection()),e&&e.addEventListener("input",()=>this.handlePlayerQuantityChange()),n&&n.addEventListener("click",()=>this.handleAddPlayerUnit()),i&&i.addEventListener("change",()=>this.handleEnemyUnitSelection()),s&&s.addEventListener("input",()=>this.handleEnemyQuantityChange()),a&&a.addEventListener("change",()=>this.handleEnemyInfiniteToggle()),r&&r.addEventListener("click",()=>this.handleAddEnemyUnit()),o&&o.addEventListener("click",()=>this.handleClearAllArmies()),l&&l.addEventListener("click",()=>this.handleValidateArmies()),this.container.addEventListener("click",c=>{const m=c.target;if(m.classList.contains("btn-remove")){const d=m.dataset.side,h=m.dataset.unit;d&&h&&this.handleRemoveUnit(d,h)}})}handlePlayerUnitSelection(){var i;const t=(i=this.container)==null?void 0:i.querySelector("#player-unit-select");if(!t)return;const e=t.value,n=this.props.availableUnits.find(s=>s.name===e)||null;this.playerUnitSelection={...this.playerUnitSelection,selectedUnit:n,isValid:n!==null&&this.playerUnitSelection.quantity>0},this.updateAddButton("player")}handlePlayerQuantityChange(){var n;const t=(n=this.container)==null?void 0:n.querySelector("#player-quantity");if(!t)return;const e=parseInt(t.value)||0;this.playerUnitSelection={...this.playerUnitSelection,quantity:e,isValid:this.playerUnitSelection.selectedUnit!==null&&e>0},this.updateAddButton("player")}handleEnemyUnitSelection(){var s;const t=(s=this.container)==null?void 0:s.querySelector("#enemy-unit-select");if(!t)return;const e=t.value,i=(this.props.availableEnemyUnits||this.props.availableUnits).find(a=>a.name===e)||null;this.enemyUnitSelection={...this.enemyUnitSelection,selectedUnit:i,isValid:i!==null&&(this.enemyUnitSelection.isInfinite||this.enemyUnitSelection.quantity>0)},this.updateAddButton("enemy")}handleEnemyQuantityChange(){var n;const t=(n=this.container)==null?void 0:n.querySelector("#enemy-quantity");if(!t)return;const e=parseInt(t.value)||0;this.enemyUnitSelection={...this.enemyUnitSelection,quantity:e,isValid:this.enemyUnitSelection.selectedUnit!==null&&(this.enemyUnitSelection.isInfinite||e>0)},this.updateAddButton("enemy")}handleEnemyInfiniteToggle(){var i,s;const t=(i=this.container)==null?void 0:i.querySelector("#enemy-infinite"),e=(s=this.container)==null?void 0:s.querySelector("#enemy-quantity");if(!t||!e)return;const n=t.checked;this.enemyUnitSelection={...this.enemyUnitSelection,isInfinite:n,isValid:this.enemyUnitSelection.selectedUnit!==null&&(n||this.enemyUnitSelection.quantity>0)},e.disabled=n,n&&(e.value="0"),this.updateAddButton("enemy")}updateAddButton(t){var i;const e=(i=this.container)==null?void 0:i.querySelector(`#add-${t}-unit`);if(!e)return;const n=t==="player"?this.playerUnitSelection:this.enemyUnitSelection;e.disabled=!n.isValid||this.props.disabled||!1}handleAddPlayerUnit(){if(!this.playerUnitSelection.selectedUnit||!this.playerUnitSelection.isValid)return;const t=w.addUnitToArmy(this.props.playerArmy,this.playerUnitSelection.selectedUnit,this.playerUnitSelection.quantity,!1);this.props.onPlayerArmyChange(t),this.props={...this.props,playerArmy:t},this.resetPlayerSelection(),this.updateArmyLists()}handleAddEnemyUnit(){if(!this.enemyUnitSelection.selectedUnit||!this.enemyUnitSelection.isValid)return;const t=w.addUnitToArmy(this.props.enemyArmy,this.enemyUnitSelection.selectedUnit,this.enemyUnitSelection.quantity,this.enemyUnitSelection.isInfinite);this.props.onEnemyArmyChange(t),this.props={...this.props,enemyArmy:t},this.resetEnemySelection(),this.updateArmyLists()}handleRemoveUnit(t,e){if(t==="player"){const n=w.removeUnitFromArmy(this.props.playerArmy,e);this.props.onPlayerArmyChange(n),this.props={...this.props,playerArmy:n}}else{const n=w.removeUnitFromArmy(this.props.enemyArmy,e);this.props.onEnemyArmyChange(n),this.props={...this.props,enemyArmy:n}}this.updateArmyLists()}handleClearAllArmies(){const t=w.createEmptyArmy("player","Player Army"),e=w.createEmptyArmy("enemy","Enemy Army");this.props.onPlayerArmyChange(t),this.props.onEnemyArmyChange(e),this.props={...this.props,playerArmy:t,enemyArmy:e},this.updateArmyLists()}handleValidateArmies(){const t=w.validateArmyConfiguration(this.props.playerArmy),e=w.validateArmyConfiguration(this.props.enemyArmy);this.displayValidationResults(t,e)}updateArmyLists(){if(!this.container)return;const t=this.container.querySelector("#player-army-list");t&&(t.innerHTML=this.renderArmyList(this.props.playerArmy,"player"));const e=this.container.querySelector("#enemy-army-list");e&&(e.innerHTML=this.renderArmyList(this.props.enemyArmy,"enemy"));const n=this.container.querySelector(".player-army .army-summary-text");n&&(n.textContent=w.getArmySummary(this.props.playerArmy));const i=this.container.querySelector(".enemy-army .army-summary-text");i&&(i.textContent=w.getArmySummary(this.props.enemyArmy)),this.attachRemoveEventListeners()}attachRemoveEventListeners(){if(!this.container)return;this.container.querySelectorAll(".btn-remove").forEach(e=>{var i;const n=e.cloneNode(!0);(i=e.parentNode)==null||i.replaceChild(n,e),n.addEventListener("click",s=>{const a=s.target,r=a.dataset.side||n.dataset.side,o=a.dataset.unit||n.dataset.unit;r&&o&&this.handleRemoveUnit(r,o)})})}displayValidationResults(t,e){var r;const n=(r=this.container)==null?void 0:r.querySelector("#validation-results");if(!n)return;const i=[...t.errors,...e.errors],s=[...t.warnings,...e.warnings],a=i.length===0;n.innerHTML=`
      <div class="validation-summary ${a?"valid":"invalid"}">
        <h4>${a?"✅ Armies Valid":"❌ Validation Errors"}</h4>
        
        ${i.length>0?`
          <div class="errors">
            <h5>Errors:</h5>
            <ul>
              ${i.map(o=>`<li>${o}</li>`).join("")}
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
          <p><strong>Player Army:</strong> ${w.getArmySummary(this.props.playerArmy)}</p>
          <p><strong>Enemy Army:</strong> ${w.getArmySummary(this.props.enemyArmy)}</p>
        </div>
      </div>
    `,n.classList.remove("hidden")}resetPlayerSelection(){var n,i;this.playerUnitSelection=this.createEmptySelection();const t=(n=this.container)==null?void 0:n.querySelector("#player-unit-select"),e=(i=this.container)==null?void 0:i.querySelector("#player-quantity");t&&(t.value=""),e&&(e.value="1")}resetEnemySelection(){var i,s,a;this.enemyUnitSelection=this.createEmptySelection();const t=(i=this.container)==null?void 0:i.querySelector("#enemy-unit-select"),e=(s=this.container)==null?void 0:s.querySelector("#enemy-quantity"),n=(a=this.container)==null?void 0:a.querySelector("#enemy-infinite");t&&(t.value=""),e&&(e.value="1",e.disabled=!1),n&&(n.checked=!1)}addStyles(){const t="dual-army-input-styles";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
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
    `,document.head.appendChild(e)}}class yt{constructor(t=new H){this.unifiedBattleSimulation=t}convertToUnifiedConfig(t,e){return{playerArmy:{stackingOrder:t.playerArmy.stackingOrder,totalStrength:t.playerArmy.totalStrength,totalHealth:t.playerArmy.totalHealth},enemies:t.enemyArmy.stackingOrder.map((n,i)=>({type:n.count>=N.INFINITE_UNIT_VALUE?"infinite":"mortal",unit:n.unit,groupIndex:i,count:n.count,currentCount:n.count})),playerGoesFirst:e}}calculateComparison(t,e){return{damageDifference:t.totalDamageDealt-e.totalDamageDealt,survivalDifference:t.battleDuration-e.battleDuration,averageDamage:(t.totalDamageDealt+e.totalDamageDealt)/2,averageSurvival:(t.battleDuration+e.battleDuration)/2}}simulateSingle(t,e){const n=this.convertToUnifiedConfig(t,e);return this.unifiedBattleSimulation.simulateBattle(n)}simulateBothScenarios(t){const e=this.simulateSingle(t,!0),n=this.simulateSingle(t,!1);return{bestCase:e,worstCase:n,comparison:this.calculateComparison(e,n),manualConfiguration:t}}validateConfiguration(t){return{isValid:!0,errors:[]}}}class bt{constructor(t){u(this,"container",null);u(this,"props");u(this,"dualArmyForm",null);u(this,"availableUnits",[]);u(this,"enemyUnits",[]);u(this,"enemyUnitLoader");u(this,"enemyUnitStorage");u(this,"manualBattleService");u(this,"currentBattleConfig",null);u(this,"currentAnalysis",null);u(this,"isLoading",!1);this.props=t,this.enemyUnitLoader=new R,this.enemyUnitStorage=new _,this.manualBattleService=new yt,this.initializeDefaultBattleConfig()}async mount(t){this.container=t,await this.loadUnits(),this.render(),this.attachEventListeners()}unmount(){this.dualArmyForm&&(this.dualArmyForm.unmount(),this.dualArmyForm=null),this.container&&(this.container.innerHTML="",this.container=null)}updateProps(t){this.props={...this.props,...t}}initializeDefaultBattleConfig(){this.currentBattleConfig={playerArmy:w.createEmptyArmy("player","Player Army"),enemyArmy:w.createEmptyArmy("enemy","Enemy Army"),playerGoesFirst:!0,battleName:"Custom Battle"}}async loadUnits(){try{this.availableUnits=this.props.unitLoader.getAllUnits(),this.availableUnits.length===0&&(this.availableUnits=await this.props.unitLoader.loadPresetUnits());try{this.enemyUnits=await this.enemyUnitLoader.loadPresetEnemyUnits()}catch(t){console.warn("Could not load enemy_units.json, continuing with regular units only:",t),this.enemyUnits=[]}try{const e=this.enemyUnitStorage.getAllUserEnemyUnits().map(n=>({name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers}));this.enemyUnits.push(...e)}catch(t){console.warn("Could not load user enemy units:",t)}console.log(`Loaded ${this.availableUnits.length} regular units and ${this.enemyUnits.length} enemy units`)}catch(t){console.error("Failed to load units:",t),this.showError("Failed to load unit data. Please refresh the page.")}}convertEnemyUnitToUnit(t){var e;return{name:`${t.name} [Enemy]`,unit_types:t.unit_types,cost_type:"Leadership",health:t.health,strength:t.strength,leadership_cost:0,dominance_cost:0,authority_cost:0,food_consumption:0,carrying_capacity:0,revival_cost_gold:0,revival_cost_silver:0,source_file:"enemy_units",attack_modifiers:((e=t.attack_modifiers)==null?void 0:e.map(n=>({target_type:n.target_type,modifier_type:n.modifier_type,value:n.value})))||void 0}}getEnemyArmyUnits(){const t=this.availableUnits,e=this.enemyUnits.map(n=>this.convertEnemyUnitToUnit(n));return[...t,...e]}render(){!this.container||!this.currentBattleConfig||(this.container.innerHTML=`
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
    `,this.addStyles(),this.mountDualArmyForm(),this.updateSimulateButton())}mountDualArmyForm(){var e;const t=(e=this.container)==null?void 0:e.querySelector("#dual-army-form-container");!t||!this.currentBattleConfig||(this.dualArmyForm&&this.dualArmyForm.unmount(),this.dualArmyForm=new ft({availableUnits:this.availableUnits,availableEnemyUnits:this.getEnemyArmyUnits(),playerArmy:this.currentBattleConfig.playerArmy,enemyArmy:this.currentBattleConfig.enemyArmy,onPlayerArmyChange:n=>this.handlePlayerArmyChange(n),onEnemyArmyChange:n=>this.handleEnemyArmyChange(n),disabled:this.isLoading||this.props.disabled}),this.dualArmyForm.mount(t))}attachEventListeners(){if(!this.container)return;const t=this.container.querySelector("#battle-name");t&&t.addEventListener("input",()=>this.handleBattleNameChange()),this.container.querySelectorAll('input[name="initiative"]').forEach(a=>{a.addEventListener("change",()=>this.handleInitiativeChange())});const n=this.container.querySelector("#simulate-battle"),i=this.container.querySelector("#clear-all"),s=this.container.querySelector("#save-config");n&&n.addEventListener("click",()=>this.handleSimulateBattle()),i&&i.addEventListener("click",()=>this.handleClearAll()),s&&s.addEventListener("click",()=>this.handleSaveConfig())}handlePlayerArmyChange(t){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,playerArmy:t},this.updateSimulateButton(),this.clearResults())}handleEnemyArmyChange(t){this.currentBattleConfig&&(this.currentBattleConfig={...this.currentBattleConfig,enemyArmy:t},this.updateSimulateButton(),this.clearResults())}handleBattleNameChange(){var e;const t=(e=this.container)==null?void 0:e.querySelector("#battle-name");!t||!this.currentBattleConfig||(this.currentBattleConfig={...this.currentBattleConfig,battleName:t.value.trim()||"Custom Battle"})}handleInitiativeChange(){var n;const t=(n=this.container)==null?void 0:n.querySelector('input[name="initiative"]:checked');if(!t||!this.currentBattleConfig)return;const e=t.value;(e==="player"||e==="enemy")&&(this.currentBattleConfig={...this.currentBattleConfig,playerGoesFirst:e==="player"})}updateSimulateButton(){var s;const t=(s=this.container)==null?void 0:s.querySelector("#simulate-battle");if(!t||!this.currentBattleConfig)return;const e=this.currentBattleConfig.playerArmy.stackingOrder.length>0,n=this.currentBattleConfig.enemyArmy.stackingOrder.length>0,i=e&&n&&!this.isLoading&&!this.props.disabled;t.disabled=!i,!e&&!n?t.textContent="🎯 Configure armies to simulate":e?n?this.isLoading?t.textContent="⏳ Simulating...":t.textContent="🎯 Simulate Battle":t.textContent="🎯 Add enemy units to simulate":t.textContent="🎯 Add player units to simulate"}async handleSimulateBattle(){var n;if(!this.currentBattleConfig||this.isLoading)return;const t=w.validateArmyConfiguration(this.currentBattleConfig.playerArmy),e=w.validateArmyConfiguration(this.currentBattleConfig.enemyArmy);if(!t.isValid||!e.isValid){const i=[...t.errors,...e.errors];this.showError(`Cannot simulate battle: ${i.join(", ")}`);return}this.setLoading(!0),this.hideError(),this.clearResults();try{const i=(n=this.container)==null?void 0:n.querySelector('input[name="initiative"]:checked'),s=(i==null?void 0:i.value)||"both";let a;if(s==="both")a=this.manualBattleService.simulateBothScenarios(this.currentBattleConfig);else{const r=s==="player",o=this.manualBattleService.simulateSingle(this.currentBattleConfig,r);a={bestCase:o,worstCase:o,comparison:{damageDifference:0,survivalDifference:0,averageDamage:o.totalDamageDealt,averageSurvival:o.battleDuration},manualConfiguration:this.currentBattleConfig}}this.currentAnalysis=a,this.displayResults(),this.props.onBattleComplete&&this.props.onBattleComplete(a)}catch(i){console.error("Battle simulation failed:",i),this.showError(i instanceof Error?`Battle simulation failed: ${i.message}`:"Battle simulation failed with an unknown error")}finally{this.setLoading(!1)}}handleClearAll(){this.initializeDefaultBattleConfig(),this.clearResults(),this.hideError(),this.render(),this.attachEventListeners()}handleSaveConfig(){if(!this.currentBattleConfig)return;const t=JSON.stringify(this.currentBattleConfig,null,2);console.log("Battle Configuration:",t),this.showStatus("Configuration saved to console (feature in development)","info")}displayResults(){if(!this.currentAnalysis||!this.container)return;const t=this.container.querySelector("#battle-results");if(!t)return;const{bestCase:e,worstCase:n,manualConfiguration:i}=this.currentAnalysis,s=`
      <div class="manual-battle-header">
        <h3>📊 Battle Results: ${i.battleName}</h3>
        <p class="battle-summary">
          ${i.playerArmy.name} vs ${i.enemyArmy.name}
        </p>
        <div class="army-summaries">
          <div class="army-summary player-summary">
            <h4>👤 ${i.playerArmy.name}</h4>
            <p>${w.getArmySummary(i.playerArmy)}</p>
          </div>
          <div class="army-summary enemy-summary">
            <h4>👹 ${i.enemyArmy.name}</h4>
            <p>${w.getArmySummary(i.enemyArmy)}</p>
          </div>
        </div>
      </div>
    `,a=`
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
    `;t.innerHTML=s;const r=document.createElement("div");r.className="shared-battle-results",t.appendChild(r),X.displayResults(r,e,n,{title:"Scenario Analysis",subtitle:"Detailed comparison of best and worst case battle outcomes"});const o=document.createElement("div");o.innerHTML=a,t.appendChild(o),t.classList.remove("hidden"),this.attachResultsEventListeners()}attachResultsEventListeners(){if(!this.container)return;const t=this.container.querySelectorAll(".log-tab");t.forEach(i=>{i.addEventListener("click",s=>{const a=s.target,r=a.dataset.scenario;t.forEach(c=>c.classList.remove("active")),a.classList.add("active"),this.container.querySelectorAll(".combat-log").forEach(c=>{c.classList.remove("active"),c.classList.add("hidden")});const l=this.container.querySelector(`#${r}-case-log`);l&&(l.classList.add("active"),l.classList.remove("hidden"))})});const e=this.container.querySelector("#export-results"),n=this.container.querySelector("#simulate-again");e&&e.addEventListener("click",()=>this.handleExportResults()),n&&n.addEventListener("click",()=>this.handleSimulateAgain())}handleExportResults(){if(!this.currentAnalysis)return;const t=JSON.stringify(this.currentAnalysis,null,2);console.log("Battle Results:",t),this.showStatus("Results exported to console (feature in development)","info")}handleSimulateAgain(){this.clearResults(),this.handleSimulateBattle()}setLoading(t){var i,s;this.isLoading=t;const e=(i=this.container)==null?void 0:i.querySelector("#loading-state"),n=(s=this.container)==null?void 0:s.querySelector("#battle-results");e&&e.classList.toggle("hidden",!t),t&&n&&n.classList.add("hidden"),this.updateSimulateButton(),this.dualArmyForm&&this.dualArmyForm.updateProps({disabled:t||this.props.disabled})}clearResults(){var e;this.currentAnalysis=null;const t=(e=this.container)==null?void 0:e.querySelector("#battle-results");t&&t.classList.add("hidden")}showError(t){var n;const e=(n=this.container)==null?void 0:n.querySelector("#error-display");e&&(e.innerHTML=`
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">${t}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.classList.add('hidden')">×</button>
      </div>
    `,e.classList.remove("hidden"),setTimeout(()=>this.hideError(),1e4))}hideError(){var e;const t=(e=this.container)==null?void 0:e.querySelector("#error-display");t&&t.classList.add("hidden")}showStatus(t,e="info"){var i;const n=(i=this.container)==null?void 0:i.querySelector("#battle-status");n&&(n.innerHTML=`
      <div class="status-message ${e}">
        ${t}
      </div>
    `,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}addStyles(){const t="manual-battle-simulation-styles";if(document.getElementById(t))return;const e=document.createElement("style");e.id=t,e.textContent=`
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
    `,document.head.appendChild(e)}}class vt{constructor(t){u(this,"container",null);u(this,"props");u(this,"storage");u(this,"attackModifiers",{});this.props=t,this.storage=new _}mount(t){this.container=t,this.initializeForm(),this.render(),this.attachEventListeners()}initializeForm(){var t;(t=this.props.editingUnit)!=null&&t.attack_modifiers?(this.attackModifiers={},this.props.editingUnit.attack_modifiers.forEach(e=>{this.attackModifiers[e.target_type]=e.value})):this.attackModifiers={}}render(){var n;if(!this.container)return;const t=this.props.mode==="edit",e=this.props.editingUnit;this.container.innerHTML=`
      <div class="enemy-unit-input-form">
        <div class="card enemy-unit-card">
          <div class="card-header">
            <h2 class="card-title">
              ${t?"✏️ Edit Enemy Unit":"➕ Create New Enemy Unit"}
            </h2>
            <p class="text-secondary">
              ${t?"Modify the enemy unit details below":"Define a custom enemy unit for battle simulations"}
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
                    value="${(e==null?void 0:e.name)||""}"
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
                    value="${(e==null?void 0:e.health)||""}"
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
                    value="${(e==null?void 0:e.strength)||""}"
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
                    value="${((n=e==null?void 0:e.unit_types)==null?void 0:n.join(", "))||""}"
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
                  <span>${t?"💾 Update Enemy Unit":"✅ Create Enemy Unit"}</span>
                </button>
                <button type="button" class="btn btn-secondary btn-lg" id="cancel-btn">
                  <span>❌ Cancel</span>
                </button>
                ${t?`
                  <button type="button" class="btn btn-danger btn-lg" id="delete-btn">
                    <span>🗑️ Delete</span>
                  </button>
                `:""}
              </div>
            </div>
          </form>
        </div>
      </div>
    `,this.addStyles(),this.populateAttackModifiers()}addStyles(){const t=document.createElement("style");t.textContent=`
      .enemy-unit-input-form {
        max-width: 1800px;
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
    `,document.head.appendChild(t)}populateAttackModifiers(){const t=document.getElementById("attack-modifiers-list");if(t){if(Object.keys(this.attackModifiers).length===0){t.innerHTML=`
        <div class="empty-modifiers">
          <p>No attack modifiers defined</p>
          <small>Add modifiers above to give this enemy unit bonuses against specific unit types</small>
        </div>
      `;return}t.innerHTML=Object.entries(this.attackModifiers).map(([e,n])=>`
        <div class="modifier-item" data-unit-type="${e}">
          <div class="modifier-info">
            <span class="modifier-type">${e}</span>
            <span class="modifier-value">+${n.toLocaleString()} strength</span>
          </div>
          <div class="modifier-actions">
            <button type="button" class="btn btn-xs btn-secondary edit-modifier-btn" data-unit-type="${e}">
              ✏️ Edit
            </button>
            <button type="button" class="btn btn-xs btn-danger remove-modifier-btn" data-unit-type="${e}">
              🗑️ Remove
            </button>
          </div>
        </div>
      `).join(""),this.attachModifierEventListeners()}}attachEventListeners(){const t=document.getElementById("enemy-unit-form"),e=document.getElementById("save-btn"),n=document.getElementById("cancel-btn"),i=document.getElementById("delete-btn"),s=document.getElementById("add-modifier-btn");t&&t.addEventListener("submit",this.handleSubmit.bind(this)),e&&e.addEventListener("click",this.handleSubmit.bind(this)),n&&n.addEventListener("click",this.handleCancel.bind(this)),i&&i.addEventListener("click",this.handleDelete.bind(this)),s&&s.addEventListener("click",this.handleAddModifier.bind(this)),this.addValidationListeners();const a=document.getElementById("new-modifier-value");a&&a.addEventListener("keypress",r=>{r.key==="Enter"&&(r.preventDefault(),this.handleAddModifier())})}attachModifierEventListeners(){document.querySelectorAll(".edit-modifier-btn").forEach(t=>{t.addEventListener("click",e=>{const n=e.target.dataset.unitType;n&&this.handleEditModifier(n)})}),document.querySelectorAll(".remove-modifier-btn").forEach(t=>{t.addEventListener("click",e=>{const n=e.target.dataset.unitType;n&&this.handleRemoveModifier(n)})})}addValidationListeners(){["enemy-name","enemy-health","enemy-strength","enemy-unit-types"].forEach(e=>{const n=document.getElementById(e);n&&(n.addEventListener("blur",()=>this.validateField(e)),n.addEventListener("input",()=>this.clearFieldError(e)))})}validateField(t){const e=document.getElementById(t),n=document.getElementById(`${t}-error`);if(!e||!n)return!0;let i;switch(t){case"enemy-name":i=U.validateName(e.value);break;case"enemy-health":i=U.validateHealth(parseInt(e.value));break;case"enemy-strength":i=U.validateStrength(parseInt(e.value));break;case"enemy-unit-types":const s=e.value.split(",").map(a=>a.trim()).filter(a=>a);i=U.validateUnitTypes(s);break;default:return!0}return i.isValid?(e.classList.remove("error"),n.textContent="",!0):(e.classList.add("error"),n.textContent=i.error||"",!1)}clearFieldError(t){const e=document.getElementById(t),n=document.getElementById(`${t}-error`);e&&n&&(e.classList.remove("error"),n.textContent="")}handleAddModifier(){const t=document.getElementById("new-modifier-type"),e=document.getElementById("new-modifier-value");if(!t||!e)return;const n=t.value.trim(),i=parseInt(e.value);if(!n){alert("Please enter a unit type"),t.focus();return}if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)"),e.focus();return}this.attackModifiers[n]&&!confirm(`A modifier for "${n}" already exists. Replace it?`)||(this.attackModifiers[n]=i,t.value="",e.value="",this.populateAttackModifiers(),t.focus())}handleEditModifier(t){const e=this.attackModifiers[t],n=prompt(`Edit strength bonus for "${t}":`,e.toString());if(n===null)return;const i=parseInt(n);if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)");return}this.attackModifiers[t]=i,this.populateAttackModifiers()}handleRemoveModifier(t){confirm(`Remove attack modifier for "${t}"?`)&&(delete this.attackModifiers[t],this.populateAttackModifiers())}handleSubmit(t){if(t.preventDefault(),!this.validateForm())return;const e=this.collectFormData();e&&this.props.onSave(e)}handleCancel(){this.hasUnsavedChanges()?confirm("You have unsaved changes. Are you sure you want to cancel?")&&this.props.onCancel():this.props.onCancel()}handleDelete(){if(!this.props.editingUnit)return;const t=this.props.editingUnit.name;if(confirm(`Are you sure you want to delete "${t}"? This action cannot be undone.`)){const e=this.storage.deleteUserEnemyUnit(this.props.editingUnit.id??"");e.success?this.props.onCancel():alert(`Failed to delete unit: ${e.error}`)}}validateForm(){const t=["enemy-name","enemy-health","enemy-strength","enemy-unit-types"];let e=!0;return t.forEach(n=>{this.validateField(n)||(e=!1)}),e}collectFormData(){var t,e;try{const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength"),a=document.getElementById("enemy-unit-types"),r=n.value.trim(),o=parseInt(i.value),l=parseInt(s.value),c=a.value.split(",").map(p=>p.trim()).filter(p=>p),m=Object.keys(this.attackModifiers).length>0?Object.entries(this.attackModifiers).map(([p,g])=>({target_type:p,modifier_type:"Strength",value:g})):void 0,d={id:((t=this.props.editingUnit)==null?void 0:t.id)||`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,name:r,unit_types:c,health:o,strength:l,attack_modifiers:m,createdAt:((e=this.props.editingUnit)==null?void 0:e.createdAt)||new Date,modifiedAt:new Date},h=U.validateUserEnemyUnit(d);return h.isValid?d:(alert(`Validation failed: ${h.errors.join(", ")}`),null)}catch(n){return console.error("Error collecting form data:",n),alert("Error collecting form data. Please check your inputs."),null}}hasUnsavedChanges(){if(!this.props.editingUnit){const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength");return!!(n!=null&&n.value.trim()||i!=null&&i.value||s!=null&&s.value)}const t=this.collectFormData();if(!t)return!1;const e=this.props.editingUnit;return t.name!==e.name||t.health!==e.health||t.strength!==e.strength||JSON.stringify(t.unit_types)!==JSON.stringify(e.unit_types)||JSON.stringify(t.attack_modifiers)!==JSON.stringify(e.attack_modifiers)}unmount(){this.container&&(this.container.innerHTML="")}}class St{constructor(t){u(this,"container",null);u(this,"props");u(this,"storage");u(this,"userUnits",[]);u(this,"filteredUnits",[]);u(this,"currentFilter","");u(this,"sortBy","name");u(this,"sortOrder","asc");u(this,"selectedUnits",new Set);u(this,"showingForm",!1);u(this,"editingUnit",null);this.props=t,this.storage=new _}mount(t){this.container=t,this.loadData(),this.render(),this.attachEventListeners()}loadData(){this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}updateFilteredUnits(){let t=[...this.userUnits];if(this.currentFilter.trim()){const e=this.currentFilter.toLowerCase();t=t.filter(n=>n.name.toLowerCase().includes(e)||n.unit_types.some(i=>i.toLowerCase().includes(e)))}t.sort((e,n)=>{var s,a,r,o;let i=0;switch(this.sortBy){case"name":i=e.name.localeCompare(n.name);break;case"created":i=(((s=e.createdAt)==null?void 0:s.getTime())??0)-(((a=n.createdAt)==null?void 0:a.getTime())??0);break;case"modified":i=(((r=e.modifiedAt)==null?void 0:r.getTime())??0)-(((o=n.modifiedAt)==null?void 0:o.getTime())??0);break;case"health":i=e.health-n.health;break;case"strength":i=e.strength-n.strength;break}return this.sortOrder==="desc"?-i:i}),this.filteredUnits=t}render(){if(!this.container)return;if(this.showingForm){this.renderForm();return}const t=this.props.mode==="standalone",e=this.storage.getStorageStats();this.container.innerHTML=`
      <div class="enemy-unit-manager ${t?"standalone":"embedded"}">
        ${t?`
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
                  <span class="stat-value">${e.totalUnits}</span>
                  <span class="stat-label">Total Units</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💾</div>
                <div class="stat-info">
                  <span class="stat-value">${Math.round(e.storageSize/1024)}KB</span>
                  <span class="stat-label">Storage Used</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📅</div>
                <div class="stat-info">
                  <span class="stat-value">${e.unitsCreatedToday}</span>
                  <span class="stat-label">Created Today</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🔄</div>
                <div class="stat-info">
                  <span class="stat-value">${e.lastModified?this.formatDate(e.lastModified):"Never"}</span>
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
    `,this.addStyles()}renderForm(){if(!this.container)return;const t=document.createElement("div");this.container.innerHTML="",this.container.appendChild(t),new vt({onSave:this.handleFormSave.bind(this),onCancel:this.handleFormCancel.bind(this),editingUnit:this.editingUnit,mode:this.editingUnit?"edit":"create"}).mount(t)}renderUnitsList(){return this.filteredUnits.length===0?`
        <div class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No custom enemy units</h3>
          <p>Create your first custom enemy unit to get started</p>
          <button class="btn btn-primary" id="create-first-unit">
            ➕ Create Your First Unit
          </button>
        </div>
      `:this.filteredUnits.map(t=>{const e=this.selectedUnits.has(t.id??"");return`
        <div class="unit-item ${e?"selected":""}" data-unit-id="${t.id??""}">
          <div class="unit-checkbox">
            <input 
              type="checkbox" 
              class="unit-select-checkbox" 
              data-unit-id="${t.id}"
              ${e?"checked":""}
            >
          </div>
          
          <div class="unit-content">
            <div class="unit-header">
              <div class="unit-basic-info">
                <h4 class="unit-name">${t.name}</h4>
                <div class="unit-types">
                  ${t.unit_types.map(n=>`<span class="unit-type-tag">${n}</span>`).join("")}
                </div>
              </div>
              
              <div class="unit-stats-summary">
                <div class="stat-item">
                  <span class="stat-icon">❤️</span>
                  <span class="stat-value">${t.health.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">⚔️</span>
                  <span class="stat-value">${t.strength.toLocaleString()}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-icon">📊</span>
                  <span class="stat-value">${(t.strength/t.health).toFixed(3)}</span>
                </div>
              </div>
            </div>
            
            <div class="unit-details">
              <div class="unit-meta">
                <span class="meta-item">
                  <span class="meta-label">Created:</span>
                  <span class="meta-value">${t.createdAt?this.formatDate(t.createdAt):"Unknown"}</span>
                </span>
                <span class="meta-item">
                  <span class="meta-label">Modified:</span>
                  <span class="meta-value">${t.modifiedAt?this.formatDate(t.modifiedAt):"Unknown"}</span>
                </span>
              </div>
              
              ${t.attack_modifiers&&t.attack_modifiers.length>0?`
                <div class="unit-modifiers">
                  <span class="modifiers-label">🎯 Attack Bonuses:</span>
                  <div class="modifiers-list">
                    ${t.attack_modifiers.map(n=>`<span class="modifier-tag">+${n.value.toLocaleString()} vs ${n.target_type}</span>`).join("")}
                  </div>
                </div>
              `:""}
            </div>
          </div>
          
          <div class="unit-actions">
            ${this.props.onUnitSelect?`
              <button class="btn btn-primary btn-sm" data-action="select" data-unit-id="${t.id}">
                👆 Select
              </button>
            `:""}
            <button class="btn btn-secondary btn-sm" data-action="edit" data-unit-id="${t.id}">
              ✏️ Edit
            </button>
            <button class="btn btn-warning btn-sm" data-action="duplicate" data-unit-id="${t.id}">
              📋 Duplicate
            </button>
            <button class="btn btn-danger btn-sm" data-action="delete" data-unit-id="${t.id}">
              🗑️ Delete
            </button>
          </div>
        </div>
      `}).join("")}addStyles(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}attachEventListeners(){const t=document.getElementById("close-manager");t&&t.addEventListener("click",()=>{var c,m;return(m=(c=this.props).onClose)==null?void 0:m.call(c)});const e=document.getElementById("unit-search");e&&e.addEventListener("input",this.handleSearch.bind(this));const n=document.getElementById("clear-search");n&&n.addEventListener("click",this.handleClearSearch.bind(this));const i=document.getElementById("create-unit-btn");i&&i.addEventListener("click",this.handleCreateUnit.bind(this));const s=document.getElementById("create-first-unit");s&&s.addEventListener("click",this.handleCreateUnit.bind(this));const a=document.getElementById("sort-by");a&&a.addEventListener("change",this.handleSortChange.bind(this));const r=document.getElementById("sort-order-btn");r&&r.addEventListener("click",this.handleSortOrderToggle.bind(this));const o=document.getElementById("select-all");o&&o.addEventListener("click",this.handleSelectAll.bind(this));const l=document.getElementById("select-none");l&&l.addEventListener("click",this.handleSelectNone.bind(this)),document.querySelectorAll(".unit-select-checkbox").forEach(c=>{c.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",this.handleUnitAction.bind(this))}),this.attachDropdownListeners(),this.attachImportExportListeners()}attachDropdownListeners(){document.querySelectorAll(".dropdown-toggle").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const n=t.closest(".dropdown");n&&(document.querySelectorAll(".dropdown.open").forEach(i=>{i!==n&&i.classList.remove("open")}),n.classList.toggle("open"))})}),document.addEventListener("click",()=>{document.querySelectorAll(".dropdown.open").forEach(t=>{t.classList.remove("open")})})}attachImportExportListeners(){const t=document.getElementById("import-units");t&&t.addEventListener("click",this.handleImportUnits.bind(this));const e=document.getElementById("export-all");e&&e.addEventListener("click",this.handleExportAll.bind(this));const n=document.getElementById("export-selected");n&&n.addEventListener("click",this.handleExportSelected.bind(this));const i=document.getElementById("delete-selected");i&&i.addEventListener("click",this.handleDeleteSelected.bind(this));const s=document.getElementById("clear-all");s&&s.addEventListener("click",this.handleClearAll.bind(this));const a=document.getElementById("import-file-input");a&&a.addEventListener("change",this.handleFileImport.bind(this))}formatDate(t){const n=new Date().getTime()-t.getTime(),i=Math.floor(n/(1e3*60*60*24));return i===0?"Today":i===1?"Yesterday":i<7?`${i} days ago`:t.toLocaleDateString()}handleFormSave(t){if(this.editingUnit){const e=this.storage.updateUserEnemyUnit(this.editingUnit.id??"",t);e.success?(this.showingForm=!1,this.editingUnit=null,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to update unit: ${e.error}`)}else{const e=this.storage.addUserEnemyUnit(t);e.success?(this.showingForm=!1,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to create unit: ${e.error}`)}}handleFormCancel(){this.showingForm=!1,this.editingUnit=null,this.render(),this.attachEventListeners()}handleSearch(t){const e=t.target;this.currentFilter=e.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleClearSearch(){this.currentFilter="";const t=document.getElementById("unit-search");t&&(t.value=""),this.updateFilteredUnits(),this.refreshUnitsList()}handleCreateUnit(){this.showingForm=!0,this.editingUnit=null,this.render()}handleSortChange(t){const e=t.target;this.sortBy=e.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleSortOrderToggle(){this.sortOrder=this.sortOrder==="asc"?"desc":"asc",this.updateFilteredUnits(),this.refreshUnitsList();const t=document.getElementById("sort-order-btn");t&&(t.textContent=this.sortOrder==="asc"?"⬆️ Ascending":"⬇️ Descending")}handleSelectAll(){this.selectedUnits.clear(),this.filteredUnits.forEach(t=>{t.id&&this.selectedUnits.add(t.id)}),this.refreshSelectionUI()}handleSelectNone(){this.selectedUnits.clear(),this.refreshSelectionUI()}handleCheckboxChange(t){const e=t.target,n=e.dataset.unitId;n&&(e.checked?this.selectedUnits.add(n):this.selectedUnits.delete(n),this.refreshSelectionUI())}handleUnitAction(t){var a,r;const e=t.target,n=e.dataset.action,i=e.dataset.unitId;if(!n||!i)return;const s=this.userUnits.find(o=>o.id===i);if(s)switch(n){case"select":(r=(a=this.props).onUnitSelect)==null||r.call(a,s);break;case"edit":this.editingUnit=s,this.showingForm=!0,this.render();break;case"duplicate":this.handleDuplicateUnit(s);break;case"delete":this.handleDeleteUnit(s);break}}handleDuplicateUnit(t){const n={name:`${t.name} (Copy)`,unit_types:[...t.unit_types],health:t.health,strength:t.strength,attack_modifiers:t.attack_modifiers?[...t.attack_modifiers]:void 0},i=this.storage.addUserEnemyUnit(n);i.success?(this.loadData(),this.refreshUnitsList()):alert(`Failed to duplicate unit: ${i.error}`)}handleDeleteUnit(t){if(confirm(`Are you sure you want to delete "${t.name}"? This action cannot be undone.`)){const e=this.storage.deleteUserEnemyUnit(t.id??"");e.success?(t.id&&this.selectedUnits.delete(t.id),this.loadData(),this.refreshUnitsList()):alert(`Failed to delete unit: ${e.error}`)}}handleImportUnits(){const t=document.getElementById("import-file-input");t&&t.click()}handleFileImport(t){var s;const e=t.target,n=(s=e.files)==null?void 0:s[0];if(!n)return;const i=new FileReader;i.onload=a=>{var r,o;try{const l=(r=a.target)==null?void 0:r.result,c=this.storage.importUserEnemyUnits(l,{skipDuplicates:!0});if(c.success){let m=`Successfully imported ${c.imported} units.`;c.skipped&&c.skipped>0&&(m+=` ${c.skipped} units were skipped.`),c.errors&&c.errors.length>0&&(m+=`

Errors:
${c.errors.join(`
`)}`),alert(m),this.loadData(),this.refreshUnitsList()}else alert(`Import failed: ${((o=c.errors)==null?void 0:o.join(", "))||"Unknown error"}`)}catch{alert("Failed to read file. Please ensure it's a valid JSON file.")}},i.readAsText(n),e.value=""}handleExportAll(){const t=this.storage.exportUserEnemyUnits();t.success&&t.data?this.downloadJson(t.data,"enemy-units-export.json"):alert(`Export failed: ${t.error}`)}handleExportSelected(){if(this.selectedUnits.size===0){alert("No units selected for export.");return}const t=this.userUnits.filter(i=>i.id&&this.selectedUnits.has(i.id)),e={version:"1.0",exportDate:new Date().toISOString(),units:t.map(i=>{var s,a;return{name:i.name,unit_types:i.unit_types,health:i.health,strength:i.strength,attack_modifiers:i.attack_modifiers,createdAt:((s=i.createdAt)==null?void 0:s.toISOString())??new Date().toISOString(),modifiedAt:((a=i.modifiedAt)==null?void 0:a.toISOString())??new Date().toISOString()}})},n=JSON.stringify(e,null,2);this.downloadJson(n,`enemy-units-selected-${this.selectedUnits.size}.json`)}handleDeleteSelected(){if(this.selectedUnits.size===0){alert("No units selected for deletion.");return}const t=this.selectedUnits.size;if(confirm(`Are you sure you want to delete ${t} selected unit${t>1?"s":""}? This action cannot be undone.`)){let e=0;const n=[];this.selectedUnits.forEach(s=>{const a=this.storage.deleteUserEnemyUnit(s);a.success?e++:n.push(`Failed to delete unit: ${a.error}`)}),this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList();let i=`Successfully deleted ${e} unit${e>1?"s":""}.`;n.length>0&&(i+=`

Errors:
${n.join(`
`)}`),alert(i)}}handleClearAll(){if(this.userUnits.length===0){alert("No units to clear.");return}if(confirm(`Are you sure you want to delete ALL ${this.userUnits.length} custom enemy units? This action cannot be undone.`)){const t=this.storage.clearAllUserEnemyUnits();t.success?(this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList(),alert("All custom enemy units have been deleted.")):alert(`Failed to clear units: ${t.error}`)}}downloadJson(t,e){const n=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=e,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}refreshUnitsList(){const t=document.getElementById("units-list");t&&(t.innerHTML=this.renderUnitsList(),document.querySelectorAll(".unit-select-checkbox").forEach(n=>{n.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",this.handleUnitAction.bind(this))}));const e=document.querySelector(".results-info");e&&(e.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}refreshSelectionUI(){document.querySelectorAll(".unit-select-checkbox").forEach(i=>{const s=i,a=s.dataset.unitId;a&&(s.checked=this.selectedUnits.has(a))}),document.querySelectorAll(".unit-item").forEach(i=>{const s=i.dataset.unitId;s&&(this.selectedUnits.has(s)?i.classList.add("selected"):i.classList.remove("selected"))});const t=document.getElementById("bulk-actions-btn");t&&(t.textContent=`📋 Bulk Actions (${this.selectedUnits.size})`,t.disabled=this.selectedUnits.size===0);const e=document.getElementById("select-none");e&&(e.disabled=this.selectedUnits.size===0);const n=document.querySelector(".results-info");n&&(n.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}unmount(){this.container&&(this.container.innerHTML="")}}const Y={tabletSmall:768,tabletLarge:1024};class Et{constructor(){u(this,"currentMode","desktop");u(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(t){this.listeners.push(t)}removeLayoutChangeListener(t){const e=this.listeners.indexOf(t);e>-1&&this.listeners.splice(e,1)}updateLayoutMode(){const t=this.getViewportWidth();let e;t<Y.tabletSmall?e="mobile":t<Y.tabletLarge?e="tablet":e="desktop",e!==this.currentMode&&(this.currentMode=e,this.notifyListeners())}setupResizeListener(){let t;window.addEventListener("resize",()=>{clearTimeout(t),t=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(t=>t(this.currentMode))}}class P{static addSwipeSupport(t,e,n,i=50){if(!("ontouchstart"in window))return;let s=0,a=0,r=0;t.addEventListener("touchstart",o=>{const l=o.touches[0];s=l.clientX,a=l.clientY,r=Date.now()},{passive:!0}),t.addEventListener("touchend",o=>{if(o.changedTouches.length===0)return;const l=o.changedTouches[0],c=l.clientX,m=l.clientY,d=Date.now(),h=c-s,p=m-a;d-r<500&&Math.abs(h)>i&&Math.abs(p)<Math.abs(h)*.5&&(h>0&&n?(o.preventDefault(),n()):h<0&&e&&(o.preventDefault(),e()))},{passive:!1})}static addTouchSupport(t,e){if(t.addEventListener("click",e),"ontouchstart"in window){let n;t.addEventListener("touchstart",i=>{n=Date.now(),t.classList.add("touch-active")}),t.addEventListener("touchend",i=>{t.classList.remove("touch-active"),Date.now()-n<200&&(i.preventDefault(),e())}),t.addEventListener("touchcancel",()=>{t.classList.remove("touch-active")})}}static optimizeScrolling(t){t.style.webkitOverflowScrolling="touch",t.style.scrollBehavior="smooth",t.classList.add("scroll-momentum")}static addHapticFeedback(t){t.addEventListener("touchstart",()=>{t.style.transform="scale(0.98)",t.style.transition="transform 0.1s ease"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t.addEventListener("touchcancel",()=>{t.style.transform="scale(1)"})}static addPullToRefresh(t,e,n=80){if(!("ontouchstart"in window))return;let i=0,s=0,a=!1,r=null;const o=()=>{r||(r=document.createElement("div"),r.className="pull-refresh-indicator",r.innerHTML=`
        <div class="refresh-spinner"></div>
        <span class="refresh-text">Pull to refresh</span>
      `,t.insertBefore(r,t.firstChild))};t.addEventListener("touchstart",l=>{t.scrollTop===0&&!a&&(i=l.touches[0].clientY,o())},{passive:!0}),t.addEventListener("touchmove",l=>{if(t.scrollTop===0&&!a&&r){s=l.touches[0].clientY;const c=Math.max(0,s-i);if(c>0){l.preventDefault();const m=Math.min(c/n,1);r.style.transform=`translateY(${c*.5}px)`,r.style.opacity=m.toString(),c>n?r.querySelector(".refresh-text").textContent="Release to refresh":r.querySelector(".refresh-text").textContent="Pull to refresh"}}},{passive:!1}),t.addEventListener("touchend",async()=>{if(r&&!a)if(s-i>n){a=!0,r.querySelector(".refresh-text").textContent="Refreshing...",r.querySelector(".refresh-spinner").classList.add("spinning");try{await e()}finally{a=!1,r&&(r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300))}}else r.style.transform="translateY(-100%)",r.style.opacity="0",setTimeout(()=>{r&&r.parentNode&&(r.parentNode.removeChild(r),r=null)},300)})}}class D{static updateBodyClasses(t){const e=document.body;e.classList.remove("layout-mobile","layout-tablet","layout-desktop"),e.classList.add(`layout-${t.getCurrentMode()}`),t.isTouchDevice()&&e.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(e=>{e instanceof HTMLElement&&P.optimizeScrolling(e)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&P.addHapticFeedback(e)})}}const x=new Et;x.addLayoutChangeListener(()=>{D.updateBodyClasses(x)});D.updateBodyClasses(x);class Ct{constructor(){u(this,"sections",[]);u(this,"currentActiveSection",null);u(this,"tabContainer",null);u(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var n;const t=document.querySelector(".main-content");if(!t)return;const e=document.createElement("div");e.className="mobile-tab-navigation mobile-only",e.innerHTML=`
      <div class="tab-nav-container">
        ${this.sections.map(i=>`
          <button class="tab-nav-item ${i.id==="config-section"?"active":""}" 
                  data-section="${i.id}">
            <span class="tab-icon">${i.icon}</span>
            <span class="tab-label">${i.title}</span>
          </button>
        `).join("")}
      </div>
    `,(n=t.parentNode)==null||n.insertBefore(e,t),this.tabContainer=e,this.attachTabListeners(),this.addSwipeSupport()}createTabletCollapsibleHeaders(){this.sections.forEach(t=>{if(!t.element)return;const e=document.createElement("div");e.className="collapsible-header tablet-only",e.innerHTML=`
        <div class="collapsible-title">
          <span class="section-icon">${t.icon}</span>
          <h2>${t.title}</h2>
          <span class="collapse-indicator">▼</span>
        </div>
      `,t.element.insertBefore(e,t.element.firstChild),e.addEventListener("click",()=>{this.toggleSectionCollapse(t.id)})})}setupInitialLayout(){const t=x.getCurrentMode();this.applyLayoutMode(t),this.updateTabVisibility()}applyLayoutMode(t){switch(t){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(t=>{t.element&&(t.id===this.currentActiveSection||this.currentActiveSection===null&&t.id==="config-section"?t.element.classList.remove("hidden"):t.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden"):t.element.classList.add("hidden"),t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden","collapsed"):t.element.classList.add("hidden"),t.isCollapsed=!1)})}switchToSection(t){this.currentActiveSection=t,x.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(t){const e=this.sections.find(i=>i.id===t);if(!e||!e.element)return;e.isCollapsed=!e.isCollapsed,e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed");const n=e.element.querySelector(".collapse-indicator");n&&(n.textContent=e.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("disabled"))return;const n=e.getAttribute("data-section");n&&this.switchToSection(n)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section");n===this.currentActiveSection||this.currentActiveSection===null&&n==="config-section"?e.classList.add("active"):e.classList.remove("active")})}setupLayoutListener(){x.addLayoutChangeListener(t=>{this.initialized&&this.applyLayoutMode(t)})}showSection(t){const e=this.sections.find(n=>n.id===t);e&&(!e.element&&(e.element=document.getElementById(t),!e.element)||(e.element.classList.remove("hidden"),e.isAvailable=!0,x.isMobile()&&this.switchToSection(t),this.updateTabVisibility()))}hideSection(t){const e=this.sections.find(n=>n.id===t);!e||!e.element||(e.element.classList.add("hidden"),e.isAvailable=!1,this.updateTabVisibility(),x.isMobile()&&this.currentActiveSection===t&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section"),i=this.sections.find(s=>s.id===n);i&&(i.isAvailable?(e.classList.remove("disabled"),e.disabled=!1):(e.classList.add("disabled"),e.disabled=!0))})}addSwipeSupport(){if(!x.isMobile())return;const t=document.querySelector(".main-content");t&&P.addSwipeSupport(t,()=>this.swipeToNextSection(),()=>this.swipeToPreviousSection())}swipeToNextSection(){const t=this.sections.filter(n=>n.isAvailable),e=t.findIndex(n=>n.id===this.currentActiveSection);if(e<t.length-1){const n=t[e+1];this.switchToSection(n.id)}}swipeToPreviousSection(){const t=this.sections.filter(n=>n.isAvailable),e=t.findIndex(n=>n.id===this.currentActiveSection);if(e>0){const n=t[e-1];this.switchToSection(n.id)}}}const A=new Ct;class B{static createFloatingActionButton(t){const e=document.createElement("button");return e.className=`floating-action-button fab-${t.position||"bottom-right"} fab-${t.color||"primary"}`,e.innerHTML=`
      <span class="fab-icon">${t.icon}</span>
      <span class="fab-label">${t.label}</span>
    `,e.addEventListener("click",t.onClick),e.addEventListener("touchstart",()=>{e.style.transform="scale(0.95)"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e}static showFloatingActionButton(t){if(!x.isMobile())return;this.hideFloatingActionButton(),this.fabContainer||(this.fabContainer=document.createElement("div"),this.fabContainer.className="fab-container",document.body.appendChild(this.fabContainer));const e=this.createFloatingActionButton(t);this.fabContainer.appendChild(e),setTimeout(()=>{e.classList.add("fab-visible")},10)}static hideFloatingActionButton(){this.fabContainer&&this.fabContainer.querySelectorAll(".floating-action-button").forEach(e=>{e.classList.remove("fab-visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)})}static showBottomSheet(t){return new Promise(e=>{if(!x.isMobile()){this.showDesktopModal(t),e();return}this.hideBottomSheet();const n=document.createElement("div");n.className="bottom-sheet-backdrop";const i=document.createElement("div");i.className="bottom-sheet";const s=document.createElement("div");s.className="bottom-sheet-header",s.innerHTML=`
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">${t.title}</h3>
        ${t.dismissible!==!1?'<button class="bottom-sheet-close">×</button>':""}
      `;const a=document.createElement("div");a.className="bottom-sheet-content",typeof t.content=="string"?a.innerHTML=t.content:a.appendChild(t.content);const r=document.createElement("div");if(r.className="bottom-sheet-actions",t.actions&&t.actions.forEach(o=>{const l=document.createElement("button");l.className=`btn btn-${o.style||"secondary"}`,l.textContent=o.label,l.addEventListener("click",()=>{o.onClick(),this.hideBottomSheet(),e()}),r.appendChild(l)}),i.appendChild(s),i.appendChild(a),t.actions&&t.actions.length>0&&i.appendChild(r),this.bottomSheetContainer||(this.bottomSheetContainer=document.createElement("div"),this.bottomSheetContainer.className="bottom-sheet-container",document.body.appendChild(this.bottomSheetContainer)),this.bottomSheetContainer.appendChild(n),this.bottomSheetContainer.appendChild(i),t.dismissible!==!1){n.addEventListener("click",()=>{this.hideBottomSheet(),e()});const o=s.querySelector(".bottom-sheet-close");o&&o.addEventListener("click",()=>{this.hideBottomSheet(),e()})}setTimeout(()=>{n.classList.add("visible"),i.classList.add("visible")},10)})}static hideBottomSheet(){if(this.bottomSheetContainer){const t=this.bottomSheetContainer.querySelector(".bottom-sheet-backdrop"),e=this.bottomSheetContainer.querySelector(".bottom-sheet");t&&e&&(t.classList.remove("visible"),e.classList.remove("visible"),setTimeout(()=>{this.bottomSheetContainer&&(this.bottomSheetContainer.innerHTML="")},300))}}static showDesktopModal(t){const e=typeof t.content=="string"?t.content:t.title;alert(e)}static createMobileDropdown(t,e){x.isMobile()&&t.addEventListener("click",()=>{const n=document.createElement("div");n.className="mobile-dropdown-content",e.forEach(i=>{const s=document.createElement("button");s.className="mobile-dropdown-item",s.textContent=i.label,s.addEventListener("click",()=>{i.onClick(),this.hideBottomSheet()}),n.appendChild(s)}),this.showBottomSheet({title:"Select Option",content:n,dismissible:!0})})}static showMobileLoading(t="Loading..."){if(!x.isMobile())return;const e=document.createElement("div");e.className="mobile-loading-overlay",e.innerHTML=`
      <div class="mobile-loading-content">
        <div class="mobile-loading-spinner"></div>
        <p class="mobile-loading-text">${t}</p>
      </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.classList.add("visible")},10)}static hideMobileLoading(){const t=document.querySelector(".mobile-loading-overlay");t&&(t.classList.remove("visible"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300))}}u(B,"fabContainer",null),u(B,"bottomSheetContainer",null);x.addLayoutChangeListener(b=>{b!=="mobile"&&(B.hideFloatingActionButton(),B.hideBottomSheet())});class T{static initialize(){x.isMobile()&&(this.setupLazyLoading(),this.optimizeScrolling(),this.monitorInteractions(),this.setupMemoryMonitoring())}static setupLazyLoading(){const t=document.querySelectorAll("[data-lazy]");if(t.length===0)return;const e=new IntersectionObserver(n=>{n.forEach(i=>{if(i.isIntersecting){const s=i.target;this.loadElement(s),e.unobserve(s)}})},{rootMargin:"50px",threshold:.1});t.forEach(n=>e.observe(n)),this.observers.set("lazy-loading",e)}static loadElement(t){const e=performance.now(),n=t.dataset.lazy;n&&(t.innerHTML=n,t.removeAttribute("data-lazy"));const i=performance.now();this.metrics.renderTime+=i-e}static optimizeScrolling(){document.querySelectorAll(".combat-log, .unit-family-content, .main-content").forEach(e=>{let n=!1,i;e.addEventListener("scroll",()=>{n||(n=!0,this.requestOptimizedFrame(()=>{this.optimizeScrollFrame(e),n=!1})),clearTimeout(i),i=window.setTimeout(()=>{this.onScrollEnd(e)},150)},{passive:!0})})}static optimizeScrollFrame(t){const e=performance.now();t.getBoundingClientRect();const n=t.children;for(let s=0;s<n.length;s++){const a=n[s],r=a.getBoundingClientRect(),o=r.bottom>-window.innerHeight*2&&r.top<window.innerHeight*3;!o&&!a.classList.contains("scroll-hidden")?(a.classList.add("scroll-hidden"),a.style.visibility="hidden"):o&&a.classList.contains("scroll-hidden")&&(a.classList.remove("scroll-hidden"),a.style.visibility="visible")}const i=performance.now();this.metrics.scrollPerformance+=i-e}static onScrollEnd(t){t.querySelectorAll(".scroll-hidden").forEach(n=>{n.classList.remove("scroll-hidden"),n.style.visibility="visible"})}static requestOptimizedFrame(t){this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{t(),this.rafId=null})}static monitorInteractions(){let t;document.addEventListener("touchstart",()=>{t=performance.now()},{passive:!0}),document.addEventListener("touchend",()=>{if(t){const e=performance.now()-t;this.metrics.interactionTime=Math.max(this.metrics.interactionTime,e)}},{passive:!0})}static setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const t=performance.memory;this.metrics.memoryUsage=t.usedJSHeapSize/t.jsHeapSizeLimit,this.metrics.memoryUsage>.8&&(console.warn("High memory usage detected:",this.metrics.memoryUsage),this.optimizeMemory())},1e4)}static optimizeMemory(){this.observers.forEach((t,e)=>{e!=="lazy-loading"&&(t.disconnect(),this.observers.delete(e))}),"gc"in window&&window.gc()}static getMetrics(){return{...this.metrics}}static resetMetrics(){this.metrics={renderTime:0,interactionTime:0,scrollPerformance:0}}static addMobileCSSOptimizations(){if(!x.isMobile())return;const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}static cleanup(){this.observers.forEach(t=>t.disconnect()),this.observers.clear(),this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}u(T,"metrics",{renderTime:0,interactionTime:0,scrollPerformance:0}),u(T,"observers",new Map),u(T,"rafId",null);x.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{T.initialize(),T.addMobileCSSOptimizations()});x.addLayoutChangeListener(b=>{b!=="mobile"?T.cleanup():(T.initialize(),T.addMobileCSSOptimizations())});class L{static initialize(){this.createScreenReaderAnnouncer(),this.setupFocusManagement(),this.enhanceTabNavigation(),this.addTouchAccessibility(),this.setupKeyboardNavigation()}static createScreenReaderAnnouncer(){this.announcer||(this.announcer=document.createElement("div"),this.announcer.setAttribute("aria-live","polite"),this.announcer.setAttribute("aria-atomic","true"),this.announcer.className="sr-only",this.announcer.style.cssText=`
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `,document.body.appendChild(this.announcer))}static announce(t,e="polite"){this.announcer||this.createScreenReaderAnnouncer(),this.announcer.setAttribute("aria-live",e),this.announcer.textContent=t,setTimeout(()=>{this.announcer&&(this.announcer.textContent="")},1e3)}static setupFocusManagement(){document.addEventListener("focusin",t=>{this.focusTracker=t.target}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&x.isMobile()&&this.restoreFocus()})}static restoreFocus(){if(this.focusTracker&&document.contains(this.focusTracker))this.focusTracker.focus();else{const t=document.querySelector(".main-content > :not(.hidden)");if(t){const e=t.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');e&&e.focus()}}}static enhanceTabNavigation(){const t=document.querySelector(".mobile-tab-navigation");if(!t)return;t.setAttribute("role","tablist"),t.setAttribute("aria-label","Main navigation");const e=t.querySelectorAll(".tab-nav-item");e.forEach((n,i)=>{n.setAttribute("role","tab"),n.setAttribute("aria-selected",i===0?"true":"false"),n.setAttribute("tabindex",i===0?"0":"-1");const s=n.getAttribute("data-section");s&&(n.setAttribute("aria-controls",s),n.id=`tab-${s}`),n.addEventListener("keydown",a=>{this.handleTabKeydown(a,e,i)}),n.addEventListener("click",()=>{var r;const a=((r=n.querySelector(".tab-label"))==null?void 0:r.textContent)||"Section";this.announce(`Switched to ${a} section`),this.updateTabAria(e,i)})})}static handleTabKeydown(t,e,n){let i=n;switch(t.key){case"ArrowLeft":t.preventDefault(),i=n>0?n-1:e.length-1;break;case"ArrowRight":t.preventDefault(),i=n<e.length-1?n+1:0;break;case"Home":t.preventDefault(),i=0;break;case"End":t.preventDefault(),i=e.length-1;break;case"Enter":case" ":t.preventDefault(),e[n].click();return}i!==n&&(this.updateTabAria(e,i),e[i].focus())}static updateTabAria(t,e){t.forEach((n,i)=>{n.setAttribute("aria-selected",i===e?"true":"false"),n.setAttribute("tabindex",i===e?"0":"-1")})}static addTouchAccessibility(){document.addEventListener("touchstart",e=>{const n=e.target;n.matches("button, .unit-card, .tab-nav-item")&&n.setAttribute("aria-pressed","true")},{passive:!0}),document.addEventListener("touchend",e=>{const n=e.target;n.matches("button, .unit-card, .tab-nav-item")&&n.removeAttribute("aria-pressed")},{passive:!0});let t=0;document.addEventListener("touchend",e=>{const n=new Date().getTime(),i=n-t;i<500&&i>0&&e.target.matches(".unit-card, .army-composition")&&this.announce("Double tap to activate","assertive"),t=n})}static setupKeyboardNavigation(){this.addSkipLinks(),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const e=document.querySelector(".bottom-sheet.visible, .mobile-loading-overlay.visible");if(e){t.preventDefault(),this.announce("Modal closed");const n=e.querySelector(".bottom-sheet-close");n&&n.click()}}})}static addSkipLinks(){const t=document.createElement("div");t.className="skip-links",t.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#mobile-navigation" class="skip-link">Skip to navigation</a>
    `,document.body.insertBefore(t,document.body.firstChild);const e=document.querySelector(".main-content");e&&!e.id&&(e.id="main-content");const n=document.querySelector(".mobile-tab-navigation");n&&!n.id&&(n.id="mobile-navigation")}static enhanceFormAccessibility(){document.querySelectorAll("form").forEach(e=>{e.querySelectorAll("input, select, textarea").forEach(i=>{var a;if(!e.querySelector(`label[for="${i.id}"]`)&&i.id){const r=document.createElement("label");r.setAttribute("for",i.id),r.textContent=i.getAttribute("placeholder")||"Input field",r.className="sr-only",(a=i.parentNode)==null||a.insertBefore(r,i)}i.hasAttribute("required")&&(i.setAttribute("aria-required","true"),i.addEventListener("invalid",()=>{this.announce("Required field is empty","assertive")}))}),e.addEventListener("submit",()=>{this.announce("Form submitted")})})}static addDynamicLabels(){document.querySelectorAll(".unit-card").forEach(i=>{var a;const s=(a=i.querySelector(".unit-name"))==null?void 0:a.textContent;s&&!i.getAttribute("aria-label")&&(i.setAttribute("aria-label",`Unit: ${s}`),i.setAttribute("role","button"))}),document.querySelectorAll(".army-composition").forEach((i,s)=>{i.getAttribute("aria-label")||(i.setAttribute("aria-label",`Army composition ${s+1}`),i.setAttribute("role","article"))}),document.querySelectorAll(".combat-action").forEach((i,s)=>{var a;if(!i.getAttribute("aria-label")){const r=((a=i.textContent)==null?void 0:a.substring(0,50))||"Combat action";i.setAttribute("aria-label",`Combat action ${s+1}: ${r}`)}})}static cleanup(){this.announcer&&this.announcer.parentNode&&(this.announcer.parentNode.removeChild(this.announcer),this.announcer=null);const t=document.querySelector(".skip-links");t&&t.parentNode&&t.parentNode.removeChild(t)}}u(L,"focusTracker",null),u(L,"announcer",null);x.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{L.initialize()});x.addLayoutChangeListener(b=>{b!=="mobile"?L.cleanup():L.initialize()});class xt{constructor(){u(this,"container",null);u(this,"unitLoader");u(this,"optimizer",null);u(this,"damageOptimizer",null);u(this,"selectedUnits",new Set);u(this,"mercenaryLimits",{});u(this,"battleSimulation",null);u(this,"manualBattleSimulation",null);u(this,"currentOptimizedArmy",null);u(this,"currentMode","stacking");u(this,"enemyUnitManager",null);u(this,"selectedEnemyUnits",[]);u(this,"currentEnemyUnitSelector",null);u(this,"currentEnemyUnitSelectorContainer",null);u(this,"optimizationAbortController",null);u(this,"optimizationStartTime",0);u(this,"progressUpdateInterval",null);this.unitLoader=new K}async mount(t){this.container=t,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),A.initialize(),this.initializeAdvancedMobileFeatures()}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addUnitSelectionStyles())}addUnitSelectionStyles(){const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}async loadInitialData(){try{await this.unitLoader.loadPresetUnits(),this.displayUnitList(),this.updateOptimizeButton()}catch(t){console.error("Failed to load unit data:",t)}}attachEventListeners(){const t=document.getElementById("stacking-mode-btn"),e=document.getElementById("damage-mode-btn"),n=document.getElementById("enemy-units-btn"),i=document.getElementById("unit-search"),s=document.getElementById("unit-type-filter"),a=document.getElementById("optimize-btn"),r=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),c=document.getElementById("leadership-budget"),m=document.getElementById("dominance-budget"),d=document.getElementById("select-enemy-units-btn"),h=document.getElementById("enemy-count");t&&t.addEventListener("click",()=>this.switchMode("stacking")),e&&e.addEventListener("click",()=>this.switchMode("damage")),n&&n.addEventListener("click",()=>this.switchMode("enemy-units"));const p=document.getElementById("manual-battle-btn");p&&p.addEventListener("click",()=>this.switchMode("manual-battle")),d&&d.addEventListener("click",()=>this.openEnemyUnitSelector()),i&&i.addEventListener("input",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("change",()=>this.filterAndDisplayUnits()),a&&a.addEventListener("click",()=>this.optimizeArmy()),r&&r.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),c&&c.addEventListener("input",()=>this.updateOptimizeButton()),m&&m.addEventListener("input",()=>this.updateOptimizeButton()),h&&h.addEventListener("input",()=>this.handleEnemyGroupsChange()),document.addEventListener("click",g=>{const v=g.target;v.classList.contains("filter-tab")&&this.handleFilterTabClick(v)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const t=document.getElementById("unit-type-filter");if(!t)return;const e=this.unitLoader.getUniqueUnitTypes();t.innerHTML='<option value="">All Unit Types</option>',e.forEach(n=>{const i=document.createElement("option");i.value=n,i.textContent=n,t.appendChild(i)})}updateFilterTabCounts(){const t=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const i=n.getAttribute("data-filter");let s=0;i==="all"?s=t.length:s=t.filter(a=>this.getMainCategory(a)===i).length,n.textContent=`${i==="all"?"All":i} (${s})`})}handleFilterTabClick(t){document.querySelectorAll(".filter-tab").forEach(e=>e.classList.remove("active")),t.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var s,a,r;const t=((s=document.getElementById("unit-search"))==null?void 0:s.value)||"",e=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",n=((r=document.getElementById("unit-type-filter"))==null?void 0:r.value)||"";let i=this.unitLoader.getAllUnits();if(e!=="all"&&(i=i.filter(o=>this.getMainCategory(o)===e)),n&&(i=i.filter(o=>o.unit_types.includes(n))),t){const o=t.toLowerCase();i=i.filter(l=>l.name.toLowerCase().includes(o)||l.unit_types.some(c=>c.toLowerCase().includes(o)))}this.renderGroupedUnits(i),this.updateSelectedSummary()}renderGroupedUnits(t){const e=document.getElementById("unit-groups");if(!e)return;if(e.innerHTML="",t.length===0){e.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(t);Object.entries(n).forEach(([i,s])=>{const a=this.createMainCategoryElement(i,s);e.appendChild(a)}),this.attachAllEventListeners(n)}createHierarchicalGroups(t){const e={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return t.forEach(n=>{const i=this.getMainCategory(n),s=this.getSubCategory(n),a=this.getUnitFamily(n);e[i][s]||(e[i][s]={}),e[i][s][a]||(e[i][s][a]=[]),e[i][s][a].push(n)}),Object.values(e).forEach(n=>{Object.values(n).forEach(i=>{Object.values(i).forEach(s=>{s.sort((a,r)=>a.strength-r.strength)})})}),e}getMainCategory(t){if(t.cost_type==="Mercenary"||(t.authority_cost??0)>0)return"Mercenaries";const e=t.unit_types;return e.includes("Engineer corps")||e.includes("Siege engine")?"Engineer Corps":e.includes("Guardsman")?"Guardsmen":e.includes("Specialist")?"Specialists":e.includes("Beast")||e.includes("Dragon")||e.includes("Giant")||e.includes("Elemental")||e.includes("ELEMENTAL")||e.includes("Flying")&&!e.includes("Human")?"Monsters":e.includes("Human")&&(e.includes("Melee")||e.includes("Ranged")||e.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(t){const e=t.unit_types,n=t.name.toUpperCase(),i=this.getMainCategory(t);if(i==="Mercenaries")return e.includes("Guardsman")?"Elite Forces":"Special Forces";if(i==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(e.includes("Siege engine"))return"Siege Engines"}if(i==="Monsters"){if(e.includes("Dragon"))return"Dragons";if(e.includes("Giant"))return"Giants";if(e.includes("Beast"))return"Beasts";if(e.includes("Elemental")||e.includes("ELEMENTAL"))return"Elementals";if(e.includes("Flying"))return"Flying"}if(i==="Guardsmen"||i==="Specialists"){if(e.includes("Ranged"))return"Ranged";if(e.includes("Melee"))return"Melee";if(e.includes("Mounted"))return"Mounted";if(e.includes("Flying")||e.includes("Beast"))return"Flying";if(e.includes("Scout"))return"Scouts"}return e.includes("Human")?"Infantry":"Other"}getUnitFamily(t){let e=t.name;return e=e.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),e.includes("HEAVY "),e}createMainCategoryElement(t,e){const n=document.createElement("div");n.className="main-category";const i=this.countUnitsInCategory(e),s=this.countSelectedUnitsInCategory(e);return n.innerHTML=`
      <div class="main-category-header" data-category="${t}">
        <div class="category-title">
          <h3>${t} (${s}/${i})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${t}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${t}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(e).map(([a,r])=>this.createSubCategoryHTML(t,a,r)).join("")}
      </div>
    `,n}createSubCategoryHTML(t,e,n){const i=Object.values(n).reduce((a,r)=>a+r.length,0),s=Object.values(n).reduce((a,r)=>a+r.filter(o=>this.selectedUnits.has(o.name)).length,0);return`
      <div class="sub-category" data-category="${t}" data-subcategory="${e}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${e} (${s}/${i})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(n).map(([a,r])=>this.createUnitFamilyHTML(a,r)).join("")}
        </div>
      </div>
    `}createUnitFamilyHTML(t,e){const n=e.filter(i=>this.selectedUnits.has(i.name)).length;return`
      <div class="unit-family" data-family="${t}">
        <div class="unit-family-header">
          <div class="family-title">
            <h5>${t} (${n}/${e.length})</h5>
            <span class="expand-icon">▼</span>
          </div>
          <div class="family-actions">
            <button class="btn btn-xs select-family">Select All</button>
            <button class="btn btn-xs deselect-family">Deselect All</button>
          </div>
        </div>
        <div class="unit-family-content collapsed">
          ${e.map(i=>this.createUnitCard(i)).join("")}
        </div>
      </div>
    `}createUnitCard(t){const e=this.selectedUnits.has(t.name),n=this.getUnitCost(t);return`
      <div class="unit-card ${e?"selected":""}" data-unit="${t.name}">
        <div class="unit-card-header">
          <div class="unit-name">${t.name}</div>
          <div class="unit-cost">${t.cost_type}: ${n}</div>
        </div>
        <div class="unit-stats">
          <span class="stat">HP: ${t.health.toLocaleString()}</span>
          <span class="stat">STR: ${t.strength.toLocaleString()}</span>
        </div>
        <div class="unit-types">${t.unit_types.slice(0,3).join(", ")}${t.unit_types.length>3?"...":""}</div>
      </div>
    `}attachAllEventListeners(t){document.querySelectorAll(".main-category").forEach((e,n)=>{const s=Object.keys(t)[n];if(s){const a=t[s];this.attachMainCategoryListeners(e,s,a)}}),document.querySelectorAll(".sub-category").forEach(e=>{var s;const n=e.getAttribute("data-category"),i=e.getAttribute("data-subcategory");if(n&&i&&((s=t[n])!=null&&s[i])){const a=t[n][i];this.attachSubCategoryListeners(e,a)}}),document.querySelectorAll(".unit-family").forEach(e=>{const n=e.getAttribute("data-family");let i=[];Object.values(t).forEach(s=>{Object.values(s).forEach(a=>{a[n]&&(i=a[n])})}),i.length>0&&this.attachUnitFamilyListeners(e,i)})}countUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((i,s)=>i+s.length,0),0)}countSelectedUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((i,s)=>i+s.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(t,e,n){const i=t.querySelector(".main-category-header"),s=t.querySelector(".main-category-content"),a=t.querySelector(".expand-icon");if(!i||!s||!a){console.warn("Missing main-category elements for",e,{header:!!i,content:!!s,expandIcon:!!a});return}i.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",e,"collapsed:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲"});const r=t.querySelector(".select-category"),o=t.querySelector(".deselect-category");r&&r.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(n)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(t,e){const n=t.querySelector(".sub-category-header"),i=t.querySelector(".sub-category-content"),s=t.querySelector(".expand-icon");if(!n||!i||!s){console.warn("Missing sub-category elements:",{header:!!n,content:!!i,expandIcon:!!s});return}n.addEventListener("click",o=>{if(o.target.classList.contains("btn")){o.stopPropagation();return}console.log("Sub-category header clicked, toggling:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲"});const a=t.querySelector(".select-subcategory"),r=t.querySelector(".deselect-subcategory");a&&a.addEventListener("click",o=>{o.stopPropagation(),this.selectAllInFamilies(e)}),r&&r.addEventListener("click",o=>{o.stopPropagation(),this.deselectAllInFamilies(e)})}attachUnitFamilyListeners(t,e){const n=t.querySelector(".unit-family-header"),i=t.querySelector(".unit-family-content"),s=t.querySelector(".expand-icon");n.addEventListener("click",l=>{l.target.classList.contains("btn")||(i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲")});const a=t.querySelector(".select-family"),r=t.querySelector(".deselect-family");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(e)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(e)}),t.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-unit");if(c){const m=this.unitLoader.getUnitByName(c);m&&this.toggleUnitSelection(m)}})})}getUnitCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost??0;case"Dominance":return t.dominance_cost??0;case"Authority":case"Mercenary":return t.authority_cost??0;default:return 0}}toggleUnitSelection(t){this.selectedUnits.has(t.name)?(this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]):(this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton(),x.isMobile()&&this.addFloatingActionButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(t=>{const e=t.getAttribute("data-unit");e&&(this.selectedUnits.has(e)?t.classList.add("selected"):t.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((t,e)=>{const n=t.querySelector(".category-title h3");if(n){const s=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][e];if(s){const{selected:a,total:r}=this.countUnitsInMainCategory(s),l=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${l} (${a}/${r})`}}}),document.querySelectorAll(".sub-category").forEach(t=>{const e=t.querySelector(".subcategory-title h4"),n=t.getAttribute("data-category"),i=t.getAttribute("data-subcategory");if(e&&n&&i){const{selected:s,total:a}=this.countUnitsInSubCategory(n,i),o=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${o} (${s}/${a})`}}),document.querySelectorAll(".unit-family").forEach(t=>{const e=t.querySelector(".family-title h5"),n=t.getAttribute("data-family");if(e&&n){const{selected:i,total:s}=this.countUnitsInFamily(n),r=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${r} (${i}/${s})`}})}countUnitsInMainCategory(t){const n=this.unitLoader.getAllUnits().filter(s=>this.getMainCategory(s)===t);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}countUnitsInSubCategory(t,e){const i=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===t&&this.getSubCategory(a)===e);return{selected:i.filter(a=>this.selectedUnits.has(a.name)).length,total:i.length}}countUnitsInFamily(t){const n=this.unitLoader.getAllUnits().filter(s=>this.getUnitFamily(s)===t);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}updateSelectedSummary(){const t=document.getElementById("selected-count");t&&(t.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(e=>{const n=e.getAttribute("data-unit");if(n){const i=this.unitLoader.getUnitByName(n);i&&(this.selectedUnits.add(i.name),(i.cost_type==="Mercenary"||i.cost_type==="Authority")&&(this.mercenaryLimits[i.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(t){Object.values(t).forEach(e=>{this.selectAllInFamilies(e)})}deselectAllInCategory(t){Object.values(t).forEach(e=>{this.deselectAllInFamilies(e)})}selectAllInFamilies(t){Object.values(t).forEach(e=>{this.selectAllUnits(e)})}deselectAllInFamilies(t){Object.values(t).forEach(e=>{this.deselectAllUnits(e)})}selectAllUnits(t){t.forEach(e=>{this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(t){t.forEach(e=>{this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const t=document.getElementById("mercenary-limits");if(!t)return;const e=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&(n.cost_type==="Mercenary"||n.cost_type==="Authority"));if(e.length===0){t.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}t.innerHTML="",e.forEach(n=>{if(!n)return;const i=document.createElement("div");i.className="mercenary-item";const s=n.cost_type==="Authority"?"⚔️":"🗡️",a=n.cost_type==="Authority"?`AUTH: ${n.authority_cost}`:`AUTH: ${n.authority_cost}`;i.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${s} ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health}, ${a})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,i.querySelector("input").addEventListener("change",o=>{const l=o.target;this.mercenaryLimits[l.dataset.unit]=parseInt(l.value)||1}),t.appendChild(i)})}updateOptimizeButton(){const t=document.getElementById("optimize-btn"),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!t||!e||!n)return;const i=this.selectedUnits.size>0,s=parseInt(e.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;t.disabled=!i||!s}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(t){console.error("Optimization failed:",t),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new O(t);const e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},s=await this.optimizer.optimizeArmy(i);this.displayStackingResults(s)}async optimizeForDamage(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i=document.getElementById("enemy-count"),s=document.getElementById("max-combinations"),a={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(i.value)||5,maxCombinations:parseInt(s.value)||50,specificEnemyUnits:this.selectedEnemyUnits.length>0?[...this.selectedEnemyUnits]:void 0};await this.runDamageOptimizationWithProgress(a,t)}async runDamageOptimizationWithProgress(t,e){this.optimizationAbortController=new AbortController,x.isMobile()?B.showMobileLoading("Optimizing army composition..."):this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new ht);const n={...t,signal:this.optimizationAbortController.signal,onProgress:s=>{this.updateProgressModal(s.progress,s.message,{combinationsEvaluated:s.combinationsEvaluated,totalToEvaluate:s.totalToEvaluate,phase:s.phase,estimatedRemainingMs:s.estimatedRemainingMs})}},i=await this.damageOptimizer.optimizeForDamage(n,e);await this.delay(500),x.isMobile()?B.hideMobileLoading():this.hideProgressModal(),this.displayDamageResults(i)}catch(n){x.isMobile()?B.hideMobileLoading():this.hideProgressModal(),n instanceof Error&&n.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",n),alert(`Optimization failed: ${n instanceof Error?n.message:"Unknown error"}`))}}delay(t){return new Promise(e=>setTimeout(e,t))}displayStackingResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");!e||!n||!i||(s&&s.classList.remove("hidden"),a&&a.classList.add("hidden"),e.innerHTML=`
      <div class="stat-card">
        <div class="stat-value">${t.compositions.length}</div>
        <div class="stat-label">Valid Solutions</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${t.totalCombinationsEvaluated.toLocaleString()}</div>
        <div class="stat-label">Combinations Tested</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(t.executionTimeMs)}ms</div>
        <div class="stat-label">Execution Time</div>
      </div>
    `,n.innerHTML="",t.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.compositions.forEach((r,o)=>{const l=this.createCompositionElement(r,o+1);n.appendChild(l)}),i.classList.remove("hidden"),A.showSection("results-section"),t.compositions.length>0&&(this.currentOptimizedArmy=t.compositions[0]))}displayDamageResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("damage-army-list"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");if(!e||!n||!i)return;s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const r=document.getElementById("battle-simulation-container");r&&(r.classList.add("hidden"),A.hideSection("battle-simulation-container")),e.innerHTML=`
      <div class="stat-card">
        <div class="stat-value">${t.rankedResults.length}</div>
        <div class="stat-label">Army Options</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${t.combinationsEvaluated.toLocaleString()}</div>
        <div class="stat-label">Combinations Tested</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(t.optimizationTimeMs)}ms</div>
        <div class="stat-label">Execution Time</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${t.algorithmUsed}</div>
        <div class="stat-label">Algorithm</div>
      </div>
    `,n.innerHTML="",t.rankedResults.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.rankedResults.slice(0,10).forEach((o,l)=>{const c=this.createDamageArmyElement(o,l+1);n.appendChild(c)}),i.classList.remove("hidden"),A.showSection("results-section"),x.isMobile()||setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(t){const e=document.getElementById("battle-simulation-container");!e||!this.currentOptimizedArmy||(e.classList.remove("hidden"),A.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new V,this.battleSimulation.initialize(this.unitLoader),this.battleSimulation.mount(e,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(t),x.isMobile()||e.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const t=document.getElementById("battle-simulation-container");t&&(t.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new V,this.battleSimulation.initialize(this.unitLoader)),this.battleSimulation.mount(t,this.currentOptimizedArmy),A.showSection("battle-simulation-container"),x.isMobile()||setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(t,e){var l;const n=document.createElement("div");n.className="army-composition";const i=((l=this.optimizer)==null?void 0:l.explainStacking(t))||"No stacking explanation available",s=`
      <div class="composition-header">
        <div class="composition-title">Solution ${e} ${t.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${t.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=i.split(`
`).map(c=>c.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${c}</h3>`:c.includes("═".repeat(60))?'<hr class="title-divider">':c.includes("📊 ARMY SUMMARY")||c.includes("🗡️ MERCENARY FORCES")||c.includes("👑 LEADERSHIP FORCES")||c.includes("⚡ DOMINANCE FORCES")||c.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${c}</h4>`:c.includes("─".repeat(30))||c.includes("─".repeat(40))?'<hr class="section-divider">':c.includes("└─")?`<div class="unit-detail">${c}</div>`:c.trim()&&!c.includes("═")&&!c.includes("─")?`<div class="unit-line">${c}</div>`:c.trim()===""?'<div class="spacing"></div>':"").filter(c=>c!=="").join(""),r=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${e-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;n.innerHTML=s+'<div class="composition-content">'+a+"</div>"+r;const o=n.querySelector(".simulate-btn");return o&&o.addEventListener("click",()=>{this.currentOptimizedArmy=t,this.showBattleSimulation()}),n}createDamageArmyElement(t,e){const n=document.createElement("div");n.className="damage-army-card",n.setAttribute("data-army-index",(e-1).toString());const i=t.armyComposition.totalDominanceCost===0?"Leadership":t.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",s=i==="Leadership"?"🛡️":i==="Dominance"?"👹":"⚔️";return n.addEventListener("click",()=>this.selectDamageArmy(t,e-1)),n.innerHTML=`
      <div class="damage-army-header">
        <div class="army-rank">#${e}</div>
        <div class="army-strategy">
          <span class="strategy-icon">${s}</span>
          <span class="strategy-label">${i} Strategy</span>
        </div>
        <div class="army-damage">
          <span class="damage-value">${t.averageDamagePerBattle.toLocaleString()}</span>
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
            ${Object.entries(t.armyComposition.units).map(([a,r])=>`<div class="unit-item">
                <span class="unit-count">${r.toLocaleString()}x</span>
                <span class="unit-name">${a}</span>
              </div>`).join("")}
          </div>
        </div>

        <div class="army-stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Strength:</span>
            <span class="stat-value">${t.armyComposition.totalStrength.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Budget Usage:</span>
            <span class="stat-value">${t.armyComposition.totalLeadershipCost}L / ${t.armyComposition.totalDominanceCost}D</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Battle Range:</span>
            <span class="stat-value">${t.battleAnalysis.worstCase.totalDamageDealt.toLocaleString()} - ${t.battleAnalysis.bestCase.totalDamageDealt.toLocaleString()} damage</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Silver Cost:</span>
            <span class="stat-value">${t.totalSilverCost.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Food Cost:</span>
            <span class="stat-value">${t.totalFoodConsumption.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Efficiency:</span>
            <span class="stat-value">${t.damageEfficiencyScore.toFixed(3)}</span>
          </div>
        </div>
      </div>
    `,n}selectDamageArmy(t,e){document.querySelectorAll(".damage-army-card").forEach((i,s)=>{i.classList.toggle("selected",s===e)}),this.showSelectedArmyDetails(t),this.currentOptimizedArmy=t.armyComposition,this.showBattleSimulationWithResults(t.battleAnalysis)}showSelectedArmyDetails(t){const e=document.getElementById("selected-army-details"),n=document.getElementById("selected-army-composition");if(!e||!n)return;const i=t.armyComposition,s=this.unitLoader.getAvailableUnits(Object.keys(i.units)),r=new O(s).explainStacking(i);n.innerHTML=`
      <div class="selected-army-header">
        <h4>Army Composition Details</h4>
        <div class="army-summary-stats">
          <span class="summary-stat">
            <strong>Total Damage:</strong> ${t.averageDamagePerBattle.toLocaleString()}/battle
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
            <span class="performance-value">${t.battleAnalysis.bestCase.totalDamageDealt.toLocaleString()} damage in ${t.battleAnalysis.bestCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Worst Case:</span>
            <span class="performance-value">${t.battleAnalysis.worstCase.totalDamageDealt.toLocaleString()} damage in ${t.battleAnalysis.worstCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Efficiency Score:</span>
            <span class="performance-value">${t.damageEfficiencyScore.toFixed(3)}</span>
          </div>
        </div>
      </div>

      <div class="combat-logs-section">
        <h5>📜 Complete Combat Logs</h5>

        <div class="combat-scenarios">
          <div class="combat-scenario">
            <h6>🟢 Best Case Scenario (You Attack First)</h6>
            <div class="combat-log">
              ${this.formatCombatLog(t.battleAnalysis.bestCase.combatLog)}
            </div>
          </div>

          <div class="combat-scenario">
            <h6>🔴 Worst Case Scenario (Enemy Attacks First)</h6>
            <div class="combat-log">
              ${this.formatCombatLog(t.battleAnalysis.worstCase.combatLog)}
            </div>
          </div>
        </div>
      </div>
    `,e.classList.remove("hidden"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}formatCombatLog(t){return!t||t.length===0?'<div class="no-combat-log">No combat actions recorded</div>':t.map((e,n)=>{const i=e.attacker&&!e.attacker.includes("Enemy");return`
        <div class="combat-action ${i?"player-action":"enemy-action"}">
          <div class="action-header">
            <span class="turn-number">Turn ${e.turn}</span>
            <span class="action-type">${i?"⚔️ Player Attack":"🛡️ Enemy Attack"}</span>
          </div>
          <div class="action-details">
            <strong>${e.attacker}</strong> ${e.action} <strong>${e.target}</strong>
            ${e.damageDealt?`<span class="damage-dealt">(${e.damageDealt.toLocaleString()} damage)</span>`:""}
            ${e.eliminated?'<span class="eliminated-indicator">💀 Eliminated</span>':""}
          </div>
        </div>
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const t=document.getElementById("leadership-budget"),e=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),i=document.getElementById("battle-simulation-container");t&&(t.value="0"),e&&(e.value="0"),n&&(n.classList.add("hidden"),A.hideSection("results-section")),i&&(i.classList.add("hidden"),A.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(t){this.currentMode=t;const e=document.getElementById("stacking-mode-btn"),n=document.getElementById("damage-mode-btn"),i=document.getElementById("enemy-units-btn"),s=document.getElementById("manual-battle-btn");e&&n&&i&&s&&(e.classList.toggle("active",t==="stacking"),n.classList.toggle("active",t==="damage"),i.classList.toggle("active",t==="enemy-units"),s.classList.toggle("active",t==="manual-battle"));const a=document.getElementById("stacking-description"),r=document.getElementById("damage-description");a&&r&&(a.classList.toggle("hidden",t!=="stacking"),r.classList.toggle("hidden",t!=="damage"));const o=document.getElementById("damage-controls");o&&o.classList.toggle("hidden",t!=="damage");const l=document.getElementById("optimize-btn-text");l&&(t==="stacking"?l.textContent="🚀 Optimize Army":t==="damage"?l.textContent="⚔️ Optimize for Damage":t==="enemy-units"?l.textContent="👹 Manage Enemy Units":t==="manual-battle"&&(l.textContent="⚔️ Configure Battle"));const c=document.getElementById("results-title");c&&(t==="stacking"?c.textContent="🎯 Stacking Results":t==="damage"?c.textContent="⚔️ Damage Optimization Results":t==="enemy-units"?c.textContent="👹 Enemy Units Management":t==="manual-battle"&&(c.textContent="⚔️ Manual Battle Results"));const m=document.getElementById("config-section"),d=document.getElementById("results-section"),h=document.getElementById("enemy-units-section"),p=document.getElementById("manual-battle-section"),g=document.getElementById("battle-simulation-container");t==="enemy-units"?(m&&m.classList.add("hidden"),d&&d.classList.add("hidden"),h&&h.classList.remove("hidden"),p&&p.classList.add("hidden"),g&&g.classList.add("hidden"),this.initializeEnemyUnitsManager(),A.hideSection("config-section"),A.hideSection("results-section"),A.showSection("enemy-units-section"),A.hideSection("manual-battle-section"),A.hideSection("battle-simulation-container")):t==="manual-battle"?(m&&m.classList.add("hidden"),d&&d.classList.add("hidden"),h&&h.classList.add("hidden"),p&&p.classList.remove("hidden"),g&&g.classList.add("hidden"),this.initializeManualBattleSimulation(),A.hideSection("config-section"),A.hideSection("results-section"),A.hideSection("enemy-units-section"),A.showSection("manual-battle-section"),A.hideSection("battle-simulation-container")):(m&&m.classList.remove("hidden"),h&&h.classList.add("hidden"),p&&p.classList.add("hidden"),d&&d.classList.add("hidden"),g&&g.classList.add("hidden"),A.showSection("config-section"),A.hideSection("enemy-units-section"),A.hideSection("manual-battle-section"),A.hideSection("results-section"),A.hideSection("battle-simulation-container"))}showLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.remove("hidden")}hideLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.add("hidden")}showProgressModal(){let t=document.getElementById("progress-modal");if(!t){t=document.createElement("div"),t.id="progress-modal",t.className="modal",t.innerHTML=`
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
      `,document.body.appendChild(t);const e=document.getElementById("cancel-optimization-btn");e&&e.addEventListener("click",()=>{this.cancelOptimization()})}t.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(t,e,n){const i=document.getElementById("progress-fill"),s=document.getElementById("progress-text"),a=document.getElementById("progress-percentage"),r=document.getElementById("progress-combinations"),o=document.getElementById("progress-phase"),l=document.getElementById("progress-remaining");if(i&&(i.style.width=`${t}%`),s&&(s.textContent=e),a&&(a.textContent=`${Math.round(t)}%`),r&&n){const c=n.combinationsEvaluated||0,m=n.totalToEvaluate||0;r.textContent=`${c.toLocaleString()} / ${m.toLocaleString()} combinations`}if(o&&(n!=null&&n.phase)&&(o.textContent=n.phase.charAt(0).toUpperCase()+n.phase.slice(1)),l&&(n!=null&&n.estimatedRemainingMs)){const c=Math.ceil(n.estimatedRemainingMs/1e3),m=Math.floor(c/60),d=c%60;l.textContent=`(~${m}:${d.toString().padStart(2,"0")} remaining)`}else l&&(l.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const t=performance.now()-this.optimizationStartTime,e=Math.floor(t/1e3),n=Math.floor(e/60),i=e%60,s=document.getElementById("progress-elapsed");s&&(s.textContent=`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const t=document.getElementById("progress-modal");t&&t.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){D.optimizeCombatLogs(),D.optimizeUnitCards(),this.addTouchSupportToUnitCards(),x.addLayoutChangeListener(t=>{this.handleLayoutModeChange(t)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&P.addHapticFeedback(e)})}handleLayoutModeChange(t){setTimeout(()=>{D.optimizeCombatLogs(),D.optimizeUnitCards(),this.addTouchSupportToUnitCards(),t==="mobile"&&this.initializeAdvancedMobileFeatures()},100)}initializeAdvancedMobileFeatures(){x.isMobile()&&(T.initialize(),L.initialize(),this.addPullToRefresh(),this.addFloatingActionButton(),L.enhanceFormAccessibility(),setTimeout(()=>{L.addDynamicLabels()},500))}addPullToRefresh(){const t=document.querySelector(".main-content");t&&P.addPullToRefresh(t,async()=>{L.announce("Refreshing data..."),await new Promise(e=>setTimeout(e,1e3)),D.optimizeCombatLogs(),D.optimizeUnitCards(),L.addDynamicLabels(),L.announce("Data refreshed")})}addFloatingActionButton(){this.selectedUnits.size>0?B.showFloatingActionButton({icon:"⚡",label:"Quick Optimize",onClick:()=>{L.announce("Starting quick optimization"),this.optimizeArmy()},position:"bottom-right",color:"primary"}):B.hideFloatingActionButton()}initializeEnemyUnitsManager(){const t=document.getElementById("enemy-units-container");t&&(this.enemyUnitManager||(this.enemyUnitManager=new St({mode:"embedded"})),this.enemyUnitManager.mount(t))}async initializeManualBattleSimulation(){const t=document.getElementById("manual-battle-container");t&&(this.manualBattleSimulation||(this.manualBattleSimulation=new bt({unitLoader:this.unitLoader,onBattleComplete:e=>{console.log("Manual battle completed:",e)}})),await this.manualBattleSimulation.mount(t))}openEnemyUnitSelector(){const t=document.getElementById("enemy-count"),e=parseInt((t==null?void 0:t.value)||"5");J(async()=>{const{EnemyUnitSelector:n}=await Promise.resolve().then(()=>gt);return{EnemyUnitSelector:n}},void 0).then(({EnemyUnitSelector:n})=>{const i=document.createElement("div");i.id="enemy-unit-selector-modal",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.right="0",i.style.bottom="0",i.style.zIndex="2000",document.body.appendChild(i);const s=new n({onSelect:a=>{this.handleEnemyUnitSelected(a)},onCancel:()=>{this.closeEnemyUnitSelector(i,s)},mode:"multiple",title:`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${e} selected)`,maxSelections:e,selectedUnits:[...this.selectedEnemyUnits]});this.currentEnemyUnitSelector=s,this.currentEnemyUnitSelectorContainer=i,s.mount(i)}).catch(n=>{console.error("Failed to load EnemyUnitSelector:",n),alert("Failed to open enemy unit selector. Please try again.")})}handleEnemyUnitSelected(t){const e=document.getElementById("enemy-count"),n=parseInt((e==null?void 0:e.value)||"5"),i=this.selectedEnemyUnits.findIndex(s=>s.name===t.name);i>=0?this.selectedEnemyUnits.splice(i,1):this.selectedEnemyUnits.length<n?this.selectedEnemyUnits.push(t):(this.selectedEnemyUnits.shift(),this.selectedEnemyUnits.push(t)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}closeEnemyUnitSelector(t,e){try{e&&typeof e.unmount=="function"&&e.unmount(),t&&t.parentNode&&t.parentNode.removeChild(t),this.currentEnemyUnitSelector=null,this.currentEnemyUnitSelectorContainer=null}catch(n){console.error("Error closing enemy unit selector:",n)}}updateEnemyUnitSelectorTitle(){if(this.currentEnemyUnitSelector&&typeof this.currentEnemyUnitSelector.updateTitle=="function"){const t=document.getElementById("enemy-count"),e=parseInt((t==null?void 0:t.value)||"5"),n=`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${e} selected)`;this.currentEnemyUnitSelector.updateTitle(n),typeof this.currentEnemyUnitSelector.updateSelectedUnits=="function"&&this.currentEnemyUnitSelector.updateSelectedUnits(this.selectedEnemyUnits)}}handleEnemyGroupsChange(){if(this.currentMode==="damage"){const t=document.getElementById("enemy-count"),e=t&&parseInt(t.value)||1;this.selectedEnemyUnits.length>e&&(this.selectedEnemyUnits=this.selectedEnemyUnits.slice(0,e)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}}updateEnemyUnitDisplay(){const t=document.getElementById("select-enemy-units-btn");if(t){const e=document.getElementById("enemy-count"),n=parseInt((e==null?void 0:e.value)||"5");if(this.selectedEnemyUnits.length===0)t.innerHTML=`
          👹 Select Enemy Units
        `,t.classList.remove("enemy-selected");else if(this.selectedEnemyUnits.length===1){const i=this.selectedEnemyUnits[0];t.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${i.name}
          <small class="enemy-stats">(STR: ${i.strength.toLocaleString()}, HP: ${i.health.toLocaleString()})</small>
        `,t.classList.add("enemy-selected")}else t.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${this.selectedEnemyUnits.length} Enemy Units Selected
          <small class="enemy-stats">(${this.selectedEnemyUnits.length}/${n} selected)</small>
        `,t.classList.add("enemy-selected")}}}class At{constructor(t){u(this,"stackingOptimizer");u(this,"unifiedBattleService");this.stackingOptimizer=new O(t),this.unifiedBattleService=new H}async optimize(t,e){const n=performance.now(),i=12e4;console.log("🎯 Starting improved damage optimization"),console.log(`📊 Enemies: ${t.enemies.length}, Available units: ${t.unitsConfig.availableUnitNames.length}`),this.stackingOptimizer=new O(e),this.reportProgress(t,{phase:"initializing",progress:0,message:"Initializing optimization...",elapsedMs:0}),this.validateConfig(t);const s=this.convertEnemyInput(t.enemies,e);this.reportProgress(t,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const a=await this.generateArmyCombinations(t,e);console.log(`🔄 Generated ${a.length} army combinations to evaluate`),this.reportProgress(t,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:0,totalToEvaluate:a.length,elapsedMs:performance.now()-n});const r=[];let o=0;for(let d=0;d<a.length;d++){this.checkCancellation(t);const h=performance.now();if(h-n>i){console.warn(`⏱️ Optimization timeout after ${(h-n)/1e3}s`);break}const p=a[d];try{const g=await this.evaluateArmyComposition(p,s,e);r.push(g),o++}catch(g){console.warn("⚠️ Failed to evaluate army composition:",g)}if(o%3===0&&await new Promise(g=>setTimeout(g,0)),o%10===0||o===a.length){const g=performance.now()-n,v=20+Math.floor(o/a.length*60),f=o>0?g/o*(a.length-o):void 0;this.reportProgress(t,{phase:"evaluating",progress:v,message:`Evaluating combinations... (${o}/${a.length})`,combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:o,totalToEvaluate:a.length,elapsedMs:g,estimatedRemainingMs:f})}}this.reportProgress(t,{phase:"finalizing",progress:90,message:"Finalizing results...",elapsedMs:performance.now()-n});const l=r.sort((d,h)=>{const p=h.averageDamagePerBattle-d.averageDamagePerBattle;return Math.abs(p)>.01?p:h.damageEfficiencyScore-d.damageEfficiencyScore}),m=performance.now()-n;return console.log(`✅ Optimization complete: ${l.length} results in ${m.toFixed(2)}ms`),this.reportProgress(t,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:a.length,totalCombinations:a.length,combinationsEvaluated:o,totalToEvaluate:a.length,elapsedMs:m}),{rankedResults:l,combinationsEvaluated:o,optimizationTimeMs:m,wasTruncated:a.length>(t.maxCombinations||50),enemyConfig:t.enemies,unitsConfig:t.unitsConfig}}async generateArmyCombinations(t,e){const n=t.maxCombinations||50,i=t.unitsConfig.availableUnitNames,s=this.generateUnitCombinations(i,n),a=[];for(const r of s)try{const o=await this.testCombinationWithStackingAlgorithm(r,t,e);o&&a.push(o)}catch(o){console.warn(`⚠️ Failed to test combination [${r.join(", ")}]:`,o)}return a}generateUnitCombinations(t,e){const n=Math.pow(2,t.length)-1;if(n<=e){const i=[];for(let s=1;s<=n;s++){const a=[];for(let r=0;r<t.length;r++)s&1<<r&&a.push(t[r]);i.push(a)}return i.sort((s,a)=>a.length-s.length)}else return this.generateLimitedCombinations(t,e)}generateLimitedCombinations(t,e){const n=[];n.push([...t]);for(let i=0;i<t.length&&n.length<e;i++){const s=t.filter((a,r)=>r!==i);n.push(s)}for(let i=0;i<t.length&&n.length<e;i++)for(let s=i+1;s<t.length&&n.length<e;s++){const a=t.filter((r,o)=>o!==i&&o!==s);a.length>0&&n.push(a)}return n}async testCombinationWithStackingAlgorithm(t,e,n){try{const i={leadershipBudget:e.unitsConfig.leadershipBudget,dominanceBudget:e.unitsConfig.dominanceBudget,mercenaryLimits:e.unitsConfig.mercenaryLimits,availableUnits:t},s=await this.stackingOptimizer.optimizeArmy(i);return s.compositions&&s.compositions.length>0?s.compositions[0]:null}catch(i){return console.warn(`Failed to test combination [${t.join(", ")}]:`,i),null}}async evaluateArmyComposition(t,e,n){const i={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(e)),playerGoesFirst:!0},s=this.unifiedBattleService.simulateBattle(i),a={playerArmy:{stackingOrder:JSON.parse(JSON.stringify(t.stackingOrder)),totalStrength:t.totalStrength,totalHealth:t.totalHealth},enemies:JSON.parse(JSON.stringify(e)),playerGoesFirst:!1},r=this.unifiedBattleService.simulateBattle(a),o={bestCase:s,worstCase:r},l=this.calculateSilverCost(t,n),c=this.calculateFoodConsumption(t,n),m=(s.totalDamageDealt+r.totalDamageDealt)/2,d=t.totalLeadershipCost+t.totalDominanceCost+l,h=d>0?m/d:0,p={bestCaseOutcome:s.outcome.result,worstCaseOutcome:r.outcome.result,averageTurns:(s.battleDuration+r.battleDuration)/2};return{armyComposition:t,battleAnalysis:o,totalSilverCost:l,totalFoodConsumption:c,averageDamagePerBattle:m,damageEfficiencyScore:h,battleSummary:p}}convertEnemyInput(t,e){const n=new Map(e.map(i=>[i.name,i]));return t.map((i,s)=>{if(i.name==="Generic"||!i.strength||!i.health)return{type:"generic",name:i.name==="Generic"?`Generic Enemy ${s+1}`:i.name,groupIndex:s};{const a=n.get(i.name)||{name:i.name,strength:i.strength,health:i.health,unit_types:i.unit_types||[],attack_modifiers:i.attack_modifiers||[]};return i.isFinite?{type:"mortal",unit:a,count:i.count,currentCount:i.count,groupIndex:s}:{type:"infinite",unit:a,groupIndex:s}}})}calculateSilverCost(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const r=n.get(s);r&&(i+=(r.revival_cost_silver??0)*a)}return i}calculateFoodConsumption(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const r=n.get(s);r&&(i+=(r.food_consumption??0)*a)}return i}reportProgress(t,e){t.onProgress&&t.onProgress(e)}checkCancellation(t){var e;if((e=t.signal)!=null&&e.aborted)throw new Error("Operation was cancelled by user")}validateConfig(t){if(!t.enemies||t.enemies.length===0)throw new Error("At least one enemy must be specified");if(!t.unitsConfig.availableUnitNames||t.unitsConfig.availableUnitNames.length===0)throw new Error("At least one unit type must be available for optimization");if(t.unitsConfig.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(t.unitsConfig.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");for(const e of t.enemies)if(e.count<1)throw new Error("Enemy count must be at least 1")}}class wt{constructor(){u(this,"container",null);u(this,"unitLoader");u(this,"enemyUnitLoader");u(this,"enemyUnitStorage");u(this,"optimizer",null);u(this,"units",[]);u(this,"presetEnemies",[]);u(this,"userEnemies",[]);u(this,"abortController",null);u(this,"updateEnemyDebounceTimers",new Map);u(this,"state",{currentStep:"enemy-input",enemyInput:[],unitsConfig:null,optimizationConfig:null,results:null,progress:null,error:null,isLoading:!1,unitSearchTerm:""});u(this,"handleEnemyInputClick",t=>{const e=t.target;if(e.id==="add-enemy-btn"||e.closest("#add-enemy-btn")){t.preventDefault(),this.addEnemyRow();return}const n=e.closest(".remove-enemy");if(n){t.preventDefault();const i=parseInt(n.getAttribute("data-index")||"0");this.removeEnemyRow(i);return}if(t.type==="change"||t.type==="input"){const i=e.closest(".enemy-row");if(i&&(e.tagName==="SELECT"||e.tagName==="INPUT")){const s=parseInt(i.getAttribute("data-index")||"0");e.getAttribute("data-field")==="count"&&t.type==="input"?this.debouncedUpdateEnemyRow(s):setTimeout(()=>this.updateEnemyRow(s),0);return}}});u(this,"handleUnitGridClick",t=>{const n=t.target.closest(".unit-card");if(n){const i=n.getAttribute("data-unit");i&&this.toggleUnitSelection(i)}});this.unitLoader=new K,this.enemyUnitLoader=new R,this.enemyUnitStorage=new _,this.handleUnitGridClick=this.handleUnitGridClick.bind(this)}async mount(t){this.container=t,await this.loadUnits(),this.render(),this.attachEventListeners()}async loadUnits(){try{await this.unitLoader.loadPresetUnits(),this.units=this.unitLoader.getAllUnits(),this.presetEnemies=await this.enemyUnitLoader.loadPresetEnemyUnits(),this.userEnemies=this.enemyUnitStorage.getAllUserEnemyUnits(),this.optimizer=new At(this.units),console.log(`📋 Loaded ${this.units.length} units and ${this.presetEnemies.length+this.userEnemies.length} enemies`)}catch(t){console.error("Failed to load data:",t),this.setState({error:"Failed to load unit data. Please refresh the page."})}}setState(t){this.state={...this.state,...t},this.render(),this.attachEventListeners(),this.attachStepEventListeners()}render(){this.container&&(this.container.innerHTML=`
      <div class="improved-damage-optimizer">
        <!-- Header -->
        <header class="header">
          <h1>⚔️ Improved Damage Optimization</h1>
          <p class="subtitle">Streamlined damage optimization with enhanced battle analysis</p>
        </header>

        <!-- Progress Steps -->
        <div class="progress-steps">
          <div class="step ${this.state.currentStep==="enemy-input"?"active":""} ${this.isStepCompleted("enemy-input")?"completed":""}">
            <div class="step-number">1</div>
            <div class="step-label">Enemy Input</div>
          </div>
          <div class="step ${this.state.currentStep==="units-input"?"active":""} ${this.isStepCompleted("units-input")?"completed":""}">
            <div class="step-number">2</div>
            <div class="step-label">Units & Budgets</div>
          </div>
          <div class="step ${this.state.currentStep==="optimization-config"?"active":""} ${this.isStepCompleted("optimization-config")?"completed":""}">
            <div class="step-number">3</div>
            <div class="step-label">Optimization Config</div>
          </div>
          <div class="step ${this.state.currentStep==="optimization"?"active":""} ${this.isStepCompleted("optimization")?"completed":""}">
            <div class="step-number">4</div>
            <div class="step-label">Optimization</div>
          </div>
          <div class="step ${this.state.currentStep==="results"?"active":""} ${this.isStepCompleted("results")?"completed":""}">
            <div class="step-number">5</div>
            <div class="step-label">Results</div>
          </div>
        </div>

        <!-- Main Content -->
        <main class="main-content">
          ${this.renderCurrentStep()}
        </main>

        <!-- Navigation -->
        <div class="step-navigation">
          ${this.renderNavigation()}
        </div>
      </div>
    `,this.attachStepEventListeners())}renderCurrentStep(){switch(this.state.currentStep){case"enemy-input":return this.renderEnemyInputStep();case"units-input":return this.renderUnitsInputStep();case"optimization-config":return this.renderOptimizationConfigStep();case"optimization":return this.renderOptimizationStep();case"results":return this.renderResultsStep();default:return'<div class="error">Unknown step</div>'}}renderEnemyInputStep(){return`
      <div class="step-content">
        <div class="card">
          <h2 class="card-title">👹 Enemy Configuration</h2>
          <p class="card-description">
            Configure the enemies you want to optimize against. You can add multiple enemy groups.
          </p>

          <!-- Enemy List -->
          <div class="enemy-list" id="enemy-list">
            ${this.state.enemyInput.map((t,e)=>this.renderEnemyRow(t,e)).join("")}
          </div>

          <!-- Add Enemy Button -->
          <button class="btn btn-primary" id="add-enemy-btn">
            <span class="btn-icon">➕</span>
            Add Enemy
          </button>

          <!-- Enemy Management -->
          <div class="enemy-management">
            <h3>Enemy Management:</h3>
            <div class="management-buttons">
              <button class="btn btn-primary" id="manage-enemies-btn">
                <span class="btn-icon">👹</span>
                Manage Custom Enemies
              </button>
              <button class="btn btn-outline" id="refresh-enemies-btn">
                <span class="btn-icon">🔄</span>
                Refresh Enemy List
              </button>
            </div>
          </div>

          <!-- Quick Options -->
          <div class="quick-options">
            <h3>Quick Enemy Setups:</h3>
            <div class="quick-buttons">
              <button class="btn btn-outline" data-quick="generic-3">3 Generic Enemies</button>
              <button class="btn btn-outline" data-quick="generic-5">5 Generic Enemies</button>
              <button class="btn btn-outline" data-quick="mixed">Mixed Enemy Setup</button>
            </div>
          </div>
        </div>
      </div>
    `}getEnemySelectOptions(t){let e='<option value="Generic"'+(t==="Generic"?" selected":"")+">Generic Enemy</option>";return this.presetEnemies.length>0&&(e+='<optgroup label="Preset Enemies">',this.presetEnemies.forEach(n=>{const i=t===n.name?" selected":"";e+=`<option value="${n.name}"${i}>${n.name}</option>`}),e+="</optgroup>"),this.userEnemies.length>0&&(e+='<optgroup label="Custom Enemies">',this.userEnemies.forEach(n=>{const i=t===n.name?" selected":"";e+=`<option value="${n.name}"${i}>${n.name} (Custom)</option>`}),e+="</optgroup>"),this.units.length>0&&(e+='<optgroup label="Player Units as Enemies">',this.units.forEach(n=>{const i=t===n.name?" selected":"";e+=`<option value="${n.name}"${i}>${n.name}</option>`}),e+="</optgroup>"),e}renderEnemyRow(t,e){const n=this.getEnemySelectOptions(t.name);return`
      <div class="enemy-row" data-index="${e}">
        <div class="enemy-fields">
          <div class="field-group">
            <label>Enemy Type:</label>
            <select class="enemy-type-select" data-field="name">
              ${n}
            </select>
          </div>
          
          <div class="field-group">
            <label>Type:</label>
            <select class="enemy-finite-select" data-field="isFinite">
              <option value="false" ${t.isFinite?"":"selected"}>Infinite</option>
              <option value="true" ${t.isFinite?"selected":""}>Finite</option>
            </select>
          </div>
          
          <div class="field-group ${t.isFinite?"":"disabled"}">
            <label>Count:</label>
            <input type="number" min="1" max="100" value="${t.count}" 
                   class="enemy-count" data-field="count" 
                   ${t.isFinite?"":"disabled"}>
            ${t.isFinite?"":'<small class="field-note">Count not needed for infinite enemies</small>'}
          </div>
        </div>
        
        <button class="btn btn-danger btn-small remove-enemy" data-index="${e}">
          <span class="btn-icon">🗑️</span>
        </button>
      </div>
    `}renderUnitsInputStep(){var e,n,i;const t=this.units.filter(s=>s.leadership_cost>0||s.dominance_cost>0||s.authority_cost>0).sort((s,a)=>this.compareUnitNames(s.name,a.name));return`
      <div class="step-content">
        <div class="card">
          <h2 class="card-title">🛡️ Available Units & Budgets</h2>
          <p class="card-description">
            Select which units are available and set your resource budgets.
          </p>

          <!-- Budget Configuration -->
          <div class="budget-config">
            <h3>Resource Budgets:</h3>
            <div class="budget-grid">
              <div class="budget-item">
                <label for="leadership-budget">Leadership Points:</label>
                <input type="number" id="leadership-budget" min="0" value="${((e=this.state.unitsConfig)==null?void 0:e.leadershipBudget)||0}" class="input">
              </div>
              <div class="budget-item">
                <label for="dominance-budget">Dominance Points:</label>
                <input type="number" id="dominance-budget" min="0" value="${((n=this.state.unitsConfig)==null?void 0:n.dominanceBudget)||0}" class="input">
              </div>
            </div>
          </div>

          <!-- Selected Units Summary -->
          <div class="selected-units-section">
            <h3>Selected Units (${((i=this.state.unitsConfig)==null?void 0:i.availableUnitNames.length)||0}):</h3>
            ${this.renderSelectedUnitsDisplay()}
          </div>

          <!-- Unit Selection -->
          <div class="unit-selection">
            <h3>Available Units:</h3>
            <div class="unit-controls">
              <div class="search-box">
                <input type="text" id="unit-search" placeholder="Search units..." class="input">
              </div>
              <div class="selection-controls">
                <button class="btn btn-outline" id="select-all-units">Select All</button>
                <button class="btn btn-outline" id="clear-all-units">Clear All</button>
              </div>
            </div>
            
            <div class="unit-grid" id="unit-grid">
              ${t.map(s=>this.renderUnitCard(s)).join("")}
            </div>
          </div>

          <!-- Mercenary Limits -->
          ${this.renderMercenaryLimitsSection()}

          <!-- Unit Stat Bonuses -->
          ${this.renderUnitStatBonusesSection()}
        </div>
      </div>
    `}renderSelectedUnitsDisplay(){if(!this.state.unitsConfig||this.state.unitsConfig.availableUnitNames.length===0)return`
        <div class="no-selected-units">
          <p>No units selected. Choose units from the list below to include in optimization.</p>
        </div>
      `;const t=this.units.filter(a=>this.state.unitsConfig.availableUnitNames.includes(a.name)),e=t.filter(a=>(a.leadership_cost||0)>0).sort((a,r)=>this.compareUnitNames(a.name,r.name)),n=t.filter(a=>(a.dominance_cost||0)>0).sort((a,r)=>this.compareUnitNames(a.name,r.name)),i=t.filter(a=>(a.authority_cost||0)>0).sort((a,r)=>this.compareUnitNames(a.name,r.name));return`
      <div class="selected-units-display">
        ${e.length>0?`
          <div class="unit-cost-group">
            <h4 class="cost-group-title">👑 Leadership Units (${e.length})</h4>
            <div class="selected-units-grid">
              ${e.map(a=>this.renderSelectedUnitCard(a)).join("")}
            </div>
          </div>
        `:""}
        
        ${n.length>0?`
          <div class="unit-cost-group">
            <h4 class="cost-group-title">⚡ Dominance Units (${n.length})</h4>
            <div class="selected-units-grid">
              ${n.map(a=>this.renderSelectedUnitCard(a)).join("")}
            </div>
          </div>
        `:""}
        
        ${i.length>0?`
          <div class="unit-cost-group">
            <h4 class="cost-group-title">🗡️ Authority Units (${i.length})</h4>
            <div class="selected-units-grid">
              ${i.map(a=>this.renderSelectedUnitCard(a)).join("")}
            </div>
          </div>
        `:""}

      </div>
    `}renderSelectedUnitCard(t){const e=(t.leadership_cost||0)>0?"Leadership":(t.dominance_cost||0)>0?"Dominance":"Authority",n=t.leadership_cost||t.dominance_cost||t.authority_cost||0;return`
      <div class="selected-unit-card">
        <div class="selected-unit-header">
          <h5 class="selected-unit-name">${t.name}</h5>
          <button class="remove-selected-unit" data-unit="${t.name}" title="Remove from selection">
            <span class="remove-icon">×</span>
          </button>
        </div>
        <div class="selected-unit-stats">
          <div class="stat-row">
            <span class="stat-label">Strength:</span>
            <span class="stat-value">${t.strength.toLocaleString()}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Health:</span>
            <span class="stat-value">${t.health.toLocaleString()}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">${e} Cost:</span>
            <span class="stat-value">${n}</span>
          </div>
        </div>
        <div class="selected-unit-types">
          ${t.unit_types.slice(0,3).map(i=>`<span class="unit-type-tag">${i}</span>`).join("")}
        </div>
      </div>
    `}renderUnitCard(t){var s;const e=((s=this.state.unitsConfig)==null?void 0:s.availableUnitNames.includes(t.name))||!1,n=t.leadership_cost>0?"Leadership":t.dominance_cost>0?"Dominance":"Authority",i=t.leadership_cost||t.dominance_cost||t.authority_cost||0;return`
      <div class="unit-card ${e?"selected":""}" data-unit="${t.name}">
        <div class="unit-header">
          <h4 class="unit-name">${t.name}</h4>
          <div class="unit-cost">${n}: ${i}</div>
        </div>
        <div class="unit-stats">
          <div class="stat">STR: ${t.strength}</div>
          <div class="stat">HP: ${t.health}</div>
        </div>
        <div class="unit-types">
          ${t.unit_types.slice(0,2).join(", ")}
        </div>
      </div>
    `}renderMercenaryLimitsSection(){if(!this.state.unitsConfig)return"";const e=this.units.filter(n=>this.state.unitsConfig.availableUnitNames.includes(n.name)).filter(n=>n.cost_type==="Mercenary"||n.cost_type==="Authority");return e.length===0?"":`
      <div class="mercenary-limits">
        <h3>🗡️ Mercenary Limits:</h3>
        <p class="mercenary-help">Set maximum available quantities for mercenary units in optimization.</p>
        <div class="mercenary-grid">
          ${e.map(n=>this.renderMercenaryLimitCard(n)).join("")}
        </div>
      </div>
    `}renderMercenaryLimitCard(t){var s;const e=((s=this.state.unitsConfig)==null?void 0:s.mercenaryLimits[t.name])||1,n=t.cost_type||"Authority",i=t.authority_cost||0;return`
      <div class="mercenary-card">
        <div class="mercenary-info">
          <h4 class="mercenary-name">${t.name}</h4>
          <div class="mercenary-stats">
            <span>STR: ${t.strength}</span>
            <span>HP: ${t.health}</span>
            <span>${n}: ${i}</span>
          </div>
        </div>
        <div class="mercenary-input">
          <label for="merc-limit-${t.name}">Max Available:</label>
          <input type="number" id="merc-limit-${t.name}" min="1" max="100" 
                 value="${e}" data-unit="${t.name}" class="input mercenary-limit-input">
        </div>
      </div>
    `}renderUnitStatBonusesSection(){if(!this.state.unitsConfig||this.state.unitsConfig.availableUnitNames.length===0)return"";const t=this.units.filter(e=>this.state.unitsConfig.availableUnitNames.includes(e.name)).sort((e,n)=>this.compareUnitNames(e.name,n.name));return`
      <div class="unit-stat-bonuses">
        <h3>💪 Unit Stat Bonuses:</h3>
        <p class="bonuses-help">Set percentage bonuses for unit base stats. These are applied before optimization calculations.</p>
        
        ${this.renderBulkBuffControls()}
        
        <div class="bonus-grid">
          ${t.map(e=>this.renderUnitBonusCard(e)).join("")}
        </div>
      </div>
    `}renderBulkBuffControls(){const t=this.units.filter(i=>this.state.unitsConfig.availableUnitNames.includes(i.name));console.log("Selected units for bulk buff:",t.map(i=>i.name));const e=new Map;t.forEach(i=>{const s=this.extractBaseName(i.name);console.log(`Unit ${i.name} -> base name: ${s}`),e.has(s)||e.set(s,[]),e.get(s).push(i)}),console.log("Unit groups:",Array.from(e.entries()));const n=Array.from(e.entries()).filter(([i,s])=>s.length>1);return console.log("Multi-unit groups:",n),n.length===0?(console.log("No multi-unit groups found, not rendering bulk controls"),""):`
      <div class="bulk-buff-controls">
        <h4>🎯 Bulk Buff Application:</h4>
        <p class="bulk-help">Apply the same buff values to all units of the same type at once.</p>
        <div class="bulk-buff-grid">
          ${n.map(([i,s])=>this.renderBulkBuffGroup(i,s)).join("")}
        </div>
      </div>
    `}renderBulkBuffGroup(t,e){return`
      <div class="bulk-buff-group">
        <h5 class="bulk-group-title">${t} (${e.length} units)</h5>
        <div class="bulk-buff-inputs">
          <div class="bulk-input-row">
            <div class="bulk-input-item">
              <label>Health %:</label>
              <input 
                type="number" 
                class="bulk-health-input" 
                data-base-name="${t}"
                min="0" 
                max="500" 
                step="0.1"
                placeholder="0"
              >
            </div>
            <div class="bulk-input-item">
              <label>Strength %:</label>
              <input 
                type="number" 
                class="bulk-strength-input" 
                data-base-name="${t}"
                min="0" 
                max="500" 
                step="0.1"
                placeholder="0"
              >
            </div>
            <button class="apply-bulk-both" data-base-name="${t}">Apply Both</button>
          </div>
        </div>
        <div class="bulk-units-list">
          <small>Units: ${e.map(n=>n.name).join(", ")}</small>
        </div>
      </div>
    `}extractBaseName(t){const e=t.match(/^(.+?)\s+(I{1,3}V?|I?V|I?X{1,3})$/);return e?e[1].trim():t}applyBulkBuffBoth(t){var h,p;const e=(h=this.container)==null?void 0:h.querySelector(`.bulk-health-input[data-base-name="${t}"]`),n=(p=this.container)==null?void 0:p.querySelector(`.bulk-strength-input[data-base-name="${t}"]`),i=(e==null?void 0:e.value.trim())||"",s=(n==null?void 0:n.value.trim())||"";if(!i&&!s)return;const a=i?parseFloat(i):null,r=s?parseFloat(s):null;if(a!==null&&(isNaN(a)||a<0)||r!==null&&(isNaN(r)||r<0)){alert("Please enter valid bonus percentages (0 or greater).");return}const l=this.units.filter(g=>this.state.unitsConfig.availableUnitNames.includes(g.name)).filter(g=>this.extractBaseName(g.name)===t);if(l.length===0){alert(`No units found with base name "${t}".`);return}const c={...this.state.unitsConfig};console.log("Applying bonuses to units:",l.map(g=>g.name)),a!==null&&console.log(`Health: ${a}%`),r!==null&&console.log(`Strength: ${r}%`),l.forEach(g=>{a!==null&&(c.healthBonuses={...c.healthBonuses,[g.name]:a}),r!==null&&(c.strengthBonuses={...c.strengthBonuses,[g.name]:r})}),this.setState({unitsConfig:c});const m=l.map(g=>g.name).join(", "),d=[];a!==null&&d.push(`Health: ${a}%`),r!==null&&d.push(`Strength: ${r}%`),console.log(`Applied ${d.join(", ")} to: ${m}`)}renderUnitBonusCard(t){var o,l;const e=((o=this.state.unitsConfig)==null?void 0:o.healthBonuses[t.name])||0,n=((l=this.state.unitsConfig)==null?void 0:l.strengthBonuses[t.name])||0,i=t.leadership_cost>0?"Leadership":t.dominance_cost>0?"Dominance":"Authority",s=t.leadership_cost||t.dominance_cost||t.authority_cost||0,a=Math.round(t.health*(1+e/100)),r=Math.round(t.strength*(1+n/100));return`
      <div class="bonus-card">
        <div class="bonus-unit-info">
          <h4 class="bonus-unit-name">${t.name}</h4>
          <div class="bonus-unit-stats">
            <div class="base-stats">
              <span class="stat-label">Base:</span>
              <span>STR: ${t.strength}</span>
              <span>HP: ${t.health}</span>
              <span>${i}: ${s}</span>
            </div>
            <div class="buffed-stats">
              <span class="stat-label">Buffed:</span>
              <span class="buffed-strength">STR: ${r} ${n>0?`(+${n}%)`:""}</span>
              <span class="buffed-health">HP: ${a} ${e>0?`(+${e}%)`:""}</span>
            </div>
          </div>
        </div>
        <div class="bonus-inputs">
          <div class="bonus-input-group">
            <label for="health-bonus-${t.name}">Health Bonus (%):</label>
            <input type="number" id="health-bonus-${t.name}" min="0" max="500" step="0.1"
                   value="${e}" data-unit="${t.name}" data-stat="health" 
                   class="input health-bonus-input" placeholder="0">
          </div>
          <div class="bonus-input-group">
            <label for="strength-bonus-${t.name}">Strength Bonus (%):</label>
            <input type="number" id="strength-bonus-${t.name}" min="0" max="500" step="0.1"
                   value="${n}" data-unit="${t.name}" data-stat="strength" 
                   class="input strength-bonus-input" placeholder="0">
          </div>
        </div>
      </div>
    `}renderOptimizationConfigStep(){const t=this.state.optimizationConfig||this.getDefaultOptimizationConfig();return`
      <div class="step-content">
        <div class="card">
          <h2 class="card-title">⚙️ Optimization Settings</h2>
          <p class="card-description">
            Configure how many combinations to test and time limits for the optimization process.
          </p>

          <div class="config-section">
            <div class="config-grid">
              <div class="config-item">
                <label for="max-combinations" class="config-label">
                  <strong>Maximum Combinations to Test:</strong>
                </label>
                <input type="number" id="max-combinations" min="1000" max="500000" step="1000" 
                       value="${t.maxCombinations}" class="input config-input">
                <p class="config-help">
                  Higher values give better results but take longer to compute. 
                  Recommended: 10,000-50,000 for quick results, 100,000+ for thorough analysis.
                </p>
              </div>
              
              <div class="config-item">
                <label for="max-time" class="config-label">
                  <strong>Maximum Time (seconds):</strong>
                </label>
                <input type="number" id="max-time" min="30" max="3600" step="30" 
                       value="${t.maxOptimizationTimeSeconds}" class="input config-input">
                <p class="config-help">
                  Optimization will stop after this time limit, even if not all combinations are tested.
                  Recommended: 60-300 seconds for most cases.
                </p>
              </div>
            </div>
          </div>

          <div class="config-section">
            <h3>Quick Presets</h3>
            <div class="preset-buttons">
              <button class="btn btn-outline" data-preset="fast">⚡ Fast (10K, 60s)</button>
              <button class="btn btn-outline" data-preset="balanced">⚖️ Balanced (50K, 300s)</button>
              <button class="btn btn-outline" data-preset="thorough">🔍 Thorough (200K, 600s)</button>
            </div>
          </div>
        </div>
      </div>
    `}renderOptimizationStep(){var t,e,n;return`
      <div class="step-content">
        <div class="card">
          <h2 class="card-title">⚡ Running Optimization</h2>
          <p class="card-description">
            Optimizing army compositions against your enemy configuration...
          </p>

          <!-- Configuration Summary -->
          <div class="config-summary">
            <h3>Configuration Summary:</h3>
            <div class="summary-grid">
              <div class="summary-item">
                <strong>Enemies:</strong> ${this.state.enemyInput.length} groups
              </div>
              <div class="summary-item">
                <strong>Available Units:</strong> ${((t=this.state.unitsConfig)==null?void 0:t.availableUnitNames.length)||0}
              </div>
              <div class="summary-item">
                <strong>Leadership Budget:</strong> ${((e=this.state.unitsConfig)==null?void 0:e.leadershipBudget)||0}
              </div>
              <div class="summary-item">
                <strong>Dominance Budget:</strong> ${((n=this.state.unitsConfig)==null?void 0:n.dominanceBudget)||0}
              </div>
            </div>
          </div>

          <!-- Progress Display -->
          <div class="progress-display">
            ${this.renderProgressDisplay()}
          </div>

          <!-- Cancel Button -->
          <div class="optimization-controls">
            <button class="btn btn-danger" id="cancel-optimization" ${this.state.isLoading?"":"disabled"}>
              Cancel Optimization
            </button>
          </div>
        </div>
      </div>
    `}renderProgressDisplay(){if(!this.state.progress)return'<div class="progress-placeholder">Preparing optimization...</div>';const t=this.state.progress;return`
      <div class="progress-container">
        <div class="progress-header">
          <h4>Phase: ${t.phase}</h4>
          <span class="progress-percentage">${t.progress}%</span>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${t.progress}%"></div>
        </div>
        
        <div class="progress-message">${t.message}</div>
        
        ${t.combinationsEvaluated!==void 0?`
          <div class="progress-details">
            <div class="detail-item">
              <span>Evaluated:</span>
              <span>${t.combinationsEvaluated}/${t.totalToEvaluate||0}</span>
            </div>
            <div class="detail-item">
              <span>Elapsed:</span>
              <span>${(t.elapsedMs/1e3).toFixed(1)}s</span>
            </div>
            ${t.estimatedRemainingMs?`
              <div class="detail-item">
                <span>Remaining:</span>
                <span>${(t.estimatedRemainingMs/1e3).toFixed(1)}s</span>
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}renderResultsStep(){if(!this.state.results||this.state.results.rankedResults.length===0)return`
        <div class="step-content">
          <div class="card">
            <h2 class="card-title">📊 Results</h2>
            <div class="no-results">
              <p>No optimization results available.</p>
              <button class="btn btn-primary" id="restart-optimization">Start New Optimization</button>
            </div>
          </div>
        </div>
      `;const t=this.state.results;return`
      <div class="step-content">
        <div class="card">
          <h2 class="card-title">📊 Optimization Results</h2>
          <p class="card-description">
            Top army compositions ranked by damage output
          </p>

          <!-- Results Summary -->
          <div class="results-summary">
            <div class="summary-stats">
              <div class="stat-item">
                <strong>${t.rankedResults.length}</strong>
                <span>Valid Compositions</span>
              </div>
              <div class="stat-item">
                <strong>${t.combinationsEvaluated}</strong>
                <span>Combinations Tested</span>
              </div>
              <div class="stat-item">
                <strong>${(t.optimizationTimeMs/1e3).toFixed(1)}s</strong>
                <span>Optimization Time</span>
              </div>
            </div>
          </div>

          <!-- Results List -->
          <div class="results-list scrollable-results">
            ${t.rankedResults.slice(0,10).map((e,n)=>this.renderResultCard(e,n)).join("")}
          </div>

          <!-- Actions -->
          <div class="results-actions">
            <button class="btn btn-primary" id="restart-optimization">New Optimization</button>
            <button class="btn btn-secondary" id="export-results">Export Results</button>
          </div>
        </div>
      </div>
    `}renderResultCard(t,e){return`
      <div class="result-card" data-index="${e}">
        <div class="result-header">
          <h4 class="result-rank">#${e+1}</h4>
          <div class="result-damage">
            <strong>${t.averageDamagePerBattle.toFixed(0)}</strong>
            <span>Avg Damage</span>
          </div>
        </div>
        
        <div class="result-composition">
          <h5>Army Composition:</h5>
          <div class="unit-list">
            ${Object.entries(t.armyComposition.units).map(([n,i])=>`<span class="unit-item">${i}x ${n}</span>`).join("")}
          </div>
        </div>
        
        <div class="result-stats">
          <div class="stat-row">
            <span>Efficiency Score:</span>
            <span>${t.damageEfficiencyScore.toFixed(2)}</span>
          </div>
          <div class="stat-row">
            <span>Army Cost:</span>
            <span>L:${t.armyComposition.totalLeadershipCost} D:${t.armyComposition.totalDominanceCost}</span>
          </div>
          <div class="stat-row">
            <span>Silver Cost:</span>
            <span>${t.totalSilverCost.toLocaleString()}</span>
          </div>
          <div class="stat-row">
            <span>Food Consumption:</span>
            <span>${t.totalFoodConsumption.toLocaleString()}</span>
          </div>
          <div class="stat-row">
            <span>Battle Outcome:</span>
            <span>Best: ${t.battleSummary.bestCaseOutcome} | Worst: ${t.battleSummary.worstCaseOutcome}</span>
          </div>
        </div>
        
        <div class="result-actions">
          <button class="btn btn-outline btn-small view-details" data-index="${e}">
            View Combat Logs
          </button>
        </div>
      </div>
    `}renderNavigation(){const t=this.state.currentStep!=="enemy-input",e=this.canProceedToNextStep(),n=this.getNextStepLabel();return`
      <div class="nav-buttons">
        <button class="btn btn-secondary" id="back-btn" ${t?"":"disabled"}>
          ← Back
        </button>
        <button class="btn btn-primary" id="next-btn" ${e?"":"disabled"}>
          ${n} →
        </button>
      </div>
    `}isStepCompleted(t){switch(t){case"enemy-input":return this.state.enemyInput.length>0;case"units-input":return this.state.unitsConfig!==null;case"optimization-config":return this.state.optimizationConfig!==null;case"optimization":return this.state.results!==null;case"results":return!1;default:return!1}}canProceedToNextStep(){var e,n,i;switch(this.state.currentStep){case"enemy-input":return this.state.enemyInput.length>0;case"units-input":const s=this.state.unitsConfig!==null,a=((e=this.state.unitsConfig)==null?void 0:e.availableUnitNames.length)>0,r=((n=this.state.unitsConfig)==null?void 0:n.leadershipBudget)>0||((i=this.state.unitsConfig)==null?void 0:i.dominanceBudget)>0;return s&&a&&r;case"optimization-config":return this.state.optimizationConfig!==null;case"optimization":return!this.state.isLoading;case"results":return!1;default:return!1}}getNextStepLabel(){switch(this.state.currentStep){case"enemy-input":return"Configure Units";case"units-input":return"Optimization Settings";case"optimization-config":return"Start Optimization";case"optimization":return"View Results";case"results":return"Complete";default:return"Next"}}attachEventListeners(){if(!this.container)return;const t=this.container.querySelector("#back-btn"),e=this.container.querySelector("#next-btn");console.log("Attaching event listeners - nextBtn found:",!!e),t==null||t.addEventListener("click",()=>{console.log("Back button clicked"),this.goToPreviousStep()}),e==null||e.addEventListener("click",()=>{console.log("Next button clicked, current step:",this.state.currentStep),console.log("Can proceed:",this.canProceedToNextStep()),console.log("Enemy input:",this.state.enemyInput),this.goToNextStep()})}attachStepEventListeners(){if(this.container)switch(this.state.currentStep){case"enemy-input":this.attachEnemyInputListeners();break;case"units-input":this.attachUnitsInputListeners();break;case"optimization-config":this.attachOptimizationConfigListeners();break;case"optimization":this.attachOptimizationListeners();break;case"results":this.attachResultsListeners();break}}attachEnemyInputListeners(){var i,s,a,r;const t=(i=this.container)==null?void 0:i.querySelector(".step-content");t&&(t.removeEventListener("click",this.handleEnemyInputClick),t.removeEventListener("change",this.handleEnemyInputClick),t.removeEventListener("input",this.handleEnemyInputClick),t.addEventListener("click",this.handleEnemyInputClick),t.addEventListener("change",this.handleEnemyInputClick),t.addEventListener("input",this.handleEnemyInputClick));const e=(s=this.container)==null?void 0:s.querySelector("#manage-enemies-btn");e==null||e.addEventListener("click",()=>this.openEnemyManager());const n=(a=this.container)==null?void 0:a.querySelector("#refresh-enemies-btn");n==null||n.addEventListener("click",()=>this.refreshEnemyList()),(r=this.container)==null||r.querySelectorAll("[data-quick]").forEach(o=>{o.addEventListener("click",l=>{const c=l.target.getAttribute("data-quick");this.applyQuickEnemySetup(c)})})}attachUnitsInputListeners(){var r,o,l,c,m,d,h,p,g,v;const t=(r=this.container)==null?void 0:r.querySelector("#leadership-budget"),e=(o=this.container)==null?void 0:o.querySelector("#dominance-budget");t==null||t.addEventListener("change",()=>this.updateBudgets()),e==null||e.addEventListener("change",()=>this.updateBudgets());const n=(l=this.container)==null?void 0:l.querySelector("#unit-grid");n&&(n.removeEventListener("click",this.handleUnitGridClick),n.addEventListener("click",this.handleUnitGridClick)),(c=this.container)==null||c.querySelectorAll(".remove-selected-unit").forEach(f=>{f.addEventListener("click",S=>{var C;S.stopPropagation();const E=(C=S.target.closest(".remove-selected-unit"))==null?void 0:C.getAttribute("data-unit");this.toggleUnitSelection(E)})});const i=(m=this.container)==null?void 0:m.querySelector("#select-all-units"),s=(d=this.container)==null?void 0:d.querySelector("#clear-all-units");i==null||i.addEventListener("click",()=>this.selectAllUnits()),s==null||s.addEventListener("click",()=>this.clearAllUnits()),(h=this.container)==null||h.querySelectorAll(".apply-bulk-both").forEach(f=>{f.addEventListener("click",S=>{const E=S.target.getAttribute("data-base-name");this.applyBulkBuffBoth(E)})});const a=(p=this.container)==null?void 0:p.querySelector("#unit-search");a&&(a.value=this.state.unitSearchTerm,this.filterUnits(this.state.unitSearchTerm),a.addEventListener("input",()=>{this.state.unitSearchTerm=a.value,this.filterUnits(a.value)})),(g=this.container)==null||g.querySelectorAll(".mercenary-limit-input").forEach(f=>{f.addEventListener("change",S=>{const E=S.target,C=E.getAttribute("data-unit"),k=parseInt(E.value)||1;C&&this.state.unitsConfig&&this.setState({unitsConfig:{...this.state.unitsConfig,mercenaryLimits:{...this.state.unitsConfig.mercenaryLimits,[C]:k}}})})}),(v=this.container)==null||v.querySelectorAll(".health-bonus-input, .strength-bonus-input").forEach(f=>{f.addEventListener("change",S=>{const E=S.target,C=E.getAttribute("data-unit"),k=E.getAttribute("data-stat"),M=parseFloat(E.value)||0;if(C&&k&&this.state.unitsConfig){const F=k==="health"?"healthBonuses":"strengthBonuses";this.setState({unitsConfig:{...this.state.unitsConfig,[F]:{...this.state.unitsConfig[F],[C]:M}}})}})})}attachOptimizationConfigListeners(){var n,i,s;const t=(n=this.container)==null?void 0:n.querySelector("#max-combinations"),e=(i=this.container)==null?void 0:i.querySelector("#max-time");[t,e].forEach(a=>{a==null||a.addEventListener("change",()=>this.updateOptimizationConfig())}),(s=this.container)==null||s.querySelectorAll("[data-preset]").forEach(a=>{a.addEventListener("click",r=>{const o=r.target.getAttribute("data-preset");this.applyOptimizationPreset(o)})})}attachOptimizationListeners(){var e;const t=(e=this.container)==null?void 0:e.querySelector("#cancel-optimization");t==null||t.addEventListener("click",()=>this.cancelOptimization())}attachResultsListeners(){var n,i,s;const t=(n=this.container)==null?void 0:n.querySelector("#restart-optimization"),e=(i=this.container)==null?void 0:i.querySelector("#export-results");t==null||t.addEventListener("click",()=>this.restartOptimization()),e==null||e.addEventListener("click",()=>this.exportResults()),(s=this.container)==null||s.querySelectorAll(".view-details").forEach(a=>{a.addEventListener("click",r=>{const o=parseInt(r.target.getAttribute("data-index")||"0");this.viewResultDetails(o)})})}getDefaultOptimizationConfig(){return{maxCombinations:5e4,maxOptimizationTimeSeconds:300}}goToPreviousStep(){const t=["enemy-input","units-input","optimization","results"],e=t.indexOf(this.state.currentStep);e>0&&this.setState({currentStep:t[e-1]})}async goToNextStep(){switch(this.state.currentStep){case"enemy-input":this.state.unitsConfig?(console.log("Using existing unitsConfig:",this.state.unitsConfig),this.setState({currentStep:"units-input"})):(console.log("Creating new unitsConfig with empty array"),this.setState({currentStep:"units-input",unitsConfig:{availableUnitNames:[],leadershipBudget:0,dominanceBudget:0,mercenaryLimits:{},healthBonuses:{},strengthBonuses:{}}}));break;case"units-input":this.state.optimizationConfig?this.setState({currentStep:"optimization-config"}):this.setState({currentStep:"optimization-config",optimizationConfig:this.getDefaultOptimizationConfig()});break;case"optimization-config":await this.startOptimization();break;case"optimization":this.setState({currentStep:"results"});break}}addEnemyRow(){const t={name:"Generic",count:1,isFinite:!0};this.setState({enemyInput:[...this.state.enemyInput,t]})}removeEnemyRow(t){const e=this.state.enemyInput.filter((n,i)=>i!==t);this.setState({enemyInput:e})}debouncedUpdateEnemyRow(t){this.updateEnemyDebounceTimers.has(t)&&clearTimeout(this.updateEnemyDebounceTimers.get(t));const e=window.setTimeout(()=>{this.updateEnemyRowSilently(t),this.updateEnemyDebounceTimers.delete(t)},500);this.updateEnemyDebounceTimers.set(t,e)}updateEnemyRowSilently(t){var l;const e=(l=this.container)==null?void 0:l.querySelector(`[data-index="${t}"]`);if(!e)return;const n=e.querySelector('[data-field="name"]'),i=e.querySelector('[data-field="count"]'),a=e.querySelector('[data-field="isFinite"]').value==="true",r={name:n.value,count:a&&parseInt(i.value)||1,isFinite:a};if(r.name!=="Generic"){const c=this.presetEnemies.find(m=>m.name===r.name);if(c)r.strength=c.strength,r.health=c.health,r.unit_types=c.unit_types,r.attack_modifiers=c.attack_modifiers;else{const m=this.userEnemies.find(d=>d.name===r.name);m&&(r.strength=m.strength,r.health=m.health,m.unit&&(r.unit_types=m.unit.unit_types,r.attack_modifiers=m.unit.attack_modifiers))}}const o=[...this.state.enemyInput];o[t]=r,this.state.enemyInput=o}updateEnemyRow(t){var c;const e=(c=this.container)==null?void 0:c.querySelector(`[data-index="${t}"]`);if(!e)return;const n=e.querySelector('[data-field="name"]'),i=e.querySelector('[data-field="count"]'),a=e.querySelector('[data-field="isFinite"]').value==="true",r=i.closest(".field-group");a?(r==null||r.classList.remove("disabled"),i.disabled=!1):(r==null||r.classList.add("disabled"),i.disabled=!0,i.value="1");const o={name:n.value,count:a&&parseInt(i.value)||1,isFinite:a};if(o.name!=="Generic"){const m=this.presetEnemies.find(d=>d.name===o.name);if(m)o.strength=m.strength,o.health=m.health,o.unit_types=m.unit_types,o.attack_modifiers=m.attack_modifiers;else{const d=this.userEnemies.find(h=>h.name===o.name);if(d)o.strength=d.strength,o.health=d.health,o.unit_types=d.unit_types,o.attack_modifiers=d.attack_modifiers;else{const h=this.units.find(p=>p.name===o.name);h&&(o.strength=h.strength,o.health=h.health,o.unit_types=h.unit_types,o.attack_modifiers=h.attack_modifiers)}}}const l=[...this.state.enemyInput];l[t]=o,this.setState({enemyInput:l})}applyQuickEnemySetup(t){let e=[];switch(t){case"generic-3":e=Array(3).fill(null).map(()=>({name:"Generic",count:1,isFinite:!1}));break;case"generic-5":e=Array(5).fill(null).map(()=>({name:"Generic",count:1,isFinite:!1}));break;case"mixed":if(e=[],e.push({name:"Generic",count:2,isFinite:!1}),this.presetEnemies.length>0){const n=this.presetEnemies[0];e.push({name:n.name,count:1,isFinite:!0,strength:n.strength,health:n.health,unit_types:n.unit_types,attack_modifiers:n.attack_modifiers})}if(this.presetEnemies.length>1){const n=this.presetEnemies[1];e.push({name:n.name,count:3,isFinite:!1,strength:n.strength,health:n.health,unit_types:n.unit_types,attack_modifiers:n.attack_modifiers})}e.length===1&&(e.push({name:"Generic",count:1,isFinite:!1}),e.push({name:"Generic",count:3,isFinite:!1}));break}this.setState({enemyInput:e})}updateBudgets(){var i,s;const t=(i=this.container)==null?void 0:i.querySelector("#leadership-budget"),e=(s=this.container)==null?void 0:s.querySelector("#dominance-budget"),n={...this.state.unitsConfig,leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(e.value)||0};this.setState({unitsConfig:n})}toggleUnitSelection(t){const e=this.units.find(o=>o.name===t);if(!e)return;if(!this.state.unitsConfig){const o=e.cost_type==="Mercenary"||e.cost_type==="Authority"?{[t]:1}:{};this.setState({unitsConfig:{availableUnitNames:[t],leadershipBudget:0,dominanceBudget:0,mercenaryLimits:o,healthBonuses:{[t]:0},strengthBonuses:{[t]:0}}});return}const n=this.state.unitsConfig.availableUnitNames.includes(t),i=n?this.state.unitsConfig.availableUnitNames.filter(o=>o!==t):[...this.state.unitsConfig.availableUnitNames,t],s={...this.state.unitsConfig.mercenaryLimits};(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(n?delete s[t]:s[t]=1);const a={...this.state.unitsConfig.healthBonuses},r={...this.state.unitsConfig.strengthBonuses};n?(delete a[t],delete r[t]):(a[t]=0,r[t]=0),this.setState({unitsConfig:{...this.state.unitsConfig,availableUnitNames:i,mercenaryLimits:s,healthBonuses:a,strengthBonuses:r}})}selectAllUnits(){const t=this.units.filter(a=>a.leadership_cost>0||a.dominance_cost>0||a.authority_cost>0),e=t.map(a=>a.name),n={},i={},s={};t.forEach(a=>{(a.cost_type==="Mercenary"||a.cost_type==="Authority")&&(n[a.name]=1),i[a.name]=0,s[a.name]=0}),this.setState({unitsConfig:{...this.state.unitsConfig,availableUnitNames:e,mercenaryLimits:n,healthBonuses:i,strengthBonuses:s}})}clearAllUnits(){this.setState({unitsConfig:{...this.state.unitsConfig,availableUnitNames:[],mercenaryLimits:{},healthBonuses:{},strengthBonuses:{}}})}filterUnits(t){var n;const e=(n=this.container)==null?void 0:n.querySelectorAll(".unit-card");e==null||e.forEach(i=>{var r;const a=(((r=i.getAttribute("data-unit"))==null?void 0:r.toLowerCase())||"").includes(t.toLowerCase());i.style.display=a?"":"none"})}compareUnitNames(t,e){const n=r=>{const o=r.match(/^(.+?)\s+(I{1,3}V?|I?V|I?X{1,3})$/);return o?{baseName:o[1].trim(),romanNumeral:o[2],romanValue:this.romanToNumber(o[2])}:{baseName:r,romanNumeral:"",romanValue:0}},i=n(t),s=n(e),a=i.baseName.localeCompare(s.baseName);return a!==0?a:i.romanValue!==s.romanValue?i.romanValue-s.romanValue:t.localeCompare(e)}romanToNumber(t){return{I:1,II:2,III:3,IV:4,V:5,VI:6,VII:7,VIII:8,IX:9,X:10,XI:11,XII:12,XIII:13,XIV:14,XV:15,XVI:16,XVII:17,XVIII:18,XIX:19,XX:20}[t]||0}applyStatBonusesToUnits(t){if(!this.state.unitsConfig)return t;const{healthBonuses:e,strengthBonuses:n}=this.state.unitsConfig;return t.map(i=>{const s=e[i.name]||0,a=n[i.name]||0;if(s===0&&a===0)return i;const r={...i,health:Math.round(i.health*(1+s/100)),strength:Math.round(i.strength*(1+a/100)),originalStrength:i.strength};return console.log(`Applied bonuses to ${i.name}: Health ${i.health} → ${r.health} (+${s}%), Strength ${i.strength} → ${r.strength} (+${a}%)`),r})}async startOptimization(){if(!(!this.optimizer||!this.state.unitsConfig||!this.state.optimizationConfig)){this.setState({currentStep:"optimization",isLoading:!0,progress:null,error:null}),await new Promise(t=>setTimeout(t,50));try{this.abortController=new AbortController;const t=this.applyStatBonusesToUnits(this.units),e={enemies:this.state.enemyInput,unitsConfig:this.state.unitsConfig,maxCombinations:this.state.optimizationConfig.maxCombinations,signal:this.abortController.signal,onProgress:i=>{this.setState({progress:i})}},n=await this.optimizer.optimize(e,t);this.setState({results:n,isLoading:!1,currentStep:"results"})}catch(t){console.error("Optimization failed:",t),this.setState({error:t.message||"Optimization failed",isLoading:!1})}}}cancelOptimization(){this.abortController&&(this.abortController.abort(),this.setState({isLoading:!1,progress:null,currentStep:"units-input"}))}restartOptimization(){this.setState({currentStep:"enemy-input",enemyInput:[],unitsConfig:null,optimizationConfig:null,results:null,progress:null,error:null,isLoading:!1,unitSearchTerm:""})}exportResults(){if(!this.state.results)return;const t={results:this.state.results,timestamp:new Date().toISOString()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),i=document.createElement("a");i.href=n,i.download=`optimization-results-${Date.now()}.json`,i.click(),URL.revokeObjectURL(n)}viewResultDetails(t){if(!this.state.results)return;const e=this.state.results.rankedResults[t];this.showCombatLogsModal(e,t+1)}showCombatLogsModal(t,e){const n=document.createElement("div");n.className="combat-logs-modal",n.innerHTML=`
      <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>Combat Logs - Result #${e}</h2>
          <button class="modal-close" onclick="this.closest('.combat-logs-modal').remove()">×</button>
        </div>
        <div class="modal-body">
          ${this.renderCombatLogsContent(t)}
        </div>
      </div>
    `,document.body.appendChild(n),requestAnimationFrame(()=>n.classList.add("show"))}renderCombatLogsContent(t){const e=t.battleAnalysis.bestCase,n=t.battleAnalysis.worstCase;return`
      <div class="combat-logs-container">
        <!-- Army Composition Summary -->
        <div class="army-summary">
          <h3>Army Composition</h3>
          <div class="composition-grid">
            ${t.armyComposition.stackingOrder.map(i=>`
              <div class="composition-item">
                <strong>${i.count} ${i.unit.name}</strong>
                <span>STR: ${(i.unit.strength*i.count).toLocaleString()}</span>
              </div>
            `).join("")}
          </div>
          <div class="composition-totals">
            <span><strong>Total Damage:</strong> ${t.averageDamagePerBattle.toFixed(0)}</span>
            <span><strong>Efficiency:</strong> ${t.damageEfficiencyScore.toFixed(2)}</span>
          </div>
        </div>

        <!-- Battle Scenarios -->
        <div class="battle-scenarios">
          <div class="scenario-tabs">
            <button class="scenario-tab active" onclick="this.parentElement.nextElementSibling.children[0].style.display='block'; this.parentElement.nextElementSibling.children[1].style.display='none'; this.parentElement.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active')); this.classList.add('active')">
              🎯 Best Case (Player First)
            </button>
            <button class="scenario-tab" onclick="this.parentElement.nextElementSibling.children[1].style.display='block'; this.parentElement.nextElementSibling.children[0].style.display='none'; this.parentElement.querySelectorAll('.scenario-tab').forEach(t => t.classList.remove('active')); this.classList.add('active')">
              ⚔️ Worst Case (Enemy First)
            </button>
          </div>
          
          <div class="scenario-content">
            <!-- Best Case -->
            <div class="scenario-panel" style="display: block;">
              <div class="scenario-header">
                <h4>Best Case Scenario</h4>
                <div class="scenario-stats">
                  <span><strong>Result:</strong> ${e.outcome.result}</span>
                  <span><strong>Turns:</strong> ${e.battleDuration}</span>
                  <span><strong>Damage:</strong> ${e.totalDamageDealt.toLocaleString()}</span>
                </div>
              </div>
              <div class="combat-log">
                ${this.renderCombatLog(e.combatLog,"best")}
              </div>
            </div>
            
            <!-- Worst Case -->
            <div class="scenario-panel" style="display: none;">
              <div class="scenario-header">
                <h4>Worst Case Scenario</h4>
                <div class="scenario-stats">
                  <span><strong>Result:</strong> ${n.outcome.result}</span>
                  <span><strong>Turns:</strong> ${n.battleDuration}</span>
                  <span><strong>Damage:</strong> ${n.totalDamageDealt.toLocaleString()}</span>
                </div>
              </div>
              <div class="combat-log">
                ${this.renderCombatLog(n.combatLog,"worst")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}renderCombatLog(t,e){return!t||t.length===0?'<p class="no-combat-log">No combat actions recorded.</p>':`
      <div class="combat-log-list">
        ${t.map((n,i)=>{let s="";return n.attackerSide?s=n.attackerSide==="player"?"player-action":"enemy-action":s=!n.attacker.toLowerCase().includes("enemy")?"player-action":"enemy-action",`
            <div class="combat-action ${s}">
              <div class="action-header">
                <span class="turn-number">Turn ${n.turn}</span>
                <span class="action-summary">${n.attacker} → ${n.target}</span>
              </div>
              <div class="action-details">
                <span class="action-text">${n.action}</span>
                ${n.damageDealt?`<span class="damage-dealt">${n.damageDealt.toLocaleString()} damage</span>`:""}
                ${n.eliminated?'<span class="elimination-flag">ELIMINATED</span>':""}
              </div>
            </div>
          `}).join("")}
      </div>
    `}updateOptimizationConfig(){if(!this.container)return;const t=this.container.querySelector("#max-combinations"),e=this.container.querySelector("#max-time"),n={maxCombinations:parseInt(t==null?void 0:t.value)||5e4,maxOptimizationTimeSeconds:parseInt(e==null?void 0:e.value)||300};this.setState({optimizationConfig:n})}applyOptimizationPreset(t){let e;switch(t){case"fast":e={maxCombinations:1e4,maxOptimizationTimeSeconds:60};break;case"balanced":e={maxCombinations:5e4,maxOptimizationTimeSeconds:300};break;case"thorough":e={maxCombinations:2e5,maxOptimizationTimeSeconds:600};break;default:e=this.getDefaultOptimizationConfig()}this.setState({optimizationConfig:e}),this.updateOptimizationConfigUI(e)}updateOptimizationConfigUI(t){if(!this.container)return;const e=this.container.querySelector("#max-combinations"),n=this.container.querySelector("#max-time");e&&(e.value=t.maxCombinations.toString()),n&&(n.value=t.maxOptimizationTimeSeconds.toString())}openEnemyManager(){alert("Enemy management would open here. For now, use the main calculator's Enemy Units tab to create custom enemies."),window.location.hash="",setTimeout(()=>{const t=new CustomEvent("switchToEnemyMode");window.dispatchEvent(t)},100)}async refreshEnemyList(){var t;try{this.presetEnemies=await this.enemyUnitLoader.loadPresetEnemyUnits(),this.userEnemies=this.enemyUnitStorage.getAllUserEnemyUnits(),console.log(`🔄 Refreshed enemy list: ${this.presetEnemies.length} preset, ${this.userEnemies.length} custom`),this.render();const e=(t=this.container)==null?void 0:t.querySelector("#refresh-enemies-btn");if(e){const n=e.innerHTML;e.innerHTML='<span class="btn-icon">✅</span> Refreshed!',setTimeout(()=>{e.innerHTML=n},2e3)}}catch(e){console.error("Failed to refresh enemy list:",e),alert("Failed to refresh enemy list. Please try again.")}}}class kt{constructor(t){u(this,"container");u(this,"currentApp",null);this.container=t,this.initializeNavigation(),this.handleRoute(),window.addEventListener("hashchange",()=>this.handleRoute())}initializeNavigation(){var e;const t=document.createElement("nav");t.className="app-navigation",t.innerHTML=`
      <div class="nav-container">
        <div class="nav-brand">
          <h1>🏰 TotalBattle Army Calculator</h1>
        </div>
        <div class="nav-links">
          <a href="#" class="nav-link ${this.getCurrentRoute()===""?"active":""}">
            🛡️ Main Calculator
          </a>
          <a href="#improved-damage" class="nav-link ${this.getCurrentRoute()==="improved-damage"?"active":""}">
            ⚔️ Improved Damage Optimizer
          </a>
        </div>
      </div>
    `,this.addNavigationStyles(),(e=this.container.parentNode)==null||e.insertBefore(t,this.container),t.querySelectorAll(".nav-link").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault();const s=i.target.getAttribute("href");s&&(window.location.hash=s)})})}addNavigationStyles(){const t=document.createElement("style");t.textContent=`
      .app-navigation {
        background-color: #2c3e50;
        color: white;
        padding: 0;
        margin-bottom: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
      }

      .nav-brand h1 {
        margin: 0;
        font-size: 1.5rem;
        color: white;
      }

      .nav-links {
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .nav-link {
        color: #bdc3c7;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.3s ease;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-link:hover {
        background-color: #34495e;
        color: white;
      }

      .nav-link.active {
        background-color: #3498db;
        color: white;
      }

      @media (max-width: 768px) {
        .nav-container {
          flex-direction: column;
          align-items: stretch;
          text-align: center;
        }

        .nav-links {
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav-brand h1 {
          font-size: 1.3rem;
        }
      }
    `,document.head.appendChild(t)}getCurrentRoute(){return window.location.hash.slice(1)||""}async handleRoute(){const t=this.getCurrentRoute();document.querySelectorAll(".nav-link").forEach(e=>{var i;const n=((i=e.getAttribute("href"))==null?void 0:i.slice(1))||"";e.classList.toggle("active",n===t)}),this.currentApp&&typeof this.currentApp.unmount=="function"&&this.currentApp.unmount(),this.container.innerHTML="";try{switch(t){case"improved-damage":await this.loadImprovedDamageOptimizer();break;case"":default:await this.loadMainCalculator();break}}catch(e){console.error("Failed to load route:",e),this.showError("Failed to load page. Please try again.")}}async loadMainCalculator(){this.currentApp=new xt,await this.currentApp.mount(this.container)}async loadImprovedDamageOptimizer(){await J(()=>Promise.resolve({}),__vite__mapDeps([0])),this.currentApp=new wt,await this.currentApp.mount(this.container)}async loadCSS(t){return new Promise((e,n)=>{if(document.querySelector(`link[href="${t}"]`)){e();return}const i=document.createElement("link");i.rel="stylesheet",i.href=t,i.onload=()=>e(),i.onerror=()=>n(new Error(`Failed to load CSS: ${t}`)),document.head.appendChild(i)})}showError(t){this.container.innerHTML=`
      <div style="
        max-width: 600px;
        margin: 50px auto;
        padding: 30px;
        text-align: center;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      ">
        <h2 style="color: #e74c3c; margin-bottom: 15px;">⚠️ Error</h2>
        <p style="color: #666; margin-bottom: 20px;">${t}</p>
        <button onclick="window.location.reload()" style="
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        ">
          Reload Page
        </button>
      </div>
    `}}document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("app");if(!b)throw new Error("App container not found");new kt(b),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-D4nxeaNq.js.map
