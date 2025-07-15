var V=Object.defineProperty;var K=(y,e,t)=>e in y?V(y,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):y[e]=t;var p=(y,e,t)=>K(y,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Y="modulepreload",W=function(y){return"/army-calculator-site/"+y},F={},Q=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(r=>{if(r=W(r),r in F)return;F[r]=!0;const l=r.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${c}`))return;const m=document.createElement("link");if(m.rel=l?"stylesheet":Y,l||(m.as="script"),m.crossOrigin="",m.href=r,o&&m.setAttribute("nonce",o),document.head.appendChild(m),l)return new Promise((d,u)=>{m.addEventListener("load",d),m.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return i.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};class S{static isMercenary(e){return e.cost_type==="Mercenary"||e.authority_cost>0}static getPrimaryCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}static getStrengthPerCost(e){const t=S.getPrimaryCost(e);return t>0?e.strength/t:0}static getHealthPerCost(e){const t=S.getPrimaryCost(e);return t>0?e.health/t:0}}class J{constructor(){p(this,"units",[]);p(this,"unitsByName",new Map);p(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Unit data must be an array");return this.units=t.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(t){throw console.error("❌ Error loading units:",t),t}}validateAndNormalizeUnit(e){const t={name:e.name||"Unknown",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],cost_type:e.cost_type||"Leadership",health:Number(e.health)||0,strength:Number(e.strength)||0,leadership_cost:Number(e.leadership_cost)||0,dominance_cost:Number(e.dominance_cost)||0,authority_cost:Number(e.authority_cost)||0,food_consumption:Number(e.food_consumption)||0,carrying_capacity:Number(e.carrying_capacity)||0,revival_cost_gold:Number(e.revival_cost_gold)||0,revival_cost_silver:Number(e.revival_cost_silver)||0,source_file:e.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)||(console.warn(`Invalid cost type for unit ${t.name}: ${t.cost_type}`),t.cost_type="Leadership"),t}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(e=>[e.name,e])),this.units.forEach(e=>{S.isMercenary(e)?this.unitsByCostType.Mercenary.push(e):e.cost_type in this.unitsByCostType&&this.unitsByCostType[e.cost_type].push(e)}),Object.keys(this.unitsByCostType).forEach(e=>{this.unitsByCostType[e].sort((t,n)=>t.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(e){return this.unitsByName.get(e)}getUnitsByCostType(e){return[...this.unitsByCostType[e]]}getAvailableUnits(e){const t=[];for(const n of e){const i=this.getUnitByName(n);i?t.push(i):console.warn(`Unit '${n}' not found in loaded data`)}return t}filterUnits(e){let t=this.units;return e.costType&&(t=t.filter(n=>n.cost_type===e.costType)),e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(i=>n.unit_types.includes(i)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxCost!==void 0&&(t=t.filter(n=>S.getPrimaryCost(n)<=e.maxCost)),t}searchUnits(e){if(!e.trim())return this.getAllUnits();const t=e.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedUnits(){return this.units.map(e=>({...e,get isMercenary(){return S.isMercenary(e)},get primaryCost(){return S.getPrimaryCost(e)},get strengthPerCost(){return S.getStrengthPerCost(e)},get healthPerCost(){return S.getHealthPerCost(e)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...e),max:Math.max(...e)},healthRange:{min:Math.min(...t),max:Math.max(...t)}}}getUniqueUnitTypes(){const e=new Set;return this.units.forEach(t=>{t.unit_types.forEach(n=>e.add(n))}),Array.from(e).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,i)=>n+i,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,i)=>n+i,0)/t.length)},topUnitsByStrength:[...this.units].sort((n,i)=>i.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,i)=>i.health-n.health).slice(0,10)}}}class O{constructor(e){p(this,"availableUnits");p(this,"unitsByName");p(this,"leadershipUnits");p(this,"dominanceUnits");p(this,"mercenaryUnits");this.availableUnits=[...e],this.unitsByName=new Map(e.map(t=>[t.name,t])),this.leadershipUnits=e.filter(t=>t.cost_type==="Leadership").sort((t,n)=>t.strength-n.strength),this.dominanceUnits=e.filter(t=>t.cost_type==="Dominance").sort((t,n)=>t.strength-n.strength),this.mercenaryUnits=e.filter(t=>S.isMercenary(t)).sort((t,n)=>t.strength-n.strength)}async optimizeArmy(e){const t=performance.now();console.log(`🔍 Optimizing army with L:${e.leadershipBudget} D:${e.dominanceBudget} M:${Object.keys(e.mercenaryLimits).length}`),console.log(`📋 Selected units: ${e.availableUnits.join(", ")}`);const n=[],i=this.generateGuaranteedValidCompositions(e);console.log(`Generated ${i.length} guaranteed valid army combinations`);let s=0;for(const d of i){s++;const u=this.evaluateComposition(d);n.push(u)}const a=performance.now();console.log(`Evaluated ${s} combinations, found ${n.length} valid stackings`);const o=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&d.cost_type==="Leadership"),r=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&d.cost_type==="Dominance"),l=this.availableUnits.filter(d=>e.availableUnits.includes(d.name)&&S.isMercenary(d)),c=n.filter(d=>{const u=o.some(f=>d.units[f.name]&&d.units[f.name]>0),h=r.some(f=>d.units[f.name]&&d.units[f.name]>0),g=l.some(f=>d.units[f.name]&&d.units[f.name]>0);return[o.length>0?u:!0,r.length>0?h:!0,l.length>0?g:!0].every(f=>f)});return c.sort((d,u)=>{const h=d.totalLeadershipCost/e.leadershipBudget+d.totalDominanceCost/e.dominanceBudget;return u.totalLeadershipCost/e.leadershipBudget+u.totalDominanceCost/e.dominanceBudget-h}),{compositions:c.length>0?[c[0]]:n.slice(0,1),totalCombinationsEvaluated:s,validStackingsFound:n.length,executionTimeMs:a-t}}generateGuaranteedValidCompositions(e){const t=[],n=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,o)=>o.strength-a.strength),i=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,o)=>o.strength-a.strength),s=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&S.isMercenary(a));if(console.log(`Selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log("Leadership units:",n.map(a=>a.name)),console.log("Dominance units:",i.map(a=>a.name)),console.log("Mercenary units:",s.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log(`Budgets: Leadership:${e.leadershipBudget} Dominance:${e.dominanceBudget}`),n.length>0&&i.length>0&&s.length>0&&e.leadershipBudget>0&&e.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...n,...s];t.push(...this.generateCombinedStackedCompositions(a,i,e.leadershipBudget,e.dominanceBudget,e.mercenaryLimits))}else if(n.length>0&&s.length>0&&i.length===0&&e.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...n,...s],o=this.calculateProperStackingQuantities(a,e.leadershipBudget,e.mercenaryLimits);t.push(o)}else if(i.length>0&&s.length>0&&n.length===0&&e.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,e.dominanceBudget),o={};for(const l of s)o[l.name]=e.mercenaryLimits[l.name]||1;const r={...a,...o};t.push(r)}else if(n.length>0&&i.length>0&&s.length===0&&e.leadershipBudget>0&&e.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),t.push(...this.generateCombinedStackedCompositions(n,i,e.leadershipBudget,e.dominanceBudget,{}));else if(n.length>0&&i.length===0&&s.length===0&&e.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(n,e.leadershipBudget,{});t.push(a)}else if(i.length>0&&n.length===0&&s.length===0&&e.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,e.dominanceBudget);t.push(a)}else if(s.length>0&&n.length===0&&i.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const o of s){const r=e.mercenaryLimits[o.name]||1;a[o.name]=r}Object.keys(a).length>0&&t.push(a)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&s.length>0&&e.leadershipBudget>0&&t.push(...this.generateMercenaryMixedCompositions(n,s,e.leadershipBudget,e.mercenaryLimits,"leadership_cost")),i.length>0&&s.length>0&&e.dominanceBudget>0&&t.push(...this.generateMercenaryMixedCompositions(i,s,e.dominanceBudget,e.mercenaryLimits,"dominance_cost")),t}generateStackedCompositionsWithMercenaries(e,t,n,i){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const s=[...e,...t];console.log(`🚨 About to call calculateProperStackingQuantities with ${s.length} units`);const a=this.calculateProperStackingQuantities(s,n,i);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(e,t){const n={};if(e.length===0)return n;const i=e[0];n[i.name]=1,console.log(`🎯 Starting with 1x ${i.name} (STR: ${i.strength})`);for(let s=1;s<e.length;s++){const a=e[s],o=e[s-1],r=o.health*(n[o.name]||1),l=Math.ceil((r+1)/a.health);n[a.name]=l,console.log(`📋 ${a.name}: need ${l} units (${l*a.health} HP) to exceed ${o.name} (${r} HP)`)}return n}calculateProperStackingQuantities(e,t,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${t}`);const i={},s=[...e].sort((d,u)=>u.strength-d.strength),a=s.filter(d=>d.cost_type==="Leadership"),o=s.filter(d=>S.isMercenary(d));if(s.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),i;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${s.length} units (${a.length} leadership + ${o.length} mercenary)`);const r=s[0],l={};l[r.name]=1;const c=r.health*1;console.log(`🔧 Base: 1x ${r.name} = ${c} HP (strongest)`);for(let d=1;d<s.length;d++){const u=s[d],h=Math.ceil((c+1)/u.health);l[u.name]=h;const g=S.isMercenary(u)?"mercenary":"leadership";console.log(`🔧 Base: ${h}x ${u.name} = ${h*u.health} HP (beats ${c}) [${g}]`)}console.log("🔧 Validating base pattern stacking order...");for(let d=0;d<s.length-1;d++){const u=s[d],h=s[d+1],g=u.health*l[u.name];let b=h.health*l[h.name];if(b<=g)if(S.isMercenary(h))console.log(`🔧 WARNING: ${h.name} mercenary limit (${l[h.name]}) gives ${b} HP, can't beat ${g} HP`);else{const f=Math.ceil((g+1)/h.health);l[h.name]=f,b=h.health*f,console.log(`🔧 Fixed: ${h.name} increased to ${f} units = ${b} HP (now beats ${g})`)}else console.log(`🔧 OK: ${h.name} ${l[h.name]} units = ${b} HP (beats ${g})`)}let m=0;for(const[d,u]of Object.entries(l)){const h=this.unitsByName.get(d);h&&h.cost_type==="Leadership"&&(m+=u*h.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${m}`),m===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[d,u]of Object.entries(l))i[d]=u}else{const d=Math.floor(t/m);console.log(`🔧 Can afford ${d} base stacks (${t} / ${m})`);for(const[u,h]of Object.entries(l)){const g=this.unitsByName.get(u);if(g&&S.isMercenary(g)){const b=h*d,f=n[u]||1;i[u]=Math.min(b,f),b>f?console.log(`🔧 Mercenary ${u}: wanted ${b}, capped at limit ${f}`):console.log(`🔧 Mercenary ${u}: scaled to ${b} (under limit ${f})`)}else i[u]=h*d}}return console.log("🔧 SIMPLE STACKING: Final composition:",i),i}calculateProperStackingQuantitiesForDominance(e,t){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${t}`);const n={},i=[...e].sort((c,m)=>m.strength-c.strength);if(i.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${i.length} dominance units`);const s=i[0],a={};a[s.name]=1;const o=s.health*1;console.log(`🔧 Base: 1x ${s.name} = ${o} HP (strongest)`);for(let c=1;c<i.length;c++){const m=i[c],d=Math.ceil((o+1)/m.health);a[m.name]=d,console.log(`🔧 Base: ${d}x ${m.name} = ${d*m.health} HP (beats ${o})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let c=0;c<i.length-1;c++){const m=i[c],d=i[c+1],u=m.health*a[m.name];let h=d.health*a[d.name];if(h<=u){const g=Math.ceil((u+1)/d.health);a[d.name]=g,h=d.health*g,console.log(`🔧 Fixed: ${d.name} increased to ${g} units = ${h} HP (now beats ${u})`)}else console.log(`🔧 OK: ${d.name} ${a[d.name]} units = ${h} HP (beats ${u})`)}let r=0;for(const[c,m]of Object.entries(a)){const d=this.unitsByName.get(c);d&&d.cost_type==="Dominance"&&(r+=m*d.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${r}`),r===0)return console.log("🔧 No dominance costs found"),n;const l=Math.floor(t/r);console.log(`🔧 Can afford ${l} base stacks (${t} / ${r})`);for(const[c,m]of Object.entries(a))n[c]=m*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(e){return Object.entries(e).reduce((t,[n,i])=>{const s=this.unitsByName.get(n);return s&&s.cost_type==="Leadership"?t+i*s.leadership_cost:t},0)}calculateMaxStacksByMercenaries(e,t){let n=1/0;for(const[i,s]of Object.entries(e)){const a=this.unitsByName.get(i);if(a&&S.isMercenary(a)){const o=t[i]||1,r=Math.floor(o/s);n=Math.min(n,r),console.log(`🗡️ ${i}: limit ${o}, base need ${s}, allows ${r} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(e,t,n,i){const s=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...e,...t].sort((d,u)=>u.strength-d.strength);if(a.length===0)return s;const o=this.calculateCleanStackingPattern(a,i);console.log("📊 Dominance + Mercenary base pattern:",o);const r=Object.entries(o).reduce((d,[u,h])=>{const g=this.unitsByName.get(u);return g&&g.cost_type==="Dominance"?d+h*g.dominance_cost:d},0);if(console.log(`💰 Dominance cost per stack: ${r}`),r>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const d={};for(const u of t)d[u.name]=i[u.name]||1;return s.push(d),e.length>0&&s.push(...this.generateStackedCompositions(e,n,"dominance_cost")),s}const l=Math.floor(n/r),c=this.calculateMaxStacksByMercenaries(o,i),m=Math.min(l,c);console.log(`🔢 Max Dominance+Mercenary stacks: ${m}`);for(let d=1;d<=Math.min(m,5);d++){const u={};for(const[h,g]of Object.entries(o)){const b=this.unitsByName.get(h);b&&S.isMercenary(b)?u[h]=Math.min(g*d,i[h]||1):u[h]=g*d}s.push(u)}if(c<l&&e.length>0){const d=n-m*r,u=this.generateStackedCompositions(e,d,"dominance_cost"),h={};for(const g of t)h[g.name]=i[g.name]||1;for(const g of u.slice(0,3)){const b={...h,...g};s.push(b)}}return s}generateStackedCompositions(e,t,n){const i=[];if(e.length===0||t<=0)return i;const s=e[0];console.log(`🎯 Strongest unit: ${s.name} (STR: ${s.strength})`);const a=this.calculateStackingPattern(e);console.log("📊 Base stacking pattern:",a);const o=Object.entries(a).reduce((l,[c,m])=>{const d=this.unitsByName.get(c);if(d){const u=d[n];return l+m*u}return l},0);if(console.log(`💰 Base pattern cost: ${o}`),o<=0)return i;const r=Math.floor(t/o);console.log(`🔢 Max multiplier: ${r}`);for(let l=1;l<=Math.min(r,10);l++){const c={};for(const[m,d]of Object.entries(a))c[m]=d*l;i.push(c)}return e.length>1&&i.push(...this.generateStackingVariations(e,t,n)),i}calculateStackingPattern(e){const t={};if(e.length===0)return t;const n=e[0];t[n.name]=1;for(let i=1;i<e.length;i++){const s=e[i],a=e[i-1],o=a.health*(t[a.name]||1),r=Math.ceil((o+1)/s.health);t[s.name]=r,console.log(`📋 ${s.name}: need ${r} units (${r*s.health} HP) to exceed ${a.name} (${o} HP)`)}return t}generateCombinedStackedCompositions(e,t,n,i,s={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const o=e.filter(A=>A.cost_type==="Leadership"),r=e.filter(A=>S.isMercenary(A));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...o,...r],m=[this.calculateProperStackingQuantities(l,n,s)];if(m.length===0)return a;const d=m[m.length-1];if(!d)return a;console.log("🎯 Using maximum Leadership composition for combination");const u=d,h=t[0];console.log(`🎯 Strongest Dominance unit: ${h.name} (STR: ${h.strength})`);const g=this.findClosestStrengthUnit(h,e);if(!g)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${g.name} (STR: ${g.strength})`);const b=u[g.name]||0,f=g.health*b;if(console.log(`📊 Comparison unit total health: ${f} (${b}x ${g.health})`),f<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const E=h.health;E>=f&&(console.log(`⚠️ Single Dominance unit too strong: ${E} HP >= ${f} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const C=[this.calculateProperStackingQuantitiesForDominance(t,i)];if(C.length>0){const A=C[C.length-1],D={...u,...A};a.push(D),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(u);return a}findClosestStrengthUnit(e,t){if(t.length===0)return null;let n=t[0],i=Math.abs(e.strength-n.strength);for(const s of t){const a=Math.abs(e.strength-s.strength);a<i&&(i=a,n=s)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${e.name} (STR: ${e.strength}), diff: ${i}`),n}calculateConstrainedDominanceStack(e,t,n){const i={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),e.length===0||t<=0||n<=0)return i;const s=e[0],a=Math.floor((n-1)/s.health),o=Math.floor(t/s.dominance_cost),r=Math.min(a,o);if(r<=0)return console.log(`❌ Cannot fit any ${s.name} within constraints`),i;for(let l=Math.min(r,3);l>=1;l--){const c={};c[s.name]=l;let m=l*s.dominance_cost,d=l*s.health;console.log(`🧪 Testing ${l}x ${s.name} (${d} HP, ${m} cost)`);for(let h=1;h<e.length&&m<t;h++){const g=e[h],b=t-m,f=Math.ceil((d+1)/g.health),E=Math.floor(b/g.dominance_cost),U=Math.min(f,E);U>0&&(c[g.name]=U,m+=U*g.dominance_cost,console.log(`  ➕ Added ${U}x ${g.name} (${U*g.health} HP)`))}const u=Object.entries(c).reduce((h,[g,b])=>{const f=this.unitsByName.get(g);return f?h+b*f.health:h},0);if(u<n)return console.log(`✅ Valid Dominance stack: ${u} HP < ${n} HP limit`),c;console.log(`❌ Dominance stack too strong: ${u} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),i}generateMercenaryMixedCompositions(e,t,n,i,s){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const o=this.generateStackedCompositions(e,n,s);if(o.length===0)return a;for(const r of o.slice(0,3)){const l=t.sort((f,E)=>E.strength-f.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const c=this.findClosestStrengthUnit(l,e);if(!c){console.log("❌ No suitable base unit found for comparison");continue}const m=r[c.name]||0,d=c.health*m;if(console.log(`📊 Comparison base unit total health: ${d}`),d<=0){console.log("❌ Comparison unit not in base composition");continue}const u=l.health,h=i[l.name]||1,g=u*h;if(g>=d){console.log(`⚠️ Mercenary too strong: ${g} HP >= ${d} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const f=Math.floor((d-1)/u);if(f>0){console.log(`✅ Using ${f}x ${l.name} instead of ${h}`);const E={...r};E[l.name]=f;for(const U of t)if(U.name!==l.name){const C=i[U.name]||1;E[U.name]=C}a.push(E),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(r);continue}const b={...r};for(const f of t){const E=i[f.name]||1;b[f.name]=E}a.push(b),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(e,t,n){const i={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const s=[...e].sort((r,l)=>r.health-l.health);let a=0,o=0;for(const r of s){const l=Math.floor((n-o-1)/r.health),c=Math.floor((t-a)/r.dominance_cost),m=Math.min(l,c);m>0&&(i[r.name]=m,a+=m*r.dominance_cost,o+=m*r.health,console.log(`➕ Added ${m}x ${r.name} (${m*r.health} HP, ${m*r.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${o} HP total, ${a} cost`),i}calculateMaximizedDominanceStack(e,t,n){console.log(`💰 Maximizing Dominance budget: ${t} with health limit: ${n}`);const i=this.createAlternativeDominanceStack(e,t,n);return Object.keys(i).length>0?i:this.calculateConstrainedDominanceStack(e,t,n)}generateStackingVariations(e,t,n){const i=[],s={},a=e[0],o=a[n];if(o>0){const r=Math.floor(t/o);s[a.name]=Math.min(r,5);let l=t-s[a.name]*o;for(let c=1;c<e.length&&l>0;c++){const m=e[c],d=m[n];if(d>0&&d<=l){const u=Math.floor(l/d/(e.length-c));u>0&&(s[m.name]=u,l-=u*d)}}i.push(s)}return i}generateGuaranteedDiverseCompositions_OLD(e){const t=[],n=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),i=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),s=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&S.isMercenary(l)),a={};let o=0,r=0;for(const l of n)o+l.leadership_cost<=e.leadershipBudget&&(a[l.name]=1,o+=l.leadership_cost);for(const l of i)r+l.dominance_cost<=e.dominanceBudget&&(a[l.name]=1,r+=l.dominance_cost);for(const l of s){const c=e.mercenaryLimits[l.name]||1;a[l.name]=Math.min(1,c)}if(Object.keys(a).length>0&&t.push(a),n.length>0&&e.leadershipBudget>0){const l=n.sort((m,d)=>m.leadership_cost-d.leadership_cost)[0],c=Math.floor(e.leadershipBudget/l.leadership_cost);if(c>0){const m={};m[l.name]=Math.min(c,20);const d=e.leadershipBudget-m[l.name]*l.leadership_cost;for(const u of n.slice(1,3)){const h=Math.floor(d/u.leadership_cost/2);h>0&&(m[u.name]=h)}t.push(m)}}if(n.length>0||i.length>0){const l={};if(n.length>0&&e.leadershipBudget>0){const c=Math.floor(e.leadershipBudget/n.length);for(const m of n){const d=Math.floor(c/m.leadership_cost);d>0&&(l[m.name]=d)}}if(i.length>0&&e.dominanceBudget>0){const c=Math.floor(e.dominanceBudget/i.length);for(const m of i){const d=Math.floor(c/m.dominance_cost);d>0&&(l[m.name]=d)}}for(const c of s){const m=e.mercenaryLimits[c.name]||1;l[c.name]=Math.max(1,Math.floor(m/2))}Object.keys(l).length>0&&t.push(l)}return t}generateMercenaryCombinations(e){if(Object.keys(e).length===0)return[{}];let t=[{}];for(const[n,i]of Object.entries(e)){if(!this.unitsByName.has(n))continue;const s=[];for(const a of t)for(let o=0;o<=i;o++){const r={...a};o>0&&(r[n]=o),s.push(r)}t=s}return t}evaluateComposition(e){let t=0,n=0,i=0,s=0,a=0;const o=[];for(const[b,f]of Object.entries(e)){const E=this.unitsByName.get(b);if(!E)continue;const U=E.health*f,C=E.strength*f;t+=C,n+=U,i+=E.leadership_cost*f,s+=E.dominance_cost*f,S.isMercenary(E)&&(a+=f),o.push({unit:E,count:f,totalHealth:U,unitStrength:E.strength})}o.sort((b,f)=>b.unitStrength-f.unitStrength);let r=!0;const l=[];for(let b=0;b<o.length;b++){const{unit:f,count:E,totalHealth:U}=o[b];l.push({unitName:f.name,count:E,totalHealth:U,unitStrength:f.strength});for(let C=b+1;C<o.length;C++){const A=o[C].unit,D=o[C].totalHealth;if(f.strength===A.strength){const G=Math.max(U,D)*.1;if(Math.abs(U-D)<=G)continue}U<=D&&console.log(`❌ Stacking violation: ${f.name} (STR:${f.strength}, ${U} HP) <= ${A.name} (STR:${A.strength}, ${D} HP)`)}}const c=i+s+a;let m=c>0?t/c:0;m*=1.2;const u=1+(Object.keys(e).length-1)*.05;m*=u;let h=0;i>0&&h++,s>0&&h++,a>0&&h++;const g=1+(h-1)*.1;return m*=g,{units:e,totalStrength:t,totalHealth:n,totalLeadershipCost:i,totalDominanceCost:s,totalMercenaryCount:a,stackingOrder:l,isValidStacking:r,efficiencyScore:m}}explainStacking(e){const t=[],n=[],i=[],s=[];return e.stackingOrder.forEach(a=>{const o=this.unitsByName.get(a.unitName);if(!o)return;const r={name:a.unitName,count:a.count,totalHealth:a.totalHealth,strength:o.strength};S.isMercenary(o)?s.push(r):o.cost_type==="Leadership"?n.push(r):o.cost_type==="Dominance"&&i.push(r)}),t.push("🏆 OPTIMIZED ARMY COMPOSITION"),t.push("═".repeat(60)),t.push(""),t.push("📊 ARMY SUMMARY"),t.push("─".repeat(30)),t.push(`Total Units: ${Object.values(e.units).reduce((a,o)=>a+o,0).toLocaleString()}`),t.push(`Total Strength: ${e.totalStrength.toLocaleString()}`),t.push(`Total Health: ${e.totalHealth.toLocaleString()}`),t.push(`Budget Usage: L:${e.totalLeadershipCost} D:${e.totalDominanceCost} M:${e.totalMercenaryCount}`),t.push(""),s.length>0&&(t.push("🗡️ MERCENARY FORCES"),t.push("─".repeat(30)),s.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),n.length>0&&(t.push("👑 LEADERSHIP FORCES"),t.push("─".repeat(30)),n.sort((a,o)=>o.strength-a.strength),n.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),i.length>0&&(t.push("⚡ DOMINANCE FORCES"),t.push("─".repeat(30)),i.sort((a,o)=>o.strength-a.strength),i.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),t.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),t.push("─".repeat(40)),e.stackingOrder.forEach((a,o)=>{const r=this.unitsByName.get(a.unitName);if(!r)return;const l=S.isMercenary(r)?"🗡️":r.cost_type==="Leadership"?"👑":r.cost_type==="Dominance"?"⚡":"❓";t.push(`${o+1}. ${l} ${a.count.toLocaleString()}x ${a.unitName} (${a.totalHealth.toLocaleString()} HP)`)}),t.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class x{static formatGroupForLog(e){return`${e.count} ${e.unitName}`}static formatEnemyGroupForLog(e){return`Enemy Group ${e+1}`}static calculateDamageDealt(e){return e.count*e.unitStrength}static createPlayerAttackAction(e,t,n){const i=x.calculateDamageDealt(t);return{turn:e,attacker:x.formatGroupForLog(t),target:x.formatEnemyGroupForLog(n),action:`attack and deal ${i.toLocaleString()} damage`,damageDealt:i,eliminated:!1}}static createEnemyAttackAction(e,t,n){return{turn:e,attacker:x.formatEnemyGroupForLog(t),target:x.formatGroupForLog(n),action:`attack and kill ${x.formatGroupForLog(n)}`,eliminated:!0}}static formatCombatLogForDisplay(e){return e.map(t=>t.eliminated?`${t.attacker} ${t.action}`:`${t.attacker} ${t.action}`)}static calculateBattleStatistics(e,t){const n=e.filter(o=>!o.eliminated),i=e.filter(o=>o.eliminated),s={},a={};return n.forEach(o=>{const r=o.attacker.split(" ").slice(1).join(" "),l=o.damageDealt||0;s[r]=(s[r]||0)+l,a[r]=(a[r]||0)+1}),{totalPlayerAttacks:n.length,totalEnemyAttacks:i.length,averageDamagePerAttack:n.length>0?t/n.length:0,damageByUnitType:s,attacksByUnitType:a,eliminationRate:i.length>0?i.length/e.length:0}}static getBattleSummary(e){const t=e.statistics||x.calculateBattleStatistics(e.combatLog,e.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${e.battleDuration} battle phases
- Player unit turns taken: ${t.totalPlayerAttacks}
- Enemy unit turns taken: ${t.totalEnemyAttacks}
- Total damage dealt to enemies: ${e.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(t.averageDamagePerAttack).toLocaleString()}
- Scenario: ${e.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const z={MAX_BATTLE_TURNS:1e3};class P{constructor(){p(this,"attackOrderCache",new Map);p(this,"targetOrderCache",new Map)}validateBattleConfiguration(e){if(!e)throw new Error("Battle configuration is required");if(!e.playerArmy)throw new Error("Player army is required");if(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(e.enemyGroupCount<1)throw new Error("Enemy group count must be at least 1");if(e.enemyGroupCount>100)throw new Error("Enemy group count cannot exceed 100 (performance limit)");for(const t of e.playerArmy.stackingOrder){if(!t.unitName||t.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(t.count<=0)throw new Error(`Unit group "${t.unitName}" must have a positive count`);if(t.unitStrength<=0)throw new Error(`Unit group "${t.unitName}" must have positive strength`);if(t.totalHealth<=0)throw new Error(`Unit group "${t.unitName}" must have positive health`)}}simulateBattle(e){this.validateBattleConfiguration(e);const t={currentTurn:0,playerGroups:[...e.playerArmy.stackingOrder],enemyGroupCount:e.enemyGroupCount,totalDamageDealt:0,battleEnded:!1,combatLog:[]};let n=0;const i=5;for(;!this.shouldBattleEnd(t)&&t.currentTurn<z.MAX_BATTLE_TURNS;){const a=t.combatLog.length;t.currentTurn++;try{this.processTurn(t,e.playerGoesFirst)}catch(o){throw new Error(`Battle processing failed on turn ${t.currentTurn}: ${o instanceof Error?o.message:"Unknown error"}`)}if(t.combatLog.length===a){if(n++,n>=i)throw new Error(`Battle stalled: No actions taken for ${i} consecutive turns`)}else n=0;if(t.currentTurn>1&&t.playerGroups.length===0&&!t.battleEnded){t.battleEnded=!0;break}}if(t.currentTurn>=z.MAX_BATTLE_TURNS)throw new Error(`Battle exceeded maximum duration of ${z.MAX_BATTLE_TURNS} turns`);const s=x.calculateBattleStatistics(t.combatLog,t.totalDamageDealt);return{outcome:"player_eliminated",combatLog:t.combatLog,totalDamageDealtToEnemies:t.totalDamageDealt,battleDuration:t.currentTurn,playerSurvivalTurns:t.currentTurn,scenario:e.playerGoesFirst?"best_case":"worst_case",configuration:e,statistics:s}}simulateBothScenarios(e,t){if(!e)throw new Error("Player army is required");if(t<1||t>100)throw new Error("Enemy group count must be between 1 and 100");const n={playerArmy:e,enemyGroupCount:t,playerGoesFirst:!0},i=this.simulateBattle(n),s={playerArmy:e,enemyGroupCount:t,playerGoesFirst:!1},a=this.simulateBattle(s),o={damageDifference:i.totalDamageDealtToEnemies-a.totalDamageDealtToEnemies,survivalDifference:i.playerSurvivalTurns-a.playerSurvivalTurns,averageDamage:(i.totalDamageDealtToEnemies+a.totalDamageDealtToEnemies)/2,averageSurvival:(i.playerSurvivalTurns+a.playerSurvivalTurns)/2};return{bestCase:i,worstCase:a,comparison:o}}calculateAttackOrder(e){const t=e.map(i=>`${i.unitName}:${i.count}:${i.unitStrength}`).join("|");if(this.attackOrderCache.has(t))return this.attackOrderCache.get(t);const n=[...e].sort((i,s)=>{const a=i.count*i.unitStrength;return s.count*s.unitStrength-a});return this.attackOrderCache.set(t,n),n}calculateEnemyTargetOrder(e){const t=e.map(i=>`${i.unitName}:${i.count}:${i.totalHealth}`).join("|");if(this.targetOrderCache.has(t))return this.targetOrderCache.get(t);const n=[...e].sort((i,s)=>s.totalHealth-i.totalHealth);return this.targetOrderCache.set(t,n),n}shouldBattleEnd(e){return e.playerGroups.length===0||e.battleEnded}processTurn(e,t){const n=this.calculateAttackOrder(e.playerGroups),i=n.length,s=e.enemyGroupCount,a=new Set;let o=0;const r=Math.max(i,s);for(let l=0;l<r*2&&!this.shouldBattleEnd(e);l++){if(t?l%2===0:l%2===1){const m=this.getNextPlayerAttacker(e,n,a);if(m){this.processSinglePlayerAttackByGroup(e,m,a.size);const d=`${m.unitName}:${m.count}:${m.unitStrength}`;a.add(d)}}else o<e.enemyGroupCount&&e.playerGroups.length>0&&(this.processSingleEnemyAttack(e,o),o++);if(a.size>=i&&o>=s)break}}getNextPlayerAttacker(e,t,n){for(const i of t){const s=`${i.unitName}:${i.count}:${i.unitStrength}`;if(!n.has(s)){const a=e.playerGroups.find(o=>o.unitName===i.unitName&&o.unitStrength===i.unitStrength);if(a)return a}}return null}processSinglePlayerAttackByGroup(e,t,n){if(e.playerGroups.length===0)return;const i=n%e.enemyGroupCount,s=x.calculateDamageDealt(t),a=x.createPlayerAttackAction(e.currentTurn,t,i);e.combatLog.push(a),e.totalDamageDealt+=s}processSinglePlayerAttack(e,t){if(e.playerGroups.length===0)return;const n=this.calculateAttackOrder(e.playerGroups);if(t>=n.length)return;const i=n[t],s=t%e.enemyGroupCount,a=x.calculateDamageDealt(i),o=x.createPlayerAttackAction(e.currentTurn,i,s);e.combatLog.push(o),e.totalDamageDealt+=a}processSingleEnemyAttack(e,t){if(e.playerGroups.length===0)return;const n=this.calculateEnemyTargetOrder(e.playerGroups);if(n.length===0)return;const i=n[0],s=x.createEnemyAttackAction(e.currentTurn,t,i);e.combatLog.push(s);const a=e.playerGroups.findIndex(o=>o.unitName===i.unitName&&o.count===i.count&&o.totalHealth===i.totalHealth);a!==-1&&e.playerGroups.splice(a,1),e.playerGroups.length===0&&(e.battleEnded=!0)}}class X{constructor(e,t){p(this,"battleSimulator");p(this,"algorithm");this.battleSimulator=e||new P,this.algorithm=t||new Z}setAlgorithm(e){this.algorithm=e}reportProgress(e,t){e.onProgress&&e.onProgress(t)}checkCancellation(e){var t;if((t=e.signal)!=null&&t.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(e,t){const n=performance.now(),i=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${e.leadershipBudget} D:${e.dominanceBudget} vs ${e.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${i/1e3} seconds`),this.reportProgress(e,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(e),this.reportProgress(e,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const s=await this.algorithm.generateCombinations(e,t);console.log(`🔄 Generated ${s.length} army combinations to evaluate`),this.reportProgress(e,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:0,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const a=[];let o=0;for(let m=0;m<s.length;m++){this.checkCancellation(e);const d=performance.now();if(d-n>i){console.warn(`⏱️ Optimization timeout after ${(d-n)/1e3}s - stopping at ${o} combinations`);break}const u=s[m];try{const h=await this.evaluateArmyComposition(u,e.enemyGroupCount,t);a.push(h),o++}catch(h){console.warn("⚠️ Failed to evaluate army composition:",h)}if(o%3===0&&await new Promise(h=>setTimeout(h,0)),o%10===0||o===s.length){const h=performance.now()-n,g=20+Math.floor(o/s.length*60),b=o>0?h/o*(s.length-o):void 0;this.reportProgress(e,{phase:"evaluating",progress:g,message:`Evaluating combinations... (${o}/${s.length})`,combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:h,estimatedRemainingMs:b})}if(o%25===0){const h=(performance.now()-n)/1e3;console.log(`📊 Progress: ${o}/${s.length} combinations (${h.toFixed(1)}s elapsed)`)}}this.reportProgress(e,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const r=a.sort((m,d)=>{const u=d.averageDamagePerBattle-m.averageDamagePerBattle;return Math.abs(u)>.01?u:d.damageEfficiencyScore-m.damageEfficiencyScore}),c=performance.now()-n;return console.log(`✅ Optimization complete: ${r.length} valid results in ${c.toFixed(2)}ms`),this.reportProgress(e,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:c}),{rankedResults:r,combinationsEvaluated:o,optimizationTimeMs:c,algorithmUsed:this.algorithm.name,wasTruncated:s.length>(e.maxCombinations||50)}}async evaluateArmyComposition(e,t,n){const i=this.battleSimulator.simulateBothScenarios(e,t),s=this.calculateSilverCost(e,n),a=this.calculateFoodConsumption(e,n),o=this.calculateRevivalCost(e,n),r=i.bestCase.totalDamageDealtToEnemies,l=i.worstCase.totalDamageDealtToEnemies,c=(r+l)/2,m=e.totalLeadershipCost+e.totalDominanceCost+s,d=m>0?c/m:0;return{armyComposition:e,battleAnalysis:i,totalSilverCost:s,totalFoodConsumption:a,totalRevivalCost:o,averageDamagePerBattle:c,damageEfficiencyScore:d}}calculateSilverCost(e,t){const n=new Map(t.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(e.units)){const o=n.get(s);o&&(i+=o.revival_cost_silver*a)}return i}calculateFoodConsumption(e,t){const n=new Map(t.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(e.units)){const o=n.get(s);o&&(i+=o.food_consumption*a)}return i}calculateRevivalCost(e,t){return this.calculateSilverCost(e,t)}validateOptimizationConstraints(e){if(e.enemyGroupCount<1||e.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(e.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(e.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!e.availableUnits||e.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(e.maxCombinations&&e.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class Z{constructor(){p(this,"name","Systematic Combination Testing")}async generateCombinations(e,t){const n=performance.now(),i=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const s=t.filter(l=>e.availableUnits.includes(l.name));console.log(`📋 Available units for optimization: ${s.length}`);const a=e.maxCombinations||50,o=this.generateUnitCombinations(s.map(l=>l.name),a);console.log(`🔄 Testing ${o.length} different unit combinations (user requested: ${a})`);const r=[];for(let l=0;l<o.length;l++){const c=performance.now();if(c-n>i){console.warn(`⏱️ Generation timeout after ${(c-n)/1e3}s - stopping at ${l} combinations`);break}const m=o[l];try{const d=await this.testCombinationWithStackingAlgorithm(m,e,t);d&&r.push(d)}catch(d){console.warn(`⚠️ Failed to test combination [${m.join(", ")}]:`,d)}if(l%5===0&&await new Promise(d=>setTimeout(d,0)),l%20===0&&l>0){const d=(performance.now()-n)/1e3;console.log(`🔄 Generation progress: ${l}/${o.length} combinations tested (${d.toFixed(1)}s)`)}}return console.log(`✅ Generated ${r.length} valid army combinations for evaluation`),r}generateUnitCombinations(e,t){const n=Math.pow(2,e.length)-1;if(console.log(`📊 Total possible combinations: ${n}, user requested: ${t}`),n>t)return this.generateLimitedCombinations(e,t);const i=[];for(let s=1;s<=n;s++){const a=[];for(let o=0;o<e.length;o++)s&1<<o&&a.push(e[o]);i.push(a)}return i.sort((s,a)=>a.length-s.length),console.log(`🎯 Generated all ${i.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${t} combinations (all possible combinations fit within limit)`),i}generateLimitedCombinations(e,t){const n=[];n.push([...e]);for(let i=0;i<e.length&&n.length<t;i++){const s=e.filter((a,o)=>o!==i);n.push(s)}for(let i=0;i<e.length&&n.length<t;i++)for(let s=i+1;s<e.length&&n.length<t;s++){const a=e.filter((o,r)=>r!==i&&r!==s);a.length>0&&n.push(a)}for(let i=0;i<e.length&&n.length<t;i++)for(let s=i+1;s<e.length&&n.length<t;s++)for(let a=s+1;a<e.length&&n.length<t;a++){const o=e.filter((r,l)=>l!==i&&l!==s&&l!==a);o.length>0&&n.push(o)}if(n.length<t){const i=Math.floor(e.length/2);for(let a=0;a<10&&n.length<t;a++){const o=this.getRandomCombination(e,i);n.some(r=>r.length===o.length&&r.every(l=>o.includes(l)))||n.push(o)}const s=Math.max(1,Math.floor(e.length/4));for(let a=0;a<5&&n.length<t;a++){const o=this.getRandomCombination(e,s);n.some(r=>r.length===o.length&&r.every(l=>o.includes(l)))||n.push(o)}}return console.log(`🎯 Generated ${n.length} top-down combinations from ${e.length} units`),console.log(`   Strategy: Started with all ${e.length} units, then systematically removed units`),console.log(`   User requested: ${t} combinations (time-based limits still apply)`),n}getRandomCombination(e,t){return[...e].sort(()=>Math.random()-.5).slice(0,t)}async testCombinationWithStackingAlgorithm(e,t,n){try{const i=new O(n),s={leadershipBudget:t.leadershipBudget,dominanceBudget:t.dominanceBudget,mercenaryLimits:t.mercenaryLimits,availableUnits:e},a=await i.optimizeArmy(s);return a.compositions&&a.compositions.length>0?a.compositions[0]:null}catch(i){return console.warn(`Failed to test combination [${e.join(", ")}]:`,i),null}}}class ee extends P{simulateBattleWithEnemyUnits(e){this.validateEnemyUnitBattleConfiguration(e);const t={currentTurn:0,playerGroups:[...e.playerArmy.stackingOrder],enemyUnits:e.enemyUnits.map(o=>({unit:o,currentHealth:o.health,isAlive:!0,damageReceived:0})),totalDamageDealt:0,battleEnded:!1,combatLog:[],useEnemyModifiers:e.useEnemyModifiers!==!1};let n=0;const i=5;for(;!this.shouldEnemyUnitBattleEnd(t)&&t.currentTurn<z.MAX_BATTLE_TURNS;){const o=t.combatLog.length;t.currentTurn++;try{this.processEnemyUnitTurn(t,e.playerGoesFirst)}catch(r){throw new Error(`Enemy unit battle processing failed on turn ${t.currentTurn}: ${r instanceof Error?r.message:"Unknown error"}`)}if(t.combatLog.length===o){if(n++,n>=i)throw new Error(`Battle stalled: No actions taken for ${i} consecutive turns`)}else n=0;if(t.currentTurn>1&&t.playerGroups.length===0&&!t.battleEnded){t.battleEnded=!0;break}}if(t.currentTurn>=z.MAX_BATTLE_TURNS)throw new Error(`Battle exceeded maximum duration of ${z.MAX_BATTLE_TURNS} turns`);const s=x.calculateBattleStatistics(t.combatLog,t.totalDamageDealt),a={playerArmy:e.playerArmy,enemyGroupCount:e.enemyUnits.length,playerGoesFirst:e.playerGoesFirst};return{outcome:"player_eliminated",combatLog:t.combatLog,totalDamageDealtToEnemies:t.totalDamageDealt,battleDuration:t.currentTurn,playerSurvivalTurns:t.currentTurn,scenario:e.playerGoesFirst?"best_case":"worst_case",configuration:a,statistics:s}}simulateBothScenariosWithEnemyUnits(e,t,n=!0){if(!e)throw new Error("Player army is required");if(!t||t.length===0)throw new Error("At least one enemy unit is required");if(t.length>100)throw new Error("Cannot simulate with more than 100 enemy units (performance limit)");const i={playerArmy:e,enemyUnits:t,playerGoesFirst:!0,useEnemyModifiers:n},s=this.simulateBattleWithEnemyUnits(i),a={playerArmy:e,enemyUnits:t,playerGoesFirst:!1,useEnemyModifiers:n},o=this.simulateBattleWithEnemyUnits(a),r={damageDifference:s.totalDamageDealtToEnemies-o.totalDamageDealtToEnemies,survivalDifference:s.playerSurvivalTurns-o.playerSurvivalTurns,averageDamage:(s.totalDamageDealtToEnemies+o.totalDamageDealtToEnemies)/2,averageSurvival:(s.playerSurvivalTurns+o.playerSurvivalTurns)/2};return{bestCase:s,worstCase:o,comparison:r}}validateEnemyUnitBattleConfiguration(e){if(!e)throw new Error("Battle configuration is required");if(!e.playerArmy)throw new Error("Player army is required");if(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(!e.enemyUnits||!Array.isArray(e.enemyUnits)||e.enemyUnits.length===0)throw new Error("At least one enemy unit is required");if(e.enemyUnits.length>100)throw new Error("Cannot have more than 100 enemy units (performance limit)");for(const t of e.playerArmy.stackingOrder){if(!t.unitName||t.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(t.count<=0)throw new Error(`Unit group "${t.unitName}" must have a positive count`);if(t.unitStrength<=0)throw new Error(`Unit group "${t.unitName}" must have positive strength`);if(t.totalHealth<=0)throw new Error(`Unit group "${t.unitName}" must have positive health`)}for(const t of e.enemyUnits){if(!t.name||t.name.trim()==="")throw new Error("All enemy units must have a valid name");if(t.health<=0)throw new Error(`Enemy unit "${t.name}" must have positive health`);if(t.strength<0)throw new Error(`Enemy unit "${t.name}" cannot have negative strength`)}}shouldEnemyUnitBattleEnd(e){return e.playerGroups.length===0||e.battleEnded}processEnemyUnitTurn(e,t){const n=this.calculateAttackOrder(e.playerGroups),i=n.length,s=e.enemyUnits.filter(c=>c.isAlive),a=s.length,o=new Set;let r=0;const l=Math.max(i,a);for(let c=0;c<l*2&&!this.shouldEnemyUnitBattleEnd(e);c++){if(t?c%2===0:c%2===1){const d=this.getNextPlayerAttackerForEnemyBattle(e,n,o);if(d){this.processSinglePlayerAttackOnEnemyUnit(e,d,o.size);const u=`${d.unitName}:${d.count}:${d.unitStrength}`;o.add(u)}}else r<s.length&&e.playerGroups.length>0&&(this.processSingleEnemyUnitAttack(e,r),r++);if(o.size>=i&&r>=a)break}}processSinglePlayerAttackOnEnemyUnit(e,t,n){if(e.playerGroups.length===0)return;const i=e.enemyUnits.filter(c=>c.isAlive);if(i.length===0)return;const s=n%i.length,a=i[s],o=a.unit,r=x.calculateDamageDealt(t),l={turn:e.currentTurn,attacker:x.formatGroupForLog(t),target:o.name,action:`attack ${o.name} and deal ${r.toLocaleString()} damage`,damageDealt:r,eliminated:!1,enemyUnit:o,effectiveStrength:t.unitStrength};a.currentHealth=Math.max(0,a.currentHealth-r),a.damageReceived+=r,a.currentHealth<=0&&(a.isAlive=!1,l.action=`attack ${o.name} and deal ${r.toLocaleString()} damage (defeated)`),e.combatLog.push(l),e.totalDamageDealt+=r}processSingleEnemyUnitAttack(e,t){if(e.playerGroups.length===0)return;const n=e.enemyUnits.filter(d=>d.isAlive);if(t>=n.length)return;const s=n[t].unit,a=this.calculateEnemyTargetOrder(e.playerGroups);if(a.length===0)return;const o=a[0];let r=s.strength;const l=[];if(e.useEnemyModifiers&&s.attack_modifiers){const d=s.attack_modifiers.reduce((u,h)=>u+h.value,0)/s.attack_modifiers.length;d>0&&(r+=Math.round(d),l.push({type:"General",value:Math.round(d)}))}const c={turn:e.currentTurn,attacker:s.name,target:x.formatGroupForLog(o),action:`attack and kill ${x.formatGroupForLog(o)}`,eliminated:!0,enemyUnit:s,effectiveStrength:r,modifiersApplied:l.length>0?l:void 0};if(l.length>0){const d=l.map(u=>`+${u.value} vs ${u.type}`).join(", ");c.action+=` (${d})`}e.combatLog.push(c);const m=e.playerGroups.findIndex(d=>d.unitName===o.unitName&&d.count===o.count&&d.totalHealth===o.totalHealth);m!==-1&&e.playerGroups.splice(m,1),e.playerGroups.length===0&&(e.battleEnded=!0)}getNextPlayerAttackerForEnemyBattle(e,t,n){for(const i of t){const s=`${i.unitName}:${i.count}:${i.unitStrength}`;if(!n.has(s)){const a=e.playerGroups.find(o=>o.unitName===i.unitName&&o.unitStrength===i.unitStrength);if(a)return a}}return null}getEnemyUnitBattleStatistics(e){const t=x.calculateBattleStatistics(e.combatLog,e.totalDamageDealtToEnemies),n=e.combatLog.filter(o=>o.enemyUnit!==void 0),i={},s={},a={};return n.forEach(o=>{if(o.enemyUnit){const r=o.enemyUnit.name;if(o.eliminated)s[r]=(s[r]||0)+1,o.modifiersApplied&&o.modifiersApplied.forEach(l=>{const c=`${r} vs ${l.type}`;a[c]=(a[c]||0)+l.value});else{const l=o.damageDealt||0;i[r]=(i[r]||0)+l}}}),{...t,damageByEnemyUnit:i,attacksByEnemyUnit:s,modifiersUsed:a,totalEnemyUnitsInvolved:Object.keys(s).length,totalModifierApplications:Object.keys(a).length}}}class k{static getStrengthPerHealth(e){return e.health>0?e.strength/e.health:0}static getEffectivenessScore(e){return e.strength*e.health/1e3}static hasUnitType(e,t){return e.unit_types.some(n=>n.toLowerCase()===t.toLowerCase())}static getAttackModifierAgainst(e,t){if(!e.attack_modifiers)return 0;const n=e.attack_modifiers.find(i=>i.target_type.toLowerCase()===t.toLowerCase());return n?n.value:0}static getTotalStrengthAgainst(e,t){const n=e.strength,i=k.getAttackModifierAgainst(e,t);return n+i}static validateEnemyUnit(e){const t=[],n=[];return(!e.name||e.name.trim()==="")&&t.push("Unit name is required"),(!e.unit_types||!Array.isArray(e.unit_types)||e.unit_types.length===0)&&t.push("At least one unit type is required"),(typeof e.health!="number"||e.health<=0)&&t.push("Health must be a positive number"),(typeof e.strength!="number"||e.strength<=0)&&t.push("Strength must be a positive number"),e.attack_modifiers&&(Array.isArray(e.attack_modifiers)?e.attack_modifiers.forEach((i,s)=>{(!i.target_type||i.target_type.trim()==="")&&t.push(`Attack modifier ${s+1}: target_type is required`),i.modifier_type!=="Strength"&&t.push(`Attack modifier ${s+1}: modifier_type must be 'Strength'`),(typeof i.value!="number"||i.value<0)&&t.push(`Attack modifier ${s+1}: value must be a non-negative number`)}):t.push("Attack modifiers must be an array")),e.health&&e.health>1e7&&n.push("Health value is unusually high"),e.strength&&e.strength>5e6&&n.push("Strength value is unusually high"),{isValid:t.length===0,errors:t,warnings:n.length>0?n:void 0}}static createUserEnemyUnit(e){const t=new Date;return{...e,id:`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,createdAt:t,modifiedAt:t}}static updateUserEnemyUnit(e,t){return{...e,...t,modifiedAt:new Date}}}const te=["Flying","Epic Monster","Ranged","Melee","Mounted","Beast","Undead","Giant","Dragon","Elemental","Demon","Human","Construct","Magic","Siege","Aquatic","Monster","Specialist","Elite","Heavy","Light"],ne=["Strength"],ie=["Melee","Ranged","Flying","Mounted","Beast","Human","Siege","Dragon","Elemental","Giant","Fortification","Undead","Demon"];class R{constructor(){p(this,"enemyUnits",[]);p(this,"enemyUnitsByName",new Map);p(this,"enemyUnitsByType",new Map);this.resetData()}async loadEnemyUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading enemy units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch enemy units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Enemy unit data must be an array");return this.enemyUnits=t.map(n=>this.validateAndNormalizeEnemyUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.enemyUnits.length} enemy units successfully`),this.enemyUnits}catch(t){throw console.error("❌ Error loading enemy units:",t),t}}validateAndNormalizeEnemyUnit(e){const t={name:e.name||"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],health:Number(e.health)||0,strength:Number(e.strength)||0,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers:[]};return(!Array.isArray(t.unit_types)||t.unit_types.length===0)&&(console.warn(`Enemy unit ${t.name} has no unit types, adding 'Unknown'`),t.unit_types=["Unknown"]),t.health<=0&&(console.warn(`Enemy unit ${t.name} has invalid health: ${t.health}`),t.health=1),t.strength<0&&(console.warn(`Enemy unit ${t.name} has negative strength: ${t.strength}`),t.strength=0),t.attack_modifiers&&Array.isArray(t.attack_modifiers)&&(t.attack_modifiers=t.attack_modifiers.filter(n=>!n||typeof n!="object"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier object`),!1):!n.target_type||typeof n.value!="number"?(console.warn(`Enemy unit ${t.name} has invalid attack modifier: ${JSON.stringify(n)}`),!1):!0)),t}buildLookups(){this.resetData(),this.enemyUnitsByName=new Map(this.enemyUnits.map(e=>[e.name,e])),this.enemyUnits.forEach(e=>{e.unit_types.forEach(t=>{this.enemyUnitsByType.has(t)||this.enemyUnitsByType.set(t,[]),this.enemyUnitsByType.get(t).push(e)})}),this.enemyUnitsByType.forEach(e=>{e.sort((t,n)=>n.strength-t.strength)})}resetData(){this.enemyUnitsByName.clear(),this.enemyUnitsByType.clear()}getAllEnemyUnits(){return[...this.enemyUnits]}getEnemyUnitByName(e){return this.enemyUnitsByName.get(e)}getEnemyUnitsByType(e){return[...this.enemyUnitsByType.get(e)||[]]}getUniqueEnemyUnitTypes(){return Array.from(this.enemyUnitsByType.keys()).sort()}filterEnemyUnits(e){let t=this.enemyUnits;return e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(i=>n.unit_types.includes(i)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxStrength!==void 0&&(t=t.filter(n=>n.strength<=e.maxStrength)),e.minHealth!==void 0&&(t=t.filter(n=>n.health>=e.minHealth)),e.maxHealth!==void 0&&(t=t.filter(n=>n.health<=e.maxHealth)),t}searchEnemyUnits(e){if(!e.trim())return this.getAllEnemyUnits();const t=e.toLowerCase();return this.enemyUnits.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedEnemyUnits(){return this.enemyUnits.map(e=>({...e,get strengthPerHealth(){return k.getStrengthPerHealth(e)},get effectivenessScore(){return k.getEffectivenessScore(e)}}))}getEnemyUnitSummary(){if(this.enemyUnits.length===0)return{totalUnits:0,byUnitType:{},strengthRange:{min:0,max:0,average:0},healthRange:{min:0,max:0,average:0}};const e=this.enemyUnits.map(i=>i.strength),t=this.enemyUnits.map(i=>i.health),n={};return this.enemyUnitsByType.forEach((i,s)=>{n[s]=i.length}),{totalUnits:this.enemyUnits.length,byUnitType:n,strengthRange:{min:Math.min(...e),max:Math.max(...e),average:Math.round(e.reduce((i,s)=>i+s,0)/e.length)},healthRange:{min:Math.min(...t),max:Math.max(...t),average:Math.round(t.reduce((i,s)=>i+s,0)/t.length)}}}getStatistics(){if(this.enemyUnits.length===0)return{totalUnits:0,unitTypeDistribution:{},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[],unitsWithAttackModifiers:0};const e=this.enemyUnits.map(s=>s.strength),t=this.enemyUnits.map(s=>s.health),n={};this.enemyUnitsByType.forEach((s,a)=>{n[a]=s.length});const i=this.enemyUnits.filter(s=>s.attack_modifiers&&Array.isArray(s.attack_modifiers)&&s.attack_modifiers.length>0).length;return{totalUnits:this.enemyUnits.length,unitTypeDistribution:n,strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((s,a)=>s+a,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((s,a)=>s+a,0)/t.length)},topUnitsByStrength:[...this.enemyUnits].sort((s,a)=>a.strength-s.strength).slice(0,10),topUnitsByHealth:[...this.enemyUnits].sort((s,a)=>a.health-s.health).slice(0,10),unitsWithAttackModifiers:i}}getEnemyUnitsWithModifiersAgainst(e){return this.enemyUnits.filter(t=>!t.attack_modifiers||!Array.isArray(t.attack_modifiers)?!1:e.some(n=>t.attack_modifiers.some(i=>i.target_type.toLowerCase()===n.toLowerCase())))}getMostEffectiveAgainst(e,t=5){return this.enemyUnits.map(n=>({unit:n,effectiveness:this.calculateEffectivenessAgainst(n,e)})).sort((n,i)=>i.effectiveness-n.effectiveness).slice(0,t).map(n=>n.unit)}calculateEffectivenessAgainst(e,t){let n=k.getEffectivenessScore(e);return e.attack_modifiers&&Array.isArray(e.attack_modifiers)&&t.forEach(i=>{const s=k.getAttackModifierAgainst(e,i);n+=s*.1}),n}}class ${static validateEnemyUnit(e){return k.validateEnemyUnit(e)}static validateUserEnemyUnit(e){const t=k.validateEnemyUnit(e),n=[...t.errors],i=[...t.warnings||[]];return(!e.id||typeof e.id!="string"||e.id.trim()==="")&&n.push("User enemy unit must have a valid ID"),(!e.createdAt||!(e.createdAt instanceof Date))&&n.push("User enemy unit must have a valid creation date"),(!e.modifiedAt||!(e.modifiedAt instanceof Date))&&n.push("User enemy unit must have a valid modification date"),e.createdAt&&e.modifiedAt&&e.createdAt instanceof Date&&e.modifiedAt instanceof Date&&e.modifiedAt<e.createdAt&&n.push("Modification date cannot be before creation date"),{isValid:n.length===0,errors:n,warnings:i.length>0?i:void 0}}static validateName(e){if(!e||typeof e!="string")return{isValid:!1,error:"Name must be a non-empty string"};const t=e.trim();return t.length===0?{isValid:!1,error:"Name cannot be empty or only whitespace"}:t.length>100?{isValid:!1,error:"Name cannot exceed 100 characters"}:/[<>\"'&]/.test(t)?{isValid:!1,error:`Name contains invalid characters (<, >, ", ', &)`}:{isValid:!0}}static validateUnitTypes(e){const t=[];if(!Array.isArray(e))return{isValid:!1,error:"Unit types must be an array"};if(e.length===0)return{isValid:!1,error:"At least one unit type is required"};if(e.length>10)return{isValid:!1,error:"Cannot have more than 10 unit types"};for(let i=0;i<e.length;i++){const s=e[i];if(typeof s!="string"||s.trim()==="")return{isValid:!1,error:`Unit type ${i+1} must be a non-empty string`};te.includes(s)||t.push(`Unit type '${s}' is not a standard type`)}return new Set(e).size!==e.length?{isValid:!1,error:"Unit types cannot contain duplicates"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateHealth(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Health must be a number"}:Number.isFinite(e)?e<=0?{isValid:!1,error:"Health must be greater than 0"}:e>5e7?{isValid:!1,error:"Health cannot exceed 50,000,000"}:(e<100&&t.push("Health value is unusually low (less than 100)"),e>1e7&&t.push("Health value is unusually high (greater than 10,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Health must be a finite number"}}static validateStrength(e){const t=[];return typeof e!="number"?{isValid:!1,error:"Strength must be a number"}:Number.isFinite(e)?e<0?{isValid:!1,error:"Strength cannot be negative"}:e>25e6?{isValid:!1,error:"Strength cannot exceed 25,000,000"}:(e===0&&t.push("Strength value of 0 means this unit cannot deal damage"),e<50&&t.push("Strength value is unusually low (less than 50)"),e>5e6&&t.push("Strength value is unusually high (greater than 5,000,000)"),{isValid:!0,warnings:t.length>0?t:void 0}):{isValid:!1,error:"Strength must be a finite number"}}static validateAttackModifiers(e){const t=[];if(e==null)return{isValid:!0};if(!Array.isArray(e))return{isValid:!1,error:"Attack modifiers must be an array"};if(e.length>20)return{isValid:!1,error:"Cannot have more than 20 attack modifiers"};for(let s=0;s<e.length;s++){const a=e[s];if(!a||typeof a!="object")return{isValid:!1,error:`Attack modifier ${s+1} must be an object`};if(!a.target_type||typeof a.target_type!="string")return{isValid:!1,error:`Attack modifier ${s+1}: target_type is required and must be a string`};if(ie.includes(a.target_type)||t.push(`Attack modifier ${s+1}: '${a.target_type}' is not a standard target type`),!a.modifier_type||!ne.includes(a.modifier_type))return{isValid:!1,error:`Attack modifier ${s+1}: modifier_type must be 'Strength'`};if(typeof a.value!="number"||!Number.isFinite(a.value))return{isValid:!1,error:`Attack modifier ${s+1}: value must be a finite number`};if(a.value<0)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot be negative`};if(a.value>1e7)return{isValid:!1,error:`Attack modifier ${s+1}: value cannot exceed 10,000,000`};a.value>1e6&&t.push(`Attack modifier ${s+1}: value is unusually high (${a.value})`)}const n=e.map(s=>{var a;return(a=s.target_type)==null?void 0:a.toLowerCase()}).filter(Boolean);return new Set(n).size!==n.length?{isValid:!1,error:"Attack modifiers cannot have duplicate target types"}:{isValid:!0,warnings:t.length>0?t:void 0}}static validateForImport(e){const t=[],n=[];if(!e||typeof e!="object")return{isValid:!1,errors:["Data must be an object"]};const i=this.validateName(e.name);i.isValid||t.push(i.error);const s=this.validateUnitTypes(e.unit_types);s.isValid?s.warnings&&n.push(...s.warnings):t.push(s.error);const a=this.validateHealth(e.health);a.isValid?a.warnings&&n.push(...a.warnings):t.push(a.error);const o=this.validateStrength(e.strength);o.isValid?o.warnings&&n.push(...o.warnings):t.push(o.error);const r=this.validateAttackModifiers(e.attack_modifiers);return r.isValid?r.warnings&&n.push(...r.warnings):t.push(r.error),{isValid:t.length===0,errors:t,warnings:n.length>0?n:void 0}}static validateMultipleUnits(e){if(!Array.isArray(e))return{isValid:!1,results:[],summary:{total:0,valid:0,invalid:0,warnings:0}};const t=e.map((i,s)=>({index:s,validation:this.validateForImport(i)})),n={total:e.length,valid:t.filter(i=>i.validation.isValid).length,invalid:t.filter(i=>!i.validation.isValid).length,warnings:t.filter(i=>i.validation.warnings&&i.validation.warnings.length>0).length};return{isValid:n.invalid===0,results:t,summary:n}}static sanitizeEnemyUnit(e){const t={name:typeof e.name=="string"?e.name.trim():"Unknown Enemy",unit_types:Array.isArray(e.unit_types)?e.unit_types.filter(n=>typeof n=="string"&&n.trim()!==""):["Epic Monster"],health:typeof e.health=="number"&&e.health>0?Math.min(e.health,5e7):1e4,strength:typeof e.strength=="number"&&e.strength>=0?Math.min(e.strength,25e6):5e3,attack_modifiers:Array.isArray(e.attack_modifiers)?e.attack_modifiers.filter(n=>n&&typeof n=="object"&&typeof n.target_type=="string"&&typeof n.value=="number"&&n.value>=0).map(n=>({target_type:n.target_type,modifier_type:"Strength",value:Math.min(n.value,1e7)})):[]};return t.name.length===0&&(t.name="Unknown Enemy"),t.unit_types.length===0&&(t.unit_types=["Epic Monster"]),t}}const I=class I{constructor(e={}){p(this,"storageKey");p(this,"metadataKey");p(this,"maxUnits");p(this,"validateOnLoad");this.storageKey=e.storagePrefix?`${e.storagePrefix}_user_enemy_units`:I.DEFAULT_STORAGE_KEY,this.metadataKey=e.storagePrefix?`${e.storagePrefix}_enemy_units_metadata`:I.METADATA_KEY,this.maxUnits=e.maxUnits||I.DEFAULT_MAX_UNITS,this.validateOnLoad=e.validateOnLoad!==!1}isStorageAvailable(){try{const e="__storage_test__";return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch{return!1}}getAllUserEnemyUnits(){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),[];try{const e=localStorage.getItem(this.storageKey);if(!e)return[];const n=JSON.parse(e).map(i=>({...i,createdAt:new Date(i.createdAt),modifiedAt:new Date(i.modifiedAt)}));return this.validateOnLoad?n.filter(i=>{const s=$.validateUserEnemyUnit(i);return s.isValid?!0:(console.warn(`Invalid stored enemy unit removed: ${i.name}`,s.errors),!1)}):n}catch(e){return console.error("Error loading user enemy units from storage:",e),[]}}saveAllUserEnemyUnits(e){if(!this.isStorageAvailable())return console.warn("localStorage is not available"),!1;try{return localStorage.setItem(this.storageKey,JSON.stringify(e)),this.updateMetadata(),!0}catch(t){return console.error("Error saving user enemy units to storage:",t),!1}}addUserEnemyUnit(e){const t=$.validateEnemyUnit(e);if(!t.isValid)return{success:!1,error:`Validation failed: ${t.errors.join(", ")}`};const n=this.getAllUserEnemyUnits();if(n.length>=this.maxUnits)return{success:!1,error:`Maximum number of units (${this.maxUnits}) reached`};if(n.some(a=>a.name.toLowerCase()===e.name.toLowerCase()))return{success:!1,error:`A unit with the name "${e.name}" already exists`};const i=k.createUserEnemyUnit(e);return n.push(i),this.saveAllUserEnemyUnits(n)?{success:!0,unit:i}:{success:!1,error:"Failed to save unit to storage"}}updateUserEnemyUnit(e,t){const n=this.getAllUserEnemyUnits(),i=n.findIndex(c=>c.id===e);if(i===-1)return{success:!1,error:"Unit not found"};const s=n[i],a={...s,...t},o=$.validateUserEnemyUnit(a);if(!o.isValid)return{success:!1,error:`Validation failed: ${o.errors.join(", ")}`};if(t.name&&n.some((c,m)=>m!==i&&c.name.toLowerCase()===t.name.toLowerCase()))return{success:!1,error:`A unit with the name "${t.name}" already exists`};const r=k.updateUserEnemyUnit(s,t);return n[i]=r,this.saveAllUserEnemyUnits(n)?{success:!0,unit:r}:{success:!1,error:"Failed to save updated unit to storage"}}deleteUserEnemyUnit(e){const t=this.getAllUserEnemyUnits(),n=t.findIndex(s=>s.id===e);return n===-1?{success:!1,error:"Unit not found"}:(t.splice(n,1),this.saveAllUserEnemyUnits(t)?{success:!0}:{success:!1,error:"Failed to save changes to storage"})}getUserEnemyUnitById(e){return this.getAllUserEnemyUnits().find(n=>n.id===e)||null}searchUserEnemyUnits(e){const t=this.getAllUserEnemyUnits();if(!e.trim())return t;const n=e.toLowerCase();return t.filter(i=>i.name.toLowerCase().includes(n))}clearAllUserEnemyUnits(){if(!this.isStorageAvailable())return{success:!1,error:"localStorage is not available"};try{return localStorage.removeItem(this.storageKey),localStorage.removeItem(this.metadataKey),{success:!0}}catch{return{success:!1,error:"Failed to clear storage"}}}exportUserEnemyUnits(){try{const e=this.getAllUserEnemyUnits(),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(n=>({name:n.name,unit_types:n.unit_types,health:n.health,strength:n.strength,attack_modifiers:n.attack_modifiers,createdAt:n.createdAt.toISOString(),modifiedAt:n.modifiedAt.toISOString()}))};return{success:!0,data:JSON.stringify(t,null,2)}}catch{return{success:!1,error:"Failed to export units"}}}importUserEnemyUnits(e,t={}){try{const n=JSON.parse(e);if(!n.units||!Array.isArray(n.units))return{success:!1,errors:["Invalid import format: units array not found"]};const i=t.replace?[]:this.getAllUserEnemyUnits(),s=[];let a=0,o=0;for(const l of n.units){const c=$.validateForImport(l);if(!c.isValid){s.push(`Unit "${l.name||"Unknown"}": ${c.errors.join(", ")}`),o++;continue}if(i.some(u=>u.name.toLowerCase()===l.name.toLowerCase()))if(t.skipDuplicates){o++;continue}else{s.push(`Unit "${l.name}" already exists`),o++;continue}if(i.length>=this.maxUnits){s.push(`Maximum number of units (${this.maxUnits}) reached`);break}const d=k.createUserEnemyUnit({name:l.name,unit_types:l.unit_types,health:l.health,strength:l.strength,attack_modifiers:l.attack_modifiers||[]});i.push(d),a++}return this.saveAllUserEnemyUnits(i)?{success:!0,imported:a,skipped:o,errors:s.length>0?s:void 0}:{success:!1,errors:["Failed to save imported units to storage"]}}catch{return{success:!1,errors:["Invalid JSON format"]}}}getStorageStats(){var a;const e=this.getAllUserEnemyUnits(),t=new Date;t.setHours(0,0,0,0);const n=e.filter(o=>o.createdAt>=t).length;let i=null;e.length>0&&(i=new Date(Math.max(...e.map(o=>o.modifiedAt.getTime()))));const s=this.isStorageAvailable()?(((a=localStorage.getItem(this.storageKey))==null?void 0:a.length)||0)*2:0;return{totalUnits:e.length,storageSize:s,lastModified:i,unitsCreatedToday:n}}updateMetadata(){if(this.isStorageAvailable())try{const e={lastModified:new Date().toISOString(),version:"1.0"};localStorage.setItem(this.metadataKey,JSON.stringify(e))}catch(e){console.warn("Failed to update metadata:",e)}}getAvailableSpace(){return Math.max(0,this.maxUnits-this.getAllUserEnemyUnits().length)}isNearCapacity(e=.9){return this.getAllUserEnemyUnits().length>=this.maxUnits*e}};p(I,"DEFAULT_STORAGE_KEY","army_calculator_user_enemy_units"),p(I,"METADATA_KEY","army_calculator_enemy_units_metadata"),p(I,"DEFAULT_MAX_UNITS",100);let _=I;class j{constructor(e){p(this,"container",null);p(this,"props");p(this,"loader");p(this,"storage");p(this,"presetUnits",[]);p(this,"userUnits",[]);p(this,"filteredUnits",[]);p(this,"currentFilter","");p(this,"currentCategory","all");p(this,"currentSelectedUnits",[]);this.props=e,this.loader=new R,this.storage=new _,this.currentSelectedUnits=e.selectedUnits?[...e.selectedUnits]:[]}async mount(e){this.container=e,await this.loadData(),this.render(),this.attachEventListeners()}async loadData(){try{this.presetUnits=await this.loader.loadEnemyUnits("./enemy_units.json"),this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}catch(e){console.error("Error loading enemy unit data:",e),this.presetUnits=[],this.userUnits=[],this.filteredUnits=[]}}updateFilteredUnits(){let e=[];switch(this.currentCategory){case"preset":e=[...this.presetUnits];break;case"user":e=[...this.userUnits];break;case"all":default:e=[...this.presetUnits,...this.userUnits];break}if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();this.filteredUnits=e.filter(n=>n.name.toLowerCase().includes(t)||n.unit_types.some(i=>i.toLowerCase().includes(t)))}else this.filteredUnits=e;this.filteredUnits.sort((t,n)=>t.name.localeCompare(n.name))}render(){if(!this.container)return;const e=this.props.title||"Select Enemy Unit";this.container.innerHTML=`
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
      `:this.filteredUnits.map(e=>{var i;const t=this.props.mode==="multiple"?this.currentSelectedUnits.some(s=>s.name===e.name):((i=this.props.selectedUnit)==null?void 0:i.name)===e.name,n="id"in e;return`
        <div class="unit-card ${t?"selected":""}" data-unit-name="${e.name}">
          <div class="unit-card-header">
            <div class="unit-info">
              <h4 class="unit-name">
                ${e.name}
                ${n?'<span class="user-badge">👤</span>':'<span class="preset-badge">🏛️</span>'}
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
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-selector");e&&e.addEventListener("click",this.handleCancel.bind(this));const t=document.getElementById("cancel-selection");t&&t.addEventListener("click",this.handleCancel.bind(this));const n=document.getElementById("confirm-selection");n&&n.addEventListener("click",this.handleConfirm.bind(this));const i=document.getElementById("unit-search");i&&i.addEventListener("input",this.handleSearch.bind(this));const s=document.getElementById("clear-search");s&&s.addEventListener("click",this.handleClearSearch.bind(this)),document.querySelectorAll(".filter-tab").forEach(o=>{o.addEventListener("click",this.handleFilterChange.bind(this))}),document.querySelectorAll(".select-unit-btn").forEach(o=>{o.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(o=>{o.addEventListener("click",this.handleCardClick.bind(this))});const a=document.querySelector(".modal-overlay");a&&a.addEventListener("click",o=>{o.target===a&&this.handleCancel()}),document.addEventListener("keydown",this.handleKeyDown.bind(this))}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitList()}handleFilterChange(e){const n=e.target.dataset.category;n&&n!==this.currentCategory&&(this.currentCategory=n,this.updateFilteredUnits(),this.refreshFilterTabs(),this.refreshUnitList())}handleUnitSelect(e){e.stopPropagation();const n=e.target.dataset.unitName;if(n){const i=this.filteredUnits.find(s=>s.name===n);if(i){if(this.props.mode==="multiple"){const s=this.currentSelectedUnits.findIndex(a=>a.name===i.name);if(s>=0)this.currentSelectedUnits.splice(s,1);else{const a=this.props.maxSelections||5;this.currentSelectedUnits.length<a?this.currentSelectedUnits.push(i):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(i))}this.refreshUnitList()}this.props.onSelect(i)}}}handleCardClick(e){const n=e.target.closest(".unit-card");if(n){const i=n.dataset.unitName;if(i){const s=this.filteredUnits.find(a=>a.name===i);if(s){if(this.props.mode==="multiple"){const a=this.currentSelectedUnits.findIndex(o=>o.name===s.name);if(a>=0)this.currentSelectedUnits.splice(a,1);else{const o=this.props.maxSelections||5;this.currentSelectedUnits.length<o?this.currentSelectedUnits.push(s):(this.currentSelectedUnits.shift(),this.currentSelectedUnits.push(s))}this.refreshUnitList()}this.props.onSelect(s)}}}}handleCancel(){this.props.onCancel()}handleConfirm(){this.props.selectedUnit&&this.props.onSelect(this.props.selectedUnit)}handleKeyDown(e){e.key==="Escape"&&this.handleCancel()}refreshUnitList(){const e=document.getElementById("unit-list");e&&(e.innerHTML=this.renderUnitList(),document.querySelectorAll(".select-unit-btn").forEach(n=>{n.addEventListener("click",this.handleUnitSelect.bind(this))}),document.querySelectorAll(".unit-card").forEach(n=>{n.addEventListener("click",this.handleCardClick.bind(this))}));const t=document.querySelector(".results-count");t&&(t.textContent=`${this.filteredUnits.length} unit${this.filteredUnits.length!==1?"s":""} found`)}refreshFilterTabs(){document.querySelectorAll(".filter-tab").forEach(e=>{e.getAttribute("data-category")===this.currentCategory?e.classList.add("active"):e.classList.remove("active")})}unmount(){document.removeEventListener("keydown",this.handleKeyDown.bind(this)),this.container&&(this.container.innerHTML="")}updateTitle(e){this.props.title=e;const t=document.getElementById("modal-title");t&&(t.textContent=`⚔️ ${e}`)}updateSelectedUnits(e){this.currentSelectedUnits=[...e],this.refreshUnitList()}}const se=Object.freeze(Object.defineProperty({__proto__:null,EnemyUnitSelector:j},Symbol.toStringTag,{value:"Module"}));class H{constructor(){p(this,"container",null);p(this,"battleService");p(this,"enemyBattleService");p(this,"currentArmy",null);p(this,"currentAnalysis",null);p(this,"selectedEnemyUnit",null);p(this,"enemyUnitSelector",null);p(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.battleService=new P,this.enemyBattleService=new ee}mount(e,t){this.container=e,this.currentArmy=t,this.render(),this.attachEventListeners(),this.showSimulationControls()}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const e=document.getElementById("run-simulation-btn"),t=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups"),i=document.getElementById("select-enemy-btn"),s=document.getElementById("clear-enemy-btn");e&&e.addEventListener("click",()=>this.runSimulation()),t&&t.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),i&&i.addEventListener("click",()=>this.openEnemyUnitSelector()),s&&s.addEventListener("click",()=>this.clearSelectedEnemyUnit()),document.querySelectorAll('input[name="enemy-type"]').forEach(o=>{o.addEventListener("change",r=>this.handleEnemyTypeChange(r))}),this.attachTooltipListeners()}handleEnemyTypeChange(e){const n=e.target.value,i=document.getElementById("generic-enemy-input"),s=document.getElementById("specific-enemy-input");n==="generic"?(i==null||i.classList.remove("hidden"),s==null||s.classList.add("hidden")):n==="specific"&&(i==null||i.classList.add("hidden"),s==null||s.classList.remove("hidden")),this.validateInput()}async openEnemyUnitSelector(){const e=document.createElement("div");e.id="enemy-unit-selector-modal",document.body.appendChild(e),this.enemyUnitSelector=new j({onSelect:t=>{this.selectedEnemyUnit=t,this.displaySelectedEnemyUnit(),this.validateInput(),this.closeEnemyUnitSelector()},onCancel:()=>{this.closeEnemyUnitSelector()},selectedUnit:this.selectedEnemyUnit,mode:"single",title:"Select Enemy Unit for Battle"}),await this.enemyUnitSelector.mount(e)}closeEnemyUnitSelector(){this.enemyUnitSelector&&(this.enemyUnitSelector.unmount(),this.enemyUnitSelector=null);const e=document.getElementById("enemy-unit-selector-modal");e&&e.remove()}clearSelectedEnemyUnit(){this.selectedEnemyUnit=null,this.displaySelectedEnemyUnit(),this.validateInput()}displaySelectedEnemyUnit(){const e=document.getElementById("no-enemy-selected"),t=document.getElementById("selected-enemy-info"),n=document.getElementById("clear-enemy-btn");if(!(!e||!t||!n))if(!this.selectedEnemyUnit)e.classList.remove("hidden"),t.classList.add("hidden"),n.style.display="none";else{e.classList.add("hidden"),t.classList.remove("hidden"),n.style.display="inline-block";const i=this.selectedEnemyUnit,s=i.attack_modifiers&&Object.keys(i.attack_modifiers).length>0?Object.entries(i.attack_modifiers).map(([a,o])=>`+${o} vs ${a}`).join(", "):"None";t.innerHTML=`
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
      `}}validateInput(){const e=document.getElementById("run-simulation-btn");if(!e)return!1;const t=document.querySelector('input[name="enemy-type"]:checked'),n=(t==null?void 0:t.value)||"generic";let i=!0,s="";if(n==="generic"){const a=document.getElementById("enemy-groups");if(!a)return!1;const o=a.value.trim();if(!o)i=!1,s="Please enter the number of enemy groups";else if(isNaN(Number(o))||!Number.isInteger(Number(o)))i=!1,s="Please enter a valid whole number";else{const r=parseInt(o);r<1?(i=!1,s="Number of enemy groups must be at least 1"):r>50&&(i=!1,s="Number of enemy groups cannot exceed 50 (performance limit)")}i?(a.classList.remove("error"),this.hideInputError("enemy-groups")):(a.classList.add("error"),this.showInputError("enemy-groups",s))}else n==="specific"&&(this.selectedEnemyUnit||(i=!1,s="Please select an enemy unit for the battle simulation"));return e.disabled=!i||!this.validateArmyComposition(),i}validateArmyComposition(){if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const e of this.currentArmy.stackingOrder)if(!e.unitName||e.count<=0||e.unitStrength<=0||e.totalHealth<=0)return!1;return!0}showInputError(e,t){var s;const n=document.getElementById(e);if(!n)return;this.hideInputError(e);const i=document.createElement("div");i.className="input-error-message",i.id=`${e}-error`,i.textContent=t,(s=n.parentNode)==null||s.insertBefore(i,n.nextSibling)}hideInputError(e){const t=document.getElementById(`${e}-error`);t&&t.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(t=>{t.addEventListener("mouseenter",n=>this.showTooltip(n)),t.addEventListener("mouseleave",()=>this.hideTooltip()),t.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",t=>{const n=t.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(e){const t=e.target,n=t.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const i=document.getElementById("tooltip"),s=i==null?void 0:i.querySelector(".tooltip-content");!i||!s||(s.innerHTML=this.tooltipData[n],i.classList.remove("hidden"),this.positionTooltip(i,t))}hideTooltip(){const e=document.getElementById("tooltip");e&&e.classList.add("hidden")}toggleTooltip(e){const t=document.getElementById("tooltip");t!=null&&t.classList.contains("hidden")?this.showTooltip(e):this.hideTooltip()}positionTooltip(e,t){const n=t.getBoundingClientRect(),i=e;i.style.top="",i.style.left="",i.style.transform="";const s=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight;let r=n.bottom+10,l=n.left+n.width/2-s.width/2;l<10?l=10:l+s.width>a-10&&(l=a-s.width-10),r+s.height>o-10&&(r=n.top-s.height-10),i.style.top=`${r}px`,i.style.left=`${l}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const e=document.querySelector('input[name="enemy-type"]:checked'),t=(e==null?void 0:e.value)||"generic";this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((a,o)=>{try{if(t==="specific"&&this.selectedEnemyUnit)this.currentAnalysis=this.enemyBattleService.simulateBothScenariosWithEnemyUnits(this.currentArmy,[this.selectedEnemyUnit]);else{const r=document.getElementById("enemy-groups"),l=parseInt(r.value);l>this.currentArmy.stackingOrder.length*10&&console.warn(`Warning: ${l} enemy groups vs ${this.currentArmy.stackingOrder.length} player groups may result in a very short battle.`),this.currentAnalysis=this.battleService.simulateBothScenarios(this.currentArmy,l)}a()}catch(r){o(r)}}),i=new Promise((a,o)=>{setTimeout(()=>o(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,i]),!this.currentAnalysis||!this.currentAnalysis.bestCase||!this.currentAnalysis.worstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const s=document.getElementById("clear-simulation-btn");s&&(s.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let i="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?i="Simulation timed out. Try reducing the complexity or check your army composition.":n.message.includes("invalid")?i="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")?i="Army composition error. Please re-optimize your army and try again.":n.message.includes("Enemy unit")&&(i="Enemy unit configuration error. Please select a valid enemy unit.")),this.showError(i)}}displayResults(){if(!this.currentAnalysis)return;const e=document.getElementById("simulation-results");if(!e)return;const{bestCase:t,worstCase:n,comparison:i}=this.currentAnalysis;e.innerHTML=`
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
              <span class="stat-value">${n.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${n.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${n.statistics.totalPlayerAttacks}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="comparison-summary">
        <h4>📈 Comparison Analysis</h4>
        <div class="comparison-stats">
          <div class="comparison-stat">
            <span class="stat-label">Damage Difference:</span>
            <span class="stat-value ${i.damageDifference>=0?"positive":"negative"}">
              ${i.damageDifference>=0?"+":""}${i.damageDifference.toLocaleString()}
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Average Damage:</span>
            <span class="stat-value">${Math.round(i.averageDamage).toLocaleString()}</span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Survival Difference:</span>
            <span class="stat-value ${i.survivalDifference>=0?"positive":"negative"}">
              ${i.survivalDifference>=0?"+":""}${i.survivalDifference} turns
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
            ${this.formatCombatLog(n.combatLog)}
          </div>
        </div>
      </div>
    `,this.attachLogTabListeners(),this.attachTooltipListeners()}formatCombatLog(e){return e.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${e.map(n=>`
        <div class="${!n.attacker.includes("Enemy Group")?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${n.turn}:</span>
          <span class="action-text">${n.attacker} ${n.action}</span>
        </div>
      `).join("")}</div>`}attachLogTabListeners(){const e=document.querySelectorAll(".log-tab");e.forEach(t=>{t.addEventListener("click",n=>{const i=n.target,s=i.dataset.scenario;e.forEach(r=>r.classList.remove("active")),i.classList.add("active"),document.querySelectorAll(".combat-log").forEach(r=>{r.classList.remove("active"),r.classList.add("hidden")});const o=document.getElementById(`${s}-case-log`);o&&(o.classList.add("active"),o.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const e=document.getElementById("clear-simulation-btn");e&&(e.style.display="none")}showLoading(e){const t=document.getElementById("simulation-loading");t&&t.classList.toggle("hidden",!e)}showResults(e){const t=document.getElementById("simulation-results");t&&t.classList.toggle("hidden",!e)}showError(e){this.hideError();const t=document.createElement("div");t.className="simulation-error",t.id="simulation-error",t.innerHTML=`
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
    `,document.head.appendChild(e)}displayPreCalculatedResults(e){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",e),!this.container){console.log("BattleSimulationComponent: no container");return}this.currentAnalysis=e;const t=this.container.querySelector("#simulation-results");if(!t){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",t),t.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const n=this.container.querySelector(".simulation-controls"),i=this.container.querySelector(".enemy-input-container");n&&(n.style.display="none"),i&&(i.style.display="none");const s=this.container.querySelector("#simulation-note");s&&(s.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,s.classList.remove("hidden"))}showSimulationControls(){if(!this.container)return;const e=this.container.querySelector(".simulation-controls"),t=this.container.querySelector(".enemy-input-container");e&&(e.style.display="block"),t&&(t.style.display="block")}}class ae{constructor(e){p(this,"container",null);p(this,"props");p(this,"storage");p(this,"loader");p(this,"attackModifiers",{});this.props=e,this.storage=new _,this.loader=new R}mount(e){this.container=e,this.initializeForm(),this.render(),this.attachEventListeners()}initializeForm(){var e;(e=this.props.editingUnit)!=null&&e.attack_modifiers?(this.attackModifiers={},this.props.editingUnit.attack_modifiers.forEach(t=>{this.attackModifiers[t.target_type]=t.value})):this.attackModifiers={}}render(){var n;if(!this.container)return;const e=this.props.mode==="edit",t=this.props.editingUnit;this.container.innerHTML=`
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
      `).join(""),this.attachModifierEventListeners()}}attachEventListeners(){const e=document.getElementById("enemy-unit-form"),t=document.getElementById("save-btn"),n=document.getElementById("cancel-btn"),i=document.getElementById("delete-btn"),s=document.getElementById("add-modifier-btn");e&&e.addEventListener("submit",this.handleSubmit.bind(this)),t&&t.addEventListener("click",this.handleSubmit.bind(this)),n&&n.addEventListener("click",this.handleCancel.bind(this)),i&&i.addEventListener("click",this.handleDelete.bind(this)),s&&s.addEventListener("click",this.handleAddModifier.bind(this)),this.addValidationListeners();const a=document.getElementById("new-modifier-value");a&&a.addEventListener("keypress",o=>{o.key==="Enter"&&(o.preventDefault(),this.handleAddModifier())})}attachModifierEventListeners(){document.querySelectorAll(".edit-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.unitType;n&&this.handleEditModifier(n)})}),document.querySelectorAll(".remove-modifier-btn").forEach(e=>{e.addEventListener("click",t=>{const n=t.target.dataset.unitType;n&&this.handleRemoveModifier(n)})})}addValidationListeners(){["enemy-name","enemy-health","enemy-strength","enemy-unit-types"].forEach(t=>{const n=document.getElementById(t);n&&(n.addEventListener("blur",()=>this.validateField(t)),n.addEventListener("input",()=>this.clearFieldError(t)))})}validateField(e){const t=document.getElementById(e),n=document.getElementById(`${e}-error`);if(!t||!n)return!0;let i;switch(e){case"enemy-name":i=$.validateName(t.value);break;case"enemy-health":i=$.validateHealth(parseInt(t.value));break;case"enemy-strength":i=$.validateStrength(parseInt(t.value));break;case"enemy-unit-types":const s=t.value.split(",").map(a=>a.trim()).filter(a=>a);i=$.validateUnitTypes(s);break;default:return!0}return i.isValid?(t.classList.remove("error"),n.textContent="",!0):(t.classList.add("error"),n.textContent=i.error||"",!1)}clearFieldError(e){const t=document.getElementById(e),n=document.getElementById(`${e}-error`);t&&n&&(t.classList.remove("error"),n.textContent="")}handleAddModifier(){const e=document.getElementById("new-modifier-type"),t=document.getElementById("new-modifier-value");if(!e||!t)return;const n=e.value.trim(),i=parseInt(t.value);if(!n){alert("Please enter a unit type"),e.focus();return}if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)"),t.focus();return}this.attackModifiers[n]&&!confirm(`A modifier for "${n}" already exists. Replace it?`)||(this.attackModifiers[n]=i,e.value="",t.value="",this.populateAttackModifiers(),e.focus())}handleEditModifier(e){const t=this.attackModifiers[e],n=prompt(`Edit strength bonus for "${e}":`,t.toString());if(n===null)return;const i=parseInt(n);if(isNaN(i)||i<0){alert("Please enter a valid bonus value (0 or greater)");return}this.attackModifiers[e]=i,this.populateAttackModifiers()}handleRemoveModifier(e){confirm(`Remove attack modifier for "${e}"?`)&&(delete this.attackModifiers[e],this.populateAttackModifiers())}handleSubmit(e){if(e.preventDefault(),!this.validateForm())return;const t=this.collectFormData();t&&this.props.onSave(t)}handleCancel(){this.hasUnsavedChanges()?confirm("You have unsaved changes. Are you sure you want to cancel?")&&this.props.onCancel():this.props.onCancel()}handleDelete(){if(!this.props.editingUnit)return;const e=this.props.editingUnit.name;if(confirm(`Are you sure you want to delete "${e}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(this.props.editingUnit.id);t.success?this.props.onCancel():alert(`Failed to delete unit: ${t.error}`)}}validateForm(){const e=["enemy-name","enemy-health","enemy-strength","enemy-unit-types"];let t=!0;return e.forEach(n=>{this.validateField(n)||(t=!1)}),t}collectFormData(){var e,t;try{const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength"),a=document.getElementById("enemy-unit-types"),o=n.value.trim(),r=parseInt(i.value),l=parseInt(s.value),c=a.value.split(",").map(h=>h.trim()).filter(h=>h),m=Object.keys(this.attackModifiers).length>0?Object.entries(this.attackModifiers).map(([h,g])=>({target_type:h,modifier_type:"Strength",value:g})):void 0,d={id:((e=this.props.editingUnit)==null?void 0:e.id)||`user_enemy_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,name:o,unit_types:c,health:r,strength:l,attack_modifiers:m,createdAt:((t=this.props.editingUnit)==null?void 0:t.createdAt)||new Date,modifiedAt:new Date},u=$.validateUserEnemyUnit(d);return u.isValid?d:(alert(`Validation failed: ${u.errors.join(", ")}`),null)}catch(n){return console.error("Error collecting form data:",n),alert("Error collecting form data. Please check your inputs."),null}}hasUnsavedChanges(){if(!this.props.editingUnit){const n=document.getElementById("enemy-name"),i=document.getElementById("enemy-health"),s=document.getElementById("enemy-strength");return!!(n!=null&&n.value.trim()||i!=null&&i.value||s!=null&&s.value)}const e=this.collectFormData();if(!e)return!1;const t=this.props.editingUnit;return e.name!==t.name||e.health!==t.health||e.strength!==t.strength||JSON.stringify(e.unit_types)!==JSON.stringify(t.unit_types)||JSON.stringify(e.attack_modifiers)!==JSON.stringify(t.attack_modifiers)}unmount(){this.container&&(this.container.innerHTML="")}}class oe{constructor(e){p(this,"container",null);p(this,"props");p(this,"storage");p(this,"userUnits",[]);p(this,"filteredUnits",[]);p(this,"currentFilter","");p(this,"sortBy","name");p(this,"sortOrder","asc");p(this,"selectedUnits",new Set);p(this,"showingForm",!1);p(this,"editingUnit",null);this.props=e,this.storage=new _}mount(e){this.container=e,this.loadData(),this.render(),this.attachEventListeners()}loadData(){this.userUnits=this.storage.getAllUserEnemyUnits(),this.updateFilteredUnits()}updateFilteredUnits(){let e=[...this.userUnits];if(this.currentFilter.trim()){const t=this.currentFilter.toLowerCase();e=e.filter(n=>n.name.toLowerCase().includes(t)||n.unit_types.some(i=>i.toLowerCase().includes(t)))}e.sort((t,n)=>{let i=0;switch(this.sortBy){case"name":i=t.name.localeCompare(n.name);break;case"created":i=t.createdAt.getTime()-n.createdAt.getTime();break;case"modified":i=t.modifiedAt.getTime()-n.modifiedAt.getTime();break;case"health":i=t.health-n.health;break;case"strength":i=t.strength-n.strength;break}return this.sortOrder==="desc"?-i:i}),this.filteredUnits=e}render(){if(!this.container)return;if(this.showingForm){this.renderForm();return}const e=this.props.mode==="standalone",t=this.storage.getStorageStats();this.container.innerHTML=`
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
    `,this.addStyles()}renderForm(){if(!this.container)return;const e=document.createElement("div");this.container.innerHTML="",this.container.appendChild(e),new ae({onSave:this.handleFormSave.bind(this),onCancel:this.handleFormCancel.bind(this),editingUnit:this.editingUnit,mode:this.editingUnit?"edit":"create"}).mount(e)}renderUnitsList(){return this.filteredUnits.length===0?`
        <div class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No custom enemy units</h3>
          <p>Create your first custom enemy unit to get started</p>
          <button class="btn btn-primary" id="create-first-unit">
            ➕ Create Your First Unit
          </button>
        </div>
      `:this.filteredUnits.map(e=>{const t=this.selectedUnits.has(e.id);return`
        <div class="unit-item ${t?"selected":""}" data-unit-id="${e.id}">
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
                  <span class="meta-value">${this.formatDate(e.createdAt)}</span>
                </span>
                <span class="meta-item">
                  <span class="meta-label">Modified:</span>
                  <span class="meta-value">${this.formatDate(e.modifiedAt)}</span>
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
    `,document.head.appendChild(e)}attachEventListeners(){const e=document.getElementById("close-manager");e&&e.addEventListener("click",()=>{var c,m;return(m=(c=this.props).onClose)==null?void 0:m.call(c)});const t=document.getElementById("unit-search");t&&t.addEventListener("input",this.handleSearch.bind(this));const n=document.getElementById("clear-search");n&&n.addEventListener("click",this.handleClearSearch.bind(this));const i=document.getElementById("create-unit-btn");i&&i.addEventListener("click",this.handleCreateUnit.bind(this));const s=document.getElementById("create-first-unit");s&&s.addEventListener("click",this.handleCreateUnit.bind(this));const a=document.getElementById("sort-by");a&&a.addEventListener("change",this.handleSortChange.bind(this));const o=document.getElementById("sort-order-btn");o&&o.addEventListener("click",this.handleSortOrderToggle.bind(this));const r=document.getElementById("select-all");r&&r.addEventListener("click",this.handleSelectAll.bind(this));const l=document.getElementById("select-none");l&&l.addEventListener("click",this.handleSelectNone.bind(this)),document.querySelectorAll(".unit-select-checkbox").forEach(c=>{c.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(c=>{c.addEventListener("click",this.handleUnitAction.bind(this))}),this.attachDropdownListeners(),this.attachImportExportListeners()}attachDropdownListeners(){document.querySelectorAll(".dropdown-toggle").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const n=e.closest(".dropdown");n&&(document.querySelectorAll(".dropdown.open").forEach(i=>{i!==n&&i.classList.remove("open")}),n.classList.toggle("open"))})}),document.addEventListener("click",()=>{document.querySelectorAll(".dropdown.open").forEach(e=>{e.classList.remove("open")})})}attachImportExportListeners(){const e=document.getElementById("import-units");e&&e.addEventListener("click",this.handleImportUnits.bind(this));const t=document.getElementById("export-all");t&&t.addEventListener("click",this.handleExportAll.bind(this));const n=document.getElementById("export-selected");n&&n.addEventListener("click",this.handleExportSelected.bind(this));const i=document.getElementById("delete-selected");i&&i.addEventListener("click",this.handleDeleteSelected.bind(this));const s=document.getElementById("clear-all");s&&s.addEventListener("click",this.handleClearAll.bind(this));const a=document.getElementById("import-file-input");a&&a.addEventListener("change",this.handleFileImport.bind(this))}formatDate(e){const n=new Date().getTime()-e.getTime(),i=Math.floor(n/(1e3*60*60*24));return i===0?"Today":i===1?"Yesterday":i<7?`${i} days ago`:e.toLocaleDateString()}handleFormSave(e){if(this.editingUnit){const t=this.storage.updateUserEnemyUnit(this.editingUnit.id,e);t.success?(this.showingForm=!1,this.editingUnit=null,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to update unit: ${t.error}`)}else{const t=this.storage.addUserEnemyUnit(e);t.success?(this.showingForm=!1,this.loadData(),this.render(),this.attachEventListeners()):alert(`Failed to create unit: ${t.error}`)}}handleFormCancel(){this.showingForm=!1,this.editingUnit=null,this.render(),this.attachEventListeners()}handleSearch(e){const t=e.target;this.currentFilter=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleClearSearch(){this.currentFilter="";const e=document.getElementById("unit-search");e&&(e.value=""),this.updateFilteredUnits(),this.refreshUnitsList()}handleCreateUnit(){this.showingForm=!0,this.editingUnit=null,this.render()}handleSortChange(e){const t=e.target;this.sortBy=t.value,this.updateFilteredUnits(),this.refreshUnitsList()}handleSortOrderToggle(){this.sortOrder=this.sortOrder==="asc"?"desc":"asc",this.updateFilteredUnits(),this.refreshUnitsList();const e=document.getElementById("sort-order-btn");e&&(e.textContent=this.sortOrder==="asc"?"⬆️ Ascending":"⬇️ Descending")}handleSelectAll(){this.selectedUnits.clear(),this.filteredUnits.forEach(e=>{this.selectedUnits.add(e.id)}),this.refreshSelectionUI()}handleSelectNone(){this.selectedUnits.clear(),this.refreshSelectionUI()}handleCheckboxChange(e){const t=e.target,n=t.dataset.unitId;n&&(t.checked?this.selectedUnits.add(n):this.selectedUnits.delete(n),this.refreshSelectionUI())}handleUnitAction(e){var a,o;const t=e.target,n=t.dataset.action,i=t.dataset.unitId;if(!n||!i)return;const s=this.userUnits.find(r=>r.id===i);if(s)switch(n){case"select":(o=(a=this.props).onUnitSelect)==null||o.call(a,s);break;case"edit":this.editingUnit=s,this.showingForm=!0,this.render();break;case"duplicate":this.handleDuplicateUnit(s);break;case"delete":this.handleDeleteUnit(s);break}}handleDuplicateUnit(e){const n={name:`${e.name} (Copy)`,unit_types:[...e.unit_types],health:e.health,strength:e.strength,attack_modifiers:e.attack_modifiers?[...e.attack_modifiers]:void 0},i=this.storage.addUserEnemyUnit(n);i.success?(this.loadData(),this.refreshUnitsList()):alert(`Failed to duplicate unit: ${i.error}`)}handleDeleteUnit(e){if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`)){const t=this.storage.deleteUserEnemyUnit(e.id);t.success?(this.selectedUnits.delete(e.id),this.loadData(),this.refreshUnitsList()):alert(`Failed to delete unit: ${t.error}`)}}handleImportUnits(){const e=document.getElementById("import-file-input");e&&e.click()}handleFileImport(e){var s;const t=e.target,n=(s=t.files)==null?void 0:s[0];if(!n)return;const i=new FileReader;i.onload=a=>{var o,r;try{const l=(o=a.target)==null?void 0:o.result,c=this.storage.importUserEnemyUnits(l,{skipDuplicates:!0});if(c.success){let m=`Successfully imported ${c.imported} units.`;c.skipped&&c.skipped>0&&(m+=` ${c.skipped} units were skipped.`),c.errors&&c.errors.length>0&&(m+=`

Errors:
${c.errors.join(`
`)}`),alert(m),this.loadData(),this.refreshUnitsList()}else alert(`Import failed: ${((r=c.errors)==null?void 0:r.join(", "))||"Unknown error"}`)}catch{alert("Failed to read file. Please ensure it's a valid JSON file.")}},i.readAsText(n),t.value=""}handleExportAll(){const e=this.storage.exportUserEnemyUnits();e.success&&e.data?this.downloadJson(e.data,"enemy-units-export.json"):alert(`Export failed: ${e.error}`)}handleExportSelected(){if(this.selectedUnits.size===0){alert("No units selected for export.");return}const e=this.userUnits.filter(i=>this.selectedUnits.has(i.id)),t={version:"1.0",exportDate:new Date().toISOString(),units:e.map(i=>({name:i.name,unit_types:i.unit_types,health:i.health,strength:i.strength,attack_modifiers:i.attack_modifiers,createdAt:i.createdAt.toISOString(),modifiedAt:i.modifiedAt.toISOString()}))},n=JSON.stringify(t,null,2);this.downloadJson(n,`enemy-units-selected-${this.selectedUnits.size}.json`)}handleDeleteSelected(){if(this.selectedUnits.size===0){alert("No units selected for deletion.");return}const e=this.selectedUnits.size;if(confirm(`Are you sure you want to delete ${e} selected unit${e>1?"s":""}? This action cannot be undone.`)){let t=0;const n=[];this.selectedUnits.forEach(s=>{const a=this.storage.deleteUserEnemyUnit(s);a.success?t++:n.push(`Failed to delete unit: ${a.error}`)}),this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList();let i=`Successfully deleted ${t} unit${t>1?"s":""}.`;n.length>0&&(i+=`

Errors:
${n.join(`
`)}`),alert(i)}}handleClearAll(){if(this.userUnits.length===0){alert("No units to clear.");return}if(confirm(`Are you sure you want to delete ALL ${this.userUnits.length} custom enemy units? This action cannot be undone.`)){const e=this.storage.clearAllUserEnemyUnits();e.success?(this.selectedUnits.clear(),this.loadData(),this.refreshUnitsList(),alert("All custom enemy units have been deleted.")):alert(`Failed to clear units: ${e.error}`)}}downloadJson(e,t){const n=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(n),s=document.createElement("a");s.href=i,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)}refreshUnitsList(){const e=document.getElementById("units-list");e&&(e.innerHTML=this.renderUnitsList(),document.querySelectorAll(".unit-select-checkbox").forEach(n=>{n.addEventListener("change",this.handleCheckboxChange.bind(this))}),document.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",this.handleUnitAction.bind(this))}));const t=document.querySelector(".results-info");t&&(t.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}refreshSelectionUI(){document.querySelectorAll(".unit-select-checkbox").forEach(i=>{const s=i,a=s.dataset.unitId;a&&(s.checked=this.selectedUnits.has(a))}),document.querySelectorAll(".unit-item").forEach(i=>{const s=i.dataset.unitId;s&&(this.selectedUnits.has(s)?i.classList.add("selected"):i.classList.remove("selected"))});const e=document.getElementById("bulk-actions-btn");e&&(e.textContent=`📋 Bulk Actions (${this.selectedUnits.size})`,e.disabled=this.selectedUnits.size===0);const t=document.getElementById("select-none");t&&(t.disabled=this.selectedUnits.size===0);const n=document.querySelector(".results-info");n&&(n.textContent=`Showing ${this.filteredUnits.length} of ${this.userUnits.length} units${this.selectedUnits.size>0?` (${this.selectedUnits.size} selected)`:""}`)}unmount(){this.container&&(this.container.innerHTML="")}}const q={tabletSmall:768,tabletLarge:1024};class re{constructor(){p(this,"currentMode","desktop");p(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(e){this.listeners.push(e)}removeLayoutChangeListener(e){const t=this.listeners.indexOf(e);t>-1&&this.listeners.splice(t,1)}updateLayoutMode(){const e=this.getViewportWidth();let t;e<q.tabletSmall?t="mobile":e<q.tabletLarge?t="tablet":t="desktop",t!==this.currentMode&&(this.currentMode=t,this.notifyListeners())}setupResizeListener(){let e;window.addEventListener("resize",()=>{clearTimeout(e),e=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(e=>e(this.currentMode))}}class N{static addSwipeSupport(e,t,n,i=50){if(!("ontouchstart"in window))return;let s=0,a=0,o=0;e.addEventListener("touchstart",r=>{const l=r.touches[0];s=l.clientX,a=l.clientY,o=Date.now()},{passive:!0}),e.addEventListener("touchend",r=>{if(r.changedTouches.length===0)return;const l=r.changedTouches[0],c=l.clientX,m=l.clientY,d=Date.now(),u=c-s,h=m-a;d-o<500&&Math.abs(u)>i&&Math.abs(h)<Math.abs(u)*.5&&(u>0&&n?(r.preventDefault(),n()):u<0&&t&&(r.preventDefault(),t()))},{passive:!1})}static addTouchSupport(e,t){if(e.addEventListener("click",t),"ontouchstart"in window){let n;e.addEventListener("touchstart",i=>{n=Date.now(),e.classList.add("touch-active")}),e.addEventListener("touchend",i=>{e.classList.remove("touch-active"),Date.now()-n<200&&(i.preventDefault(),t())}),e.addEventListener("touchcancel",()=>{e.classList.remove("touch-active")})}}static optimizeScrolling(e){e.style.webkitOverflowScrolling="touch",e.style.scrollBehavior="smooth",e.classList.add("scroll-momentum")}static addHapticFeedback(e){e.addEventListener("touchstart",()=>{e.style.transform="scale(0.98)",e.style.transition="transform 0.1s ease"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e.addEventListener("touchcancel",()=>{e.style.transform="scale(1)"})}static addPullToRefresh(e,t,n=80){if(!("ontouchstart"in window))return;let i=0,s=0,a=!1,o=null;const r=()=>{o||(o=document.createElement("div"),o.className="pull-refresh-indicator",o.innerHTML=`
        <div class="refresh-spinner"></div>
        <span class="refresh-text">Pull to refresh</span>
      `,e.insertBefore(o,e.firstChild))};e.addEventListener("touchstart",l=>{e.scrollTop===0&&!a&&(i=l.touches[0].clientY,r())},{passive:!0}),e.addEventListener("touchmove",l=>{if(e.scrollTop===0&&!a&&o){s=l.touches[0].clientY;const c=Math.max(0,s-i);if(c>0){l.preventDefault();const m=Math.min(c/n,1);o.style.transform=`translateY(${c*.5}px)`,o.style.opacity=m.toString(),c>n?o.querySelector(".refresh-text").textContent="Release to refresh":o.querySelector(".refresh-text").textContent="Pull to refresh"}}},{passive:!1}),e.addEventListener("touchend",async()=>{if(o&&!a)if(s-i>n){a=!0,o.querySelector(".refresh-text").textContent="Refreshing...",o.querySelector(".refresh-spinner").classList.add("spinning");try{await t()}finally{a=!1,o&&(o.style.transform="translateY(-100%)",o.style.opacity="0",setTimeout(()=>{o&&o.parentNode&&(o.parentNode.removeChild(o),o=null)},300))}}else o.style.transform="translateY(-100%)",o.style.opacity="0",setTimeout(()=>{o&&o.parentNode&&(o.parentNode.removeChild(o),o=null)},300)})}}class T{static updateBodyClasses(e){const t=document.body;t.classList.remove("layout-mobile","layout-tablet","layout-desktop"),t.classList.add(`layout-${e.getCurrentMode()}`),e.isTouchDevice()&&t.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(t=>{t instanceof HTMLElement&&N.optimizeScrolling(t)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&N.addHapticFeedback(t)})}}const v=new re;v.addLayoutChangeListener(()=>{T.updateBodyClasses(v)});T.updateBodyClasses(v);class le{constructor(){p(this,"sections",[]);p(this,"currentActiveSection",null);p(this,"tabContainer",null);p(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var n;const e=document.querySelector(".main-content");if(!e)return;const t=document.createElement("div");t.className="mobile-tab-navigation mobile-only",t.innerHTML=`
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
      `,e.element.insertBefore(t,e.element.firstChild),t.addEventListener("click",()=>{this.toggleSectionCollapse(e.id)})})}setupInitialLayout(){const e=v.getCurrentMode();this.applyLayoutMode(e),this.updateTabVisibility()}applyLayoutMode(e){switch(e){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(e=>{e.element&&(e.id===this.currentActiveSection||this.currentActiveSection===null&&e.id==="config-section"?e.element.classList.remove("hidden"):e.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden"):e.element.classList.add("hidden"),e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(e=>{e.element&&(e.isAvailable?e.element.classList.remove("hidden","collapsed"):e.element.classList.add("hidden"),e.isCollapsed=!1)})}switchToSection(e){this.currentActiveSection=e,v.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(e){const t=this.sections.find(i=>i.id===e);if(!t||!t.element)return;t.isCollapsed=!t.isCollapsed,t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed");const n=t.element.querySelector(".collapse-indicator");n&&(n.textContent=t.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{t.addEventListener("click",()=>{if(t.classList.contains("disabled"))return;const n=t.getAttribute("data-section");n&&this.switchToSection(n)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const n=t.getAttribute("data-section");n===this.currentActiveSection||this.currentActiveSection===null&&n==="config-section"?t.classList.add("active"):t.classList.remove("active")})}setupLayoutListener(){v.addLayoutChangeListener(e=>{this.initialized&&this.applyLayoutMode(e)})}showSection(e){const t=this.sections.find(n=>n.id===e);t&&(!t.element&&(t.element=document.getElementById(e),!t.element)||(t.element.classList.remove("hidden"),t.isAvailable=!0,v.isMobile()&&this.switchToSection(e),this.updateTabVisibility()))}hideSection(e){const t=this.sections.find(n=>n.id===e);!t||!t.element||(t.element.classList.add("hidden"),t.isAvailable=!1,this.updateTabVisibility(),v.isMobile()&&this.currentActiveSection===e&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(t=>{const n=t.getAttribute("data-section"),i=this.sections.find(s=>s.id===n);i&&(i.isAvailable?(t.classList.remove("disabled"),t.disabled=!1):(t.classList.add("disabled"),t.disabled=!0))})}addSwipeSupport(){if(!v.isMobile())return;const e=document.querySelector(".main-content");e&&N.addSwipeSupport(e,()=>this.swipeToNextSection(),()=>this.swipeToPreviousSection())}swipeToNextSection(){const e=this.sections.filter(n=>n.isAvailable),t=e.findIndex(n=>n.id===this.currentActiveSection);if(t<e.length-1){const n=e[t+1];this.switchToSection(n.id)}}swipeToPreviousSection(){const e=this.sections.filter(n=>n.isAvailable),t=e.findIndex(n=>n.id===this.currentActiveSection);if(t>0){const n=e[t-1];this.switchToSection(n.id)}}}const w=new le;class M{static createFloatingActionButton(e){const t=document.createElement("button");return t.className=`floating-action-button fab-${e.position||"bottom-right"} fab-${e.color||"primary"}`,t.innerHTML=`
      <span class="fab-icon">${e.icon}</span>
      <span class="fab-label">${e.label}</span>
    `,t.addEventListener("click",e.onClick),t.addEventListener("touchstart",()=>{t.style.transform="scale(0.95)"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t}static showFloatingActionButton(e){if(!v.isMobile())return;this.hideFloatingActionButton(),this.fabContainer||(this.fabContainer=document.createElement("div"),this.fabContainer.className="fab-container",document.body.appendChild(this.fabContainer));const t=this.createFloatingActionButton(e);this.fabContainer.appendChild(t),setTimeout(()=>{t.classList.add("fab-visible")},10)}static hideFloatingActionButton(){this.fabContainer&&this.fabContainer.querySelectorAll(".floating-action-button").forEach(t=>{t.classList.remove("fab-visible"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)})}static showBottomSheet(e){return new Promise(t=>{if(!v.isMobile()){this.showDesktopModal(e),t();return}this.hideBottomSheet();const n=document.createElement("div");n.className="bottom-sheet-backdrop";const i=document.createElement("div");i.className="bottom-sheet";const s=document.createElement("div");s.className="bottom-sheet-header",s.innerHTML=`
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">${e.title}</h3>
        ${e.dismissible!==!1?'<button class="bottom-sheet-close">×</button>':""}
      `;const a=document.createElement("div");a.className="bottom-sheet-content",typeof e.content=="string"?a.innerHTML=e.content:a.appendChild(e.content);const o=document.createElement("div");if(o.className="bottom-sheet-actions",e.actions&&e.actions.forEach(r=>{const l=document.createElement("button");l.className=`btn btn-${r.style||"secondary"}`,l.textContent=r.label,l.addEventListener("click",()=>{r.onClick(),this.hideBottomSheet(),t()}),o.appendChild(l)}),i.appendChild(s),i.appendChild(a),e.actions&&e.actions.length>0&&i.appendChild(o),this.bottomSheetContainer||(this.bottomSheetContainer=document.createElement("div"),this.bottomSheetContainer.className="bottom-sheet-container",document.body.appendChild(this.bottomSheetContainer)),this.bottomSheetContainer.appendChild(n),this.bottomSheetContainer.appendChild(i),e.dismissible!==!1){n.addEventListener("click",()=>{this.hideBottomSheet(),t()});const r=s.querySelector(".bottom-sheet-close");r&&r.addEventListener("click",()=>{this.hideBottomSheet(),t()})}setTimeout(()=>{n.classList.add("visible"),i.classList.add("visible")},10)})}static hideBottomSheet(){if(this.bottomSheetContainer){const e=this.bottomSheetContainer.querySelector(".bottom-sheet-backdrop"),t=this.bottomSheetContainer.querySelector(".bottom-sheet");e&&t&&(e.classList.remove("visible"),t.classList.remove("visible"),setTimeout(()=>{this.bottomSheetContainer&&(this.bottomSheetContainer.innerHTML="")},300))}}static showDesktopModal(e){const t=typeof e.content=="string"?e.content:e.title;alert(t)}static createMobileDropdown(e,t){v.isMobile()&&e.addEventListener("click",()=>{const n=document.createElement("div");n.className="mobile-dropdown-content",t.forEach(i=>{const s=document.createElement("button");s.className="mobile-dropdown-item",s.textContent=i.label,s.addEventListener("click",()=>{i.onClick(),this.hideBottomSheet()}),n.appendChild(s)}),this.showBottomSheet({title:"Select Option",content:n,dismissible:!0})})}static showMobileLoading(e="Loading..."){if(!v.isMobile())return;const t=document.createElement("div");t.className="mobile-loading-overlay",t.innerHTML=`
      <div class="mobile-loading-content">
        <div class="mobile-loading-spinner"></div>
        <p class="mobile-loading-text">${e}</p>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.add("visible")},10)}static hideMobileLoading(){const e=document.querySelector(".mobile-loading-overlay");e&&(e.classList.remove("visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300))}}p(M,"fabContainer",null),p(M,"bottomSheetContainer",null);v.addLayoutChangeListener(y=>{y!=="mobile"&&(M.hideFloatingActionButton(),M.hideBottomSheet())});class B{static initialize(){v.isMobile()&&(this.setupLazyLoading(),this.optimizeScrolling(),this.monitorInteractions(),this.setupMemoryMonitoring())}static setupLazyLoading(){const e=document.querySelectorAll("[data-lazy]");if(e.length===0)return;const t=new IntersectionObserver(n=>{n.forEach(i=>{if(i.isIntersecting){const s=i.target;this.loadElement(s),t.unobserve(s)}})},{rootMargin:"50px",threshold:.1});e.forEach(n=>t.observe(n)),this.observers.set("lazy-loading",t)}static loadElement(e){const t=performance.now(),n=e.dataset.lazy;n&&(e.innerHTML=n,e.removeAttribute("data-lazy"));const i=performance.now();this.metrics.renderTime+=i-t}static optimizeScrolling(){document.querySelectorAll(".combat-log, .unit-family-content, .main-content").forEach(t=>{let n=!1,i;t.addEventListener("scroll",()=>{n||(n=!0,this.requestOptimizedFrame(()=>{this.optimizeScrollFrame(t),n=!1})),clearTimeout(i),i=window.setTimeout(()=>{this.onScrollEnd(t)},150)},{passive:!0})})}static optimizeScrollFrame(e){const t=performance.now();e.getBoundingClientRect();const n=e.children;for(let s=0;s<n.length;s++){const a=n[s],o=a.getBoundingClientRect(),r=o.bottom>-window.innerHeight*2&&o.top<window.innerHeight*3;!r&&!a.classList.contains("scroll-hidden")?(a.classList.add("scroll-hidden"),a.style.visibility="hidden"):r&&a.classList.contains("scroll-hidden")&&(a.classList.remove("scroll-hidden"),a.style.visibility="visible")}const i=performance.now();this.metrics.scrollPerformance+=i-t}static onScrollEnd(e){e.querySelectorAll(".scroll-hidden").forEach(n=>{n.classList.remove("scroll-hidden"),n.style.visibility="visible"})}static requestOptimizedFrame(e){this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{e(),this.rafId=null})}static monitorInteractions(){let e;document.addEventListener("touchstart",()=>{e=performance.now()},{passive:!0}),document.addEventListener("touchend",()=>{if(e){const t=performance.now()-e;this.metrics.interactionTime=Math.max(this.metrics.interactionTime,t)}},{passive:!0})}static setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const e=performance.memory;this.metrics.memoryUsage=e.usedJSHeapSize/e.jsHeapSizeLimit,this.metrics.memoryUsage>.8&&(console.warn("High memory usage detected:",this.metrics.memoryUsage),this.optimizeMemory())},1e4)}static optimizeMemory(){this.observers.forEach((e,t)=>{t!=="lazy-loading"&&(e.disconnect(),this.observers.delete(t))}),"gc"in window&&window.gc()}static getMetrics(){return{...this.metrics}}static resetMetrics(){this.metrics={renderTime:0,interactionTime:0,scrollPerformance:0}}static addMobileCSSOptimizations(){if(!v.isMobile())return;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}static cleanup(){this.observers.forEach(e=>e.disconnect()),this.observers.clear(),this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}p(B,"metrics",{renderTime:0,interactionTime:0,scrollPerformance:0}),p(B,"observers",new Map),p(B,"rafId",null);v.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{B.initialize(),B.addMobileCSSOptimizations()});v.addLayoutChangeListener(y=>{y!=="mobile"?B.cleanup():(B.initialize(),B.addMobileCSSOptimizations())});class L{static initialize(){this.createScreenReaderAnnouncer(),this.setupFocusManagement(),this.enhanceTabNavigation(),this.addTouchAccessibility(),this.setupKeyboardNavigation()}static createScreenReaderAnnouncer(){this.announcer||(this.announcer=document.createElement("div"),this.announcer.setAttribute("aria-live","polite"),this.announcer.setAttribute("aria-atomic","true"),this.announcer.className="sr-only",this.announcer.style.cssText=`
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `,document.body.appendChild(this.announcer))}static announce(e,t="polite"){this.announcer||this.createScreenReaderAnnouncer(),this.announcer.setAttribute("aria-live",t),this.announcer.textContent=e,setTimeout(()=>{this.announcer&&(this.announcer.textContent="")},1e3)}static setupFocusManagement(){document.addEventListener("focusin",e=>{this.focusTracker=e.target}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&v.isMobile()&&this.restoreFocus()})}static restoreFocus(){if(this.focusTracker&&document.contains(this.focusTracker))this.focusTracker.focus();else{const e=document.querySelector(".main-content > :not(.hidden)");if(e){const t=e.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');t&&t.focus()}}}static enhanceTabNavigation(){const e=document.querySelector(".mobile-tab-navigation");if(!e)return;e.setAttribute("role","tablist"),e.setAttribute("aria-label","Main navigation");const t=e.querySelectorAll(".tab-nav-item");t.forEach((n,i)=>{n.setAttribute("role","tab"),n.setAttribute("aria-selected",i===0?"true":"false"),n.setAttribute("tabindex",i===0?"0":"-1");const s=n.getAttribute("data-section");s&&(n.setAttribute("aria-controls",s),n.id=`tab-${s}`),n.addEventListener("keydown",a=>{this.handleTabKeydown(a,t,i)}),n.addEventListener("click",()=>{var o;const a=((o=n.querySelector(".tab-label"))==null?void 0:o.textContent)||"Section";this.announce(`Switched to ${a} section`),this.updateTabAria(t,i)})})}static handleTabKeydown(e,t,n){let i=n;switch(e.key){case"ArrowLeft":e.preventDefault(),i=n>0?n-1:t.length-1;break;case"ArrowRight":e.preventDefault(),i=n<t.length-1?n+1:0;break;case"Home":e.preventDefault(),i=0;break;case"End":e.preventDefault(),i=t.length-1;break;case"Enter":case" ":e.preventDefault(),t[n].click();return}i!==n&&(this.updateTabAria(t,i),t[i].focus())}static updateTabAria(e,t){e.forEach((n,i)=>{n.setAttribute("aria-selected",i===t?"true":"false"),n.setAttribute("tabindex",i===t?"0":"-1")})}static addTouchAccessibility(){document.addEventListener("touchstart",t=>{const n=t.target;n.matches("button, .unit-card, .tab-nav-item")&&n.setAttribute("aria-pressed","true")},{passive:!0}),document.addEventListener("touchend",t=>{const n=t.target;n.matches("button, .unit-card, .tab-nav-item")&&n.removeAttribute("aria-pressed")},{passive:!0});let e=0;document.addEventListener("touchend",t=>{const n=new Date().getTime(),i=n-e;i<500&&i>0&&t.target.matches(".unit-card, .army-composition")&&this.announce("Double tap to activate","assertive"),e=n})}static setupKeyboardNavigation(){this.addSkipLinks(),document.addEventListener("keydown",e=>{if(e.key==="Escape"){const t=document.querySelector(".bottom-sheet.visible, .mobile-loading-overlay.visible");if(t){e.preventDefault(),this.announce("Modal closed");const n=t.querySelector(".bottom-sheet-close");n&&n.click()}}})}static addSkipLinks(){const e=document.createElement("div");e.className="skip-links",e.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#mobile-navigation" class="skip-link">Skip to navigation</a>
    `,document.body.insertBefore(e,document.body.firstChild);const t=document.querySelector(".main-content");t&&!t.id&&(t.id="main-content");const n=document.querySelector(".mobile-tab-navigation");n&&!n.id&&(n.id="mobile-navigation")}static enhanceFormAccessibility(){document.querySelectorAll("form").forEach(t=>{t.querySelectorAll("input, select, textarea").forEach(i=>{var a;if(!t.querySelector(`label[for="${i.id}"]`)&&i.id){const o=document.createElement("label");o.setAttribute("for",i.id),o.textContent=i.getAttribute("placeholder")||"Input field",o.className="sr-only",(a=i.parentNode)==null||a.insertBefore(o,i)}i.hasAttribute("required")&&(i.setAttribute("aria-required","true"),i.addEventListener("invalid",()=>{this.announce("Required field is empty","assertive")}))}),t.addEventListener("submit",()=>{this.announce("Form submitted")})})}static addDynamicLabels(){document.querySelectorAll(".unit-card").forEach(i=>{var a;const s=(a=i.querySelector(".unit-name"))==null?void 0:a.textContent;s&&!i.getAttribute("aria-label")&&(i.setAttribute("aria-label",`Unit: ${s}`),i.setAttribute("role","button"))}),document.querySelectorAll(".army-composition").forEach((i,s)=>{i.getAttribute("aria-label")||(i.setAttribute("aria-label",`Army composition ${s+1}`),i.setAttribute("role","article"))}),document.querySelectorAll(".combat-action").forEach((i,s)=>{var a;if(!i.getAttribute("aria-label")){const o=((a=i.textContent)==null?void 0:a.substring(0,50))||"Combat action";i.setAttribute("aria-label",`Combat action ${s+1}: ${o}`)}})}static cleanup(){this.announcer&&this.announcer.parentNode&&(this.announcer.parentNode.removeChild(this.announcer),this.announcer=null);const e=document.querySelector(".skip-links");e&&e.parentNode&&e.parentNode.removeChild(e)}}p(L,"focusTracker",null),p(L,"announcer",null);v.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{L.initialize()});v.addLayoutChangeListener(y=>{y!=="mobile"?L.cleanup():L.initialize()});class ce{constructor(){p(this,"container",null);p(this,"unitLoader");p(this,"optimizer",null);p(this,"damageOptimizer",null);p(this,"selectedUnits",new Set);p(this,"mercenaryLimits",{});p(this,"battleSimulation",null);p(this,"currentOptimizedArmy",null);p(this,"currentMode","stacking");p(this,"enemyUnitManager",null);p(this,"selectedEnemyUnits",[]);p(this,"currentEnemyUnitSelector",null);p(this,"currentEnemyUnitSelectorContainer",null);p(this,"optimizationAbortController",null);p(this,"optimizationStartTime",0);p(this,"progressUpdateInterval",null);this.unitLoader=new J}async mount(e){this.container=e,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),w.initialize(),this.initializeAdvancedMobileFeatures()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(e)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(e){console.error("Failed to load unit data:",e)}}attachEventListeners(){const e=document.getElementById("stacking-mode-btn"),t=document.getElementById("damage-mode-btn"),n=document.getElementById("enemy-units-btn"),i=document.getElementById("unit-search"),s=document.getElementById("unit-type-filter"),a=document.getElementById("optimize-btn"),o=document.getElementById("clear-btn"),r=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),c=document.getElementById("leadership-budget"),m=document.getElementById("dominance-budget"),d=document.getElementById("select-enemy-units-btn"),u=document.getElementById("enemy-count");e&&e.addEventListener("click",()=>this.switchMode("stacking")),t&&t.addEventListener("click",()=>this.switchMode("damage")),n&&n.addEventListener("click",()=>this.switchMode("enemy-units")),d&&d.addEventListener("click",()=>this.openEnemyUnitSelector()),i&&i.addEventListener("input",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("change",()=>this.filterAndDisplayUnits()),a&&a.addEventListener("click",()=>this.optimizeArmy()),o&&o.addEventListener("click",()=>this.clearSelection()),r&&r.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),c&&c.addEventListener("input",()=>this.updateOptimizeButton()),m&&m.addEventListener("input",()=>this.updateOptimizeButton()),u&&u.addEventListener("input",()=>this.handleEnemyGroupsChange()),document.addEventListener("click",h=>{const g=h.target;g.classList.contains("filter-tab")&&this.handleFilterTabClick(g)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const e=document.getElementById("unit-type-filter");if(!e)return;const t=this.unitLoader.getUniqueUnitTypes();e.innerHTML='<option value="">All Unit Types</option>',t.forEach(n=>{const i=document.createElement("option");i.value=n,i.textContent=n,e.appendChild(i)})}updateFilterTabCounts(){const e=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const i=n.getAttribute("data-filter");let s=0;i==="all"?s=e.length:s=e.filter(a=>this.getMainCategory(a)===i).length,n.textContent=`${i==="all"?"All":i} (${s})`})}handleFilterTabClick(e){document.querySelectorAll(".filter-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var s,a,o;const e=((s=document.getElementById("unit-search"))==null?void 0:s.value)||"",t=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",n=((o=document.getElementById("unit-type-filter"))==null?void 0:o.value)||"";let i=this.unitLoader.getAllUnits();if(t!=="all"&&(i=i.filter(r=>this.getMainCategory(r)===t)),n&&(i=i.filter(r=>r.unit_types.includes(n))),e){const r=e.toLowerCase();i=i.filter(l=>l.name.toLowerCase().includes(r)||l.unit_types.some(c=>c.toLowerCase().includes(r)))}this.renderGroupedUnits(i),this.updateSelectedSummary()}renderGroupedUnits(e){const t=document.getElementById("unit-groups");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(e);Object.entries(n).forEach(([i,s])=>{const a=this.createMainCategoryElement(i,s);t.appendChild(a)}),this.attachAllEventListeners(n)}createHierarchicalGroups(e){const t={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return e.forEach(n=>{const i=this.getMainCategory(n),s=this.getSubCategory(n),a=this.getUnitFamily(n);t[i][s]||(t[i][s]={}),t[i][s][a]||(t[i][s][a]=[]),t[i][s][a].push(n)}),Object.values(t).forEach(n=>{Object.values(n).forEach(i=>{Object.values(i).forEach(s=>{s.sort((a,o)=>a.strength-o.strength)})})}),t}getMainCategory(e){if(e.cost_type==="Mercenary"||e.authority_cost>0)return"Mercenaries";const t=e.unit_types;return t.includes("Engineer corps")||t.includes("Siege engine")?"Engineer Corps":t.includes("Guardsman")?"Guardsmen":t.includes("Specialist")?"Specialists":t.includes("Beast")||t.includes("Dragon")||t.includes("Giant")||t.includes("Elemental")||t.includes("ELEMENTAL")||t.includes("Flying")&&!t.includes("Human")?"Monsters":t.includes("Human")&&(t.includes("Melee")||t.includes("Ranged")||t.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(e){const t=e.unit_types,n=e.name.toUpperCase(),i=this.getMainCategory(e);if(i==="Mercenaries")return t.includes("Guardsman")?"Elite Forces":"Special Forces";if(i==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(t.includes("Siege engine"))return"Siege Engines"}if(i==="Monsters"){if(t.includes("Dragon"))return"Dragons";if(t.includes("Giant"))return"Giants";if(t.includes("Beast"))return"Beasts";if(t.includes("Elemental")||t.includes("ELEMENTAL"))return"Elementals";if(t.includes("Flying"))return"Flying"}if(i==="Guardsmen"||i==="Specialists"){if(t.includes("Ranged"))return"Ranged";if(t.includes("Melee"))return"Melee";if(t.includes("Mounted"))return"Mounted";if(t.includes("Flying")||t.includes("Beast"))return"Flying";if(t.includes("Scout"))return"Scouts"}return t.includes("Human")?"Infantry":"Other"}getUnitFamily(e){let t=e.name;return t=t.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),t.includes("HEAVY "),t}createMainCategoryElement(e,t){const n=document.createElement("div");n.className="main-category";const i=this.countUnitsInCategory(t),s=this.countSelectedUnitsInCategory(t);return n.innerHTML=`
      <div class="main-category-header" data-category="${e}">
        <div class="category-title">
          <h3>${e} (${s}/${i})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${e}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${e}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(t).map(([a,o])=>this.createSubCategoryHTML(e,a,o)).join("")}
      </div>
    `,n}createSubCategoryHTML(e,t,n){const i=Object.values(n).reduce((a,o)=>a+o.length,0),s=Object.values(n).reduce((a,o)=>a+o.filter(r=>this.selectedUnits.has(r.name)).length,0);return`
      <div class="sub-category" data-category="${e}" data-subcategory="${t}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${t} (${s}/${i})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(n).map(([a,o])=>this.createUnitFamilyHTML(a,o)).join("")}
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
    `}attachAllEventListeners(e){document.querySelectorAll(".main-category").forEach((t,n)=>{const s=Object.keys(e)[n];if(s){const a=e[s];this.attachMainCategoryListeners(t,s,a)}}),document.querySelectorAll(".sub-category").forEach(t=>{var s;const n=t.getAttribute("data-category"),i=t.getAttribute("data-subcategory");if(n&&i&&((s=e[n])!=null&&s[i])){const a=e[n][i];this.attachSubCategoryListeners(t,a)}}),document.querySelectorAll(".unit-family").forEach(t=>{const n=t.getAttribute("data-family");let i=[];Object.values(e).forEach(s=>{Object.values(s).forEach(a=>{a[n]&&(i=a[n])})}),i.length>0&&this.attachUnitFamilyListeners(t,i)})}countUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((i,s)=>i+s.length,0),0)}countSelectedUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((i,s)=>i+s.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(e,t,n){const i=e.querySelector(".main-category-header"),s=e.querySelector(".main-category-content"),a=e.querySelector(".expand-icon");if(!i||!s||!a){console.warn("Missing main-category elements for",t,{header:!!i,content:!!s,expandIcon:!!a});return}i.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",t,"collapsed:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲"});const o=e.querySelector(".select-category"),r=e.querySelector(".deselect-category");o&&o.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(n)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(e,t){const n=e.querySelector(".sub-category-header"),i=e.querySelector(".sub-category-content"),s=e.querySelector(".expand-icon");if(!n||!i||!s){console.warn("Missing sub-category elements:",{header:!!n,content:!!i,expandIcon:!!s});return}n.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Sub-category header clicked, toggling:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲"});const a=e.querySelector(".select-subcategory"),o=e.querySelector(".deselect-subcategory");a&&a.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInFamilies(t)}),o&&o.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInFamilies(t)})}attachUnitFamilyListeners(e,t){const n=e.querySelector(".unit-family-header"),i=e.querySelector(".unit-family-content"),s=e.querySelector(".expand-icon");n.addEventListener("click",l=>{l.target.classList.contains("btn")||(i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲")});const a=e.querySelector(".select-family"),o=e.querySelector(".deselect-family");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(t)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(t)}),e.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const c=l.getAttribute("data-unit");if(c){const m=this.unitLoader.getUnitByName(c);m&&this.toggleUnitSelection(m)}})})}getUnitCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}toggleUnitSelection(e){this.selectedUnits.has(e.name)?(this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]):(this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton(),v.isMobile()&&this.addFloatingActionButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(e=>{const t=e.getAttribute("data-unit");t&&(this.selectedUnits.has(t)?e.classList.add("selected"):e.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((e,t)=>{const n=e.querySelector(".category-title h3");if(n){const s=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][t];if(s){const{selected:a,total:o}=this.countUnitsInMainCategory(s),l=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${l} (${a}/${o})`}}}),document.querySelectorAll(".sub-category").forEach(e=>{const t=e.querySelector(".subcategory-title h4"),n=e.getAttribute("data-category"),i=e.getAttribute("data-subcategory");if(t&&n&&i){const{selected:s,total:a}=this.countUnitsInSubCategory(n,i),r=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${r} (${s}/${a})`}}),document.querySelectorAll(".unit-family").forEach(e=>{const t=e.querySelector(".family-title h5"),n=e.getAttribute("data-family");if(t&&n){const{selected:i,total:s}=this.countUnitsInFamily(n),o=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${o} (${i}/${s})`}})}countUnitsInMainCategory(e){const n=this.unitLoader.getAllUnits().filter(s=>this.getMainCategory(s)===e);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}countUnitsInSubCategory(e,t){const i=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===e&&this.getSubCategory(a)===t);return{selected:i.filter(a=>this.selectedUnits.has(a.name)).length,total:i.length}}countUnitsInFamily(e){const n=this.unitLoader.getAllUnits().filter(s=>this.getUnitFamily(s)===e);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}updateSelectedSummary(){const e=document.getElementById("selected-count");e&&(e.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(t=>{const n=t.getAttribute("data-unit");if(n){const i=this.unitLoader.getUnitByName(n);i&&(this.selectedUnits.add(i.name),(i.cost_type==="Mercenary"||i.cost_type==="Authority")&&(this.mercenaryLimits[i.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(e){Object.values(e).forEach(t=>{this.selectAllInFamilies(t)})}deselectAllInCategory(e){Object.values(e).forEach(t=>{this.deselectAllInFamilies(t)})}selectAllInFamilies(e){Object.values(e).forEach(t=>{this.selectAllUnits(t)})}deselectAllInFamilies(e){Object.values(e).forEach(t=>{this.deselectAllUnits(t)})}selectAllUnits(e){e.forEach(t=>{this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(e){e.forEach(t=>{this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const e=document.getElementById("mercenary-limits");if(!e)return;const t=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&(n.cost_type==="Mercenary"||n.cost_type==="Authority"));if(t.length===0){e.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}e.innerHTML="",t.forEach(n=>{if(!n)return;const i=document.createElement("div");i.className="mercenary-item";const s=n.cost_type==="Authority"?"⚔️":"🗡️",a=n.cost_type==="Authority"?`AUTH: ${n.authority_cost}`:`AUTH: ${n.authority_cost}`;i.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${s} ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health}, ${a})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,i.querySelector("input").addEventListener("change",r=>{const l=r.target;this.mercenaryLimits[l.dataset.unit]=parseInt(l.value)||1}),e.appendChild(i)})}updateOptimizeButton(){const e=document.getElementById("optimize-btn"),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!e||!t||!n)return;const i=this.selectedUnits.size>0,s=parseInt(t.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;e.disabled=!i||!s}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(e){console.error("Optimization failed:",e),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new O(e);const t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},s=await this.optimizer.optimizeArmy(i);this.displayStackingResults(s)}async optimizeForDamage(){const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i=document.getElementById("enemy-count"),s=document.getElementById("max-combinations"),a={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(i.value)||5,maxCombinations:parseInt(s.value)||50};await this.runDamageOptimizationWithProgress(a,e)}async runDamageOptimizationWithProgress(e,t){this.optimizationAbortController=new AbortController,v.isMobile()?M.showMobileLoading("Optimizing army composition..."):this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new X);const n={...e,signal:this.optimizationAbortController.signal,onProgress:s=>{this.updateProgressModal(s.progress,s.message,{combinationsEvaluated:s.combinationsEvaluated,totalToEvaluate:s.totalToEvaluate,phase:s.phase,estimatedRemainingMs:s.estimatedRemainingMs})}},i=await this.damageOptimizer.optimizeForDamage(n,t);await this.delay(500),v.isMobile()?M.hideMobileLoading():this.hideProgressModal(),this.displayDamageResults(i)}catch(n){v.isMobile()?M.hideMobileLoading():this.hideProgressModal(),n instanceof Error&&n.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",n),alert(`Optimization failed: ${n instanceof Error?n.message:"Unknown error"}`))}}delay(e){return new Promise(t=>setTimeout(t,e))}displayStackingResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");!t||!n||!i||(s&&s.classList.remove("hidden"),a&&a.classList.add("hidden"),t.innerHTML=`
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
    `,n.innerHTML="",e.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.compositions.forEach((o,r)=>{const l=this.createCompositionElement(o,r+1);n.appendChild(l)}),i.classList.remove("hidden"),w.showSection("results-section"),e.compositions.length>0&&(this.currentOptimizedArmy=e.compositions[0]))}displayDamageResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("damage-army-list"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");if(!t||!n||!i)return;s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const o=document.getElementById("battle-simulation-container");o&&(o.classList.add("hidden"),w.hideSection("battle-simulation-container")),t.innerHTML=`
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
    `,n.innerHTML="",e.rankedResults.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.rankedResults.slice(0,10).forEach((r,l)=>{const c=this.createDamageArmyElement(r,l+1);n.appendChild(c)}),i.classList.remove("hidden"),w.showSection("results-section"),v.isMobile()||setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(e){const t=document.getElementById("battle-simulation-container");!t||!this.currentOptimizedArmy||(t.classList.remove("hidden"),w.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new H,this.battleSimulation.mount(t,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(e),v.isMobile()||t.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const e=document.getElementById("battle-simulation-container");e&&(e.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new H),this.battleSimulation.mount(e,this.currentOptimizedArmy),w.showSection("battle-simulation-container"),v.isMobile()||setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(e,t){var l;const n=document.createElement("div");n.className="army-composition";const i=((l=this.optimizer)==null?void 0:l.explainStacking(e))||"No stacking explanation available",s=`
      <div class="composition-header">
        <div class="composition-title">Solution ${t} ${e.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${e.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=i.split(`
`).map(c=>c.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${c}</h3>`:c.includes("═".repeat(60))?'<hr class="title-divider">':c.includes("📊 ARMY SUMMARY")||c.includes("🗡️ MERCENARY FORCES")||c.includes("👑 LEADERSHIP FORCES")||c.includes("⚡ DOMINANCE FORCES")||c.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${c}</h4>`:c.includes("─".repeat(30))||c.includes("─".repeat(40))?'<hr class="section-divider">':c.includes("└─")?`<div class="unit-detail">${c}</div>`:c.trim()&&!c.includes("═")&&!c.includes("─")?`<div class="unit-line">${c}</div>`:c.trim()===""?'<div class="spacing"></div>':"").filter(c=>c!=="").join(""),o=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${t-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;n.innerHTML=s+'<div class="composition-content">'+a+"</div>"+o;const r=n.querySelector(".simulate-btn");return r&&r.addEventListener("click",()=>{this.currentOptimizedArmy=e,this.showBattleSimulation()}),n}createDamageArmyElement(e,t){const n=document.createElement("div");n.className="damage-army-card",n.setAttribute("data-army-index",(t-1).toString());const i=e.armyComposition.totalDominanceCost===0?"Leadership":e.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",s=i==="Leadership"?"🛡️":i==="Dominance"?"👹":"⚔️";return n.addEventListener("click",()=>this.selectDamageArmy(e,t-1)),n.innerHTML=`
      <div class="damage-army-header">
        <div class="army-rank">#${t}</div>
        <div class="army-strategy">
          <span class="strategy-icon">${s}</span>
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
            ${Object.entries(e.armyComposition.units).map(([a,o])=>`<div class="unit-item">
                <span class="unit-count">${o.toLocaleString()}x</span>
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
    `,n}selectDamageArmy(e,t){document.querySelectorAll(".damage-army-card").forEach((i,s)=>{i.classList.toggle("selected",s===t)}),this.showSelectedArmyDetails(e),this.currentOptimizedArmy=e.armyComposition,this.showBattleSimulationWithResults(e.battleAnalysis)}showSelectedArmyDetails(e){const t=document.getElementById("selected-army-details"),n=document.getElementById("selected-army-composition");if(!t||!n)return;const i=e.armyComposition,s=this.unitLoader.getAvailableUnits(Object.keys(i.units)),o=new O(s).explainStacking(i);n.innerHTML=`
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
            <strong>Army Size:</strong> ${Object.values(i.units).reduce((r,l)=>r+l,0).toLocaleString()} units
          </span>
        </div>
      </div>

      <div class="composition-explanation">
        ${o.split(`
`).map(r=>r.trim()===""?'<div class="spacing"></div>':r.includes("Total")||r.includes("Budget")?`<div class="summary-line"><strong>${r}</strong></div>`:r.includes("→")?`<div class="unit-line">${r}</div>`:r.includes("✓")||r.includes("Valid")?`<div class="validation-line success">${r}</div>`:`<div class="explanation-line">${r}</div>`).join("")}
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
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const e=document.getElementById("leadership-budget"),t=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),i=document.getElementById("battle-simulation-container");e&&(e.value="0"),t&&(t.value="0"),n&&(n.classList.add("hidden"),w.hideSection("results-section")),i&&(i.classList.add("hidden"),w.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(e){this.currentMode=e;const t=document.getElementById("stacking-mode-btn"),n=document.getElementById("damage-mode-btn"),i=document.getElementById("enemy-units-btn");t&&n&&i&&(t.classList.toggle("active",e==="stacking"),n.classList.toggle("active",e==="damage"),i.classList.toggle("active",e==="enemy-units"));const s=document.getElementById("stacking-description"),a=document.getElementById("damage-description");s&&a&&(s.classList.toggle("hidden",e!=="stacking"),a.classList.toggle("hidden",e!=="damage"));const o=document.getElementById("damage-controls");o&&o.classList.toggle("hidden",e!=="damage");const r=document.getElementById("optimize-btn-text");r&&(e==="stacking"?r.textContent="🚀 Optimize Army":e==="damage"?r.textContent="⚔️ Optimize for Damage":r.textContent="👹 Manage Enemy Units");const l=document.getElementById("results-title");l&&(e==="stacking"?l.textContent="🎯 Stacking Results":e==="damage"?l.textContent="⚔️ Damage Optimization Results":l.textContent="👹 Enemy Units Management");const c=document.getElementById("config-section"),m=document.getElementById("results-section"),d=document.getElementById("enemy-units-section"),u=document.getElementById("battle-simulation-container");e==="enemy-units"?(c&&c.classList.add("hidden"),m&&m.classList.add("hidden"),d&&d.classList.remove("hidden"),u&&u.classList.add("hidden"),this.initializeEnemyUnitsManager(),w.hideSection("config-section"),w.hideSection("results-section"),w.showSection("enemy-units-section"),w.hideSection("battle-simulation-container")):(c&&c.classList.remove("hidden"),d&&d.classList.add("hidden"),m&&m.classList.add("hidden"),u&&u.classList.add("hidden"),w.showSection("config-section"),w.hideSection("enemy-units-section"),w.hideSection("results-section"),w.hideSection("battle-simulation-container"))}showLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.remove("hidden")}hideLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.add("hidden")}showProgressModal(){let e=document.getElementById("progress-modal");if(!e){e=document.createElement("div"),e.id="progress-modal",e.className="modal",e.innerHTML=`
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
      `,document.body.appendChild(e);const t=document.getElementById("cancel-optimization-btn");t&&t.addEventListener("click",()=>{this.cancelOptimization()})}e.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(e,t,n){const i=document.getElementById("progress-fill"),s=document.getElementById("progress-text"),a=document.getElementById("progress-percentage"),o=document.getElementById("progress-combinations"),r=document.getElementById("progress-phase"),l=document.getElementById("progress-remaining");if(i&&(i.style.width=`${e}%`),s&&(s.textContent=t),a&&(a.textContent=`${Math.round(e)}%`),o&&n){const c=n.combinationsEvaluated||0,m=n.totalToEvaluate||0;o.textContent=`${c.toLocaleString()} / ${m.toLocaleString()} combinations`}if(r&&(n!=null&&n.phase)&&(r.textContent=n.phase.charAt(0).toUpperCase()+n.phase.slice(1)),l&&(n!=null&&n.estimatedRemainingMs)){const c=Math.ceil(n.estimatedRemainingMs/1e3),m=Math.floor(c/60),d=c%60;l.textContent=`(~${m}:${d.toString().padStart(2,"0")} remaining)`}else l&&(l.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const e=performance.now()-this.optimizationStartTime,t=Math.floor(e/1e3),n=Math.floor(t/60),i=t%60,s=document.getElementById("progress-elapsed");s&&(s.textContent=`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const e=document.getElementById("progress-modal");e&&e.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){T.optimizeCombatLogs(),T.optimizeUnitCards(),this.addTouchSupportToUnitCards(),v.addLayoutChangeListener(e=>{this.handleLayoutModeChange(e)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(t=>{t instanceof HTMLElement&&N.addHapticFeedback(t)})}handleLayoutModeChange(e){setTimeout(()=>{T.optimizeCombatLogs(),T.optimizeUnitCards(),this.addTouchSupportToUnitCards(),e==="mobile"&&this.initializeAdvancedMobileFeatures()},100)}initializeAdvancedMobileFeatures(){v.isMobile()&&(B.initialize(),L.initialize(),this.addPullToRefresh(),this.addFloatingActionButton(),L.enhanceFormAccessibility(),setTimeout(()=>{L.addDynamicLabels()},500))}addPullToRefresh(){const e=document.querySelector(".main-content");e&&N.addPullToRefresh(e,async()=>{L.announce("Refreshing data..."),await new Promise(t=>setTimeout(t,1e3)),T.optimizeCombatLogs(),T.optimizeUnitCards(),L.addDynamicLabels(),L.announce("Data refreshed")})}addFloatingActionButton(){this.selectedUnits.size>0?M.showFloatingActionButton({icon:"⚡",label:"Quick Optimize",onClick:()=>{L.announce("Starting quick optimization"),this.optimizeArmy()},position:"bottom-right",color:"primary"}):M.hideFloatingActionButton()}initializeEnemyUnitsManager(){const e=document.getElementById("enemy-units-container");e&&(this.enemyUnitManager||(this.enemyUnitManager=new oe({mode:"embedded"})),this.enemyUnitManager.mount(e))}openEnemyUnitSelector(){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5");Q(async()=>{const{EnemyUnitSelector:n}=await Promise.resolve().then(()=>se);return{EnemyUnitSelector:n}},void 0).then(({EnemyUnitSelector:n})=>{const i=document.createElement("div");i.id="enemy-unit-selector-modal",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.right="0",i.style.bottom="0",i.style.zIndex="2000",document.body.appendChild(i);const s=new n({onSelect:a=>{this.handleEnemyUnitSelected(a)},onCancel:()=>{this.closeEnemyUnitSelector(i,s)},mode:"multiple",title:`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`,maxSelections:t,selectedUnits:[...this.selectedEnemyUnits]});this.currentEnemyUnitSelector=s,this.currentEnemyUnitSelectorContainer=i,s.mount(i)}).catch(n=>{console.error("Failed to load EnemyUnitSelector:",n),alert("Failed to open enemy unit selector. Please try again.")})}handleEnemyUnitSelected(e){const t=document.getElementById("enemy-count"),n=parseInt((t==null?void 0:t.value)||"5"),i=this.selectedEnemyUnits.findIndex(s=>s.name===e.name);i>=0?this.selectedEnemyUnits.splice(i,1):this.selectedEnemyUnits.length<n?this.selectedEnemyUnits.push(e):(this.selectedEnemyUnits.shift(),this.selectedEnemyUnits.push(e)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}closeEnemyUnitSelector(e,t){try{t&&typeof t.unmount=="function"&&t.unmount(),e&&e.parentNode&&e.parentNode.removeChild(e),this.currentEnemyUnitSelector=null,this.currentEnemyUnitSelectorContainer=null}catch(n){console.error("Error closing enemy unit selector:",n)}}updateEnemyUnitSelectorTitle(){if(this.currentEnemyUnitSelector&&typeof this.currentEnemyUnitSelector.updateTitle=="function"){const e=document.getElementById("enemy-count"),t=parseInt((e==null?void 0:e.value)||"5"),n=`Select Enemy Units for Battle Optimization (${this.selectedEnemyUnits.length}/${t} selected)`;this.currentEnemyUnitSelector.updateTitle(n),typeof this.currentEnemyUnitSelector.updateSelectedUnits=="function"&&this.currentEnemyUnitSelector.updateSelectedUnits(this.selectedEnemyUnits)}}handleEnemyGroupsChange(){if(this.currentMode==="damage"){const e=document.getElementById("enemy-count"),t=e&&parseInt(e.value)||1;this.selectedEnemyUnits.length>t&&(this.selectedEnemyUnits=this.selectedEnemyUnits.slice(0,t)),this.updateEnemyUnitDisplay(),this.updateEnemyUnitSelectorTitle()}}updateEnemyUnitDisplay(){const e=document.getElementById("select-enemy-units-btn");if(e){const t=document.getElementById("enemy-count"),n=parseInt((t==null?void 0:t.value)||"5");if(this.selectedEnemyUnits.length===0)e.innerHTML=`
          👹 Select Enemy Units
        `,e.classList.remove("enemy-selected");else if(this.selectedEnemyUnits.length===1){const i=this.selectedEnemyUnits[0];e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${i.name}
          <small class="enemy-stats">(STR: ${i.strength.toLocaleString()}, HP: ${i.health.toLocaleString()})</small>
        `,e.classList.add("enemy-selected")}else e.innerHTML=`
          <span class="selected-enemy-indicator">✅</span>
          ${this.selectedEnemyUnits.length} Enemy Units Selected
          <small class="enemy-stats">(${this.selectedEnemyUnits.length}/${n} selected)</small>
        `,e.classList.add("enemy-selected")}}}document.addEventListener("DOMContentLoaded",()=>{const y=document.getElementById("app");if(!y)throw new Error("App container not found");new ce().mount(y),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-B1RYfdA-.js.map
