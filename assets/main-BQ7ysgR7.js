var A=Object.defineProperty;var k=(S,e,t)=>e in S?A(S,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):S[e]=t;var b=(S,e,t)=>k(S,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();class v{static isMercenary(e){return e.cost_type==="Mercenary"||e.authority_cost>0}static getPrimaryCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}static getStrengthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.strength/t:0}static getHealthPerCost(e){const t=v.getPrimaryCost(e);return t>0?e.health/t:0}}class w{constructor(){b(this,"units",[]);b(this,"unitsByName",new Map);b(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Unit data must be an array");return this.units=t.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(t){throw console.error("❌ Error loading units:",t),t}}validateAndNormalizeUnit(e){const t={name:e.name||"Unknown",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],cost_type:e.cost_type||"Leadership",health:Number(e.health)||0,strength:Number(e.strength)||0,leadership_cost:Number(e.leadership_cost)||0,dominance_cost:Number(e.dominance_cost)||0,authority_cost:Number(e.authority_cost)||0,food_consumption:Number(e.food_consumption)||0,carrying_capacity:Number(e.carrying_capacity)||0,revival_cost_gold:Number(e.revival_cost_gold)||0,revival_cost_silver:Number(e.revival_cost_silver)||0,source_file:e.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)||(console.warn(`Invalid cost type for unit ${t.name}: ${t.cost_type}`),t.cost_type="Leadership"),t}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(e=>[e.name,e])),this.units.forEach(e=>{v.isMercenary(e)?this.unitsByCostType.Mercenary.push(e):e.cost_type in this.unitsByCostType&&this.unitsByCostType[e.cost_type].push(e)}),Object.keys(this.unitsByCostType).forEach(e=>{this.unitsByCostType[e].sort((t,n)=>t.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(e){return this.unitsByName.get(e)}getUnitsByCostType(e){return[...this.unitsByCostType[e]]}getAvailableUnits(e){const t=[];for(const n of e){const s=this.getUnitByName(n);s?t.push(s):console.warn(`Unit '${n}' not found in loaded data`)}return t}filterUnits(e){let t=this.units;return e.costType&&(t=t.filter(n=>n.cost_type===e.costType)),e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(s=>n.unit_types.includes(s)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxCost!==void 0&&(t=t.filter(n=>v.getPrimaryCost(n)<=e.maxCost)),t}searchUnits(e){if(!e.trim())return this.getAllUnits();const t=e.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedUnits(){return this.units.map(e=>({...e,get isMercenary(){return v.isMercenary(e)},get primaryCost(){return v.getPrimaryCost(e)},get strengthPerCost(){return v.getStrengthPerCost(e)},get healthPerCost(){return v.getHealthPerCost(e)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...e),max:Math.max(...e)},healthRange:{min:Math.min(...t),max:Math.max(...t)}}}getUniqueUnitTypes(){const e=new Set;return this.units.forEach(t=>{t.unit_types.forEach(n=>e.add(n))}),Array.from(e).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,s)=>n+s,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,s)=>n+s,0)/t.length)},topUnitsByStrength:[...this.units].sort((n,s)=>s.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,s)=>s.health-n.health).slice(0,10)}}}class T{constructor(e){b(this,"availableUnits");b(this,"unitsByName");b(this,"leadershipUnits");b(this,"dominanceUnits");b(this,"mercenaryUnits");this.availableUnits=[...e],this.unitsByName=new Map(e.map(t=>[t.name,t])),this.leadershipUnits=e.filter(t=>t.cost_type==="Leadership").sort((t,n)=>t.strength-n.strength),this.dominanceUnits=e.filter(t=>t.cost_type==="Dominance").sort((t,n)=>t.strength-n.strength),this.mercenaryUnits=e.filter(t=>v.isMercenary(t)).sort((t,n)=>t.strength-n.strength)}async optimizeArmy(e){const t=performance.now();console.log(`🔍 Optimizing army with L:${e.leadershipBudget} D:${e.dominanceBudget} M:${Object.keys(e.mercenaryLimits).length}`),console.log(`📋 Selected units: ${e.availableUnits.join(", ")}`);const n=[],s=this.generateGuaranteedValidCompositions(e);console.log(`Generated ${s.length} guaranteed valid army combinations`);let i=0;for(const c of s){i++;const m=this.evaluateComposition(c);n.push(m)}const a=performance.now();console.log(`Evaluated ${i} combinations, found ${n.length} valid stackings`);const o=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&c.cost_type==="Leadership"),r=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&c.cost_type==="Dominance"),l=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&v.isMercenary(c)),u=n.filter(c=>{const m=o.some(g=>c.units[g.name]&&c.units[g.name]>0),h=r.some(g=>c.units[g.name]&&c.units[g.name]>0),p=l.some(g=>c.units[g.name]&&c.units[g.name]>0);return[o.length>0?m:!0,r.length>0?h:!0,l.length>0?p:!0].every(g=>g)});return u.sort((c,m)=>{const h=c.totalLeadershipCost/e.leadershipBudget+c.totalDominanceCost/e.dominanceBudget;return m.totalLeadershipCost/e.leadershipBudget+m.totalDominanceCost/e.dominanceBudget-h}),{compositions:u.length>0?[u[0]]:n.slice(0,1),totalCombinationsEvaluated:i,validStackingsFound:n.length,executionTimeMs:a-t}}generateGuaranteedValidCompositions(e){const t=[],n=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,o)=>o.strength-a.strength),s=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,o)=>o.strength-a.strength),i=this.availableUnits.filter(a=>e.availableUnits.includes(a.name)&&v.isMercenary(a));if(console.log(`Selected units: L:${n.length} D:${s.length} M:${i.length}`),console.log("Leadership units:",n.map(a=>a.name)),console.log("Dominance units:",s.map(a=>a.name)),console.log("Mercenary units:",i.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${s.length} M:${i.length}`),console.log(`Budgets: Leadership:${e.leadershipBudget} Dominance:${e.dominanceBudget}`),n.length>0&&s.length>0&&i.length>0&&e.leadershipBudget>0&&e.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...n,...i];t.push(...this.generateCombinedStackedCompositions(a,s,e.leadershipBudget,e.dominanceBudget,e.mercenaryLimits))}else if(n.length>0&&i.length>0&&s.length===0&&e.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...n,...i],o=this.calculateProperStackingQuantities(a,e.leadershipBudget,e.mercenaryLimits);t.push(o)}else if(s.length>0&&i.length>0&&n.length===0&&e.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(s,e.dominanceBudget),o={};for(const l of i)o[l.name]=e.mercenaryLimits[l.name]||1;const r={...a,...o};t.push(r)}else if(n.length>0&&s.length>0&&i.length===0&&e.leadershipBudget>0&&e.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),t.push(...this.generateCombinedStackedCompositions(n,s,e.leadershipBudget,e.dominanceBudget,{}));else if(n.length>0&&s.length===0&&i.length===0&&e.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(n,e.leadershipBudget,{});t.push(a)}else if(s.length>0&&n.length===0&&i.length===0&&e.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(s,e.dominanceBudget);t.push(a)}else if(i.length>0&&n.length===0&&s.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const o of i){const r=e.mercenaryLimits[o.name]||1;a[o.name]=r}Object.keys(a).length>0&&t.push(a)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&i.length>0&&e.leadershipBudget>0&&t.push(...this.generateMercenaryMixedCompositions(n,i,e.leadershipBudget,e.mercenaryLimits,"leadership_cost")),s.length>0&&i.length>0&&e.dominanceBudget>0&&t.push(...this.generateMercenaryMixedCompositions(s,i,e.dominanceBudget,e.mercenaryLimits,"dominance_cost")),t}generateStackedCompositionsWithMercenaries(e,t,n,s){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const i=[...e,...t];console.log(`🚨 About to call calculateProperStackingQuantities with ${i.length} units`);const a=this.calculateProperStackingQuantities(i,n,s);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(e,t){const n={};if(e.length===0)return n;const s=e[0];n[s.name]=1,console.log(`🎯 Starting with 1x ${s.name} (STR: ${s.strength})`);for(let i=1;i<e.length;i++){const a=e[i],o=e[i-1],r=o.health*(n[o.name]||1),l=Math.ceil((r+1)/a.health);n[a.name]=l,console.log(`📋 ${a.name}: need ${l} units (${l*a.health} HP) to exceed ${o.name} (${r} HP)`)}return n}calculateProperStackingQuantities(e,t,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${t}`);const s={},i=[...e].sort((c,m)=>m.strength-c.strength),a=i.filter(c=>c.cost_type==="Leadership"),o=i.filter(c=>v.isMercenary(c));if(i.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),s;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${i.length} units (${a.length} leadership + ${o.length} mercenary)`);const r=i[0],l={};l[r.name]=1;const u=r.health*1;console.log(`🔧 Base: 1x ${r.name} = ${u} HP (strongest)`);for(let c=1;c<i.length;c++){const m=i[c],h=Math.ceil((u+1)/m.health);l[m.name]=h;const p=v.isMercenary(m)?"mercenary":"leadership";console.log(`🔧 Base: ${h}x ${m.name} = ${h*m.health} HP (beats ${u}) [${p}]`)}console.log("🔧 Validating base pattern stacking order...");for(let c=0;c<i.length-1;c++){const m=i[c],h=i[c+1],p=m.health*l[m.name];let y=h.health*l[h.name];if(y<=p)if(v.isMercenary(h))console.log(`🔧 WARNING: ${h.name} mercenary limit (${l[h.name]}) gives ${y} HP, can't beat ${p} HP`);else{const g=Math.ceil((p+1)/h.health);l[h.name]=g,y=h.health*g,console.log(`🔧 Fixed: ${h.name} increased to ${g} units = ${y} HP (now beats ${p})`)}else console.log(`🔧 OK: ${h.name} ${l[h.name]} units = ${y} HP (beats ${p})`)}let d=0;for(const[c,m]of Object.entries(l)){const h=this.unitsByName.get(c);h&&h.cost_type==="Leadership"&&(d+=m*h.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${d}`),d===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[c,m]of Object.entries(l))s[c]=m}else{const c=Math.floor(t/d);console.log(`🔧 Can afford ${c} base stacks (${t} / ${d})`);for(const[m,h]of Object.entries(l)){const p=this.unitsByName.get(m);if(p&&v.isMercenary(p)){const y=h*c,g=n[m]||1;s[m]=Math.min(y,g),y>g?console.log(`🔧 Mercenary ${m}: wanted ${y}, capped at limit ${g}`):console.log(`🔧 Mercenary ${m}: scaled to ${y} (under limit ${g})`)}else s[m]=h*c}}return console.log("🔧 SIMPLE STACKING: Final composition:",s),s}calculateProperStackingQuantitiesForDominance(e,t){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${t}`);const n={},s=[...e].sort((u,d)=>d.strength-u.strength);if(s.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${s.length} dominance units`);const i=s[0],a={};a[i.name]=1;const o=i.health*1;console.log(`🔧 Base: 1x ${i.name} = ${o} HP (strongest)`);for(let u=1;u<s.length;u++){const d=s[u],c=Math.ceil((o+1)/d.health);a[d.name]=c,console.log(`🔧 Base: ${c}x ${d.name} = ${c*d.health} HP (beats ${o})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let u=0;u<s.length-1;u++){const d=s[u],c=s[u+1],m=d.health*a[d.name];let h=c.health*a[c.name];if(h<=m){const p=Math.ceil((m+1)/c.health);a[c.name]=p,h=c.health*p,console.log(`🔧 Fixed: ${c.name} increased to ${p} units = ${h} HP (now beats ${m})`)}else console.log(`🔧 OK: ${c.name} ${a[c.name]} units = ${h} HP (beats ${m})`)}let r=0;for(const[u,d]of Object.entries(a)){const c=this.unitsByName.get(u);c&&c.cost_type==="Dominance"&&(r+=d*c.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${r}`),r===0)return console.log("🔧 No dominance costs found"),n;const l=Math.floor(t/r);console.log(`🔧 Can afford ${l} base stacks (${t} / ${r})`);for(const[u,d]of Object.entries(a))n[u]=d*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(e){return Object.entries(e).reduce((t,[n,s])=>{const i=this.unitsByName.get(n);return i&&i.cost_type==="Leadership"?t+s*i.leadership_cost:t},0)}calculateMaxStacksByMercenaries(e,t){let n=1/0;for(const[s,i]of Object.entries(e)){const a=this.unitsByName.get(s);if(a&&v.isMercenary(a)){const o=t[s]||1,r=Math.floor(o/i);n=Math.min(n,r),console.log(`🗡️ ${s}: limit ${o}, base need ${i}, allows ${r} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(e,t,n,s){const i=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...e,...t].sort((c,m)=>m.strength-c.strength);if(a.length===0)return i;const o=this.calculateCleanStackingPattern(a,s);console.log("📊 Dominance + Mercenary base pattern:",o);const r=Object.entries(o).reduce((c,[m,h])=>{const p=this.unitsByName.get(m);return p&&p.cost_type==="Dominance"?c+h*p.dominance_cost:c},0);if(console.log(`💰 Dominance cost per stack: ${r}`),r>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const c={};for(const m of t)c[m.name]=s[m.name]||1;return i.push(c),e.length>0&&i.push(...this.generateStackedCompositions(e,n,"dominance_cost")),i}const l=Math.floor(n/r),u=this.calculateMaxStacksByMercenaries(o,s),d=Math.min(l,u);console.log(`🔢 Max Dominance+Mercenary stacks: ${d}`);for(let c=1;c<=Math.min(d,5);c++){const m={};for(const[h,p]of Object.entries(o)){const y=this.unitsByName.get(h);y&&v.isMercenary(y)?m[h]=Math.min(p*c,s[h]||1):m[h]=p*c}i.push(m)}if(u<l&&e.length>0){const c=n-d*r,m=this.generateStackedCompositions(e,c,"dominance_cost"),h={};for(const p of t)h[p.name]=s[p.name]||1;for(const p of m.slice(0,3)){const y={...h,...p};i.push(y)}}return i}generateStackedCompositions(e,t,n){const s=[];if(e.length===0||t<=0)return s;const i=e[0];console.log(`🎯 Strongest unit: ${i.name} (STR: ${i.strength})`);const a=this.calculateStackingPattern(e);console.log("📊 Base stacking pattern:",a);const o=Object.entries(a).reduce((l,[u,d])=>{const c=this.unitsByName.get(u);if(c){const m=c[n];return l+d*m}return l},0);if(console.log(`💰 Base pattern cost: ${o}`),o<=0)return s;const r=Math.floor(t/o);console.log(`🔢 Max multiplier: ${r}`);for(let l=1;l<=Math.min(r,10);l++){const u={};for(const[d,c]of Object.entries(a))u[d]=c*l;s.push(u)}return e.length>1&&s.push(...this.generateStackingVariations(e,t,n)),s}calculateStackingPattern(e){const t={};if(e.length===0)return t;const n=e[0];t[n.name]=1;for(let s=1;s<e.length;s++){const i=e[s],a=e[s-1],o=a.health*(t[a.name]||1),r=Math.ceil((o+1)/i.health);t[i.name]=r,console.log(`📋 ${i.name}: need ${r} units (${r*i.health} HP) to exceed ${a.name} (${o} HP)`)}return t}generateCombinedStackedCompositions(e,t,n,s,i={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const o=e.filter(x=>x.cost_type==="Leadership"),r=e.filter(x=>v.isMercenary(x));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...o,...r],d=[this.calculateProperStackingQuantities(l,n,i)];if(d.length===0)return a;const c=d[d.length-1];if(!c)return a;console.log("🎯 Using maximum Leadership composition for combination");const m=c,h=t[0];console.log(`🎯 Strongest Dominance unit: ${h.name} (STR: ${h.strength})`);const p=this.findClosestStrengthUnit(h,e);if(!p)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${p.name} (STR: ${p.strength})`);const y=m[p.name]||0,g=p.health*y;if(console.log(`📊 Comparison unit total health: ${g} (${y}x ${p.health})`),g<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const f=h.health;f>=g&&(console.log(`⚠️ Single Dominance unit too strong: ${f} HP >= ${g} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const E=[this.calculateProperStackingQuantitiesForDominance(t,s)];if(E.length>0){const x=E[E.length-1],$={...m,...x};a.push($),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(m);return a}findClosestStrengthUnit(e,t){if(t.length===0)return null;let n=t[0],s=Math.abs(e.strength-n.strength);for(const i of t){const a=Math.abs(e.strength-i.strength);a<s&&(s=a,n=i)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${e.name} (STR: ${e.strength}), diff: ${s}`),n}calculateConstrainedDominanceStack(e,t,n){const s={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),e.length===0||t<=0||n<=0)return s;const i=e[0],a=Math.floor((n-1)/i.health),o=Math.floor(t/i.dominance_cost),r=Math.min(a,o);if(r<=0)return console.log(`❌ Cannot fit any ${i.name} within constraints`),s;for(let l=Math.min(r,3);l>=1;l--){const u={};u[i.name]=l;let d=l*i.dominance_cost,c=l*i.health;console.log(`🧪 Testing ${l}x ${i.name} (${c} HP, ${d} cost)`);for(let h=1;h<e.length&&d<t;h++){const p=e[h],y=t-d,g=Math.ceil((c+1)/p.health),f=Math.floor(y/p.dominance_cost),C=Math.min(g,f);C>0&&(u[p.name]=C,d+=C*p.dominance_cost,console.log(`  ➕ Added ${C}x ${p.name} (${C*p.health} HP)`))}const m=Object.entries(u).reduce((h,[p,y])=>{const g=this.unitsByName.get(p);return g?h+y*g.health:h},0);if(m<n)return console.log(`✅ Valid Dominance stack: ${m} HP < ${n} HP limit`),u;console.log(`❌ Dominance stack too strong: ${m} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),s}generateMercenaryMixedCompositions(e,t,n,s,i){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const o=this.generateStackedCompositions(e,n,i);if(o.length===0)return a;for(const r of o.slice(0,3)){const l=t.sort((g,f)=>f.strength-g.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const u=this.findClosestStrengthUnit(l,e);if(!u){console.log("❌ No suitable base unit found for comparison");continue}const d=r[u.name]||0,c=u.health*d;if(console.log(`📊 Comparison base unit total health: ${c}`),c<=0){console.log("❌ Comparison unit not in base composition");continue}const m=l.health,h=s[l.name]||1,p=m*h;if(p>=c){console.log(`⚠️ Mercenary too strong: ${p} HP >= ${c} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const g=Math.floor((c-1)/m);if(g>0){console.log(`✅ Using ${g}x ${l.name} instead of ${h}`);const f={...r};f[l.name]=g;for(const C of t)if(C.name!==l.name){const E=s[C.name]||1;f[C.name]=E}a.push(f),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(r);continue}const y={...r};for(const g of t){const f=s[g.name]||1;y[g.name]=f}a.push(y),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(e,t,n){const s={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const i=[...e].sort((r,l)=>r.health-l.health);let a=0,o=0;for(const r of i){const l=Math.floor((n-o-1)/r.health),u=Math.floor((t-a)/r.dominance_cost),d=Math.min(l,u);d>0&&(s[r.name]=d,a+=d*r.dominance_cost,o+=d*r.health,console.log(`➕ Added ${d}x ${r.name} (${d*r.health} HP, ${d*r.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${o} HP total, ${a} cost`),s}calculateMaximizedDominanceStack(e,t,n){console.log(`💰 Maximizing Dominance budget: ${t} with health limit: ${n}`);const s=this.createAlternativeDominanceStack(e,t,n);return Object.keys(s).length>0?s:this.calculateConstrainedDominanceStack(e,t,n)}generateStackingVariations(e,t,n){const s=[],i={},a=e[0],o=a[n];if(o>0){const r=Math.floor(t/o);i[a.name]=Math.min(r,5);let l=t-i[a.name]*o;for(let u=1;u<e.length&&l>0;u++){const d=e[u],c=d[n];if(c>0&&c<=l){const m=Math.floor(l/c/(e.length-u));m>0&&(i[d.name]=m,l-=m*c)}}s.push(i)}return s}generateGuaranteedDiverseCompositions_OLD(e){const t=[],n=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),s=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),i=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&v.isMercenary(l)),a={};let o=0,r=0;for(const l of n)o+l.leadership_cost<=e.leadershipBudget&&(a[l.name]=1,o+=l.leadership_cost);for(const l of s)r+l.dominance_cost<=e.dominanceBudget&&(a[l.name]=1,r+=l.dominance_cost);for(const l of i){const u=e.mercenaryLimits[l.name]||1;a[l.name]=Math.min(1,u)}if(Object.keys(a).length>0&&t.push(a),n.length>0&&e.leadershipBudget>0){const l=n.sort((d,c)=>d.leadership_cost-c.leadership_cost)[0],u=Math.floor(e.leadershipBudget/l.leadership_cost);if(u>0){const d={};d[l.name]=Math.min(u,20);const c=e.leadershipBudget-d[l.name]*l.leadership_cost;for(const m of n.slice(1,3)){const h=Math.floor(c/m.leadership_cost/2);h>0&&(d[m.name]=h)}t.push(d)}}if(n.length>0||s.length>0){const l={};if(n.length>0&&e.leadershipBudget>0){const u=Math.floor(e.leadershipBudget/n.length);for(const d of n){const c=Math.floor(u/d.leadership_cost);c>0&&(l[d.name]=c)}}if(s.length>0&&e.dominanceBudget>0){const u=Math.floor(e.dominanceBudget/s.length);for(const d of s){const c=Math.floor(u/d.dominance_cost);c>0&&(l[d.name]=c)}}for(const u of i){const d=e.mercenaryLimits[u.name]||1;l[u.name]=Math.max(1,Math.floor(d/2))}Object.keys(l).length>0&&t.push(l)}return t}generateMercenaryCombinations(e){if(Object.keys(e).length===0)return[{}];let t=[{}];for(const[n,s]of Object.entries(e)){if(!this.unitsByName.has(n))continue;const i=[];for(const a of t)for(let o=0;o<=s;o++){const r={...a};o>0&&(r[n]=o),i.push(r)}t=i}return t}evaluateComposition(e){let t=0,n=0,s=0,i=0,a=0;const o=[];for(const[y,g]of Object.entries(e)){const f=this.unitsByName.get(y);if(!f)continue;const C=f.health*g,E=f.strength*g;t+=E,n+=C,s+=f.leadership_cost*g,i+=f.dominance_cost*g,v.isMercenary(f)&&(a+=g),o.push({unit:f,count:g,totalHealth:C,unitStrength:f.strength})}o.sort((y,g)=>y.unitStrength-g.unitStrength);let r=!0;const l=[];for(let y=0;y<o.length;y++){const{unit:g,count:f,totalHealth:C}=o[y];l.push({unitName:g.name,count:f,totalHealth:C,unitStrength:g.strength});for(let E=y+1;E<o.length;E++){const x=o[E].unit,$=o[E].totalHealth;if(g.strength===x.strength){const B=Math.max(C,$)*.1;if(Math.abs(C-$)<=B)continue}C<=$&&console.log(`❌ Stacking violation: ${g.name} (STR:${g.strength}, ${C} HP) <= ${x.name} (STR:${x.strength}, ${$} HP)`)}}const u=s+i+a;let d=u>0?t/u:0;d*=1.2;const m=1+(Object.keys(e).length-1)*.05;d*=m;let h=0;s>0&&h++,i>0&&h++,a>0&&h++;const p=1+(h-1)*.1;return d*=p,{units:e,totalStrength:t,totalHealth:n,totalLeadershipCost:s,totalDominanceCost:i,totalMercenaryCount:a,stackingOrder:l,isValidStacking:r,efficiencyScore:d}}explainStacking(e){const t=[],n=[],s=[],i=[];return e.stackingOrder.forEach(a=>{const o=this.unitsByName.get(a.unitName);if(!o)return;const r={name:a.unitName,count:a.count,totalHealth:a.totalHealth,strength:o.strength};v.isMercenary(o)?i.push(r):o.cost_type==="Leadership"?n.push(r):o.cost_type==="Dominance"&&s.push(r)}),t.push("🏆 OPTIMIZED ARMY COMPOSITION"),t.push("═".repeat(60)),t.push(""),t.push("📊 ARMY SUMMARY"),t.push("─".repeat(30)),t.push(`Total Units: ${Object.values(e.units).reduce((a,o)=>a+o,0).toLocaleString()}`),t.push(`Total Strength: ${e.totalStrength.toLocaleString()}`),t.push(`Total Health: ${e.totalHealth.toLocaleString()}`),t.push(`Budget Usage: L:${e.totalLeadershipCost} D:${e.totalDominanceCost} M:${e.totalMercenaryCount}`),t.push(""),i.length>0&&(t.push("🗡️ MERCENARY FORCES"),t.push("─".repeat(30)),i.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),n.length>0&&(t.push("👑 LEADERSHIP FORCES"),t.push("─".repeat(30)),n.sort((a,o)=>o.strength-a.strength),n.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),s.length>0&&(t.push("⚡ DOMINANCE FORCES"),t.push("─".repeat(30)),s.sort((a,o)=>o.strength-a.strength),s.forEach(a=>{t.push(`${a.count.toLocaleString()}x ${a.name}`),t.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),t.push("")),t.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),t.push("─".repeat(40)),e.stackingOrder.forEach((a,o)=>{const r=this.unitsByName.get(a.unitName);if(!r)return;const l=v.isMercenary(r)?"🗡️":r.cost_type==="Leadership"?"👑":r.cost_type==="Dominance"?"⚡":"❓";t.push(`${o+1}. ${l} ${a.count.toLocaleString()}x ${a.unitName} (${a.totalHealth.toLocaleString()} HP)`)}),t.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class L{static formatGroupForLog(e){return`${e.count} ${e.unitName}`}static formatEnemyGroupForLog(e){return`Enemy Group ${e+1}`}static calculateDamageDealt(e){return e.count*e.unitStrength}static createPlayerAttackAction(e,t,n){const s=L.calculateDamageDealt(t);return{turn:e,attacker:L.formatGroupForLog(t),target:L.formatEnemyGroupForLog(n),action:`attack and deal ${s.toLocaleString()} damage`,damageDealt:s,eliminated:!1}}static createEnemyAttackAction(e,t,n){return{turn:e,attacker:L.formatEnemyGroupForLog(t),target:L.formatGroupForLog(n),action:`attack and kill ${L.formatGroupForLog(n)}`,eliminated:!0}}static formatCombatLogForDisplay(e){return e.map(t=>t.eliminated?`${t.attacker} ${t.action}`:`${t.attacker} ${t.action}`)}static calculateBattleStatistics(e,t){const n=e.filter(o=>!o.eliminated),s=e.filter(o=>o.eliminated),i={},a={};return n.forEach(o=>{const r=o.attacker.split(" ").slice(1).join(" "),l=o.damageDealt||0;i[r]=(i[r]||0)+l,a[r]=(a[r]||0)+1}),{totalPlayerAttacks:n.length,totalEnemyAttacks:s.length,averageDamagePerAttack:n.length>0?t/n.length:0,damageByUnitType:i,attacksByUnitType:a,eliminationRate:s.length>0?s.length/e.length:0}}static getBattleSummary(e){const t=e.statistics||L.calculateBattleStatistics(e.combatLog,e.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${e.battleDuration} battle phases
- Player unit turns taken: ${t.totalPlayerAttacks}
- Enemy unit turns taken: ${t.totalEnemyAttacks}
- Total damage dealt to enemies: ${e.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(t.averageDamagePerAttack).toLocaleString()}
- Scenario: ${e.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const M={MAX_BATTLE_TURNS:1e3};class U{constructor(){b(this,"attackOrderCache",new Map);b(this,"targetOrderCache",new Map)}validateBattleConfiguration(e){if(!e)throw new Error("Battle configuration is required");if(!e.playerArmy)throw new Error("Player army is required");if(!e.playerArmy.stackingOrder||e.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(e.enemyGroupCount<1)throw new Error("Enemy group count must be at least 1");if(e.enemyGroupCount>100)throw new Error("Enemy group count cannot exceed 100 (performance limit)");for(const t of e.playerArmy.stackingOrder){if(!t.unitName||t.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(t.count<=0)throw new Error(`Unit group "${t.unitName}" must have a positive count`);if(t.unitStrength<=0)throw new Error(`Unit group "${t.unitName}" must have positive strength`);if(t.totalHealth<=0)throw new Error(`Unit group "${t.unitName}" must have positive health`)}}simulateBattle(e){this.validateBattleConfiguration(e);const t={currentTurn:0,playerGroups:[...e.playerArmy.stackingOrder],enemyGroupCount:e.enemyGroupCount,totalDamageDealt:0,battleEnded:!1,combatLog:[]};let n=0;const s=5;for(;!this.shouldBattleEnd(t)&&t.currentTurn<M.MAX_BATTLE_TURNS;){const a=t.combatLog.length;t.currentTurn++;try{this.processTurn(t,e.playerGoesFirst)}catch(o){throw new Error(`Battle processing failed on turn ${t.currentTurn}: ${o instanceof Error?o.message:"Unknown error"}`)}if(t.combatLog.length===a){if(n++,n>=s)throw new Error(`Battle stalled: No actions taken for ${s} consecutive turns`)}else n=0;if(t.currentTurn>1&&t.playerGroups.length===0&&!t.battleEnded){t.battleEnded=!0;break}}if(t.currentTurn>=M.MAX_BATTLE_TURNS)throw new Error(`Battle exceeded maximum duration of ${M.MAX_BATTLE_TURNS} turns`);const i=L.calculateBattleStatistics(t.combatLog,t.totalDamageDealt);return{outcome:"player_eliminated",combatLog:t.combatLog,totalDamageDealtToEnemies:t.totalDamageDealt,battleDuration:t.currentTurn,playerSurvivalTurns:t.currentTurn,scenario:e.playerGoesFirst?"best_case":"worst_case",configuration:e,statistics:i}}simulateBothScenarios(e,t){if(!e)throw new Error("Player army is required");if(t<1||t>100)throw new Error("Enemy group count must be between 1 and 100");const n={playerArmy:e,enemyGroupCount:t,playerGoesFirst:!0},s=this.simulateBattle(n),i={playerArmy:e,enemyGroupCount:t,playerGoesFirst:!1},a=this.simulateBattle(i),o={damageDifference:s.totalDamageDealtToEnemies-a.totalDamageDealtToEnemies,survivalDifference:s.playerSurvivalTurns-a.playerSurvivalTurns,averageDamage:(s.totalDamageDealtToEnemies+a.totalDamageDealtToEnemies)/2,averageSurvival:(s.playerSurvivalTurns+a.playerSurvivalTurns)/2};return{bestCase:s,worstCase:a,comparison:o}}calculateAttackOrder(e){const t=e.map(s=>`${s.unitName}:${s.count}:${s.unitStrength}`).join("|");if(this.attackOrderCache.has(t))return this.attackOrderCache.get(t);const n=[...e].sort((s,i)=>i.unitStrength-s.unitStrength);return this.attackOrderCache.set(t,n),n}calculateEnemyTargetOrder(e){const t=e.map(s=>`${s.unitName}:${s.count}:${s.totalHealth}`).join("|");if(this.targetOrderCache.has(t))return this.targetOrderCache.get(t);const n=[...e].sort((s,i)=>i.totalHealth-s.totalHealth);return this.targetOrderCache.set(t,n),n}shouldBattleEnd(e){return e.playerGroups.length===0||e.battleEnded}processTurn(e,t){let n=0,s=0;const i=e.playerGroups.length,a=e.enemyGroupCount,o=Math.max(i,a);for(let r=0;r<o*2&&!(this.shouldBattleEnd(e)||((t?r%2===0:r%2===1)?n<e.playerGroups.length&&(this.processSinglePlayerAttack(e,n),n++):s<e.enemyGroupCount&&e.playerGroups.length>0&&(this.processSingleEnemyAttack(e,s),s++),n>=i&&s>=a));r++);}processSinglePlayerAttack(e,t){if(e.playerGroups.length===0)return;const n=this.calculateAttackOrder(e.playerGroups);if(t>=n.length)return;const s=n[t],i=t%e.enemyGroupCount,a=L.calculateDamageDealt(s),o=L.createPlayerAttackAction(e.currentTurn,s,i);e.combatLog.push(o),e.totalDamageDealt+=a}processSingleEnemyAttack(e,t){if(e.playerGroups.length===0)return;const n=this.calculateEnemyTargetOrder(e.playerGroups);if(n.length===0)return;const s=n[0],i=L.createEnemyAttackAction(e.currentTurn,t,s);e.combatLog.push(i);const a=e.playerGroups.findIndex(o=>o.unitName===s.unitName&&o.count===s.count&&o.totalHealth===s.totalHealth);a!==-1&&e.playerGroups.splice(a,1),e.playerGroups.length===0&&(e.battleEnded=!0)}}class D{constructor(){b(this,"container",null);b(this,"battleService");b(this,"currentArmy",null);b(this,"currentAnalysis",null);b(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.battleService=new U}mount(e,t){this.container=e,this.currentArmy=t,this.render(),this.attachEventListeners()}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const e=document.getElementById("run-simulation-btn"),t=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups");e&&e.addEventListener("click",()=>this.runSimulation()),t&&t.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),this.attachTooltipListeners()}validateInput(){const e=document.getElementById("enemy-groups"),t=document.getElementById("run-simulation-btn");if(!e||!t)return!1;const n=e.value.trim();let s=!0,i="";if(!n)s=!1,i="Please enter the number of enemy groups";else if(isNaN(Number(n))||!Number.isInteger(Number(n)))s=!1,i="Please enter a valid whole number";else{const a=parseInt(n);a<1?(s=!1,i="Number of enemy groups must be at least 1"):a>50&&(s=!1,i="Number of enemy groups cannot exceed 50 (performance limit)")}return t.disabled=!s||!this.validateArmyComposition(),s?(e.classList.remove("error"),this.hideInputError("enemy-groups")):(e.classList.add("error"),this.showInputError("enemy-groups",i)),s}validateArmyComposition(){if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const e of this.currentArmy.stackingOrder)if(!e.unitName||e.count<=0||e.unitStrength<=0||e.totalHealth<=0)return!1;return!0}showInputError(e,t){var i;const n=document.getElementById(e);if(!n)return;this.hideInputError(e);const s=document.createElement("div");s.className="input-error-message",s.id=`${e}-error`,s.textContent=t,(i=n.parentNode)==null||i.insertBefore(s,n.nextSibling)}hideInputError(e){const t=document.getElementById(`${e}-error`);t&&t.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(t=>{t.addEventListener("mouseenter",n=>this.showTooltip(n)),t.addEventListener("mouseleave",()=>this.hideTooltip()),t.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",t=>{const n=t.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(e){const t=e.target,n=t.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const s=document.getElementById("tooltip"),i=s==null?void 0:s.querySelector(".tooltip-content");!s||!i||(i.innerHTML=this.tooltipData[n],s.classList.remove("hidden"),this.positionTooltip(s,t))}hideTooltip(){const e=document.getElementById("tooltip");e&&e.classList.add("hidden")}toggleTooltip(e){const t=document.getElementById("tooltip");t!=null&&t.classList.contains("hidden")?this.showTooltip(e):this.hideTooltip()}positionTooltip(e,t){const n=t.getBoundingClientRect(),s=e;s.style.top="",s.style.left="",s.style.transform="";const i=e.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight;let r=n.bottom+10,l=n.left+n.width/2-i.width/2;l<10?l=10:l+i.width>a-10&&(l=a-i.width-10),r+i.height>o-10&&(r=n.top-i.height-10),s.style.top=`${r}px`,s.style.left=`${l}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const e=document.getElementById("enemy-groups"),t=parseInt(e.value);t>this.currentArmy.stackingOrder.length*10&&this.showError(`Warning: ${t} enemy groups vs ${this.currentArmy.stackingOrder.length} player groups may result in a very short battle.`),this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((a,o)=>{try{this.currentAnalysis=this.battleService.simulateBothScenarios(this.currentArmy,t),a()}catch(r){o(r)}}),s=new Promise((a,o)=>{setTimeout(()=>o(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,s]),!this.currentAnalysis||!this.currentAnalysis.bestCase||!this.currentAnalysis.worstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const i=document.getElementById("clear-simulation-btn");i&&(i.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let s="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?s="Simulation timed out. Try reducing the number of enemy groups or check your army composition.":n.message.includes("invalid")?s="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")&&(s="Army composition error. Please re-optimize your army and try again.")),this.showError(s)}}displayResults(){if(!this.currentAnalysis)return;const e=document.getElementById("simulation-results");if(!e)return;const{bestCase:t,worstCase:n,comparison:s}=this.currentAnalysis;e.innerHTML=`
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
            <span class="stat-value ${s.damageDifference>=0?"positive":"negative"}">
              ${s.damageDifference>=0?"+":""}${s.damageDifference.toLocaleString()}
            </span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Average Damage:</span>
            <span class="stat-value">${Math.round(s.averageDamage).toLocaleString()}</span>
          </div>
          <div class="comparison-stat">
            <span class="stat-label">Survival Difference:</span>
            <span class="stat-value ${s.survivalDifference>=0?"positive":"negative"}">
              ${s.survivalDifference>=0?"+":""}${s.survivalDifference} turns
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
      `).join("")}</div>`}attachLogTabListeners(){const e=document.querySelectorAll(".log-tab");e.forEach(t=>{t.addEventListener("click",n=>{const s=n.target,i=s.dataset.scenario;e.forEach(r=>r.classList.remove("active")),s.classList.add("active"),document.querySelectorAll(".combat-log").forEach(r=>{r.classList.remove("active"),r.classList.add("hidden")});const o=document.getElementById(`${i}-case-log`);o&&(o.classList.add("active"),o.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const e=document.getElementById("clear-simulation-btn");e&&(e.style.display="none")}showLoading(e){const t=document.getElementById("simulation-loading");t&&t.classList.toggle("hidden",!e)}showResults(e){const t=document.getElementById("simulation-results");t&&t.classList.toggle("hidden",!e)}showError(e){this.hideError();const t=document.createElement("div");t.className="simulation-error",t.id="simulation-error",t.innerHTML=`
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
    `,document.head.appendChild(e)}}class I{constructor(){b(this,"container",null);b(this,"unitLoader");b(this,"optimizer",null);b(this,"selectedUnits",new Set);b(this,"mercenaryLimits",{});b(this,"battleSimulation",null);b(this,"currentOptimizedArmy",null);this.unitLoader=new w}async mount(e){this.container=e,this.render(),this.attachEventListeners(),await this.loadInitialData()}render(){this.container&&(this.container.innerHTML=`
      <div class="army-calculator">
        <header class="header">
          <h1>🏰 TotalBattle Army Stacking Calculator</h1>
          <p class="subtitle">Optimize your army composition using reverse health stacking strategy</p>
        </header>

        <main class="main-content">
          <!-- Army Configuration Section -->
          <section class="card main-config-section" id="config-section">
            <h1 class="main-title">⚔️ Army Configuration</h1>

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
              <button id="optimize-btn" class="btn btn-success large-btn" disabled>🚀 Optimize Army</button>
              <button id="clear-btn" class="btn btn-secondary large-btn">🗑️ Clear Selection</button>
            </div>
          </section>

          <!-- Results Section -->
          <section class="card hidden" id="results-section">
            <h2>🎯 Optimization Results</h2>

            <div id="optimization-stats" class="optimization-stats"></div>

            <div id="army-compositions" class="army-compositions"></div>
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

      .unit-card {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
      }

      .unit-card:hover {
        border-color: #007bff;
        box-shadow: 0 2px 4px rgba(0,123,255,0.1);
      }

      .unit-card.selected {
        border-color: #28a745;
        background: #f8fff9;
        box-shadow: 0 2px 4px rgba(40,167,69,0.2);
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
    `,document.head.appendChild(e)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(e){console.error("Failed to load unit data:",e)}}attachEventListeners(){const e=document.getElementById("unit-search"),t=document.getElementById("unit-type-filter"),n=document.getElementById("optimize-btn"),s=document.getElementById("clear-btn"),i=document.getElementById("select-all-visible"),a=document.getElementById("clear-selection"),o=document.getElementById("leadership-budget"),r=document.getElementById("dominance-budget");e&&e.addEventListener("input",()=>this.filterAndDisplayUnits()),t&&t.addEventListener("change",()=>this.filterAndDisplayUnits()),n&&n.addEventListener("click",()=>this.optimizeArmy()),s&&s.addEventListener("click",()=>this.clearSelection()),i&&i.addEventListener("click",()=>this.selectAllVisible()),a&&a.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("input",()=>this.updateOptimizeButton()),r&&r.addEventListener("input",()=>this.updateOptimizeButton()),document.addEventListener("click",l=>{const u=l.target;u.classList.contains("filter-tab")&&this.handleFilterTabClick(u)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const e=document.getElementById("unit-type-filter");if(!e)return;const t=this.unitLoader.getUniqueUnitTypes();e.innerHTML='<option value="">All Unit Types</option>',t.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,e.appendChild(s)})}updateFilterTabCounts(){const e=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const s=n.getAttribute("data-filter");let i=0;s==="all"?i=e.length:i=e.filter(a=>this.getMainCategory(a)===s).length,n.textContent=`${s==="all"?"All":s} (${i})`})}handleFilterTabClick(e){document.querySelectorAll(".filter-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var i,a,o;const e=((i=document.getElementById("unit-search"))==null?void 0:i.value)||"",t=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",n=((o=document.getElementById("unit-type-filter"))==null?void 0:o.value)||"";let s=this.unitLoader.getAllUnits();if(t!=="all"&&(s=s.filter(r=>this.getMainCategory(r)===t)),n&&(s=s.filter(r=>r.unit_types.includes(n))),e){const r=e.toLowerCase();s=s.filter(l=>l.name.toLowerCase().includes(r)||l.unit_types.some(u=>u.toLowerCase().includes(r)))}this.renderGroupedUnits(s),this.updateSelectedSummary()}renderGroupedUnits(e){const t=document.getElementById("unit-groups");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(e);Object.entries(n).forEach(([s,i])=>{const a=this.createMainCategoryElement(s,i);t.appendChild(a)}),this.attachAllEventListeners(n)}createHierarchicalGroups(e){const t={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return e.forEach(n=>{const s=this.getMainCategory(n),i=this.getSubCategory(n),a=this.getUnitFamily(n);t[s][i]||(t[s][i]={}),t[s][i][a]||(t[s][i][a]=[]),t[s][i][a].push(n)}),Object.values(t).forEach(n=>{Object.values(n).forEach(s=>{Object.values(s).forEach(i=>{i.sort((a,o)=>a.strength-o.strength)})})}),t}getMainCategory(e){if(e.cost_type==="Mercenary"||e.authority_cost>0)return"Mercenaries";const t=e.unit_types;return t.includes("Engineer corps")||t.includes("Siege engine")?"Engineer Corps":t.includes("Guardsman")?"Guardsmen":t.includes("Specialist")?"Specialists":t.includes("Beast")||t.includes("Dragon")||t.includes("Giant")||t.includes("Elemental")||t.includes("ELEMENTAL")||t.includes("Flying")&&!t.includes("Human")?"Monsters":t.includes("Human")&&(t.includes("Melee")||t.includes("Ranged")||t.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(e){const t=e.unit_types,n=e.name.toUpperCase(),s=this.getMainCategory(e);if(s==="Mercenaries")return t.includes("Guardsman")?"Elite Forces":"Special Forces";if(s==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(t.includes("Siege engine"))return"Siege Engines"}if(s==="Monsters"){if(t.includes("Dragon"))return"Dragons";if(t.includes("Giant"))return"Giants";if(t.includes("Beast"))return"Beasts";if(t.includes("Elemental")||t.includes("ELEMENTAL"))return"Elementals";if(t.includes("Flying"))return"Flying"}if(s==="Guardsmen"||s==="Specialists"){if(t.includes("Ranged"))return"Ranged";if(t.includes("Melee"))return"Melee";if(t.includes("Mounted"))return"Mounted";if(t.includes("Flying")||t.includes("Beast"))return"Flying";if(t.includes("Scout"))return"Scouts"}return t.includes("Human")?"Infantry":"Other"}getUnitFamily(e){let t=e.name;return t=t.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),t.includes("HEAVY "),t}createMainCategoryElement(e,t){const n=document.createElement("div");n.className="main-category";const s=this.countUnitsInCategory(t),i=this.countSelectedUnitsInCategory(t);return n.innerHTML=`
      <div class="main-category-header" data-category="${e}">
        <div class="category-title">
          <h3>${e} (${i}/${s})</h3>
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
    `,n}createSubCategoryHTML(e,t,n){const s=Object.values(n).reduce((a,o)=>a+o.length,0),i=Object.values(n).reduce((a,o)=>a+o.filter(r=>this.selectedUnits.has(r.name)).length,0);return`
      <div class="sub-category" data-category="${e}" data-subcategory="${t}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${t} (${i}/${s})</h4>
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
    `}createUnitFamilyHTML(e,t){const n=t.filter(s=>this.selectedUnits.has(s.name)).length;return`
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
          ${t.map(s=>this.createUnitCard(s)).join("")}
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
    `}attachAllEventListeners(e){document.querySelectorAll(".main-category").forEach((t,n)=>{const i=Object.keys(e)[n];if(i){const a=e[i];this.attachMainCategoryListeners(t,i,a)}}),document.querySelectorAll(".sub-category").forEach(t=>{var i;const n=t.getAttribute("data-category"),s=t.getAttribute("data-subcategory");if(n&&s&&((i=e[n])!=null&&i[s])){const a=e[n][s];this.attachSubCategoryListeners(t,a)}}),document.querySelectorAll(".unit-family").forEach(t=>{const n=t.getAttribute("data-family");let s=[];Object.values(e).forEach(i=>{Object.values(i).forEach(a=>{a[n]&&(s=a[n])})}),s.length>0&&this.attachUnitFamilyListeners(t,s)})}countUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((s,i)=>s+i.length,0),0)}countSelectedUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((s,i)=>s+i.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(e,t,n){const s=e.querySelector(".main-category-header"),i=e.querySelector(".main-category-content"),a=e.querySelector(".expand-icon");if(!s||!i||!a){console.warn("Missing main-category elements for",t,{header:!!s,content:!!i,expandIcon:!!a});return}s.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",t,"collapsed:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),a.textContent=i.classList.contains("collapsed")?"▼":"▲"});const o=e.querySelector(".select-category"),r=e.querySelector(".deselect-category");o&&o.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(n)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(e,t){const n=e.querySelector(".sub-category-header"),s=e.querySelector(".sub-category-content"),i=e.querySelector(".expand-icon");if(!n||!s||!i){console.warn("Missing sub-category elements:",{header:!!n,content:!!s,expandIcon:!!i});return}n.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Sub-category header clicked, toggling:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),i.textContent=s.classList.contains("collapsed")?"▼":"▲"});const a=e.querySelector(".select-subcategory"),o=e.querySelector(".deselect-subcategory");a&&a.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInFamilies(t)}),o&&o.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInFamilies(t)})}attachUnitFamilyListeners(e,t){const n=e.querySelector(".unit-family-header"),s=e.querySelector(".unit-family-content"),i=e.querySelector(".expand-icon");n.addEventListener("click",l=>{l.target.classList.contains("btn")||(s.classList.toggle("collapsed"),i.textContent=s.classList.contains("collapsed")?"▼":"▲")});const a=e.querySelector(".select-family"),o=e.querySelector(".deselect-family");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(t)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(t)}),e.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const u=l.getAttribute("data-unit");if(u){const d=this.unitLoader.getUnitByName(u);d&&this.toggleUnitSelection(d)}})})}getUnitCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}toggleUnitSelection(e){this.selectedUnits.has(e.name)?(this.selectedUnits.delete(e.name),e.cost_type==="Mercenary"&&delete this.mercenaryLimits[e.name]):(this.selectedUnits.add(e.name),e.cost_type==="Mercenary"&&(this.mercenaryLimits[e.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(e=>{const t=e.getAttribute("data-unit");t&&(this.selectedUnits.has(t)?e.classList.add("selected"):e.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((e,t)=>{const n=e.querySelector(".category-title h3");if(n){const i=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][t];if(i){const{selected:a,total:o}=this.countUnitsInMainCategory(i),l=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${l} (${a}/${o})`}}}),document.querySelectorAll(".sub-category").forEach(e=>{const t=e.querySelector(".subcategory-title h4"),n=e.getAttribute("data-category"),s=e.getAttribute("data-subcategory");if(t&&n&&s){const{selected:i,total:a}=this.countUnitsInSubCategory(n,s),r=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${r} (${i}/${a})`}}),document.querySelectorAll(".unit-family").forEach(e=>{const t=e.querySelector(".family-title h5"),n=e.getAttribute("data-family");if(t&&n){const{selected:s,total:i}=this.countUnitsInFamily(n),o=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${o} (${s}/${i})`}})}countUnitsInMainCategory(e){const n=this.unitLoader.getAllUnits().filter(i=>this.getMainCategory(i)===e);return{selected:n.filter(i=>this.selectedUnits.has(i.name)).length,total:n.length}}countUnitsInSubCategory(e,t){const s=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===e&&this.getSubCategory(a)===t);return{selected:s.filter(a=>this.selectedUnits.has(a.name)).length,total:s.length}}countUnitsInFamily(e){const n=this.unitLoader.getAllUnits().filter(i=>this.getUnitFamily(i)===e);return{selected:n.filter(i=>this.selectedUnits.has(i.name)).length,total:n.length}}updateSelectedSummary(){const e=document.getElementById("selected-count");e&&(e.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(t=>{const n=t.getAttribute("data-unit");if(n){const s=this.unitLoader.getUnitByName(n);s&&(this.selectedUnits.add(s.name),s.cost_type==="Mercenary"&&(this.mercenaryLimits[s.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(e){Object.values(e).forEach(t=>{this.selectAllInFamilies(t)})}deselectAllInCategory(e){Object.values(e).forEach(t=>{this.deselectAllInFamilies(t)})}selectAllInFamilies(e){Object.values(e).forEach(t=>{this.selectAllUnits(t)})}deselectAllInFamilies(e){Object.values(e).forEach(t=>{this.deselectAllUnits(t)})}selectAllUnits(e){e.forEach(t=>{this.selectedUnits.add(t.name),t.cost_type==="Mercenary"&&(this.mercenaryLimits[t.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(e){e.forEach(t=>{this.selectedUnits.delete(t.name),t.cost_type==="Mercenary"&&delete this.mercenaryLimits[t.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const e=document.getElementById("mercenary-limits");if(!e)return;const t=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&n.cost_type==="Mercenary");if(t.length===0){e.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}e.innerHTML="",t.forEach(n=>{if(!n)return;const s=document.createElement("div");s.className="mercenary-item",s.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">🗡️ ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,s.querySelector("input").addEventListener("change",a=>{const o=a.target;this.mercenaryLimits[o.dataset.unit]=parseInt(o.value)||1}),e.appendChild(s)})}updateOptimizeButton(){const e=document.getElementById("optimize-btn"),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!e||!t||!n)return;const s=this.selectedUnits.size>0,i=parseInt(t.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;e.disabled=!s||!i}async optimizeArmy(){try{this.showLoadingModal();const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new T(e);const t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),s={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},i=await this.optimizer.optimizeArmy(s);this.displayResults(i)}catch(e){console.error("Optimization failed:",e),alert("Optimization failed. Please check your inputs and try again.")}finally{this.hideLoadingModal()}}displayResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),s=document.getElementById("results-section");!t||!n||!s||(t.innerHTML=`
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
    `,n.innerHTML="",e.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.compositions.forEach((i,a)=>{const o=this.createCompositionElement(i,a+1);n.appendChild(o)}),s.classList.remove("hidden"),e.compositions.length>0&&(this.currentOptimizedArmy=e.compositions[0],this.showBattleSimulation()))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const e=document.getElementById("battle-simulation-container");e&&(this.battleSimulation||(this.battleSimulation=new D),this.battleSimulation.mount(e,this.currentOptimizedArmy),e.classList.remove("hidden"),setTimeout(()=>{e.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(e,t){var o;const n=document.createElement("div");n.className="army-composition";const s=((o=this.optimizer)==null?void 0:o.explainStacking(e))||"No stacking explanation available",i=`
      <div class="composition-header">
        <div class="composition-title">Solution ${t} ${e.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${e.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=s.split(`
`).map(r=>r.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${r}</h3>`:r.includes("═".repeat(60))?'<hr class="title-divider">':r.includes("📊 ARMY SUMMARY")||r.includes("🗡️ MERCENARY FORCES")||r.includes("👑 LEADERSHIP FORCES")||r.includes("⚡ DOMINANCE FORCES")||r.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${r}</h4>`:r.includes("─".repeat(30))||r.includes("─".repeat(40))?'<hr class="section-divider">':r.includes("└─")?`<div class="unit-detail">${r}</div>`:r.trim()&&!r.includes("═")&&!r.includes("─")?`<div class="unit-line">${r}</div>`:r.trim()===""?'<div class="spacing"></div>':"").filter(r=>r!=="").join("");return n.innerHTML=i+'<div class="composition-content">'+a+"</div>",n}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const e=document.getElementById("leadership-budget"),t=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),s=document.getElementById("battle-simulation-container");e&&(e.value="0"),t&&(t.value="0"),n&&n.classList.add("hidden"),s&&s.classList.add("hidden"),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}showLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.remove("hidden")}hideLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{const S=document.getElementById("app");if(!S)throw new Error("App container not found");new I().mount(S),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-BQ7ysgR7.js.map
