var B=Object.defineProperty;var A=(S,t,e)=>t in S?B(S,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):S[t]=e;var v=(S,t,e)=>A(S,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class b{static isMercenary(t){return t.cost_type==="Mercenary"||t.authority_cost>0}static getPrimaryCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}static getStrengthPerCost(t){const e=b.getPrimaryCost(t);return e>0?t.strength/e:0}static getHealthPerCost(t){const e=b.getPrimaryCost(t);return e>0?t.health/e:0}}class U{constructor(){v(this,"units",[]);v(this,"unitsByName",new Map);v(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(t){try{let e;if(typeof t=="string"){console.log(`Loading units from: ${t}`);const n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);e=await n.json()}else e=t;if(!Array.isArray(e))throw new Error("Unit data must be an array");return this.units=e.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(e){throw console.error("❌ Error loading units:",e),e}}validateAndNormalizeUnit(t){const e={name:t.name||"Unknown",unit_types:Array.isArray(t.unit_types)?t.unit_types:[],cost_type:t.cost_type||"Leadership",health:Number(t.health)||0,strength:Number(t.strength)||0,leadership_cost:Number(t.leadership_cost)||0,dominance_cost:Number(t.dominance_cost)||0,authority_cost:Number(t.authority_cost)||0,food_consumption:Number(t.food_consumption)||0,carrying_capacity:Number(t.carrying_capacity)||0,revival_cost_gold:Number(t.revival_cost_gold)||0,revival_cost_silver:Number(t.revival_cost_silver)||0,source_file:t.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)||(console.warn(`Invalid cost type for unit ${e.name}: ${e.cost_type}`),e.cost_type="Leadership"),e}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(t=>[t.name,t])),this.units.forEach(t=>{b.isMercenary(t)?this.unitsByCostType.Mercenary.push(t):t.cost_type in this.unitsByCostType&&this.unitsByCostType[t.cost_type].push(t)}),Object.keys(this.unitsByCostType).forEach(t=>{this.unitsByCostType[t].sort((e,n)=>e.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(t){return this.unitsByName.get(t)}getUnitsByCostType(t){return[...this.unitsByCostType[t]]}getAvailableUnits(t){const e=[];for(const n of t){const s=this.getUnitByName(n);s?e.push(s):console.warn(`Unit '${n}' not found in loaded data`)}return e}filterUnits(t){let e=this.units;return t.costType&&(e=e.filter(n=>n.cost_type===t.costType)),t.unitTypes&&t.unitTypes.length>0&&(e=e.filter(n=>t.unitTypes.some(s=>n.unit_types.includes(s)))),t.minStrength!==void 0&&(e=e.filter(n=>n.strength>=t.minStrength)),t.maxCost!==void 0&&(e=e.filter(n=>b.getPrimaryCost(n)<=t.maxCost)),e}searchUnits(t){if(!t.trim())return this.getAllUnits();const e=t.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(e))}getEnhancedUnits(){return this.units.map(t=>({...t,get isMercenary(){return b.isMercenary(t)},get primaryCost(){return b.getPrimaryCost(t)},get strengthPerCost(){return b.getStrengthPerCost(t)},get healthPerCost(){return b.getHealthPerCost(t)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...t),max:Math.max(...t)},healthRange:{min:Math.min(...e),max:Math.max(...e)}}}getUniqueUnitTypes(){const t=new Set;return this.units.forEach(e=>{e.unit_types.forEach(n=>t.add(n))}),Array.from(t).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,s)=>n+s,0)/t.length)},healthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,s)=>n+s,0)/e.length)},topUnitsByStrength:[...this.units].sort((n,s)=>s.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,s)=>s.health-n.health).slice(0,10)}}}class k{constructor(t){v(this,"availableUnits");v(this,"unitsByName");v(this,"leadershipUnits");v(this,"dominanceUnits");v(this,"mercenaryUnits");this.availableUnits=[...t],this.unitsByName=new Map(t.map(e=>[e.name,e])),this.leadershipUnits=t.filter(e=>e.cost_type==="Leadership").sort((e,n)=>e.strength-n.strength),this.dominanceUnits=t.filter(e=>e.cost_type==="Dominance").sort((e,n)=>e.strength-n.strength),this.mercenaryUnits=t.filter(e=>b.isMercenary(e)).sort((e,n)=>e.strength-n.strength)}async optimizeArmy(t){const e=performance.now();console.log(`🔍 Optimizing army with L:${t.leadershipBudget} D:${t.dominanceBudget} M:${Object.keys(t.mercenaryLimits).length}`),console.log(`📋 Selected units: ${t.availableUnits.join(", ")}`);const n=[],s=this.generateGuaranteedValidCompositions(t);console.log(`Generated ${s.length} guaranteed valid army combinations`);let a=0;for(const c of s){a++;const m=this.evaluateComposition(c);n.push(m)}const i=performance.now();console.log(`Evaluated ${a} combinations, found ${n.length} valid stackings`);const o=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Leadership"),r=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Dominance"),l=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&b.isMercenary(c)),u=n.filter(c=>{const m=o.some(h=>c.units[h.name]&&c.units[h.name]>0),g=r.some(h=>c.units[h.name]&&c.units[h.name]>0),p=l.some(h=>c.units[h.name]&&c.units[h.name]>0);return[o.length>0?m:!0,r.length>0?g:!0,l.length>0?p:!0].every(h=>h)});return u.sort((c,m)=>{const g=c.totalLeadershipCost/t.leadershipBudget+c.totalDominanceCost/t.dominanceBudget;return m.totalLeadershipCost/t.leadershipBudget+m.totalDominanceCost/t.dominanceBudget-g}),{compositions:u.length>0?[u[0]]:n.slice(0,1),totalCombinationsEvaluated:a,validStackingsFound:n.length,executionTimeMs:i-e}}generateGuaranteedValidCompositions(t){const e=[],n=this.availableUnits.filter(i=>t.availableUnits.includes(i.name)&&i.cost_type==="Leadership").sort((i,o)=>o.strength-i.strength),s=this.availableUnits.filter(i=>t.availableUnits.includes(i.name)&&i.cost_type==="Dominance").sort((i,o)=>o.strength-i.strength),a=this.availableUnits.filter(i=>t.availableUnits.includes(i.name)&&b.isMercenary(i));if(console.log(`Selected units: L:${n.length} D:${s.length} M:${a.length}`),console.log("Leadership units:",n.map(i=>i.name)),console.log("Dominance units:",s.map(i=>i.name)),console.log("Mercenary units:",a.map(i=>i.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${s.length} M:${a.length}`),console.log(`Budgets: Leadership:${t.leadershipBudget} Dominance:${t.dominanceBudget}`),n.length>0&&s.length>0&&a.length>0&&t.leadershipBudget>0&&t.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const i=[...n,...a];e.push(...this.generateCombinedStackedCompositions(i,s,t.leadershipBudget,t.dominanceBudget,t.mercenaryLimits))}else if(n.length>0&&a.length>0&&s.length===0&&t.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const i=[...n,...a],o=this.calculateProperStackingQuantities(i,t.leadershipBudget,t.mercenaryLimits);e.push(o)}else if(s.length>0&&a.length>0&&n.length===0&&t.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const i=this.calculateProperStackingQuantitiesForDominance(s,t.dominanceBudget),o={};for(const l of a)o[l.name]=t.mercenaryLimits[l.name]||1;const r={...i,...o};e.push(r)}else if(n.length>0&&s.length>0&&a.length===0&&t.leadershipBudget>0&&t.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),e.push(...this.generateCombinedStackedCompositions(n,s,t.leadershipBudget,t.dominanceBudget,{}));else if(n.length>0&&s.length===0&&a.length===0&&t.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const i=this.calculateProperStackingQuantities(n,t.leadershipBudget,{});e.push(i)}else if(s.length>0&&n.length===0&&a.length===0&&t.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const i=this.calculateProperStackingQuantitiesForDominance(s,t.dominanceBudget);e.push(i)}else if(a.length>0&&n.length===0&&s.length===0){console.log("🗡️ Generating Mercenary-only compositions");const i={};for(const o of a){const r=t.mercenaryLimits[o.name]||1;i[o.name]=r}Object.keys(i).length>0&&e.push(i)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&a.length>0&&t.leadershipBudget>0&&e.push(...this.generateMercenaryMixedCompositions(n,a,t.leadershipBudget,t.mercenaryLimits,"leadership_cost")),s.length>0&&a.length>0&&t.dominanceBudget>0&&e.push(...this.generateMercenaryMixedCompositions(s,a,t.dominanceBudget,t.mercenaryLimits,"dominance_cost")),e}generateStackedCompositionsWithMercenaries(t,e,n,s){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const a=[...t,...e];console.log(`🚨 About to call calculateProperStackingQuantities with ${a.length} units`);const i=this.calculateProperStackingQuantities(a,n,s);return console.log("🚨 Got composition back:",i),[i]}calculateCleanStackingPattern(t,e){const n={};if(t.length===0)return n;const s=t[0];n[s.name]=1,console.log(`🎯 Starting with 1x ${s.name} (STR: ${s.strength})`);for(let a=1;a<t.length;a++){const i=t[a],o=t[a-1],r=o.health*(n[o.name]||1),l=Math.ceil((r+1)/i.health);n[i.name]=l,console.log(`📋 ${i.name}: need ${l} units (${l*i.health} HP) to exceed ${o.name} (${r} HP)`)}return n}calculateProperStackingQuantities(t,e,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${e}`);const s={},a=[...t].sort((c,m)=>m.strength-c.strength),i=a.filter(c=>c.cost_type==="Leadership"),o=a.filter(c=>b.isMercenary(c));if(a.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),s;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${a.length} units (${i.length} leadership + ${o.length} mercenary)`);const r=a[0],l={};l[r.name]=1;const u=r.health*1;console.log(`🔧 Base: 1x ${r.name} = ${u} HP (strongest)`);for(let c=1;c<a.length;c++){const m=a[c],g=Math.ceil((u+1)/m.health);l[m.name]=g;const p=b.isMercenary(m)?"mercenary":"leadership";console.log(`🔧 Base: ${g}x ${m.name} = ${g*m.health} HP (beats ${u}) [${p}]`)}console.log("🔧 Validating base pattern stacking order...");for(let c=0;c<a.length-1;c++){const m=a[c],g=a[c+1],p=m.health*l[m.name];let y=g.health*l[g.name];if(y<=p)if(b.isMercenary(g))console.log(`🔧 WARNING: ${g.name} mercenary limit (${l[g.name]}) gives ${y} HP, can't beat ${p} HP`);else{const h=Math.ceil((p+1)/g.health);l[g.name]=h,y=g.health*h,console.log(`🔧 Fixed: ${g.name} increased to ${h} units = ${y} HP (now beats ${p})`)}else console.log(`🔧 OK: ${g.name} ${l[g.name]} units = ${y} HP (beats ${p})`)}let d=0;for(const[c,m]of Object.entries(l)){const g=this.unitsByName.get(c);g&&g.cost_type==="Leadership"&&(d+=m*g.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${d}`),d===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[c,m]of Object.entries(l))s[c]=m}else{const c=Math.floor(e/d);console.log(`🔧 Can afford ${c} base stacks (${e} / ${d})`);for(const[m,g]of Object.entries(l)){const p=this.unitsByName.get(m);if(p&&b.isMercenary(p)){const y=g*c,h=n[m]||1;s[m]=Math.min(y,h),y>h?console.log(`🔧 Mercenary ${m}: wanted ${y}, capped at limit ${h}`):console.log(`🔧 Mercenary ${m}: scaled to ${y} (under limit ${h})`)}else s[m]=g*c}}return console.log("🔧 SIMPLE STACKING: Final composition:",s),s}calculateProperStackingQuantitiesForDominance(t,e){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${e}`);const n={},s=[...t].sort((u,d)=>d.strength-u.strength);if(s.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${s.length} dominance units`);const a=s[0],i={};i[a.name]=1;const o=a.health*1;console.log(`🔧 Base: 1x ${a.name} = ${o} HP (strongest)`);for(let u=1;u<s.length;u++){const d=s[u],c=Math.ceil((o+1)/d.health);i[d.name]=c,console.log(`🔧 Base: ${c}x ${d.name} = ${c*d.health} HP (beats ${o})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let u=0;u<s.length-1;u++){const d=s[u],c=s[u+1],m=d.health*i[d.name];let g=c.health*i[c.name];if(g<=m){const p=Math.ceil((m+1)/c.health);i[c.name]=p,g=c.health*p,console.log(`🔧 Fixed: ${c.name} increased to ${p} units = ${g} HP (now beats ${m})`)}else console.log(`🔧 OK: ${c.name} ${i[c.name]} units = ${g} HP (beats ${m})`)}let r=0;for(const[u,d]of Object.entries(i)){const c=this.unitsByName.get(u);c&&c.cost_type==="Dominance"&&(r+=d*c.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${r}`),r===0)return console.log("🔧 No dominance costs found"),n;const l=Math.floor(e/r);console.log(`🔧 Can afford ${l} base stacks (${e} / ${r})`);for(const[u,d]of Object.entries(i))n[u]=d*l;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(t){return Object.entries(t).reduce((e,[n,s])=>{const a=this.unitsByName.get(n);return a&&a.cost_type==="Leadership"?e+s*a.leadership_cost:e},0)}calculateMaxStacksByMercenaries(t,e){let n=1/0;for(const[s,a]of Object.entries(t)){const i=this.unitsByName.get(s);if(i&&b.isMercenary(i)){const o=e[s]||1,r=Math.floor(o/a);n=Math.min(n,r),console.log(`🗡️ ${s}: limit ${o}, base need ${a}, allows ${r} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(t,e,n,s){const a=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const i=[...t,...e].sort((c,m)=>m.strength-c.strength);if(i.length===0)return a;const o=this.calculateCleanStackingPattern(i,s);console.log("📊 Dominance + Mercenary base pattern:",o);const r=Object.entries(o).reduce((c,[m,g])=>{const p=this.unitsByName.get(m);return p&&p.cost_type==="Dominance"?c+g*p.dominance_cost:c},0);if(console.log(`💰 Dominance cost per stack: ${r}`),r>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const c={};for(const m of e)c[m.name]=s[m.name]||1;return a.push(c),t.length>0&&a.push(...this.generateStackedCompositions(t,n,"dominance_cost")),a}const l=Math.floor(n/r),u=this.calculateMaxStacksByMercenaries(o,s),d=Math.min(l,u);console.log(`🔢 Max Dominance+Mercenary stacks: ${d}`);for(let c=1;c<=Math.min(d,5);c++){const m={};for(const[g,p]of Object.entries(o)){const y=this.unitsByName.get(g);y&&b.isMercenary(y)?m[g]=Math.min(p*c,s[g]||1):m[g]=p*c}a.push(m)}if(u<l&&t.length>0){const c=n-d*r,m=this.generateStackedCompositions(t,c,"dominance_cost"),g={};for(const p of e)g[p.name]=s[p.name]||1;for(const p of m.slice(0,3)){const y={...g,...p};a.push(y)}}return a}generateStackedCompositions(t,e,n){const s=[];if(t.length===0||e<=0)return s;const a=t[0];console.log(`🎯 Strongest unit: ${a.name} (STR: ${a.strength})`);const i=this.calculateStackingPattern(t);console.log("📊 Base stacking pattern:",i);const o=Object.entries(i).reduce((l,[u,d])=>{const c=this.unitsByName.get(u);if(c){const m=c[n];return l+d*m}return l},0);if(console.log(`💰 Base pattern cost: ${o}`),o<=0)return s;const r=Math.floor(e/o);console.log(`🔢 Max multiplier: ${r}`);for(let l=1;l<=Math.min(r,10);l++){const u={};for(const[d,c]of Object.entries(i))u[d]=c*l;s.push(u)}return t.length>1&&s.push(...this.generateStackingVariations(t,e,n)),s}calculateStackingPattern(t){const e={};if(t.length===0)return e;const n=t[0];e[n.name]=1;for(let s=1;s<t.length;s++){const a=t[s],i=t[s-1],o=i.health*(e[i.name]||1),r=Math.ceil((o+1)/a.health);e[a.name]=r,console.log(`📋 ${a.name}: need ${r} units (${r*a.health} HP) to exceed ${i.name} (${o} HP)`)}return e}generateCombinedStackedCompositions(t,e,n,s,a={}){const i=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const o=t.filter(M=>M.cost_type==="Leadership"),r=t.filter(M=>b.isMercenary(M));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const l=[...o,...r],d=[this.calculateProperStackingQuantities(l,n,a)];if(d.length===0)return i;const c=d[d.length-1];if(!c)return i;console.log("🎯 Using maximum Leadership composition for combination");const m=c,g=e[0];console.log(`🎯 Strongest Dominance unit: ${g.name} (STR: ${g.strength})`);const p=this.findClosestStrengthUnit(g,t);if(!p)return console.log("❌ No suitable Leadership unit found for comparison"),i;console.log(`🔍 Comparing to Leadership unit: ${p.name} (STR: ${p.strength})`);const y=m[p.name]||0,h=p.health*y;if(console.log(`📊 Comparison unit total health: ${h} (${y}x ${p.health})`),h<=0)return console.log("❌ Comparison unit not in Leadership composition"),i;const f=g.health;f>=h&&(console.log(`⚠️ Single Dominance unit too strong: ${f} HP >= ${h} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const L=[this.calculateProperStackingQuantitiesForDominance(e,s)];if(L.length>0){const M=L[L.length-1],E={...m,...M};i.push(E),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),i.push(m);return i}findClosestStrengthUnit(t,e){if(e.length===0)return null;let n=e[0],s=Math.abs(t.strength-n.strength);for(const a of e){const i=Math.abs(t.strength-a.strength);i<s&&(s=i,n=a)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${t.name} (STR: ${t.strength}), diff: ${s}`),n}calculateConstrainedDominanceStack(t,e,n){const s={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),t.length===0||e<=0||n<=0)return s;const a=t[0],i=Math.floor((n-1)/a.health),o=Math.floor(e/a.dominance_cost),r=Math.min(i,o);if(r<=0)return console.log(`❌ Cannot fit any ${a.name} within constraints`),s;for(let l=Math.min(r,3);l>=1;l--){const u={};u[a.name]=l;let d=l*a.dominance_cost,c=l*a.health;console.log(`🧪 Testing ${l}x ${a.name} (${c} HP, ${d} cost)`);for(let g=1;g<t.length&&d<e;g++){const p=t[g],y=e-d,h=Math.ceil((c+1)/p.health),f=Math.floor(y/p.dominance_cost),C=Math.min(h,f);C>0&&(u[p.name]=C,d+=C*p.dominance_cost,console.log(`  ➕ Added ${C}x ${p.name} (${C*p.health} HP)`))}const m=Object.entries(u).reduce((g,[p,y])=>{const h=this.unitsByName.get(p);return h?g+y*h.health:g},0);if(m<n)return console.log(`✅ Valid Dominance stack: ${m} HP < ${n} HP limit`),u;console.log(`❌ Dominance stack too strong: ${m} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),s}generateMercenaryMixedCompositions(t,e,n,s,a){const i=[];console.log("🗡️ Generating mixed compositions with mercenaries");const o=this.generateStackedCompositions(t,n,a);if(o.length===0)return i;for(const r of o.slice(0,3)){const l=e.sort((h,f)=>f.strength-h.strength)[0];if(!l)continue;console.log(`🎯 Strongest Mercenary: ${l.name} (STR: ${l.strength})`);const u=this.findClosestStrengthUnit(l,t);if(!u){console.log("❌ No suitable base unit found for comparison");continue}const d=r[u.name]||0,c=u.health*d;if(console.log(`📊 Comparison base unit total health: ${c}`),c<=0){console.log("❌ Comparison unit not in base composition");continue}const m=l.health,g=s[l.name]||1,p=m*g;if(p>=c){console.log(`⚠️ Mercenary too strong: ${p} HP >= ${c} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const h=Math.floor((c-1)/m);if(h>0){console.log(`✅ Using ${h}x ${l.name} instead of ${g}`);const f={...r};f[l.name]=h;for(const C of e)if(C.name!==l.name){const L=s[C.name]||1;f[C.name]=L}i.push(f),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),i.push(r);continue}const y={...r};for(const h of e){const f=s[h.name]||1;y[h.name]=f}i.push(y),console.log("✅ Created mixed composition with mercenaries")}return i}createAlternativeDominanceStack(t,e,n){const s={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const a=[...t].sort((r,l)=>r.health-l.health);let i=0,o=0;for(const r of a){const l=Math.floor((n-o-1)/r.health),u=Math.floor((e-i)/r.dominance_cost),d=Math.min(l,u);d>0&&(s[r.name]=d,i+=d*r.dominance_cost,o+=d*r.health,console.log(`➕ Added ${d}x ${r.name} (${d*r.health} HP, ${d*r.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${o} HP total, ${i} cost`),s}calculateMaximizedDominanceStack(t,e,n){console.log(`💰 Maximizing Dominance budget: ${e} with health limit: ${n}`);const s=this.createAlternativeDominanceStack(t,e,n);return Object.keys(s).length>0?s:this.calculateConstrainedDominanceStack(t,e,n)}generateStackingVariations(t,e,n){const s=[],a={},i=t[0],o=i[n];if(o>0){const r=Math.floor(e/o);a[i.name]=Math.min(r,5);let l=e-a[i.name]*o;for(let u=1;u<t.length&&l>0;u++){const d=t[u],c=d[n];if(c>0&&c<=l){const m=Math.floor(l/c/(t.length-u));m>0&&(a[d.name]=m,l-=m*c)}}s.push(a)}return s}generateGuaranteedDiverseCompositions_OLD(t){const e=[],n=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),s=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),a=this.availableUnits.filter(l=>t.availableUnits.includes(l.name)&&b.isMercenary(l)),i={};let o=0,r=0;for(const l of n)o+l.leadership_cost<=t.leadershipBudget&&(i[l.name]=1,o+=l.leadership_cost);for(const l of s)r+l.dominance_cost<=t.dominanceBudget&&(i[l.name]=1,r+=l.dominance_cost);for(const l of a){const u=t.mercenaryLimits[l.name]||1;i[l.name]=Math.min(1,u)}if(Object.keys(i).length>0&&e.push(i),n.length>0&&t.leadershipBudget>0){const l=n.sort((d,c)=>d.leadership_cost-c.leadership_cost)[0],u=Math.floor(t.leadershipBudget/l.leadership_cost);if(u>0){const d={};d[l.name]=Math.min(u,20);const c=t.leadershipBudget-d[l.name]*l.leadership_cost;for(const m of n.slice(1,3)){const g=Math.floor(c/m.leadership_cost/2);g>0&&(d[m.name]=g)}e.push(d)}}if(n.length>0||s.length>0){const l={};if(n.length>0&&t.leadershipBudget>0){const u=Math.floor(t.leadershipBudget/n.length);for(const d of n){const c=Math.floor(u/d.leadership_cost);c>0&&(l[d.name]=c)}}if(s.length>0&&t.dominanceBudget>0){const u=Math.floor(t.dominanceBudget/s.length);for(const d of s){const c=Math.floor(u/d.dominance_cost);c>0&&(l[d.name]=c)}}for(const u of a){const d=t.mercenaryLimits[u.name]||1;l[u.name]=Math.max(1,Math.floor(d/2))}Object.keys(l).length>0&&e.push(l)}return e}generateMercenaryCombinations(t){if(Object.keys(t).length===0)return[{}];let e=[{}];for(const[n,s]of Object.entries(t)){if(!this.unitsByName.has(n))continue;const a=[];for(const i of e)for(let o=0;o<=s;o++){const r={...i};o>0&&(r[n]=o),a.push(r)}e=a}return e}evaluateComposition(t){let e=0,n=0,s=0,a=0,i=0;const o=[];for(const[y,h]of Object.entries(t)){const f=this.unitsByName.get(y);if(!f)continue;const C=f.health*h,L=f.strength*h;e+=L,n+=C,s+=f.leadership_cost*h,a+=f.dominance_cost*h,b.isMercenary(f)&&(i+=h),o.push({unit:f,count:h,totalHealth:C,unitStrength:f.strength})}o.sort((y,h)=>y.unitStrength-h.unitStrength);let r=!0;const l=[];for(let y=0;y<o.length;y++){const{unit:h,count:f,totalHealth:C}=o[y];l.push({unitName:h.name,count:f,totalHealth:C,unitStrength:h.strength});for(let L=y+1;L<o.length;L++){const M=o[L].unit,E=o[L].totalHealth;if(h.strength===M.strength){const x=Math.max(C,E)*.1;if(Math.abs(C-E)<=x)continue}C<=E&&console.log(`❌ Stacking violation: ${h.name} (STR:${h.strength}, ${C} HP) <= ${M.name} (STR:${M.strength}, ${E} HP)`)}}const u=s+a+i;let d=u>0?e/u:0;d*=1.2;const m=1+(Object.keys(t).length-1)*.05;d*=m;let g=0;s>0&&g++,a>0&&g++,i>0&&g++;const p=1+(g-1)*.1;return d*=p,{units:t,totalStrength:e,totalHealth:n,totalLeadershipCost:s,totalDominanceCost:a,totalMercenaryCount:i,stackingOrder:l,isValidStacking:r,efficiencyScore:d}}explainStacking(t){const e=[],n=[],s=[],a=[];return t.stackingOrder.forEach(i=>{const o=this.unitsByName.get(i.unitName);if(!o)return;const r={name:i.unitName,count:i.count,totalHealth:i.totalHealth,strength:o.strength};b.isMercenary(o)?a.push(r):o.cost_type==="Leadership"?n.push(r):o.cost_type==="Dominance"&&s.push(r)}),e.push("🏆 OPTIMIZED ARMY COMPOSITION"),e.push("═".repeat(60)),e.push(""),e.push("📊 ARMY SUMMARY"),e.push("─".repeat(30)),e.push(`Total Units: ${Object.values(t.units).reduce((i,o)=>i+o,0).toLocaleString()}`),e.push(`Total Strength: ${t.totalStrength.toLocaleString()}`),e.push(`Total Health: ${t.totalHealth.toLocaleString()}`),e.push(`Budget Usage: L:${t.totalLeadershipCost} D:${t.totalDominanceCost} M:${t.totalMercenaryCount}`),e.push(""),a.length>0&&(e.push("🗡️ MERCENARY FORCES"),e.push("─".repeat(30)),a.forEach(i=>{e.push(`${i.count.toLocaleString()}x ${i.name}`),e.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),e.push("")),n.length>0&&(e.push("👑 LEADERSHIP FORCES"),e.push("─".repeat(30)),n.sort((i,o)=>o.strength-i.strength),n.forEach(i=>{e.push(`${i.count.toLocaleString()}x ${i.name}`),e.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),e.push("")),s.length>0&&(e.push("⚡ DOMINANCE FORCES"),e.push("─".repeat(30)),s.sort((i,o)=>o.strength-i.strength),s.forEach(i=>{e.push(`${i.count.toLocaleString()}x ${i.name}`),e.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),e.push("")),e.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),e.push("─".repeat(40)),t.stackingOrder.forEach((i,o)=>{const r=this.unitsByName.get(i.unitName);if(!r)return;const l=b.isMercenary(r)?"🗡️":r.cost_type==="Leadership"?"👑":r.cost_type==="Dominance"?"⚡":"❓";e.push(`${o+1}. ${l} ${i.count.toLocaleString()}x ${i.unitName} (${i.totalHealth.toLocaleString()} HP)`)}),e.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class ${static formatGroupForLog(t){return`${t.count} ${t.unitName}`}static formatEnemyGroupForLog(t){return`Enemy Group ${t+1}`}static calculateDamageDealt(t){return t.count*t.unitStrength}static createPlayerAttackAction(t,e,n){const s=$.calculateDamageDealt(e);return{turn:t,attacker:$.formatGroupForLog(e),target:$.formatEnemyGroupForLog(n),action:`attack and deal ${s.toLocaleString()} damage`,damageDealt:s,eliminated:!1}}static createEnemyAttackAction(t,e,n){return{turn:t,attacker:$.formatEnemyGroupForLog(e),target:$.formatGroupForLog(n),action:`attack and kill ${$.formatGroupForLog(n)}`,eliminated:!0}}static formatCombatLogForDisplay(t){return t.map(e=>e.eliminated?`${e.attacker} ${e.action}`:`${e.attacker} ${e.action}`)}static calculateBattleStatistics(t,e){const n=t.filter(o=>!o.eliminated),s=t.filter(o=>o.eliminated),a={},i={};return n.forEach(o=>{const r=o.attacker.split(" ").slice(1).join(" "),l=o.damageDealt||0;a[r]=(a[r]||0)+l,i[r]=(i[r]||0)+1}),{totalPlayerAttacks:n.length,totalEnemyAttacks:s.length,averageDamagePerAttack:n.length>0?e/n.length:0,damageByUnitType:a,attacksByUnitType:i,eliminationRate:s.length>0?s.length/t.length:0}}static getBattleSummary(t){const e=t.statistics||$.calculateBattleStatistics(t.combatLog,t.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${t.battleDuration} battle phases
- Player unit turns taken: ${e.totalPlayerAttacks}
- Enemy unit turns taken: ${e.totalEnemyAttacks}
- Total damage dealt to enemies: ${t.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(e.averageDamagePerAttack).toLocaleString()}
- Scenario: ${t.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const T={MAX_BATTLE_TURNS:1e3};class D{simulateBattle(t){const e={currentTurn:0,playerGroups:[...t.playerArmy.stackingOrder],enemyGroupCount:t.enemyGroupCount,totalDamageDealt:0,battleEnded:!1,combatLog:[]};for(;!this.shouldBattleEnd(e)&&e.currentTurn<T.MAX_BATTLE_TURNS;)e.currentTurn++,this.processTurn(e,t.playerGoesFirst);const n=$.calculateBattleStatistics(e.combatLog,e.totalDamageDealt);return{outcome:"player_eliminated",combatLog:e.combatLog,totalDamageDealtToEnemies:e.totalDamageDealt,battleDuration:e.currentTurn,playerSurvivalTurns:e.currentTurn,scenario:t.playerGoesFirst?"best_case":"worst_case",configuration:t,statistics:n}}simulateBothScenarios(t,e){const n={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!0},s=this.simulateBattle(n),a={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!1},i=this.simulateBattle(a),o={damageDifference:s.totalDamageDealtToEnemies-i.totalDamageDealtToEnemies,survivalDifference:s.playerSurvivalTurns-i.playerSurvivalTurns,averageDamage:(s.totalDamageDealtToEnemies+i.totalDamageDealtToEnemies)/2,averageSurvival:(s.playerSurvivalTurns+i.playerSurvivalTurns)/2};return{bestCase:s,worstCase:i,comparison:o}}calculateAttackOrder(t){return[...t].sort((e,n)=>n.unitStrength-e.unitStrength)}calculateEnemyTargetOrder(t){return[...t].sort((e,n)=>n.totalHealth-e.totalHealth)}shouldBattleEnd(t){return t.playerGroups.length===0||t.battleEnded}processTurn(t,e){let n=0,s=0;const a=t.playerGroups.length,i=t.enemyGroupCount,o=Math.max(a,i);for(let r=0;r<o*2&&!(this.shouldBattleEnd(t)||((e?r%2===0:r%2===1)?n<t.playerGroups.length&&(this.processSinglePlayerAttack(t,n),n++):s<t.enemyGroupCount&&t.playerGroups.length>0&&(this.processSingleEnemyAttack(t,s),s++),n>=a&&s>=i));r++);}processSinglePlayerAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateAttackOrder(t.playerGroups);if(e>=n.length)return;const s=n[e],a=e%t.enemyGroupCount,i=$.calculateDamageDealt(s),o=$.createPlayerAttackAction(t.currentTurn,s,a);t.combatLog.push(o),t.totalDamageDealt+=i}processSingleEnemyAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateEnemyTargetOrder(t.playerGroups);if(n.length===0)return;const s=n[0],a=$.createEnemyAttackAction(t.currentTurn,e,s);t.combatLog.push(a);const i=t.playerGroups.findIndex(o=>o.unitName===s.unitName&&o.count===s.count&&o.totalHealth===s.totalHealth);i!==-1&&t.playerGroups.splice(i,1),t.playerGroups.length===0&&(t.battleEnded=!0)}}class w{constructor(){v(this,"container",null);v(this,"battleService");v(this,"currentArmy",null);v(this,"currentAnalysis",null);this.battleService=new D}mount(t,e){this.container=t,this.currentArmy=e,this.render(),this.attachEventListeners()}render(){this.container&&(this.container.innerHTML=`
      <section class="card battle-simulation-section" id="battle-simulation-section">
        <h2 class="section-title">⚔️ Battle Simulation</h2>
        <p class="section-description">
          Simulate battles against enemy forces to analyze best and worst case scenarios.
          Enter the number of enemy groups you expect to face.
        </p>

        <!-- Enemy Input -->
        <div class="enemy-input-container">
          <div class="input-group">
            <label for="enemy-groups" class="input-label">Number of Enemy Groups:</label>
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
            <button id="run-simulation-btn" class="btn btn-primary large-btn">
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
      </section>
    `,this.addBattleSimulationStyles())}attachEventListeners(){const t=document.getElementById("run-simulation-btn"),e=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups");t&&t.addEventListener("click",()=>this.runSimulation()),e&&e.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput())}validateInput(){const t=document.getElementById("enemy-groups"),e=document.getElementById("run-simulation-btn");if(!t||!e)return!1;const n=parseInt(t.value),s=n>=1&&n<=20;return e.disabled=!s,!s&&t.value?t.classList.add("error"):t.classList.remove("error"),s}async runSimulation(){if(!this.currentArmy||!this.validateInput())return;const t=document.getElementById("enemy-groups"),e=parseInt(t.value);this.showLoading(!0);try{this.currentAnalysis=this.battleService.simulateBothScenarios(this.currentArmy,e),this.displayResults(),this.showLoading(!1),this.showResults(!0);const n=document.getElementById("clear-simulation-btn");n&&(n.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showError("Failed to run battle simulation. Please try again."),this.showLoading(!1)}}displayResults(){if(!this.currentAnalysis)return;const t=document.getElementById("simulation-results");if(!t)return;const{bestCase:e,worstCase:n,comparison:s}=this.currentAnalysis;t.innerHTML=`
      <div class="results-header">
        <h3>📊 Battle Analysis Results</h3>
        <p class="results-summary">
          Simulation complete! Here's how your army performs against ${e.configuration.enemyGroupCount} enemy groups.
        </p>
      </div>

      <div class="scenario-comparison">
        <div class="scenario-card best-case">
          <h4>🟢 Best Case Scenario</h4>
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
          <h4>🔴 Worst Case Scenario</h4>
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
            ${this.formatCombatLog(e.combatLog)}
          </div>
          <div id="worst-case-log" class="combat-log hidden">
            ${this.formatCombatLog(n.combatLog)}
          </div>
        </div>
      </div>
    `,this.attachLogTabListeners()}formatCombatLog(t){return t.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${t.map(n=>`
      <div class="log-entry">
        <span class="turn-number">Turn ${n.turn}:</span>
        <span class="action-text">${n.attacker} ${n.action}</span>
      </div>
    `).join("")}</div>`}attachLogTabListeners(){const t=document.querySelectorAll(".log-tab");t.forEach(e=>{e.addEventListener("click",n=>{const s=n.target,a=s.dataset.scenario;t.forEach(r=>r.classList.remove("active")),s.classList.add("active"),document.querySelectorAll(".combat-log").forEach(r=>{r.classList.remove("active"),r.classList.add("hidden")});const o=document.getElementById(`${a}-case-log`);o&&(o.classList.add("active"),o.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const t=document.getElementById("clear-simulation-btn");t&&(t.style.display="none")}showLoading(t){const e=document.getElementById("simulation-loading");e&&e.classList.toggle("hidden",!t)}showResults(t){const e=document.getElementById("simulation-results");e&&e.classList.toggle("hidden",!t)}showError(t){alert(t)}addBattleSimulationStyles(){const t=document.createElement("style");t.textContent=`
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
        padding: 0.25rem 0;
        border-bottom: 1px solid #f0f0f0;
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
    `,document.head.appendChild(t)}}class I{constructor(){v(this,"container",null);v(this,"unitLoader");v(this,"optimizer",null);v(this,"selectedUnits",new Set);v(this,"mercenaryLimits",{});v(this,"battleSimulation",null);v(this,"currentOptimizedArmy",null);this.unitLoader=new U}async mount(t){this.container=t,this.render(),this.attachEventListeners(),await this.loadInitialData()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(t)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(t){console.error("Failed to load unit data:",t)}}attachEventListeners(){const t=document.getElementById("unit-search"),e=document.getElementById("unit-type-filter"),n=document.getElementById("optimize-btn"),s=document.getElementById("clear-btn"),a=document.getElementById("select-all-visible"),i=document.getElementById("clear-selection"),o=document.getElementById("leadership-budget"),r=document.getElementById("dominance-budget");t&&t.addEventListener("input",()=>this.filterAndDisplayUnits()),e&&e.addEventListener("change",()=>this.filterAndDisplayUnits()),n&&n.addEventListener("click",()=>this.optimizeArmy()),s&&s.addEventListener("click",()=>this.clearSelection()),a&&a.addEventListener("click",()=>this.selectAllVisible()),i&&i.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("input",()=>this.updateOptimizeButton()),r&&r.addEventListener("input",()=>this.updateOptimizeButton()),document.addEventListener("click",l=>{const u=l.target;u.classList.contains("filter-tab")&&this.handleFilterTabClick(u)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const t=document.getElementById("unit-type-filter");if(!t)return;const e=this.unitLoader.getUniqueUnitTypes();t.innerHTML='<option value="">All Unit Types</option>',e.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,t.appendChild(s)})}updateFilterTabCounts(){const t=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const s=n.getAttribute("data-filter");let a=0;s==="all"?a=t.length:a=t.filter(i=>this.getMainCategory(i)===s).length,n.textContent=`${s==="all"?"All":s} (${a})`})}handleFilterTabClick(t){document.querySelectorAll(".filter-tab").forEach(e=>e.classList.remove("active")),t.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var a,i,o;const t=((a=document.getElementById("unit-search"))==null?void 0:a.value)||"",e=((i=document.querySelector(".filter-tab.active"))==null?void 0:i.getAttribute("data-filter"))||"all",n=((o=document.getElementById("unit-type-filter"))==null?void 0:o.value)||"";let s=this.unitLoader.getAllUnits();if(e!=="all"&&(s=s.filter(r=>this.getMainCategory(r)===e)),n&&(s=s.filter(r=>r.unit_types.includes(n))),t){const r=t.toLowerCase();s=s.filter(l=>l.name.toLowerCase().includes(r)||l.unit_types.some(u=>u.toLowerCase().includes(r)))}this.renderGroupedUnits(s),this.updateSelectedSummary()}renderGroupedUnits(t){const e=document.getElementById("unit-groups");if(!e)return;if(e.innerHTML="",t.length===0){e.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(t);Object.entries(n).forEach(([s,a])=>{const i=this.createMainCategoryElement(s,a);e.appendChild(i)}),this.attachAllEventListeners(n)}createHierarchicalGroups(t){const e={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return t.forEach(n=>{const s=this.getMainCategory(n),a=this.getSubCategory(n),i=this.getUnitFamily(n);e[s][a]||(e[s][a]={}),e[s][a][i]||(e[s][a][i]=[]),e[s][a][i].push(n)}),Object.values(e).forEach(n=>{Object.values(n).forEach(s=>{Object.values(s).forEach(a=>{a.sort((i,o)=>i.strength-o.strength)})})}),e}getMainCategory(t){if(t.cost_type==="Mercenary"||t.authority_cost>0)return"Mercenaries";const e=t.unit_types;return e.includes("Engineer corps")||e.includes("Siege engine")?"Engineer Corps":e.includes("Guardsman")?"Guardsmen":e.includes("Specialist")?"Specialists":e.includes("Beast")||e.includes("Dragon")||e.includes("Giant")||e.includes("Elemental")||e.includes("ELEMENTAL")||e.includes("Flying")&&!e.includes("Human")?"Monsters":e.includes("Human")&&(e.includes("Melee")||e.includes("Ranged")||e.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(t){const e=t.unit_types,n=t.name.toUpperCase(),s=this.getMainCategory(t);if(s==="Mercenaries")return e.includes("Guardsman")?"Elite Forces":"Special Forces";if(s==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(e.includes("Siege engine"))return"Siege Engines"}if(s==="Monsters"){if(e.includes("Dragon"))return"Dragons";if(e.includes("Giant"))return"Giants";if(e.includes("Beast"))return"Beasts";if(e.includes("Elemental")||e.includes("ELEMENTAL"))return"Elementals";if(e.includes("Flying"))return"Flying"}if(s==="Guardsmen"||s==="Specialists"){if(e.includes("Ranged"))return"Ranged";if(e.includes("Melee"))return"Melee";if(e.includes("Mounted"))return"Mounted";if(e.includes("Flying")||e.includes("Beast"))return"Flying";if(e.includes("Scout"))return"Scouts"}return e.includes("Human")?"Infantry":"Other"}getUnitFamily(t){let e=t.name;return e=e.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),e.includes("HEAVY "),e}createMainCategoryElement(t,e){const n=document.createElement("div");n.className="main-category";const s=this.countUnitsInCategory(e),a=this.countSelectedUnitsInCategory(e);return n.innerHTML=`
      <div class="main-category-header" data-category="${t}">
        <div class="category-title">
          <h3>${t} (${a}/${s})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${t}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${t}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(e).map(([i,o])=>this.createSubCategoryHTML(t,i,o)).join("")}
      </div>
    `,n}createSubCategoryHTML(t,e,n){const s=Object.values(n).reduce((i,o)=>i+o.length,0),a=Object.values(n).reduce((i,o)=>i+o.filter(r=>this.selectedUnits.has(r.name)).length,0);return`
      <div class="sub-category" data-category="${t}" data-subcategory="${e}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${e} (${a}/${s})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(n).map(([i,o])=>this.createUnitFamilyHTML(i,o)).join("")}
        </div>
      </div>
    `}createUnitFamilyHTML(t,e){const n=e.filter(s=>this.selectedUnits.has(s.name)).length;return`
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
          ${e.map(s=>this.createUnitCard(s)).join("")}
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
    `}attachAllEventListeners(t){document.querySelectorAll(".main-category").forEach((e,n)=>{const a=Object.keys(t)[n];if(a){const i=t[a];this.attachMainCategoryListeners(e,a,i)}}),document.querySelectorAll(".sub-category").forEach(e=>{var a;const n=e.getAttribute("data-category"),s=e.getAttribute("data-subcategory");if(n&&s&&((a=t[n])!=null&&a[s])){const i=t[n][s];this.attachSubCategoryListeners(e,i)}}),document.querySelectorAll(".unit-family").forEach(e=>{const n=e.getAttribute("data-family");let s=[];Object.values(t).forEach(a=>{Object.values(a).forEach(i=>{i[n]&&(s=i[n])})}),s.length>0&&this.attachUnitFamilyListeners(e,s)})}countUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((s,a)=>s+a.length,0),0)}countSelectedUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((s,a)=>s+a.filter(i=>this.selectedUnits.has(i.name)).length,0),0)}attachMainCategoryListeners(t,e,n){const s=t.querySelector(".main-category-header"),a=t.querySelector(".main-category-content"),i=t.querySelector(".expand-icon");if(!s||!a||!i){console.warn("Missing main-category elements for",e,{header:!!s,content:!!a,expandIcon:!!i});return}s.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Main category header clicked:",e,"collapsed:",a.classList.contains("collapsed")),a.classList.toggle("collapsed"),i.textContent=a.classList.contains("collapsed")?"▼":"▲"});const o=t.querySelector(".select-category"),r=t.querySelector(".deselect-category");o&&o.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInCategory(n)}),r&&r.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(t,e){const n=t.querySelector(".sub-category-header"),s=t.querySelector(".sub-category-content"),a=t.querySelector(".expand-icon");if(!n||!s||!a){console.warn("Missing sub-category elements:",{header:!!n,content:!!s,expandIcon:!!a});return}n.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Sub-category header clicked, toggling:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲"});const i=t.querySelector(".select-subcategory"),o=t.querySelector(".deselect-subcategory");i&&i.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInFamilies(e)}),o&&o.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInFamilies(e)})}attachUnitFamilyListeners(t,e){const n=t.querySelector(".unit-family-header"),s=t.querySelector(".unit-family-content"),a=t.querySelector(".expand-icon");n.addEventListener("click",l=>{l.target.classList.contains("btn")||(s.classList.toggle("collapsed"),a.textContent=s.classList.contains("collapsed")?"▼":"▲")});const i=t.querySelector(".select-family"),o=t.querySelector(".deselect-family");i&&i.addEventListener("click",l=>{l.stopPropagation(),this.selectAllUnits(e)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllUnits(e)}),t.querySelectorAll(".unit-card").forEach(l=>{l.addEventListener("click",()=>{const u=l.getAttribute("data-unit");if(u){const d=this.unitLoader.getUnitByName(u);d&&this.toggleUnitSelection(d)}})})}getUnitCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}toggleUnitSelection(t){this.selectedUnits.has(t.name)?(this.selectedUnits.delete(t.name),t.cost_type==="Mercenary"&&delete this.mercenaryLimits[t.name]):(this.selectedUnits.add(t.name),t.cost_type==="Mercenary"&&(this.mercenaryLimits[t.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(t=>{const e=t.getAttribute("data-unit");e&&(this.selectedUnits.has(e)?t.classList.add("selected"):t.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((t,e)=>{const n=t.querySelector(".category-title h3");if(n){const a=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][e];if(a){const{selected:i,total:o}=this.countUnitsInMainCategory(a),l=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${l} (${i}/${o})`}}}),document.querySelectorAll(".sub-category").forEach(t=>{const e=t.querySelector(".subcategory-title h4"),n=t.getAttribute("data-category"),s=t.getAttribute("data-subcategory");if(e&&n&&s){const{selected:a,total:i}=this.countUnitsInSubCategory(n,s),r=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${r} (${a}/${i})`}}),document.querySelectorAll(".unit-family").forEach(t=>{const e=t.querySelector(".family-title h5"),n=t.getAttribute("data-family");if(e&&n){const{selected:s,total:a}=this.countUnitsInFamily(n),o=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${o} (${s}/${a})`}})}countUnitsInMainCategory(t){const n=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===t);return{selected:n.filter(a=>this.selectedUnits.has(a.name)).length,total:n.length}}countUnitsInSubCategory(t,e){const s=this.unitLoader.getAllUnits().filter(i=>this.getMainCategory(i)===t&&this.getSubCategory(i)===e);return{selected:s.filter(i=>this.selectedUnits.has(i.name)).length,total:s.length}}countUnitsInFamily(t){const n=this.unitLoader.getAllUnits().filter(a=>this.getUnitFamily(a)===t);return{selected:n.filter(a=>this.selectedUnits.has(a.name)).length,total:n.length}}updateSelectedSummary(){const t=document.getElementById("selected-count");t&&(t.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(e=>{const n=e.getAttribute("data-unit");if(n){const s=this.unitLoader.getUnitByName(n);s&&(this.selectedUnits.add(s.name),s.cost_type==="Mercenary"&&(this.mercenaryLimits[s.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(t){Object.values(t).forEach(e=>{this.selectAllInFamilies(e)})}deselectAllInCategory(t){Object.values(t).forEach(e=>{this.deselectAllInFamilies(e)})}selectAllInFamilies(t){Object.values(t).forEach(e=>{this.selectAllUnits(e)})}deselectAllInFamilies(t){Object.values(t).forEach(e=>{this.deselectAllUnits(e)})}selectAllUnits(t){t.forEach(e=>{this.selectedUnits.add(e.name),e.cost_type==="Mercenary"&&(this.mercenaryLimits[e.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(t){t.forEach(e=>{this.selectedUnits.delete(e.name),e.cost_type==="Mercenary"&&delete this.mercenaryLimits[e.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const t=document.getElementById("mercenary-limits");if(!t)return;const e=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&n.cost_type==="Mercenary");if(e.length===0){t.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}t.innerHTML="",e.forEach(n=>{if(!n)return;const s=document.createElement("div");s.className="mercenary-item",s.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">🗡️ ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,s.querySelector("input").addEventListener("change",i=>{const o=i.target;this.mercenaryLimits[o.dataset.unit]=parseInt(o.value)||1}),t.appendChild(s)})}updateOptimizeButton(){const t=document.getElementById("optimize-btn"),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!t||!e||!n)return;const s=this.selectedUnits.size>0,a=parseInt(e.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;t.disabled=!s||!a}async optimizeArmy(){try{this.showLoadingModal();const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new k(t);const e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),s={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},a=await this.optimizer.optimizeArmy(s);this.displayResults(a)}catch(t){console.error("Optimization failed:",t),alert("Optimization failed. Please check your inputs and try again.")}finally{this.hideLoadingModal()}}displayResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),s=document.getElementById("results-section");!e||!n||!s||(e.innerHTML=`
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
    `,n.innerHTML="",t.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.compositions.forEach((a,i)=>{const o=this.createCompositionElement(a,i+1);n.appendChild(o)}),s.classList.remove("hidden"),t.compositions.length>0&&(this.currentOptimizedArmy=t.compositions[0],this.showBattleSimulation()))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const t=document.getElementById("battle-simulation-container");t&&(this.battleSimulation||(this.battleSimulation=new w),this.battleSimulation.mount(t,this.currentOptimizedArmy),t.classList.remove("hidden"),setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(t,e){var o;const n=document.createElement("div");n.className="army-composition";const s=((o=this.optimizer)==null?void 0:o.explainStacking(t))||"No stacking explanation available",a=`
      <div class="composition-header">
        <div class="composition-title">Solution ${e} ${t.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${t.efficiencyScore.toFixed(2)}</div>
      </div>
    `,i=s.split(`
`).map(r=>r.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${r}</h3>`:r.includes("═".repeat(60))?'<hr class="title-divider">':r.includes("📊 ARMY SUMMARY")||r.includes("🗡️ MERCENARY FORCES")||r.includes("👑 LEADERSHIP FORCES")||r.includes("⚡ DOMINANCE FORCES")||r.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${r}</h4>`:r.includes("─".repeat(30))||r.includes("─".repeat(40))?'<hr class="section-divider">':r.includes("└─")?`<div class="unit-detail">${r}</div>`:r.trim()&&!r.includes("═")&&!r.includes("─")?`<div class="unit-line">${r}</div>`:r.trim()===""?'<div class="spacing"></div>':"").filter(r=>r!=="").join("");return n.innerHTML=a+'<div class="composition-content">'+i+"</div>",n}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const t=document.getElementById("leadership-budget"),e=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),s=document.getElementById("battle-simulation-container");t&&(t.value="0"),e&&(e.value="0"),n&&n.classList.add("hidden"),s&&s.classList.add("hidden"),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}showLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.remove("hidden")}hideLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{const S=document.getElementById("app");if(!S)throw new Error("App container not found");new I().mount(S),window.addEventListener("error",e=>{console.error("Global error:",e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-C7F482ai.js.map
