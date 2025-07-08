var H=Object.defineProperty;var _=(v,t,e)=>t in v?H(v,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):v[t]=e;var f=(v,t,e)=>_(v,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class S{static isMercenary(t){return t.cost_type==="Mercenary"||t.authority_cost>0}static getPrimaryCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}static getStrengthPerCost(t){const e=S.getPrimaryCost(t);return e>0?t.strength/e:0}static getHealthPerCost(t){const e=S.getPrimaryCost(t);return e>0?t.health/e:0}}class R{constructor(){f(this,"units",[]);f(this,"unitsByName",new Map);f(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(t){try{let e;if(typeof t=="string"){console.log(`Loading units from: ${t}`);const n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);e=await n.json()}else e=t;if(!Array.isArray(e))throw new Error("Unit data must be an array");return this.units=e.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(e){throw console.error("❌ Error loading units:",e),e}}validateAndNormalizeUnit(t){const e={name:t.name||"Unknown",unit_types:Array.isArray(t.unit_types)?t.unit_types:[],cost_type:t.cost_type||"Leadership",health:Number(t.health)||0,strength:Number(t.strength)||0,leadership_cost:Number(t.leadership_cost)||0,dominance_cost:Number(t.dominance_cost)||0,authority_cost:Number(t.authority_cost)||0,food_consumption:Number(t.food_consumption)||0,carrying_capacity:Number(t.carrying_capacity)||0,revival_cost_gold:Number(t.revival_cost_gold)||0,revival_cost_silver:Number(t.revival_cost_silver)||0,source_file:t.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)||(console.warn(`Invalid cost type for unit ${e.name}: ${e.cost_type}`),e.cost_type="Leadership"),e}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(t=>[t.name,t])),this.units.forEach(t=>{S.isMercenary(t)?this.unitsByCostType.Mercenary.push(t):t.cost_type in this.unitsByCostType&&this.unitsByCostType[t.cost_type].push(t)}),Object.keys(this.unitsByCostType).forEach(t=>{this.unitsByCostType[t].sort((e,n)=>e.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(t){return this.unitsByName.get(t)}getUnitsByCostType(t){return[...this.unitsByCostType[t]]}getAvailableUnits(t){const e=[];for(const n of t){const i=this.getUnitByName(n);i?e.push(i):console.warn(`Unit '${n}' not found in loaded data`)}return e}filterUnits(t){let e=this.units;return t.costType&&(e=e.filter(n=>n.cost_type===t.costType)),t.unitTypes&&t.unitTypes.length>0&&(e=e.filter(n=>t.unitTypes.some(i=>n.unit_types.includes(i)))),t.minStrength!==void 0&&(e=e.filter(n=>n.strength>=t.minStrength)),t.maxCost!==void 0&&(e=e.filter(n=>S.getPrimaryCost(n)<=t.maxCost)),e}searchUnits(t){if(!t.trim())return this.getAllUnits();const e=t.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(e))}getEnhancedUnits(){return this.units.map(t=>({...t,get isMercenary(){return S.isMercenary(t)},get primaryCost(){return S.getPrimaryCost(t)},get strengthPerCost(){return S.getStrengthPerCost(t)},get healthPerCost(){return S.getHealthPerCost(t)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...t),max:Math.max(...t)},healthRange:{min:Math.min(...e),max:Math.max(...e)}}}getUniqueUnitTypes(){const t=new Set;return this.units.forEach(e=>{e.unit_types.forEach(n=>t.add(n))}),Array.from(t).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,i)=>n+i,0)/t.length)},healthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,i)=>n+i,0)/e.length)},topUnitsByStrength:[...this.units].sort((n,i)=>i.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,i)=>i.health-n.health).slice(0,10)}}}class I{constructor(t){f(this,"availableUnits");f(this,"unitsByName");f(this,"leadershipUnits");f(this,"dominanceUnits");f(this,"mercenaryUnits");this.availableUnits=[...t],this.unitsByName=new Map(t.map(e=>[e.name,e])),this.leadershipUnits=t.filter(e=>e.cost_type==="Leadership").sort((e,n)=>e.strength-n.strength),this.dominanceUnits=t.filter(e=>e.cost_type==="Dominance").sort((e,n)=>e.strength-n.strength),this.mercenaryUnits=t.filter(e=>S.isMercenary(e)).sort((e,n)=>e.strength-n.strength)}async optimizeArmy(t){const e=performance.now();console.log(`🔍 Optimizing army with L:${t.leadershipBudget} D:${t.dominanceBudget} M:${Object.keys(t.mercenaryLimits).length}`),console.log(`📋 Selected units: ${t.availableUnits.join(", ")}`);const n=[],i=this.generateGuaranteedValidCompositions(t);console.log(`Generated ${i.length} guaranteed valid army combinations`);let s=0;for(const c of i){s++;const u=this.evaluateComposition(c);n.push(u)}const a=performance.now();console.log(`Evaluated ${s} combinations, found ${n.length} valid stackings`);const o=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Leadership"),l=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Dominance"),r=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&S.isMercenary(c)),d=n.filter(c=>{const u=o.some(g=>c.units[g.name]&&c.units[g.name]>0),h=l.some(g=>c.units[g.name]&&c.units[g.name]>0),p=r.some(g=>c.units[g.name]&&c.units[g.name]>0);return[o.length>0?u:!0,l.length>0?h:!0,r.length>0?p:!0].every(g=>g)});return d.sort((c,u)=>{const h=c.totalLeadershipCost/t.leadershipBudget+c.totalDominanceCost/t.dominanceBudget;return u.totalLeadershipCost/t.leadershipBudget+u.totalDominanceCost/t.dominanceBudget-h}),{compositions:d.length>0?[d[0]]:n.slice(0,1),totalCombinationsEvaluated:s,validStackingsFound:n.length,executionTimeMs:a-e}}generateGuaranteedValidCompositions(t){const e=[],n=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,o)=>o.strength-a.strength),i=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,o)=>o.strength-a.strength),s=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&S.isMercenary(a));if(console.log(`Selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log("Leadership units:",n.map(a=>a.name)),console.log("Dominance units:",i.map(a=>a.name)),console.log("Mercenary units:",s.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${i.length} M:${s.length}`),console.log(`Budgets: Leadership:${t.leadershipBudget} Dominance:${t.dominanceBudget}`),n.length>0&&i.length>0&&s.length>0&&t.leadershipBudget>0&&t.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...n,...s];e.push(...this.generateCombinedStackedCompositions(a,i,t.leadershipBudget,t.dominanceBudget,t.mercenaryLimits))}else if(n.length>0&&s.length>0&&i.length===0&&t.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...n,...s],o=this.calculateProperStackingQuantities(a,t.leadershipBudget,t.mercenaryLimits);e.push(o)}else if(i.length>0&&s.length>0&&n.length===0&&t.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,t.dominanceBudget),o={};for(const r of s)o[r.name]=t.mercenaryLimits[r.name]||1;const l={...a,...o};e.push(l)}else if(n.length>0&&i.length>0&&s.length===0&&t.leadershipBudget>0&&t.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),e.push(...this.generateCombinedStackedCompositions(n,i,t.leadershipBudget,t.dominanceBudget,{}));else if(n.length>0&&i.length===0&&s.length===0&&t.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(n,t.leadershipBudget,{});e.push(a)}else if(i.length>0&&n.length===0&&s.length===0&&t.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(i,t.dominanceBudget);e.push(a)}else if(s.length>0&&n.length===0&&i.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const o of s){const l=t.mercenaryLimits[o.name]||1;a[o.name]=l}Object.keys(a).length>0&&e.push(a)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&s.length>0&&t.leadershipBudget>0&&e.push(...this.generateMercenaryMixedCompositions(n,s,t.leadershipBudget,t.mercenaryLimits,"leadership_cost")),i.length>0&&s.length>0&&t.dominanceBudget>0&&e.push(...this.generateMercenaryMixedCompositions(i,s,t.dominanceBudget,t.mercenaryLimits,"dominance_cost")),e}generateStackedCompositionsWithMercenaries(t,e,n,i){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const s=[...t,...e];console.log(`🚨 About to call calculateProperStackingQuantities with ${s.length} units`);const a=this.calculateProperStackingQuantities(s,n,i);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(t,e){const n={};if(t.length===0)return n;const i=t[0];n[i.name]=1,console.log(`🎯 Starting with 1x ${i.name} (STR: ${i.strength})`);for(let s=1;s<t.length;s++){const a=t[s],o=t[s-1],l=o.health*(n[o.name]||1),r=Math.ceil((l+1)/a.health);n[a.name]=r,console.log(`📋 ${a.name}: need ${r} units (${r*a.health} HP) to exceed ${o.name} (${l} HP)`)}return n}calculateProperStackingQuantities(t,e,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${e}`);const i={},s=[...t].sort((c,u)=>u.strength-c.strength),a=s.filter(c=>c.cost_type==="Leadership"),o=s.filter(c=>S.isMercenary(c));if(s.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),i;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${s.length} units (${a.length} leadership + ${o.length} mercenary)`);const l=s[0],r={};r[l.name]=1;const d=l.health*1;console.log(`🔧 Base: 1x ${l.name} = ${d} HP (strongest)`);for(let c=1;c<s.length;c++){const u=s[c],h=Math.ceil((d+1)/u.health);r[u.name]=h;const p=S.isMercenary(u)?"mercenary":"leadership";console.log(`🔧 Base: ${h}x ${u.name} = ${h*u.health} HP (beats ${d}) [${p}]`)}console.log("🔧 Validating base pattern stacking order...");for(let c=0;c<s.length-1;c++){const u=s[c],h=s[c+1],p=u.health*r[u.name];let y=h.health*r[h.name];if(y<=p)if(S.isMercenary(h))console.log(`🔧 WARNING: ${h.name} mercenary limit (${r[h.name]}) gives ${y} HP, can't beat ${p} HP`);else{const g=Math.ceil((p+1)/h.health);r[h.name]=g,y=h.health*g,console.log(`🔧 Fixed: ${h.name} increased to ${g} units = ${y} HP (now beats ${p})`)}else console.log(`🔧 OK: ${h.name} ${r[h.name]} units = ${y} HP (beats ${p})`)}let m=0;for(const[c,u]of Object.entries(r)){const h=this.unitsByName.get(c);h&&h.cost_type==="Leadership"&&(m+=u*h.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${m}`),m===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[c,u]of Object.entries(r))i[c]=u}else{const c=Math.floor(e/m);console.log(`🔧 Can afford ${c} base stacks (${e} / ${m})`);for(const[u,h]of Object.entries(r)){const p=this.unitsByName.get(u);if(p&&S.isMercenary(p)){const y=h*c,g=n[u]||1;i[u]=Math.min(y,g),y>g?console.log(`🔧 Mercenary ${u}: wanted ${y}, capped at limit ${g}`):console.log(`🔧 Mercenary ${u}: scaled to ${y} (under limit ${g})`)}else i[u]=h*c}}return console.log("🔧 SIMPLE STACKING: Final composition:",i),i}calculateProperStackingQuantitiesForDominance(t,e){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${e}`);const n={},i=[...t].sort((d,m)=>m.strength-d.strength);if(i.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${i.length} dominance units`);const s=i[0],a={};a[s.name]=1;const o=s.health*1;console.log(`🔧 Base: 1x ${s.name} = ${o} HP (strongest)`);for(let d=1;d<i.length;d++){const m=i[d],c=Math.ceil((o+1)/m.health);a[m.name]=c,console.log(`🔧 Base: ${c}x ${m.name} = ${c*m.health} HP (beats ${o})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let d=0;d<i.length-1;d++){const m=i[d],c=i[d+1],u=m.health*a[m.name];let h=c.health*a[c.name];if(h<=u){const p=Math.ceil((u+1)/c.health);a[c.name]=p,h=c.health*p,console.log(`🔧 Fixed: ${c.name} increased to ${p} units = ${h} HP (now beats ${u})`)}else console.log(`🔧 OK: ${c.name} ${a[c.name]} units = ${h} HP (beats ${u})`)}let l=0;for(const[d,m]of Object.entries(a)){const c=this.unitsByName.get(d);c&&c.cost_type==="Dominance"&&(l+=m*c.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${l}`),l===0)return console.log("🔧 No dominance costs found"),n;const r=Math.floor(e/l);console.log(`🔧 Can afford ${r} base stacks (${e} / ${l})`);for(const[d,m]of Object.entries(a))n[d]=m*r;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(t){return Object.entries(t).reduce((e,[n,i])=>{const s=this.unitsByName.get(n);return s&&s.cost_type==="Leadership"?e+i*s.leadership_cost:e},0)}calculateMaxStacksByMercenaries(t,e){let n=1/0;for(const[i,s]of Object.entries(t)){const a=this.unitsByName.get(i);if(a&&S.isMercenary(a)){const o=e[i]||1,l=Math.floor(o/s);n=Math.min(n,l),console.log(`🗡️ ${i}: limit ${o}, base need ${s}, allows ${l} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(t,e,n,i){const s=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...t,...e].sort((c,u)=>u.strength-c.strength);if(a.length===0)return s;const o=this.calculateCleanStackingPattern(a,i);console.log("📊 Dominance + Mercenary base pattern:",o);const l=Object.entries(o).reduce((c,[u,h])=>{const p=this.unitsByName.get(u);return p&&p.cost_type==="Dominance"?c+h*p.dominance_cost:c},0);if(console.log(`💰 Dominance cost per stack: ${l}`),l>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const c={};for(const u of e)c[u.name]=i[u.name]||1;return s.push(c),t.length>0&&s.push(...this.generateStackedCompositions(t,n,"dominance_cost")),s}const r=Math.floor(n/l),d=this.calculateMaxStacksByMercenaries(o,i),m=Math.min(r,d);console.log(`🔢 Max Dominance+Mercenary stacks: ${m}`);for(let c=1;c<=Math.min(m,5);c++){const u={};for(const[h,p]of Object.entries(o)){const y=this.unitsByName.get(h);y&&S.isMercenary(y)?u[h]=Math.min(p*c,i[h]||1):u[h]=p*c}s.push(u)}if(d<r&&t.length>0){const c=n-m*l,u=this.generateStackedCompositions(t,c,"dominance_cost"),h={};for(const p of e)h[p.name]=i[p.name]||1;for(const p of u.slice(0,3)){const y={...h,...p};s.push(y)}}return s}generateStackedCompositions(t,e,n){const i=[];if(t.length===0||e<=0)return i;const s=t[0];console.log(`🎯 Strongest unit: ${s.name} (STR: ${s.strength})`);const a=this.calculateStackingPattern(t);console.log("📊 Base stacking pattern:",a);const o=Object.entries(a).reduce((r,[d,m])=>{const c=this.unitsByName.get(d);if(c){const u=c[n];return r+m*u}return r},0);if(console.log(`💰 Base pattern cost: ${o}`),o<=0)return i;const l=Math.floor(e/o);console.log(`🔢 Max multiplier: ${l}`);for(let r=1;r<=Math.min(l,10);r++){const d={};for(const[m,c]of Object.entries(a))d[m]=c*r;i.push(d)}return t.length>1&&i.push(...this.generateStackingVariations(t,e,n)),i}calculateStackingPattern(t){const e={};if(t.length===0)return e;const n=t[0];e[n.name]=1;for(let i=1;i<t.length;i++){const s=t[i],a=t[i-1],o=a.health*(e[a.name]||1),l=Math.ceil((o+1)/s.health);e[s.name]=l,console.log(`📋 ${s.name}: need ${l} units (${l*s.health} HP) to exceed ${a.name} (${o} HP)`)}return e}generateCombinedStackedCompositions(t,e,n,i,s={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const o=t.filter($=>$.cost_type==="Leadership"),l=t.filter($=>S.isMercenary($));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const r=[...o,...l],m=[this.calculateProperStackingQuantities(r,n,s)];if(m.length===0)return a;const c=m[m.length-1];if(!c)return a;console.log("🎯 Using maximum Leadership composition for combination");const u=c,h=e[0];console.log(`🎯 Strongest Dominance unit: ${h.name} (STR: ${h.strength})`);const p=this.findClosestStrengthUnit(h,t);if(!p)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${p.name} (STR: ${p.strength})`);const y=u[p.name]||0,g=p.health*y;if(console.log(`📊 Comparison unit total health: ${g} (${y}x ${p.health})`),g<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const C=h.health;C>=g&&(console.log(`⚠️ Single Dominance unit too strong: ${C} HP >= ${g} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const M=[this.calculateProperStackingQuantitiesForDominance(e,i)];if(M.length>0){const $=M[M.length-1],B={...u,...$};a.push(B),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(u);return a}findClosestStrengthUnit(t,e){if(e.length===0)return null;let n=e[0],i=Math.abs(t.strength-n.strength);for(const s of e){const a=Math.abs(t.strength-s.strength);a<i&&(i=a,n=s)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${t.name} (STR: ${t.strength}), diff: ${i}`),n}calculateConstrainedDominanceStack(t,e,n){const i={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),t.length===0||e<=0||n<=0)return i;const s=t[0],a=Math.floor((n-1)/s.health),o=Math.floor(e/s.dominance_cost),l=Math.min(a,o);if(l<=0)return console.log(`❌ Cannot fit any ${s.name} within constraints`),i;for(let r=Math.min(l,3);r>=1;r--){const d={};d[s.name]=r;let m=r*s.dominance_cost,c=r*s.health;console.log(`🧪 Testing ${r}x ${s.name} (${c} HP, ${m} cost)`);for(let h=1;h<t.length&&m<e;h++){const p=t[h],y=e-m,g=Math.ceil((c+1)/p.health),C=Math.floor(y/p.dominance_cost),L=Math.min(g,C);L>0&&(d[p.name]=L,m+=L*p.dominance_cost,console.log(`  ➕ Added ${L}x ${p.name} (${L*p.health} HP)`))}const u=Object.entries(d).reduce((h,[p,y])=>{const g=this.unitsByName.get(p);return g?h+y*g.health:h},0);if(u<n)return console.log(`✅ Valid Dominance stack: ${u} HP < ${n} HP limit`),d;console.log(`❌ Dominance stack too strong: ${u} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),i}generateMercenaryMixedCompositions(t,e,n,i,s){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const o=this.generateStackedCompositions(t,n,s);if(o.length===0)return a;for(const l of o.slice(0,3)){const r=e.sort((g,C)=>C.strength-g.strength)[0];if(!r)continue;console.log(`🎯 Strongest Mercenary: ${r.name} (STR: ${r.strength})`);const d=this.findClosestStrengthUnit(r,t);if(!d){console.log("❌ No suitable base unit found for comparison");continue}const m=l[d.name]||0,c=d.health*m;if(console.log(`📊 Comparison base unit total health: ${c}`),c<=0){console.log("❌ Comparison unit not in base composition");continue}const u=r.health,h=i[r.name]||1,p=u*h;if(p>=c){console.log(`⚠️ Mercenary too strong: ${p} HP >= ${c} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const g=Math.floor((c-1)/u);if(g>0){console.log(`✅ Using ${g}x ${r.name} instead of ${h}`);const C={...l};C[r.name]=g;for(const L of e)if(L.name!==r.name){const M=i[L.name]||1;C[L.name]=M}a.push(C),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(l);continue}const y={...l};for(const g of e){const C=i[g.name]||1;y[g.name]=C}a.push(y),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(t,e,n){const i={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const s=[...t].sort((l,r)=>l.health-r.health);let a=0,o=0;for(const l of s){const r=Math.floor((n-o-1)/l.health),d=Math.floor((e-a)/l.dominance_cost),m=Math.min(r,d);m>0&&(i[l.name]=m,a+=m*l.dominance_cost,o+=m*l.health,console.log(`➕ Added ${m}x ${l.name} (${m*l.health} HP, ${m*l.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${o} HP total, ${a} cost`),i}calculateMaximizedDominanceStack(t,e,n){console.log(`💰 Maximizing Dominance budget: ${e} with health limit: ${n}`);const i=this.createAlternativeDominanceStack(t,e,n);return Object.keys(i).length>0?i:this.calculateConstrainedDominanceStack(t,e,n)}generateStackingVariations(t,e,n){const i=[],s={},a=t[0],o=a[n];if(o>0){const l=Math.floor(e/o);s[a.name]=Math.min(l,5);let r=e-s[a.name]*o;for(let d=1;d<t.length&&r>0;d++){const m=t[d],c=m[n];if(c>0&&c<=r){const u=Math.floor(r/c/(t.length-d));u>0&&(s[m.name]=u,r-=u*c)}}i.push(s)}return i}generateGuaranteedDiverseCompositions_OLD(t){const e=[],n=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&r.cost_type==="Leadership"),i=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&r.cost_type==="Dominance"),s=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&S.isMercenary(r)),a={};let o=0,l=0;for(const r of n)o+r.leadership_cost<=t.leadershipBudget&&(a[r.name]=1,o+=r.leadership_cost);for(const r of i)l+r.dominance_cost<=t.dominanceBudget&&(a[r.name]=1,l+=r.dominance_cost);for(const r of s){const d=t.mercenaryLimits[r.name]||1;a[r.name]=Math.min(1,d)}if(Object.keys(a).length>0&&e.push(a),n.length>0&&t.leadershipBudget>0){const r=n.sort((m,c)=>m.leadership_cost-c.leadership_cost)[0],d=Math.floor(t.leadershipBudget/r.leadership_cost);if(d>0){const m={};m[r.name]=Math.min(d,20);const c=t.leadershipBudget-m[r.name]*r.leadership_cost;for(const u of n.slice(1,3)){const h=Math.floor(c/u.leadership_cost/2);h>0&&(m[u.name]=h)}e.push(m)}}if(n.length>0||i.length>0){const r={};if(n.length>0&&t.leadershipBudget>0){const d=Math.floor(t.leadershipBudget/n.length);for(const m of n){const c=Math.floor(d/m.leadership_cost);c>0&&(r[m.name]=c)}}if(i.length>0&&t.dominanceBudget>0){const d=Math.floor(t.dominanceBudget/i.length);for(const m of i){const c=Math.floor(d/m.dominance_cost);c>0&&(r[m.name]=c)}}for(const d of s){const m=t.mercenaryLimits[d.name]||1;r[d.name]=Math.max(1,Math.floor(m/2))}Object.keys(r).length>0&&e.push(r)}return e}generateMercenaryCombinations(t){if(Object.keys(t).length===0)return[{}];let e=[{}];for(const[n,i]of Object.entries(t)){if(!this.unitsByName.has(n))continue;const s=[];for(const a of e)for(let o=0;o<=i;o++){const l={...a};o>0&&(l[n]=o),s.push(l)}e=s}return e}evaluateComposition(t){let e=0,n=0,i=0,s=0,a=0;const o=[];for(const[y,g]of Object.entries(t)){const C=this.unitsByName.get(y);if(!C)continue;const L=C.health*g,M=C.strength*g;e+=M,n+=L,i+=C.leadership_cost*g,s+=C.dominance_cost*g,S.isMercenary(C)&&(a+=g),o.push({unit:C,count:g,totalHealth:L,unitStrength:C.strength})}o.sort((y,g)=>y.unitStrength-g.unitStrength);let l=!0;const r=[];for(let y=0;y<o.length;y++){const{unit:g,count:C,totalHealth:L}=o[y];r.push({unitName:g.name,count:C,totalHealth:L,unitStrength:g.strength});for(let M=y+1;M<o.length;M++){const $=o[M].unit,B=o[M].totalHealth;if(g.strength===$.strength){const N=Math.max(L,B)*.1;if(Math.abs(L-B)<=N)continue}L<=B&&console.log(`❌ Stacking violation: ${g.name} (STR:${g.strength}, ${L} HP) <= ${$.name} (STR:${$.strength}, ${B} HP)`)}}const d=i+s+a;let m=d>0?e/d:0;m*=1.2;const u=1+(Object.keys(t).length-1)*.05;m*=u;let h=0;i>0&&h++,s>0&&h++,a>0&&h++;const p=1+(h-1)*.1;return m*=p,{units:t,totalStrength:e,totalHealth:n,totalLeadershipCost:i,totalDominanceCost:s,totalMercenaryCount:a,stackingOrder:r,isValidStacking:l,efficiencyScore:m}}explainStacking(t){const e=[],n=[],i=[],s=[];return t.stackingOrder.forEach(a=>{const o=this.unitsByName.get(a.unitName);if(!o)return;const l={name:a.unitName,count:a.count,totalHealth:a.totalHealth,strength:o.strength};S.isMercenary(o)?s.push(l):o.cost_type==="Leadership"?n.push(l):o.cost_type==="Dominance"&&i.push(l)}),e.push("🏆 OPTIMIZED ARMY COMPOSITION"),e.push("═".repeat(60)),e.push(""),e.push("📊 ARMY SUMMARY"),e.push("─".repeat(30)),e.push(`Total Units: ${Object.values(t.units).reduce((a,o)=>a+o,0).toLocaleString()}`),e.push(`Total Strength: ${t.totalStrength.toLocaleString()}`),e.push(`Total Health: ${t.totalHealth.toLocaleString()}`),e.push(`Budget Usage: L:${t.totalLeadershipCost} D:${t.totalDominanceCost} M:${t.totalMercenaryCount}`),e.push(""),s.length>0&&(e.push("🗡️ MERCENARY FORCES"),e.push("─".repeat(30)),s.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),n.length>0&&(e.push("👑 LEADERSHIP FORCES"),e.push("─".repeat(30)),n.sort((a,o)=>o.strength-a.strength),n.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),i.length>0&&(e.push("⚡ DOMINANCE FORCES"),e.push("─".repeat(30)),i.sort((a,o)=>o.strength-a.strength),i.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),e.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),e.push("─".repeat(40)),t.stackingOrder.forEach((a,o)=>{const l=this.unitsByName.get(a.unitName);if(!l)return;const r=S.isMercenary(l)?"🗡️":l.cost_type==="Leadership"?"👑":l.cost_type==="Dominance"?"⚡":"❓";e.push(`${o+1}. ${r} ${a.count.toLocaleString()}x ${a.unitName} (${a.totalHealth.toLocaleString()} HP)`)}),e.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class E{static formatGroupForLog(t){return`${t.count} ${t.unitName}`}static formatEnemyGroupForLog(t){return`Enemy Group ${t+1}`}static calculateDamageDealt(t){return t.count*t.unitStrength}static createPlayerAttackAction(t,e,n){const i=E.calculateDamageDealt(e);return{turn:t,attacker:E.formatGroupForLog(e),target:E.formatEnemyGroupForLog(n),action:`attack and deal ${i.toLocaleString()} damage`,damageDealt:i,eliminated:!1}}static createEnemyAttackAction(t,e,n){return{turn:t,attacker:E.formatEnemyGroupForLog(e),target:E.formatGroupForLog(n),action:`attack and kill ${E.formatGroupForLog(n)}`,eliminated:!0}}static formatCombatLogForDisplay(t){return t.map(e=>e.eliminated?`${e.attacker} ${e.action}`:`${e.attacker} ${e.action}`)}static calculateBattleStatistics(t,e){const n=t.filter(o=>!o.eliminated),i=t.filter(o=>o.eliminated),s={},a={};return n.forEach(o=>{const l=o.attacker.split(" ").slice(1).join(" "),r=o.damageDealt||0;s[l]=(s[l]||0)+r,a[l]=(a[l]||0)+1}),{totalPlayerAttacks:n.length,totalEnemyAttacks:i.length,averageDamagePerAttack:n.length>0?e/n.length:0,damageByUnitType:s,attacksByUnitType:a,eliminationRate:i.length>0?i.length/t.length:0}}static getBattleSummary(t){const e=t.statistics||E.calculateBattleStatistics(t.combatLog,t.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${t.battleDuration} battle phases
- Player unit turns taken: ${e.totalPlayerAttacks}
- Enemy unit turns taken: ${e.totalEnemyAttacks}
- Total damage dealt to enemies: ${t.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(e.averageDamagePerAttack).toLocaleString()}
- Scenario: ${t.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const U={MAX_BATTLE_TURNS:1e3};class O{constructor(){f(this,"attackOrderCache",new Map);f(this,"targetOrderCache",new Map)}validateBattleConfiguration(t){if(!t)throw new Error("Battle configuration is required");if(!t.playerArmy)throw new Error("Player army is required");if(!t.playerArmy.stackingOrder||t.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(t.enemyGroupCount<1)throw new Error("Enemy group count must be at least 1");if(t.enemyGroupCount>100)throw new Error("Enemy group count cannot exceed 100 (performance limit)");for(const e of t.playerArmy.stackingOrder){if(!e.unitName||e.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(e.count<=0)throw new Error(`Unit group "${e.unitName}" must have a positive count`);if(e.unitStrength<=0)throw new Error(`Unit group "${e.unitName}" must have positive strength`);if(e.totalHealth<=0)throw new Error(`Unit group "${e.unitName}" must have positive health`)}}simulateBattle(t){this.validateBattleConfiguration(t);const e={currentTurn:0,playerGroups:[...t.playerArmy.stackingOrder],enemyGroupCount:t.enemyGroupCount,totalDamageDealt:0,battleEnded:!1,combatLog:[]};let n=0;const i=5;for(;!this.shouldBattleEnd(e)&&e.currentTurn<U.MAX_BATTLE_TURNS;){const a=e.combatLog.length;e.currentTurn++;try{this.processTurn(e,t.playerGoesFirst)}catch(o){throw new Error(`Battle processing failed on turn ${e.currentTurn}: ${o instanceof Error?o.message:"Unknown error"}`)}if(e.combatLog.length===a){if(n++,n>=i)throw new Error(`Battle stalled: No actions taken for ${i} consecutive turns`)}else n=0;if(e.currentTurn>1&&e.playerGroups.length===0&&!e.battleEnded){e.battleEnded=!0;break}}if(e.currentTurn>=U.MAX_BATTLE_TURNS)throw new Error(`Battle exceeded maximum duration of ${U.MAX_BATTLE_TURNS} turns`);const s=E.calculateBattleStatistics(e.combatLog,e.totalDamageDealt);return{outcome:"player_eliminated",combatLog:e.combatLog,totalDamageDealtToEnemies:e.totalDamageDealt,battleDuration:e.currentTurn,playerSurvivalTurns:e.currentTurn,scenario:t.playerGoesFirst?"best_case":"worst_case",configuration:t,statistics:s}}simulateBothScenarios(t,e){if(!t)throw new Error("Player army is required");if(e<1||e>100)throw new Error("Enemy group count must be between 1 and 100");const n={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!0},i=this.simulateBattle(n),s={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!1},a=this.simulateBattle(s),o={damageDifference:i.totalDamageDealtToEnemies-a.totalDamageDealtToEnemies,survivalDifference:i.playerSurvivalTurns-a.playerSurvivalTurns,averageDamage:(i.totalDamageDealtToEnemies+a.totalDamageDealtToEnemies)/2,averageSurvival:(i.playerSurvivalTurns+a.playerSurvivalTurns)/2};return{bestCase:i,worstCase:a,comparison:o}}calculateAttackOrder(t){const e=t.map(i=>`${i.unitName}:${i.count}:${i.unitStrength}`).join("|");if(this.attackOrderCache.has(e))return this.attackOrderCache.get(e);const n=[...t].sort((i,s)=>{const a=i.count*i.unitStrength;return s.count*s.unitStrength-a});return this.attackOrderCache.set(e,n),n}calculateEnemyTargetOrder(t){const e=t.map(i=>`${i.unitName}:${i.count}:${i.totalHealth}`).join("|");if(this.targetOrderCache.has(e))return this.targetOrderCache.get(e);const n=[...t].sort((i,s)=>s.totalHealth-i.totalHealth);return this.targetOrderCache.set(e,n),n}shouldBattleEnd(t){return t.playerGroups.length===0||t.battleEnded}processTurn(t,e){const n=this.calculateAttackOrder(t.playerGroups),i=n.length,s=t.enemyGroupCount,a=new Set;let o=0;const l=Math.max(i,s);for(let r=0;r<l*2&&!this.shouldBattleEnd(t);r++){if(e?r%2===0:r%2===1){const m=this.getNextPlayerAttacker(t,n,a);if(m){this.processSinglePlayerAttackByGroup(t,m,a.size);const c=`${m.unitName}:${m.count}:${m.unitStrength}`;a.add(c)}}else o<t.enemyGroupCount&&t.playerGroups.length>0&&(this.processSingleEnemyAttack(t,o),o++);if(a.size>=i&&o>=s)break}}getNextPlayerAttacker(t,e,n){for(const i of e){const s=`${i.unitName}:${i.count}:${i.unitStrength}`;if(!n.has(s)){const a=t.playerGroups.find(o=>o.unitName===i.unitName&&o.unitStrength===i.unitStrength);if(a)return a}}return null}processSinglePlayerAttackByGroup(t,e,n){if(t.playerGroups.length===0)return;const i=n%t.enemyGroupCount,s=E.calculateDamageDealt(e),a=E.createPlayerAttackAction(t.currentTurn,e,i);t.combatLog.push(a),t.totalDamageDealt+=s}processSinglePlayerAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateAttackOrder(t.playerGroups);if(e>=n.length)return;const i=n[e],s=e%t.enemyGroupCount,a=E.calculateDamageDealt(i),o=E.createPlayerAttackAction(t.currentTurn,i,s);t.combatLog.push(o),t.totalDamageDealt+=a}processSingleEnemyAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateEnemyTargetOrder(t.playerGroups);if(n.length===0)return;const i=n[0],s=E.createEnemyAttackAction(t.currentTurn,e,i);t.combatLog.push(s);const a=t.playerGroups.findIndex(o=>o.unitName===i.unitName&&o.count===i.count&&o.totalHealth===i.totalHealth);a!==-1&&t.playerGroups.splice(a,1),t.playerGroups.length===0&&(t.battleEnded=!0)}}class F{constructor(t,e){f(this,"battleSimulator");f(this,"algorithm");this.battleSimulator=t||new O,this.algorithm=e||new q}setAlgorithm(t){this.algorithm=t}reportProgress(t,e){t.onProgress&&t.onProgress(e)}checkCancellation(t){var e;if((e=t.signal)!=null&&e.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(t,e){const n=performance.now(),i=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${t.leadershipBudget} D:${t.dominanceBudget} vs ${t.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${i/1e3} seconds`),this.reportProgress(t,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(t),this.reportProgress(t,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const s=await this.algorithm.generateCombinations(t,e);console.log(`🔄 Generated ${s.length} army combinations to evaluate`),this.reportProgress(t,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:0,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const a=[];let o=0;for(let m=0;m<s.length;m++){this.checkCancellation(t);const c=performance.now();if(c-n>i){console.warn(`⏱️ Optimization timeout after ${(c-n)/1e3}s - stopping at ${o} combinations`);break}const u=s[m];try{const h=await this.evaluateArmyComposition(u,t.enemyGroupCount,e);a.push(h),o++}catch(h){console.warn("⚠️ Failed to evaluate army composition:",h)}if(o%3===0&&await new Promise(h=>setTimeout(h,0)),o%10===0||o===s.length){const h=performance.now()-n,p=20+Math.floor(o/s.length*60),y=o>0?h/o*(s.length-o):void 0;this.reportProgress(t,{phase:"evaluating",progress:p,message:`Evaluating combinations... (${o}/${s.length})`,combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:h,estimatedRemainingMs:y})}if(o%25===0){const h=(performance.now()-n)/1e3;console.log(`📊 Progress: ${o}/${s.length} combinations (${h.toFixed(1)}s elapsed)`)}}this.reportProgress(t,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:performance.now()-n});const l=a.sort((m,c)=>{const u=c.averageDamagePerBattle-m.averageDamagePerBattle;return Math.abs(u)>.01?u:c.damageEfficiencyScore-m.damageEfficiencyScore}),d=performance.now()-n;return console.log(`✅ Optimization complete: ${l.length} valid results in ${d.toFixed(2)}ms`),this.reportProgress(t,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:s.length,totalCombinations:s.length,combinationsEvaluated:o,totalToEvaluate:s.length,elapsedMs:d}),{rankedResults:l,combinationsEvaluated:o,optimizationTimeMs:d,algorithmUsed:this.algorithm.name,wasTruncated:s.length>(t.maxCombinations||50)}}async evaluateArmyComposition(t,e,n){const i=this.battleSimulator.simulateBothScenarios(t,e),s=this.calculateSilverCost(t,n),a=this.calculateFoodConsumption(t,n),o=this.calculateRevivalCost(t,n),l=i.bestCase.totalDamageDealtToEnemies,r=i.worstCase.totalDamageDealtToEnemies,d=(l+r)/2,m=t.totalLeadershipCost+t.totalDominanceCost+s,c=m>0?d/m:0;return{armyComposition:t,battleAnalysis:i,totalSilverCost:s,totalFoodConsumption:a,totalRevivalCost:o,averageDamagePerBattle:d,damageEfficiencyScore:c}}calculateSilverCost(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const o=n.get(s);o&&(i+=o.revival_cost_silver*a)}return i}calculateFoodConsumption(t,e){const n=new Map(e.map(s=>[s.name,s]));let i=0;for(const[s,a]of Object.entries(t.units)){const o=n.get(s);o&&(i+=o.food_consumption*a)}return i}calculateRevivalCost(t,e){return this.calculateSilverCost(t,e)}validateOptimizationConstraints(t){if(t.enemyGroupCount<1||t.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(t.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(t.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!t.availableUnits||t.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(t.maxCombinations&&t.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class q{constructor(){f(this,"name","Systematic Combination Testing")}async generateCombinations(t,e){const n=performance.now(),i=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const s=e.filter(r=>t.availableUnits.includes(r.name));console.log(`📋 Available units for optimization: ${s.length}`);const a=t.maxCombinations||50,o=this.generateUnitCombinations(s.map(r=>r.name),a);console.log(`🔄 Testing ${o.length} different unit combinations (user requested: ${a})`);const l=[];for(let r=0;r<o.length;r++){const d=performance.now();if(d-n>i){console.warn(`⏱️ Generation timeout after ${(d-n)/1e3}s - stopping at ${r} combinations`);break}const m=o[r];try{const c=await this.testCombinationWithStackingAlgorithm(m,t,e);c&&l.push(c)}catch(c){console.warn(`⚠️ Failed to test combination [${m.join(", ")}]:`,c)}if(r%5===0&&await new Promise(c=>setTimeout(c,0)),r%20===0&&r>0){const c=(performance.now()-n)/1e3;console.log(`🔄 Generation progress: ${r}/${o.length} combinations tested (${c.toFixed(1)}s)`)}}return console.log(`✅ Generated ${l.length} valid army combinations for evaluation`),l}generateUnitCombinations(t,e){const n=Math.pow(2,t.length)-1;if(console.log(`📊 Total possible combinations: ${n}, user requested: ${e}`),n>e)return this.generateLimitedCombinations(t,e);const i=[];for(let s=1;s<=n;s++){const a=[];for(let o=0;o<t.length;o++)s&1<<o&&a.push(t[o]);i.push(a)}return i.sort((s,a)=>a.length-s.length),console.log(`🎯 Generated all ${i.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${e} combinations (all possible combinations fit within limit)`),i}generateLimitedCombinations(t,e){const n=[];n.push([...t]);for(let i=0;i<t.length&&n.length<e;i++){const s=t.filter((a,o)=>o!==i);n.push(s)}for(let i=0;i<t.length&&n.length<e;i++)for(let s=i+1;s<t.length&&n.length<e;s++){const a=t.filter((o,l)=>l!==i&&l!==s);a.length>0&&n.push(a)}for(let i=0;i<t.length&&n.length<e;i++)for(let s=i+1;s<t.length&&n.length<e;s++)for(let a=s+1;a<t.length&&n.length<e;a++){const o=t.filter((l,r)=>r!==i&&r!==s&&r!==a);o.length>0&&n.push(o)}if(n.length<e){const i=Math.floor(t.length/2);for(let a=0;a<10&&n.length<e;a++){const o=this.getRandomCombination(t,i);n.some(l=>l.length===o.length&&l.every(r=>o.includes(r)))||n.push(o)}const s=Math.max(1,Math.floor(t.length/4));for(let a=0;a<5&&n.length<e;a++){const o=this.getRandomCombination(t,s);n.some(l=>l.length===o.length&&l.every(r=>o.includes(r)))||n.push(o)}}return console.log(`🎯 Generated ${n.length} top-down combinations from ${t.length} units`),console.log(`   Strategy: Started with all ${t.length} units, then systematically removed units`),console.log(`   User requested: ${e} combinations (time-based limits still apply)`),n}getRandomCombination(t,e){return[...t].sort(()=>Math.random()-.5).slice(0,e)}async testCombinationWithStackingAlgorithm(t,e,n){try{const i=new I(n),s={leadershipBudget:e.leadershipBudget,dominanceBudget:e.dominanceBudget,mercenaryLimits:e.mercenaryLimits,availableUnits:t},a=await i.optimizeArmy(s);return a.compositions&&a.compositions.length>0?a.compositions[0]:null}catch(i){return console.warn(`Failed to test combination [${t.join(", ")}]:`,i),null}}}class z{constructor(){f(this,"container",null);f(this,"battleService");f(this,"currentArmy",null);f(this,"currentAnalysis",null);f(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.battleService=new O}mount(t,e){this.container=t,this.currentArmy=e,this.render(),this.attachEventListeners()}render(){this.container&&(this.container.innerHTML=`
      <section class="card battle-simulation-section" id="battle-simulation-section">
        <h2 class="section-title">⚔️ Battle Simulation
          <span class="help-icon" data-tooltip="battle-simulation-overview">ℹ️</span>
        </h2>
        <p class="section-description">
          Simulate battles against enemy forces to analyze best and worst case scenarios.
          Enter the number of enemy groups you expect to face.
        </p>

        <!-- Enemy Input -->
        <div class="enemy-input-container">
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const t=document.getElementById("run-simulation-btn"),e=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups");t&&t.addEventListener("click",()=>this.runSimulation()),e&&e.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),this.attachTooltipListeners()}validateInput(){const t=document.getElementById("enemy-groups"),e=document.getElementById("run-simulation-btn");if(!t||!e)return!1;const n=t.value.trim();let i=!0,s="";if(!n)i=!1,s="Please enter the number of enemy groups";else if(isNaN(Number(n))||!Number.isInteger(Number(n)))i=!1,s="Please enter a valid whole number";else{const a=parseInt(n);a<1?(i=!1,s="Number of enemy groups must be at least 1"):a>50&&(i=!1,s="Number of enemy groups cannot exceed 50 (performance limit)")}return e.disabled=!i||!this.validateArmyComposition(),i?(t.classList.remove("error"),this.hideInputError("enemy-groups")):(t.classList.add("error"),this.showInputError("enemy-groups",s)),i}validateArmyComposition(){if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const t of this.currentArmy.stackingOrder)if(!t.unitName||t.count<=0||t.unitStrength<=0||t.totalHealth<=0)return!1;return!0}showInputError(t,e){var s;const n=document.getElementById(t);if(!n)return;this.hideInputError(t);const i=document.createElement("div");i.className="input-error-message",i.id=`${t}-error`,i.textContent=e,(s=n.parentNode)==null||s.insertBefore(i,n.nextSibling)}hideInputError(t){const e=document.getElementById(`${t}-error`);e&&e.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(e=>{e.addEventListener("mouseenter",n=>this.showTooltip(n)),e.addEventListener("mouseleave",()=>this.hideTooltip()),e.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",e=>{const n=e.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(t){const e=t.target,n=e.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const i=document.getElementById("tooltip"),s=i==null?void 0:i.querySelector(".tooltip-content");!i||!s||(s.innerHTML=this.tooltipData[n],i.classList.remove("hidden"),this.positionTooltip(i,e))}hideTooltip(){const t=document.getElementById("tooltip");t&&t.classList.add("hidden")}toggleTooltip(t){const e=document.getElementById("tooltip");e!=null&&e.classList.contains("hidden")?this.showTooltip(t):this.hideTooltip()}positionTooltip(t,e){const n=e.getBoundingClientRect(),i=t;i.style.top="",i.style.left="",i.style.transform="";const s=t.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight;let l=n.bottom+10,r=n.left+n.width/2-s.width/2;r<10?r=10:r+s.width>a-10&&(r=a-s.width-10),l+s.height>o-10&&(l=n.top-s.height-10),i.style.top=`${l}px`,i.style.left=`${r}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const t=document.getElementById("enemy-groups"),e=parseInt(t.value);e>this.currentArmy.stackingOrder.length*10&&this.showError(`Warning: ${e} enemy groups vs ${this.currentArmy.stackingOrder.length} player groups may result in a very short battle.`),this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((a,o)=>{try{this.currentAnalysis=this.battleService.simulateBothScenarios(this.currentArmy,e),a()}catch(l){o(l)}}),i=new Promise((a,o)=>{setTimeout(()=>o(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,i]),!this.currentAnalysis||!this.currentAnalysis.bestCase||!this.currentAnalysis.worstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const s=document.getElementById("clear-simulation-btn");s&&(s.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let i="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?i="Simulation timed out. Try reducing the number of enemy groups or check your army composition.":n.message.includes("invalid")?i="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")&&(i="Army composition error. Please re-optimize your army and try again.")),this.showError(i)}}displayResults(){if(!this.currentAnalysis)return;const t=document.getElementById("simulation-results");if(!t)return;const{bestCase:e,worstCase:n,comparison:i}=this.currentAnalysis;t.innerHTML=`
      <div class="results-header">
        <h3>📊 Battle Analysis Results
          <span class="help-icon" data-tooltip="battle-results">ℹ️</span>
        </h3>
        <p class="results-summary">
          Simulation complete! Here's how your army performs against ${e.configuration.enemyGroupCount} enemy groups.
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
              <span class="stat-value">${e.totalDamageDealtToEnemies.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Battle Duration:</span>
              <span class="stat-value">${e.battleDuration} turns</span>
            </div>
            <div class="stat">
              <span class="stat-label">Player Attacks:</span>
              <span class="stat-value">${e.statistics.totalPlayerAttacks}</span>
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
            ${this.formatCombatLog(e.combatLog)}
          </div>
          <div id="worst-case-log" class="combat-log hidden">
            ${this.formatCombatLog(n.combatLog)}
          </div>
        </div>
      </div>
    `,this.attachLogTabListeners(),this.attachTooltipListeners()}formatCombatLog(t){return t.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${t.map(n=>`
        <div class="${!n.attacker.includes("Enemy Group")?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${n.turn}:</span>
          <span class="action-text">${n.attacker} ${n.action}</span>
        </div>
      `).join("")}</div>`}attachLogTabListeners(){const t=document.querySelectorAll(".log-tab");t.forEach(e=>{e.addEventListener("click",n=>{const i=n.target,s=i.dataset.scenario;t.forEach(l=>l.classList.remove("active")),i.classList.add("active"),document.querySelectorAll(".combat-log").forEach(l=>{l.classList.remove("active"),l.classList.add("hidden")});const o=document.getElementById(`${s}-case-log`);o&&(o.classList.add("active"),o.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const t=document.getElementById("clear-simulation-btn");t&&(t.style.display="none")}showLoading(t){const e=document.getElementById("simulation-loading");e&&e.classList.toggle("hidden",!t)}showResults(t){const e=document.getElementById("simulation-results");e&&e.classList.toggle("hidden",!t)}showError(t){this.hideError();const e=document.createElement("div");e.className="simulation-error",e.id="simulation-error",e.innerHTML=`
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
    `,document.head.appendChild(t)}displayPreCalculatedResults(t){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",t),!this.container){console.log("BattleSimulationComponent: no container");return}this.currentAnalysis=t;const e=this.container.querySelector("#simulation-results");if(!e){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",e),e.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const n=this.container.querySelector("#run-simulation-btn");n&&(n.textContent="🔄 Re-run Simulation",n.disabled=!1);const i=this.container.querySelector("#simulation-note");i&&(i.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,i.classList.remove("hidden"))}}const P={tabletSmall:768,tabletLarge:1024};class G{constructor(){f(this,"currentMode","desktop");f(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(t){this.listeners.push(t)}removeLayoutChangeListener(t){const e=this.listeners.indexOf(t);e>-1&&this.listeners.splice(e,1)}updateLayoutMode(){const t=this.getViewportWidth();let e;t<P.tabletSmall?e="mobile":t<P.tabletLarge?e="tablet":e="desktop",e!==this.currentMode&&(this.currentMode=e,this.notifyListeners())}setupResizeListener(){let t;window.addEventListener("resize",()=>{clearTimeout(t),t=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(t=>t(this.currentMode))}}class D{static addSwipeSupport(t,e,n,i=50){if(!("ontouchstart"in window))return;let s=0,a=0,o=0;t.addEventListener("touchstart",l=>{const r=l.touches[0];s=r.clientX,a=r.clientY,o=Date.now()},{passive:!0}),t.addEventListener("touchend",l=>{if(l.changedTouches.length===0)return;const r=l.changedTouches[0],d=r.clientX,m=r.clientY,c=Date.now(),u=d-s,h=m-a;c-o<500&&Math.abs(u)>i&&Math.abs(h)<Math.abs(u)*.5&&(u>0&&n?(l.preventDefault(),n()):u<0&&e&&(l.preventDefault(),e()))},{passive:!1})}static addTouchSupport(t,e){if(t.addEventListener("click",e),"ontouchstart"in window){let n;t.addEventListener("touchstart",i=>{n=Date.now(),t.classList.add("touch-active")}),t.addEventListener("touchend",i=>{t.classList.remove("touch-active"),Date.now()-n<200&&(i.preventDefault(),e())}),t.addEventListener("touchcancel",()=>{t.classList.remove("touch-active")})}}static optimizeScrolling(t){t.style.webkitOverflowScrolling="touch",t.style.scrollBehavior="smooth",t.classList.add("scroll-momentum")}static addHapticFeedback(t){t.addEventListener("touchstart",()=>{t.style.transform="scale(0.98)",t.style.transition="transform 0.1s ease"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t.addEventListener("touchcancel",()=>{t.style.transform="scale(1)"})}static addPullToRefresh(t,e,n=80){if(!("ontouchstart"in window))return;let i=0,s=0,a=!1,o=null;const l=()=>{o||(o=document.createElement("div"),o.className="pull-refresh-indicator",o.innerHTML=`
        <div class="refresh-spinner"></div>
        <span class="refresh-text">Pull to refresh</span>
      `,t.insertBefore(o,t.firstChild))};t.addEventListener("touchstart",r=>{t.scrollTop===0&&!a&&(i=r.touches[0].clientY,l())},{passive:!0}),t.addEventListener("touchmove",r=>{if(t.scrollTop===0&&!a&&o){s=r.touches[0].clientY;const d=Math.max(0,s-i);if(d>0){r.preventDefault();const m=Math.min(d/n,1);o.style.transform=`translateY(${d*.5}px)`,o.style.opacity=m.toString(),d>n?o.querySelector(".refresh-text").textContent="Release to refresh":o.querySelector(".refresh-text").textContent="Pull to refresh"}}},{passive:!1}),t.addEventListener("touchend",async()=>{if(o&&!a)if(s-i>n){a=!0,o.querySelector(".refresh-text").textContent="Refreshing...",o.querySelector(".refresh-spinner").classList.add("spinning");try{await e()}finally{a=!1,o&&(o.style.transform="translateY(-100%)",o.style.opacity="0",setTimeout(()=>{o&&o.parentNode&&(o.parentNode.removeChild(o),o=null)},300))}}else o.style.transform="translateY(-100%)",o.style.opacity="0",setTimeout(()=>{o&&o.parentNode&&(o.parentNode.removeChild(o),o=null)},300)})}}class k{static updateBodyClasses(t){const e=document.body;e.classList.remove("layout-mobile","layout-tablet","layout-desktop"),e.classList.add(`layout-${t.getCurrentMode()}`),t.isTouchDevice()&&e.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(e=>{e instanceof HTMLElement&&D.optimizeScrolling(e)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&D.addHapticFeedback(e)})}}const b=new G;b.addLayoutChangeListener(()=>{k.updateBodyClasses(b)});k.updateBodyClasses(b);class j{constructor(){f(this,"sections",[]);f(this,"currentActiveSection",null);f(this,"tabContainer",null);f(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var n;const t=document.querySelector(".main-content");if(!t)return;const e=document.createElement("div");e.className="mobile-tab-navigation mobile-only",e.innerHTML=`
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
      `,t.element.insertBefore(e,t.element.firstChild),e.addEventListener("click",()=>{this.toggleSectionCollapse(t.id)})})}setupInitialLayout(){const t=b.getCurrentMode();this.applyLayoutMode(t),this.updateTabVisibility()}applyLayoutMode(t){switch(t){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(t=>{t.element&&(t.id===this.currentActiveSection||this.currentActiveSection===null&&t.id==="config-section"?t.element.classList.remove("hidden"):t.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden"):t.element.classList.add("hidden"),t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden","collapsed"):t.element.classList.add("hidden"),t.isCollapsed=!1)})}switchToSection(t){this.currentActiveSection=t,b.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(t){const e=this.sections.find(i=>i.id===t);if(!e||!e.element)return;e.isCollapsed=!e.isCollapsed,e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed");const n=e.element.querySelector(".collapse-indicator");n&&(n.textContent=e.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("disabled"))return;const n=e.getAttribute("data-section");n&&this.switchToSection(n)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section");n===this.currentActiveSection||this.currentActiveSection===null&&n==="config-section"?e.classList.add("active"):e.classList.remove("active")})}setupLayoutListener(){b.addLayoutChangeListener(t=>{this.initialized&&this.applyLayoutMode(t)})}showSection(t){const e=this.sections.find(n=>n.id===t);e&&(!e.element&&(e.element=document.getElementById(t),!e.element)||(e.element.classList.remove("hidden"),e.isAvailable=!0,b.isMobile()&&this.switchToSection(t),this.updateTabVisibility()))}hideSection(t){const e=this.sections.find(n=>n.id===t);!e||!e.element||(e.element.classList.add("hidden"),e.isAvailable=!1,this.updateTabVisibility(),b.isMobile()&&this.currentActiveSection===t&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section"),i=this.sections.find(s=>s.id===n);i&&(i.isAvailable?(e.classList.remove("disabled"),e.disabled=!1):(e.classList.add("disabled"),e.disabled=!0))})}addSwipeSupport(){if(!b.isMobile())return;const t=document.querySelector(".main-content");t&&D.addSwipeSupport(t,()=>this.swipeToNextSection(),()=>this.swipeToPreviousSection())}swipeToNextSection(){const t=this.sections.filter(n=>n.isAvailable),e=t.findIndex(n=>n.id===this.currentActiveSection);if(e<t.length-1){const n=t[e+1];this.switchToSection(n.id)}}swipeToPreviousSection(){const t=this.sections.filter(n=>n.isAvailable),e=t.findIndex(n=>n.id===this.currentActiveSection);if(e>0){const n=t[e-1];this.switchToSection(n.id)}}}const A=new j;class x{static createFloatingActionButton(t){const e=document.createElement("button");return e.className=`floating-action-button fab-${t.position||"bottom-right"} fab-${t.color||"primary"}`,e.innerHTML=`
      <span class="fab-icon">${t.icon}</span>
      <span class="fab-label">${t.label}</span>
    `,e.addEventListener("click",t.onClick),e.addEventListener("touchstart",()=>{e.style.transform="scale(0.95)"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e}static showFloatingActionButton(t){if(!b.isMobile())return;this.hideFloatingActionButton(),this.fabContainer||(this.fabContainer=document.createElement("div"),this.fabContainer.className="fab-container",document.body.appendChild(this.fabContainer));const e=this.createFloatingActionButton(t);this.fabContainer.appendChild(e),setTimeout(()=>{e.classList.add("fab-visible")},10)}static hideFloatingActionButton(){this.fabContainer&&this.fabContainer.querySelectorAll(".floating-action-button").forEach(e=>{e.classList.remove("fab-visible"),setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)})}static showBottomSheet(t){return new Promise(e=>{if(!b.isMobile()){this.showDesktopModal(t),e();return}this.hideBottomSheet();const n=document.createElement("div");n.className="bottom-sheet-backdrop";const i=document.createElement("div");i.className="bottom-sheet";const s=document.createElement("div");s.className="bottom-sheet-header",s.innerHTML=`
        <div class="bottom-sheet-handle"></div>
        <h3 class="bottom-sheet-title">${t.title}</h3>
        ${t.dismissible!==!1?'<button class="bottom-sheet-close">×</button>':""}
      `;const a=document.createElement("div");a.className="bottom-sheet-content",typeof t.content=="string"?a.innerHTML=t.content:a.appendChild(t.content);const o=document.createElement("div");if(o.className="bottom-sheet-actions",t.actions&&t.actions.forEach(l=>{const r=document.createElement("button");r.className=`btn btn-${l.style||"secondary"}`,r.textContent=l.label,r.addEventListener("click",()=>{l.onClick(),this.hideBottomSheet(),e()}),o.appendChild(r)}),i.appendChild(s),i.appendChild(a),t.actions&&t.actions.length>0&&i.appendChild(o),this.bottomSheetContainer||(this.bottomSheetContainer=document.createElement("div"),this.bottomSheetContainer.className="bottom-sheet-container",document.body.appendChild(this.bottomSheetContainer)),this.bottomSheetContainer.appendChild(n),this.bottomSheetContainer.appendChild(i),t.dismissible!==!1){n.addEventListener("click",()=>{this.hideBottomSheet(),e()});const l=s.querySelector(".bottom-sheet-close");l&&l.addEventListener("click",()=>{this.hideBottomSheet(),e()})}setTimeout(()=>{n.classList.add("visible"),i.classList.add("visible")},10)})}static hideBottomSheet(){if(this.bottomSheetContainer){const t=this.bottomSheetContainer.querySelector(".bottom-sheet-backdrop"),e=this.bottomSheetContainer.querySelector(".bottom-sheet");t&&e&&(t.classList.remove("visible"),e.classList.remove("visible"),setTimeout(()=>{this.bottomSheetContainer&&(this.bottomSheetContainer.innerHTML="")},300))}}static showDesktopModal(t){const e=typeof t.content=="string"?t.content:t.title;alert(e)}static createMobileDropdown(t,e){b.isMobile()&&t.addEventListener("click",()=>{const n=document.createElement("div");n.className="mobile-dropdown-content",e.forEach(i=>{const s=document.createElement("button");s.className="mobile-dropdown-item",s.textContent=i.label,s.addEventListener("click",()=>{i.onClick(),this.hideBottomSheet()}),n.appendChild(s)}),this.showBottomSheet({title:"Select Option",content:n,dismissible:!0})})}static showMobileLoading(t="Loading..."){if(!b.isMobile())return;const e=document.createElement("div");e.className="mobile-loading-overlay",e.innerHTML=`
      <div class="mobile-loading-content">
        <div class="mobile-loading-spinner"></div>
        <p class="mobile-loading-text">${t}</p>
      </div>
    `,document.body.appendChild(e),setTimeout(()=>{e.classList.add("visible")},10)}static hideMobileLoading(){const t=document.querySelector(".mobile-loading-overlay");t&&(t.classList.remove("visible"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300))}}f(x,"fabContainer",null),f(x,"bottomSheetContainer",null);b.addLayoutChangeListener(v=>{v!=="mobile"&&(x.hideFloatingActionButton(),x.hideBottomSheet())});class T{static initialize(){b.isMobile()&&(this.setupLazyLoading(),this.optimizeScrolling(),this.monitorInteractions(),this.setupMemoryMonitoring())}static setupLazyLoading(){const t=document.querySelectorAll("[data-lazy]");if(t.length===0)return;const e=new IntersectionObserver(n=>{n.forEach(i=>{if(i.isIntersecting){const s=i.target;this.loadElement(s),e.unobserve(s)}})},{rootMargin:"50px",threshold:.1});t.forEach(n=>e.observe(n)),this.observers.set("lazy-loading",e)}static loadElement(t){const e=performance.now(),n=t.dataset.lazy;n&&(t.innerHTML=n,t.removeAttribute("data-lazy"));const i=performance.now();this.metrics.renderTime+=i-e}static optimizeScrolling(){document.querySelectorAll(".combat-log, .unit-family-content, .main-content").forEach(e=>{let n=!1,i;e.addEventListener("scroll",()=>{n||(n=!0,this.requestOptimizedFrame(()=>{this.optimizeScrollFrame(e),n=!1})),clearTimeout(i),i=window.setTimeout(()=>{this.onScrollEnd(e)},150)},{passive:!0})})}static optimizeScrollFrame(t){const e=performance.now();t.getBoundingClientRect();const n=t.children;for(let s=0;s<n.length;s++){const a=n[s],o=a.getBoundingClientRect(),l=o.bottom>-window.innerHeight*2&&o.top<window.innerHeight*3;!l&&!a.classList.contains("scroll-hidden")?(a.classList.add("scroll-hidden"),a.style.visibility="hidden"):l&&a.classList.contains("scroll-hidden")&&(a.classList.remove("scroll-hidden"),a.style.visibility="visible")}const i=performance.now();this.metrics.scrollPerformance+=i-e}static onScrollEnd(t){t.querySelectorAll(".scroll-hidden").forEach(n=>{n.classList.remove("scroll-hidden"),n.style.visibility="visible"})}static requestOptimizedFrame(t){this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(()=>{t(),this.rafId=null})}static monitorInteractions(){let t;document.addEventListener("touchstart",()=>{t=performance.now()},{passive:!0}),document.addEventListener("touchend",()=>{if(t){const e=performance.now()-t;this.metrics.interactionTime=Math.max(this.metrics.interactionTime,e)}},{passive:!0})}static setupMemoryMonitoring(){"memory"in performance&&setInterval(()=>{const t=performance.memory;this.metrics.memoryUsage=t.usedJSHeapSize/t.jsHeapSizeLimit,this.metrics.memoryUsage>.8&&(console.warn("High memory usage detected:",this.metrics.memoryUsage),this.optimizeMemory())},1e4)}static optimizeMemory(){this.observers.forEach((t,e)=>{e!=="lazy-loading"&&(t.disconnect(),this.observers.delete(e))}),"gc"in window&&window.gc()}static getMetrics(){return{...this.metrics}}static resetMetrics(){this.metrics={renderTime:0,interactionTime:0,scrollPerformance:0}}static addMobileCSSOptimizations(){if(!b.isMobile())return;const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t)}static cleanup(){this.observers.forEach(t=>t.disconnect()),this.observers.clear(),this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}}f(T,"metrics",{renderTime:0,interactionTime:0,scrollPerformance:0}),f(T,"observers",new Map),f(T,"rafId",null);b.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{T.initialize(),T.addMobileCSSOptimizations()});b.addLayoutChangeListener(v=>{v!=="mobile"?T.cleanup():(T.initialize(),T.addMobileCSSOptimizations())});class w{static initialize(){this.createScreenReaderAnnouncer(),this.setupFocusManagement(),this.enhanceTabNavigation(),this.addTouchAccessibility(),this.setupKeyboardNavigation()}static createScreenReaderAnnouncer(){this.announcer||(this.announcer=document.createElement("div"),this.announcer.setAttribute("aria-live","polite"),this.announcer.setAttribute("aria-atomic","true"),this.announcer.className="sr-only",this.announcer.style.cssText=`
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `,document.body.appendChild(this.announcer))}static announce(t,e="polite"){this.announcer||this.createScreenReaderAnnouncer(),this.announcer.setAttribute("aria-live",e),this.announcer.textContent=t,setTimeout(()=>{this.announcer&&(this.announcer.textContent="")},1e3)}static setupFocusManagement(){document.addEventListener("focusin",t=>{this.focusTracker=t.target}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&b.isMobile()&&this.restoreFocus()})}static restoreFocus(){if(this.focusTracker&&document.contains(this.focusTracker))this.focusTracker.focus();else{const t=document.querySelector(".main-content > :not(.hidden)");if(t){const e=t.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');e&&e.focus()}}}static enhanceTabNavigation(){const t=document.querySelector(".mobile-tab-navigation");if(!t)return;t.setAttribute("role","tablist"),t.setAttribute("aria-label","Main navigation");const e=t.querySelectorAll(".tab-nav-item");e.forEach((n,i)=>{n.setAttribute("role","tab"),n.setAttribute("aria-selected",i===0?"true":"false"),n.setAttribute("tabindex",i===0?"0":"-1");const s=n.getAttribute("data-section");s&&(n.setAttribute("aria-controls",s),n.id=`tab-${s}`),n.addEventListener("keydown",a=>{this.handleTabKeydown(a,e,i)}),n.addEventListener("click",()=>{var o;const a=((o=n.querySelector(".tab-label"))==null?void 0:o.textContent)||"Section";this.announce(`Switched to ${a} section`),this.updateTabAria(e,i)})})}static handleTabKeydown(t,e,n){let i=n;switch(t.key){case"ArrowLeft":t.preventDefault(),i=n>0?n-1:e.length-1;break;case"ArrowRight":t.preventDefault(),i=n<e.length-1?n+1:0;break;case"Home":t.preventDefault(),i=0;break;case"End":t.preventDefault(),i=e.length-1;break;case"Enter":case" ":t.preventDefault(),e[n].click();return}i!==n&&(this.updateTabAria(e,i),e[i].focus())}static updateTabAria(t,e){t.forEach((n,i)=>{n.setAttribute("aria-selected",i===e?"true":"false"),n.setAttribute("tabindex",i===e?"0":"-1")})}static addTouchAccessibility(){document.addEventListener("touchstart",e=>{const n=e.target;n.matches("button, .unit-card, .tab-nav-item")&&n.setAttribute("aria-pressed","true")},{passive:!0}),document.addEventListener("touchend",e=>{const n=e.target;n.matches("button, .unit-card, .tab-nav-item")&&n.removeAttribute("aria-pressed")},{passive:!0});let t=0;document.addEventListener("touchend",e=>{const n=new Date().getTime(),i=n-t;i<500&&i>0&&e.target.matches(".unit-card, .army-composition")&&this.announce("Double tap to activate","assertive"),t=n})}static setupKeyboardNavigation(){this.addSkipLinks(),document.addEventListener("keydown",t=>{if(t.key==="Escape"){const e=document.querySelector(".bottom-sheet.visible, .mobile-loading-overlay.visible");if(e){t.preventDefault(),this.announce("Modal closed");const n=e.querySelector(".bottom-sheet-close");n&&n.click()}}})}static addSkipLinks(){const t=document.createElement("div");t.className="skip-links",t.innerHTML=`
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#mobile-navigation" class="skip-link">Skip to navigation</a>
    `,document.body.insertBefore(t,document.body.firstChild);const e=document.querySelector(".main-content");e&&!e.id&&(e.id="main-content");const n=document.querySelector(".mobile-tab-navigation");n&&!n.id&&(n.id="mobile-navigation")}static enhanceFormAccessibility(){document.querySelectorAll("form").forEach(e=>{e.querySelectorAll("input, select, textarea").forEach(i=>{var a;if(!e.querySelector(`label[for="${i.id}"]`)&&i.id){const o=document.createElement("label");o.setAttribute("for",i.id),o.textContent=i.getAttribute("placeholder")||"Input field",o.className="sr-only",(a=i.parentNode)==null||a.insertBefore(o,i)}i.hasAttribute("required")&&(i.setAttribute("aria-required","true"),i.addEventListener("invalid",()=>{this.announce("Required field is empty","assertive")}))}),e.addEventListener("submit",()=>{this.announce("Form submitted")})})}static addDynamicLabels(){document.querySelectorAll(".unit-card").forEach(i=>{var a;const s=(a=i.querySelector(".unit-name"))==null?void 0:a.textContent;s&&!i.getAttribute("aria-label")&&(i.setAttribute("aria-label",`Unit: ${s}`),i.setAttribute("role","button"))}),document.querySelectorAll(".army-composition").forEach((i,s)=>{i.getAttribute("aria-label")||(i.setAttribute("aria-label",`Army composition ${s+1}`),i.setAttribute("role","article"))}),document.querySelectorAll(".combat-action").forEach((i,s)=>{var a;if(!i.getAttribute("aria-label")){const o=((a=i.textContent)==null?void 0:a.substring(0,50))||"Combat action";i.setAttribute("aria-label",`Combat action ${s+1}: ${o}`)}})}static cleanup(){this.announcer&&this.announcer.parentNode&&(this.announcer.parentNode.removeChild(this.announcer),this.announcer=null);const t=document.querySelector(".skip-links");t&&t.parentNode&&t.parentNode.removeChild(t)}}f(w,"focusTracker",null),f(w,"announcer",null);b.isMobile()&&document.addEventListener("DOMContentLoaded",()=>{w.initialize()});b.addLayoutChangeListener(v=>{v!=="mobile"?w.cleanup():w.initialize()});class Q{constructor(){f(this,"container",null);f(this,"unitLoader");f(this,"optimizer",null);f(this,"damageOptimizer",null);f(this,"selectedUnits",new Set);f(this,"mercenaryLimits",{});f(this,"battleSimulation",null);f(this,"currentOptimizedArmy",null);f(this,"currentMode","stacking");f(this,"optimizationAbortController",null);f(this,"optimizationStartTime",0);f(this,"progressUpdateInterval",null);this.unitLoader=new R}async mount(t){this.container=t,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),A.initialize(),this.initializeAdvancedMobileFeatures()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(t)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(t){console.error("Failed to load unit data:",t)}}attachEventListeners(){const t=document.getElementById("stacking-mode-btn"),e=document.getElementById("damage-mode-btn"),n=document.getElementById("unit-search"),i=document.getElementById("unit-type-filter"),s=document.getElementById("optimize-btn"),a=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),r=document.getElementById("leadership-budget"),d=document.getElementById("dominance-budget");t&&t.addEventListener("click",()=>this.switchMode("stacking")),e&&e.addEventListener("click",()=>this.switchMode("damage")),n&&n.addEventListener("input",()=>this.filterAndDisplayUnits()),i&&i.addEventListener("change",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("click",()=>this.optimizeArmy()),a&&a.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),r&&r.addEventListener("input",()=>this.updateOptimizeButton()),d&&d.addEventListener("input",()=>this.updateOptimizeButton()),document.addEventListener("click",m=>{const c=m.target;c.classList.contains("filter-tab")&&this.handleFilterTabClick(c)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const t=document.getElementById("unit-type-filter");if(!t)return;const e=this.unitLoader.getUniqueUnitTypes();t.innerHTML='<option value="">All Unit Types</option>',e.forEach(n=>{const i=document.createElement("option");i.value=n,i.textContent=n,t.appendChild(i)})}updateFilterTabCounts(){const t=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const i=n.getAttribute("data-filter");let s=0;i==="all"?s=t.length:s=t.filter(a=>this.getMainCategory(a)===i).length,n.textContent=`${i==="all"?"All":i} (${s})`})}handleFilterTabClick(t){document.querySelectorAll(".filter-tab").forEach(e=>e.classList.remove("active")),t.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var s,a,o;const t=((s=document.getElementById("unit-search"))==null?void 0:s.value)||"",e=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",n=((o=document.getElementById("unit-type-filter"))==null?void 0:o.value)||"";let i=this.unitLoader.getAllUnits();if(e!=="all"&&(i=i.filter(l=>this.getMainCategory(l)===e)),n&&(i=i.filter(l=>l.unit_types.includes(n))),t){const l=t.toLowerCase();i=i.filter(r=>r.name.toLowerCase().includes(l)||r.unit_types.some(d=>d.toLowerCase().includes(l)))}this.renderGroupedUnits(i),this.updateSelectedSummary()}renderGroupedUnits(t){const e=document.getElementById("unit-groups");if(!e)return;if(e.innerHTML="",t.length===0){e.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(t);Object.entries(n).forEach(([i,s])=>{const a=this.createMainCategoryElement(i,s);e.appendChild(a)}),this.attachAllEventListeners(n)}createHierarchicalGroups(t){const e={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return t.forEach(n=>{const i=this.getMainCategory(n),s=this.getSubCategory(n),a=this.getUnitFamily(n);e[i][s]||(e[i][s]={}),e[i][s][a]||(e[i][s][a]=[]),e[i][s][a].push(n)}),Object.values(e).forEach(n=>{Object.values(n).forEach(i=>{Object.values(i).forEach(s=>{s.sort((a,o)=>a.strength-o.strength)})})}),e}getMainCategory(t){if(t.cost_type==="Mercenary"||t.authority_cost>0)return"Mercenaries";const e=t.unit_types;return e.includes("Engineer corps")||e.includes("Siege engine")?"Engineer Corps":e.includes("Guardsman")?"Guardsmen":e.includes("Specialist")?"Specialists":e.includes("Beast")||e.includes("Dragon")||e.includes("Giant")||e.includes("Elemental")||e.includes("ELEMENTAL")||e.includes("Flying")&&!e.includes("Human")?"Monsters":e.includes("Human")&&(e.includes("Melee")||e.includes("Ranged")||e.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(t){const e=t.unit_types,n=t.name.toUpperCase(),i=this.getMainCategory(t);if(i==="Mercenaries")return e.includes("Guardsman")?"Elite Forces":"Special Forces";if(i==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(e.includes("Siege engine"))return"Siege Engines"}if(i==="Monsters"){if(e.includes("Dragon"))return"Dragons";if(e.includes("Giant"))return"Giants";if(e.includes("Beast"))return"Beasts";if(e.includes("Elemental")||e.includes("ELEMENTAL"))return"Elementals";if(e.includes("Flying"))return"Flying"}if(i==="Guardsmen"||i==="Specialists"){if(e.includes("Ranged"))return"Ranged";if(e.includes("Melee"))return"Melee";if(e.includes("Mounted"))return"Mounted";if(e.includes("Flying")||e.includes("Beast"))return"Flying";if(e.includes("Scout"))return"Scouts"}return e.includes("Human")?"Infantry":"Other"}getUnitFamily(t){let e=t.name;return e=e.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),e.includes("HEAVY "),e}createMainCategoryElement(t,e){const n=document.createElement("div");n.className="main-category";const i=this.countUnitsInCategory(e),s=this.countSelectedUnitsInCategory(e);return n.innerHTML=`
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
        ${Object.entries(e).map(([a,o])=>this.createSubCategoryHTML(t,a,o)).join("")}
      </div>
    `,n}createSubCategoryHTML(t,e,n){const i=Object.values(n).reduce((a,o)=>a+o.length,0),s=Object.values(n).reduce((a,o)=>a+o.filter(l=>this.selectedUnits.has(l.name)).length,0);return`
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
          ${Object.entries(n).map(([a,o])=>this.createUnitFamilyHTML(a,o)).join("")}
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
    `}attachAllEventListeners(t){document.querySelectorAll(".main-category").forEach((e,n)=>{const s=Object.keys(t)[n];if(s){const a=t[s];this.attachMainCategoryListeners(e,s,a)}}),document.querySelectorAll(".sub-category").forEach(e=>{var s;const n=e.getAttribute("data-category"),i=e.getAttribute("data-subcategory");if(n&&i&&((s=t[n])!=null&&s[i])){const a=t[n][i];this.attachSubCategoryListeners(e,a)}}),document.querySelectorAll(".unit-family").forEach(e=>{const n=e.getAttribute("data-family");let i=[];Object.values(t).forEach(s=>{Object.values(s).forEach(a=>{a[n]&&(i=a[n])})}),i.length>0&&this.attachUnitFamilyListeners(e,i)})}countUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((i,s)=>i+s.length,0),0)}countSelectedUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((i,s)=>i+s.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(t,e,n){const i=t.querySelector(".main-category-header"),s=t.querySelector(".main-category-content"),a=t.querySelector(".expand-icon");if(!i||!s||!a){console.warn("Missing main-category elements for",e,{header:!!i,content:!!s,expandIcon:!!a});return}i.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Main category header clicked:",e,"collapsed:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲"});const o=t.querySelector(".select-category"),l=t.querySelector(".deselect-category");o&&o.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInCategory(n)}),l&&l.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(t,e){const n=t.querySelector(".sub-category-header"),i=t.querySelector(".sub-category-content"),s=t.querySelector(".expand-icon");if(!n||!i||!s){console.warn("Missing sub-category elements:",{header:!!n,content:!!i,expandIcon:!!s});return}n.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Sub-category header clicked, toggling:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲"});const a=t.querySelector(".select-subcategory"),o=t.querySelector(".deselect-subcategory");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInFamilies(e)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInFamilies(e)})}attachUnitFamilyListeners(t,e){const n=t.querySelector(".unit-family-header"),i=t.querySelector(".unit-family-content"),s=t.querySelector(".expand-icon");n.addEventListener("click",r=>{r.target.classList.contains("btn")||(i.classList.toggle("collapsed"),s.textContent=i.classList.contains("collapsed")?"▼":"▲")});const a=t.querySelector(".select-family"),o=t.querySelector(".deselect-family");a&&a.addEventListener("click",r=>{r.stopPropagation(),this.selectAllUnits(e)}),o&&o.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllUnits(e)}),t.querySelectorAll(".unit-card").forEach(r=>{r.addEventListener("click",()=>{const d=r.getAttribute("data-unit");if(d){const m=this.unitLoader.getUnitByName(d);m&&this.toggleUnitSelection(m)}})})}getUnitCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}toggleUnitSelection(t){this.selectedUnits.has(t.name)?(this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]):(this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton(),b.isMobile()&&this.addFloatingActionButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(t=>{const e=t.getAttribute("data-unit");e&&(this.selectedUnits.has(e)?t.classList.add("selected"):t.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((t,e)=>{const n=t.querySelector(".category-title h3");if(n){const s=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][e];if(s){const{selected:a,total:o}=this.countUnitsInMainCategory(s),r=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${r} (${a}/${o})`}}}),document.querySelectorAll(".sub-category").forEach(t=>{const e=t.querySelector(".subcategory-title h4"),n=t.getAttribute("data-category"),i=t.getAttribute("data-subcategory");if(e&&n&&i){const{selected:s,total:a}=this.countUnitsInSubCategory(n,i),l=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${l} (${s}/${a})`}}),document.querySelectorAll(".unit-family").forEach(t=>{const e=t.querySelector(".family-title h5"),n=t.getAttribute("data-family");if(e&&n){const{selected:i,total:s}=this.countUnitsInFamily(n),o=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${o} (${i}/${s})`}})}countUnitsInMainCategory(t){const n=this.unitLoader.getAllUnits().filter(s=>this.getMainCategory(s)===t);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}countUnitsInSubCategory(t,e){const i=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===t&&this.getSubCategory(a)===e);return{selected:i.filter(a=>this.selectedUnits.has(a.name)).length,total:i.length}}countUnitsInFamily(t){const n=this.unitLoader.getAllUnits().filter(s=>this.getUnitFamily(s)===t);return{selected:n.filter(s=>this.selectedUnits.has(s.name)).length,total:n.length}}updateSelectedSummary(){const t=document.getElementById("selected-count");t&&(t.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(e=>{const n=e.getAttribute("data-unit");if(n){const i=this.unitLoader.getUnitByName(n);i&&(this.selectedUnits.add(i.name),(i.cost_type==="Mercenary"||i.cost_type==="Authority")&&(this.mercenaryLimits[i.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(t){Object.values(t).forEach(e=>{this.selectAllInFamilies(e)})}deselectAllInCategory(t){Object.values(t).forEach(e=>{this.deselectAllInFamilies(e)})}selectAllInFamilies(t){Object.values(t).forEach(e=>{this.selectAllUnits(e)})}deselectAllInFamilies(t){Object.values(t).forEach(e=>{this.deselectAllUnits(e)})}selectAllUnits(t){t.forEach(e=>{this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(t){t.forEach(e=>{this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const t=document.getElementById("mercenary-limits");if(!t)return;const e=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&(n.cost_type==="Mercenary"||n.cost_type==="Authority"));if(e.length===0){t.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}t.innerHTML="",e.forEach(n=>{if(!n)return;const i=document.createElement("div");i.className="mercenary-item";const s=n.cost_type==="Authority"?"⚔️":"🗡️",a=n.cost_type==="Authority"?`AUTH: ${n.authority_cost}`:`AUTH: ${n.authority_cost}`;i.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${s} ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health}, ${a})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,i.querySelector("input").addEventListener("change",l=>{const r=l.target;this.mercenaryLimits[r.dataset.unit]=parseInt(r.value)||1}),t.appendChild(i)})}updateOptimizeButton(){const t=document.getElementById("optimize-btn"),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!t||!e||!n)return;const i=this.selectedUnits.size>0,s=parseInt(e.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;t.disabled=!i||!s}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(t){console.error("Optimization failed:",t),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new I(t);const e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},s=await this.optimizer.optimizeArmy(i);this.displayStackingResults(s)}async optimizeForDamage(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),i=document.getElementById("enemy-count"),s=document.getElementById("max-combinations"),a={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(i.value)||5,maxCombinations:parseInt(s.value)||50};await this.runDamageOptimizationWithProgress(a,t)}async runDamageOptimizationWithProgress(t,e){this.optimizationAbortController=new AbortController,b.isMobile()?x.showMobileLoading("Optimizing army composition..."):this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new F);const n={...t,signal:this.optimizationAbortController.signal,onProgress:s=>{this.updateProgressModal(s.progress,s.message,{combinationsEvaluated:s.combinationsEvaluated,totalToEvaluate:s.totalToEvaluate,phase:s.phase,estimatedRemainingMs:s.estimatedRemainingMs})}},i=await this.damageOptimizer.optimizeForDamage(n,e);await this.delay(500),b.isMobile()?x.hideMobileLoading():this.hideProgressModal(),this.displayDamageResults(i)}catch(n){b.isMobile()?x.hideMobileLoading():this.hideProgressModal(),n instanceof Error&&n.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",n),alert(`Optimization failed: ${n instanceof Error?n.message:"Unknown error"}`))}}delay(t){return new Promise(e=>setTimeout(e,t))}displayStackingResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");!e||!n||!i||(s&&s.classList.remove("hidden"),a&&a.classList.add("hidden"),e.innerHTML=`
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
    `,n.innerHTML="",t.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.compositions.forEach((o,l)=>{const r=this.createCompositionElement(o,l+1);n.appendChild(r)}),i.classList.remove("hidden"),A.showSection("results-section"),t.compositions.length>0&&(this.currentOptimizedArmy=t.compositions[0]))}displayDamageResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("damage-army-list"),i=document.getElementById("results-section"),s=document.getElementById("stacking-results"),a=document.getElementById("damage-results");if(!e||!n||!i)return;s&&s.classList.add("hidden"),a&&a.classList.remove("hidden");const o=document.getElementById("battle-simulation-container");o&&(o.classList.add("hidden"),A.hideSection("battle-simulation-container")),e.innerHTML=`
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
    `,n.innerHTML="",t.rankedResults.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.rankedResults.slice(0,10).forEach((l,r)=>{const d=this.createDamageArmyElement(l,r+1);n.appendChild(d)}),i.classList.remove("hidden"),A.showSection("results-section"),b.isMobile()||setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(t){const e=document.getElementById("battle-simulation-container");!e||!this.currentOptimizedArmy||(e.classList.remove("hidden"),A.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new z,this.battleSimulation.mount(e,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(t),b.isMobile()||e.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const t=document.getElementById("battle-simulation-container");t&&(t.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new z),this.battleSimulation.mount(t,this.currentOptimizedArmy),A.showSection("battle-simulation-container"),b.isMobile()||setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(t,e){var r;const n=document.createElement("div");n.className="army-composition";const i=((r=this.optimizer)==null?void 0:r.explainStacking(t))||"No stacking explanation available",s=`
      <div class="composition-header">
        <div class="composition-title">Solution ${e} ${t.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${t.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=i.split(`
`).map(d=>d.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${d}</h3>`:d.includes("═".repeat(60))?'<hr class="title-divider">':d.includes("📊 ARMY SUMMARY")||d.includes("🗡️ MERCENARY FORCES")||d.includes("👑 LEADERSHIP FORCES")||d.includes("⚡ DOMINANCE FORCES")||d.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${d}</h4>`:d.includes("─".repeat(30))||d.includes("─".repeat(40))?'<hr class="section-divider">':d.includes("└─")?`<div class="unit-detail">${d}</div>`:d.trim()&&!d.includes("═")&&!d.includes("─")?`<div class="unit-line">${d}</div>`:d.trim()===""?'<div class="spacing"></div>':"").filter(d=>d!=="").join(""),o=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${e-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;n.innerHTML=s+'<div class="composition-content">'+a+"</div>"+o;const l=n.querySelector(".simulate-btn");return l&&l.addEventListener("click",()=>{this.currentOptimizedArmy=t,this.showBattleSimulation()}),n}createDamageArmyElement(t,e){const n=document.createElement("div");n.className="damage-army-card",n.setAttribute("data-army-index",(e-1).toString());const i=t.armyComposition.totalDominanceCost===0?"Leadership":t.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",s=i==="Leadership"?"🛡️":i==="Dominance"?"👹":"⚔️";return n.addEventListener("click",()=>this.selectDamageArmy(t,e-1)),n.innerHTML=`
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
            ${Object.entries(t.armyComposition.units).map(([a,o])=>`<div class="unit-item">
                <span class="unit-count">${o.toLocaleString()}x</span>
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
            <span class="stat-value">${t.battleAnalysis.worstCase.totalDamageDealtToEnemies.toLocaleString()} - ${t.battleAnalysis.bestCase.totalDamageDealtToEnemies.toLocaleString()} damage</span>
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
    `,n}selectDamageArmy(t,e){document.querySelectorAll(".damage-army-card").forEach((i,s)=>{i.classList.toggle("selected",s===e)}),this.showSelectedArmyDetails(t),this.currentOptimizedArmy=t.armyComposition,this.showBattleSimulationWithResults(t.battleAnalysis)}showSelectedArmyDetails(t){const e=document.getElementById("selected-army-details"),n=document.getElementById("selected-army-composition");if(!e||!n)return;const i=t.armyComposition,s=this.unitLoader.getAvailableUnits(Object.keys(i.units)),o=new I(s).explainStacking(i);n.innerHTML=`
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
            <strong>Army Size:</strong> ${Object.values(i.units).reduce((l,r)=>l+r,0).toLocaleString()} units
          </span>
        </div>
      </div>

      <div class="composition-explanation">
        ${o.split(`
`).map(l=>l.trim()===""?'<div class="spacing"></div>':l.includes("Total")||l.includes("Budget")?`<div class="summary-line"><strong>${l}</strong></div>`:l.includes("→")?`<div class="unit-line">${l}</div>`:l.includes("✓")||l.includes("Valid")?`<div class="validation-line success">${l}</div>`:`<div class="explanation-line">${l}</div>`).join("")}
      </div>

      <div class="battle-performance-summary">
        <h5>Battle Performance Analysis</h5>
        <div class="performance-grid">
          <div class="performance-item">
            <span class="performance-label">Best Case:</span>
            <span class="performance-value">${t.battleAnalysis.bestCase.totalDamageDealtToEnemies.toLocaleString()} damage in ${t.battleAnalysis.bestCase.battleDuration} turns</span>
          </div>
          <div class="performance-item">
            <span class="performance-label">Worst Case:</span>
            <span class="performance-value">${t.battleAnalysis.worstCase.totalDamageDealtToEnemies.toLocaleString()} damage in ${t.battleAnalysis.worstCase.battleDuration} turns</span>
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
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const t=document.getElementById("leadership-budget"),e=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),i=document.getElementById("battle-simulation-container");t&&(t.value="0"),e&&(e.value="0"),n&&(n.classList.add("hidden"),A.hideSection("results-section")),i&&(i.classList.add("hidden"),A.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(t){this.currentMode=t;const e=document.getElementById("stacking-mode-btn"),n=document.getElementById("damage-mode-btn");e&&n&&(e.classList.toggle("active",t==="stacking"),n.classList.toggle("active",t==="damage"));const i=document.getElementById("stacking-description"),s=document.getElementById("damage-description");i&&s&&(i.classList.toggle("hidden",t!=="stacking"),s.classList.toggle("hidden",t!=="damage"));const a=document.getElementById("damage-controls");a&&a.classList.toggle("hidden",t!=="damage");const o=document.getElementById("optimize-btn-text");o&&(t==="stacking"?o.textContent="🚀 Optimize Army":o.textContent="⚔️ Optimize for Damage");const l=document.getElementById("results-title");l&&(t==="stacking"?l.textContent="🎯 Stacking Results":l.textContent="⚔️ Damage Optimization Results");const r=document.getElementById("results-section");r&&(r.classList.add("hidden"),A.hideSection("results-section"));const d=document.getElementById("battle-simulation-container");d&&(d.classList.add("hidden"),A.hideSection("battle-simulation-container"))}showLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.remove("hidden")}hideLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.add("hidden")}showProgressModal(){let t=document.getElementById("progress-modal");if(!t){t=document.createElement("div"),t.id="progress-modal",t.className="modal",t.innerHTML=`
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
      `,document.body.appendChild(t);const e=document.getElementById("cancel-optimization-btn");e&&e.addEventListener("click",()=>{this.cancelOptimization()})}t.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(t,e,n){const i=document.getElementById("progress-fill"),s=document.getElementById("progress-text"),a=document.getElementById("progress-percentage"),o=document.getElementById("progress-combinations"),l=document.getElementById("progress-phase"),r=document.getElementById("progress-remaining");if(i&&(i.style.width=`${t}%`),s&&(s.textContent=e),a&&(a.textContent=`${Math.round(t)}%`),o&&n){const d=n.combinationsEvaluated||0,m=n.totalToEvaluate||0;o.textContent=`${d.toLocaleString()} / ${m.toLocaleString()} combinations`}if(l&&(n!=null&&n.phase)&&(l.textContent=n.phase.charAt(0).toUpperCase()+n.phase.slice(1)),r&&(n!=null&&n.estimatedRemainingMs)){const d=Math.ceil(n.estimatedRemainingMs/1e3),m=Math.floor(d/60),c=d%60;r.textContent=`(~${m}:${c.toString().padStart(2,"0")} remaining)`}else r&&(r.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const t=performance.now()-this.optimizationStartTime,e=Math.floor(t/1e3),n=Math.floor(e/60),i=e%60,s=document.getElementById("progress-elapsed");s&&(s.textContent=`${n.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const t=document.getElementById("progress-modal");t&&t.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){k.optimizeCombatLogs(),k.optimizeUnitCards(),this.addTouchSupportToUnitCards(),b.addLayoutChangeListener(t=>{this.handleLayoutModeChange(t)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&D.addHapticFeedback(e)})}handleLayoutModeChange(t){setTimeout(()=>{k.optimizeCombatLogs(),k.optimizeUnitCards(),this.addTouchSupportToUnitCards(),t==="mobile"&&this.initializeAdvancedMobileFeatures()},100)}initializeAdvancedMobileFeatures(){b.isMobile()&&(T.initialize(),w.initialize(),this.addPullToRefresh(),this.addFloatingActionButton(),w.enhanceFormAccessibility(),setTimeout(()=>{w.addDynamicLabels()},500))}addPullToRefresh(){const t=document.querySelector(".main-content");t&&D.addPullToRefresh(t,async()=>{w.announce("Refreshing data..."),await new Promise(e=>setTimeout(e,1e3)),k.optimizeCombatLogs(),k.optimizeUnitCards(),w.addDynamicLabels(),w.announce("Data refreshed")})}addFloatingActionButton(){this.selectedUnits.length>0?x.showFloatingActionButton({icon:"⚡",label:"Quick Optimize",onClick:()=>{w.announce("Starting quick optimization"),this.optimizeArmy()},position:"bottom-right",color:"primary"}):x.hideFloatingActionButton()}}document.addEventListener("DOMContentLoaded",()=>{const v=document.getElementById("app");if(!v)throw new Error("App container not found");new Q().mount(v),window.addEventListener("error",e=>{console.error("Global error:",e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-C4llr0Pm.js.map
