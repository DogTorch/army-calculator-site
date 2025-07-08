var P=Object.defineProperty;var O=(C,t,e)=>t in C?P(C,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):C[t]=e;var f=(C,t,e)=>O(C,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class v{static isMercenary(t){return t.cost_type==="Mercenary"||t.authority_cost>0}static getPrimaryCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}static getStrengthPerCost(t){const e=v.getPrimaryCost(t);return e>0?t.strength/e:0}static getHealthPerCost(t){const e=v.getPrimaryCost(t);return e>0?t.health/e:0}}class N{constructor(){f(this,"units",[]);f(this,"unitsByName",new Map);f(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(t){try{let e;if(typeof t=="string"){console.log(`Loading units from: ${t}`);const n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);e=await n.json()}else e=t;if(!Array.isArray(e))throw new Error("Unit data must be an array");return this.units=e.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(e){throw console.error("❌ Error loading units:",e),e}}validateAndNormalizeUnit(t){const e={name:t.name||"Unknown",unit_types:Array.isArray(t.unit_types)?t.unit_types:[],cost_type:t.cost_type||"Leadership",health:Number(t.health)||0,strength:Number(t.strength)||0,leadership_cost:Number(t.leadership_cost)||0,dominance_cost:Number(t.dominance_cost)||0,authority_cost:Number(t.authority_cost)||0,food_consumption:Number(t.food_consumption)||0,carrying_capacity:Number(t.carrying_capacity)||0,revival_cost_gold:Number(t.revival_cost_gold)||0,revival_cost_silver:Number(t.revival_cost_silver)||0,source_file:t.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(e.cost_type)||(console.warn(`Invalid cost type for unit ${e.name}: ${e.cost_type}`),e.cost_type="Leadership"),e}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(t=>[t.name,t])),this.units.forEach(t=>{v.isMercenary(t)?this.unitsByCostType.Mercenary.push(t):t.cost_type in this.unitsByCostType&&this.unitsByCostType[t.cost_type].push(t)}),Object.keys(this.unitsByCostType).forEach(t=>{this.unitsByCostType[t].sort((e,n)=>e.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(t){return this.unitsByName.get(t)}getUnitsByCostType(t){return[...this.unitsByCostType[t]]}getAvailableUnits(t){const e=[];for(const n of t){const s=this.getUnitByName(n);s?e.push(s):console.warn(`Unit '${n}' not found in loaded data`)}return e}filterUnits(t){let e=this.units;return t.costType&&(e=e.filter(n=>n.cost_type===t.costType)),t.unitTypes&&t.unitTypes.length>0&&(e=e.filter(n=>t.unitTypes.some(s=>n.unit_types.includes(s)))),t.minStrength!==void 0&&(e=e.filter(n=>n.strength>=t.minStrength)),t.maxCost!==void 0&&(e=e.filter(n=>v.getPrimaryCost(n)<=t.maxCost)),e}searchUnits(t){if(!t.trim())return this.getAllUnits();const e=t.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(e))}getEnhancedUnits(){return this.units.map(t=>({...t,get isMercenary(){return v.isMercenary(t)},get primaryCost(){return v.getPrimaryCost(t)},get strengthPerCost(){return v.getStrengthPerCost(t)},get healthPerCost(){return v.getHealthPerCost(t)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...t),max:Math.max(...t)},healthRange:{min:Math.min(...e),max:Math.max(...e)}}}getUniqueUnitTypes(){const t=new Set;return this.units.forEach(e=>{e.unit_types.forEach(n=>t.add(n))}),Array.from(t).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const t=this.units.map(n=>n.strength),e=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,s)=>n+s,0)/t.length)},healthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,s)=>n+s,0)/e.length)},topUnitsByStrength:[...this.units].sort((n,s)=>s.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,s)=>s.health-n.health).slice(0,10)}}}class k{constructor(t){f(this,"availableUnits");f(this,"unitsByName");f(this,"leadershipUnits");f(this,"dominanceUnits");f(this,"mercenaryUnits");this.availableUnits=[...t],this.unitsByName=new Map(t.map(e=>[e.name,e])),this.leadershipUnits=t.filter(e=>e.cost_type==="Leadership").sort((e,n)=>e.strength-n.strength),this.dominanceUnits=t.filter(e=>e.cost_type==="Dominance").sort((e,n)=>e.strength-n.strength),this.mercenaryUnits=t.filter(e=>v.isMercenary(e)).sort((e,n)=>e.strength-n.strength)}async optimizeArmy(t){const e=performance.now();console.log(`🔍 Optimizing army with L:${t.leadershipBudget} D:${t.dominanceBudget} M:${Object.keys(t.mercenaryLimits).length}`),console.log(`📋 Selected units: ${t.availableUnits.join(", ")}`);const n=[],s=this.generateGuaranteedValidCompositions(t);console.log(`Generated ${s.length} guaranteed valid army combinations`);let i=0;for(const c of s){i++;const g=this.evaluateComposition(c);n.push(g)}const a=performance.now();console.log(`Evaluated ${i} combinations, found ${n.length} valid stackings`);const o=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Leadership"),l=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&c.cost_type==="Dominance"),r=this.availableUnits.filter(c=>t.availableUnits.includes(c.name)&&v.isMercenary(c)),d=n.filter(c=>{const g=o.some(p=>c.units[p.name]&&c.units[p.name]>0),u=l.some(p=>c.units[p.name]&&c.units[p.name]>0),h=r.some(p=>c.units[p.name]&&c.units[p.name]>0);return[o.length>0?g:!0,l.length>0?u:!0,r.length>0?h:!0].every(p=>p)});return d.sort((c,g)=>{const u=c.totalLeadershipCost/t.leadershipBudget+c.totalDominanceCost/t.dominanceBudget;return g.totalLeadershipCost/t.leadershipBudget+g.totalDominanceCost/t.dominanceBudget-u}),{compositions:d.length>0?[d[0]]:n.slice(0,1),totalCombinationsEvaluated:i,validStackingsFound:n.length,executionTimeMs:a-e}}generateGuaranteedValidCompositions(t){const e=[],n=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Leadership").sort((a,o)=>o.strength-a.strength),s=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&a.cost_type==="Dominance").sort((a,o)=>o.strength-a.strength),i=this.availableUnits.filter(a=>t.availableUnits.includes(a.name)&&v.isMercenary(a));if(console.log(`Selected units: L:${n.length} D:${s.length} M:${i.length}`),console.log("Leadership units:",n.map(a=>a.name)),console.log("Dominance units:",s.map(a=>a.name)),console.log("Mercenary units:",i.map(a=>a.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${s.length} M:${i.length}`),console.log(`Budgets: Leadership:${t.leadershipBudget} Dominance:${t.dominanceBudget}`),n.length>0&&s.length>0&&i.length>0&&t.leadershipBudget>0&&t.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const a=[...n,...i];e.push(...this.generateCombinedStackedCompositions(a,s,t.leadershipBudget,t.dominanceBudget,t.mercenaryLimits))}else if(n.length>0&&i.length>0&&s.length===0&&t.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const a=[...n,...i],o=this.calculateProperStackingQuantities(a,t.leadershipBudget,t.mercenaryLimits);e.push(o)}else if(s.length>0&&i.length>0&&n.length===0&&t.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(s,t.dominanceBudget),o={};for(const r of i)o[r.name]=t.mercenaryLimits[r.name]||1;const l={...a,...o};e.push(l)}else if(n.length>0&&s.length>0&&i.length===0&&t.leadershipBudget>0&&t.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),e.push(...this.generateCombinedStackedCompositions(n,s,t.leadershipBudget,t.dominanceBudget,{}));else if(n.length>0&&s.length===0&&i.length===0&&t.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const a=this.calculateProperStackingQuantities(n,t.leadershipBudget,{});e.push(a)}else if(s.length>0&&n.length===0&&i.length===0&&t.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const a=this.calculateProperStackingQuantitiesForDominance(s,t.dominanceBudget);e.push(a)}else if(i.length>0&&n.length===0&&s.length===0){console.log("🗡️ Generating Mercenary-only compositions");const a={};for(const o of i){const l=t.mercenaryLimits[o.name]||1;a[o.name]=l}Object.keys(a).length>0&&e.push(a)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&i.length>0&&t.leadershipBudget>0&&e.push(...this.generateMercenaryMixedCompositions(n,i,t.leadershipBudget,t.mercenaryLimits,"leadership_cost")),s.length>0&&i.length>0&&t.dominanceBudget>0&&e.push(...this.generateMercenaryMixedCompositions(s,i,t.dominanceBudget,t.mercenaryLimits,"dominance_cost")),e}generateStackedCompositionsWithMercenaries(t,e,n,s){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const i=[...t,...e];console.log(`🚨 About to call calculateProperStackingQuantities with ${i.length} units`);const a=this.calculateProperStackingQuantities(i,n,s);return console.log("🚨 Got composition back:",a),[a]}calculateCleanStackingPattern(t,e){const n={};if(t.length===0)return n;const s=t[0];n[s.name]=1,console.log(`🎯 Starting with 1x ${s.name} (STR: ${s.strength})`);for(let i=1;i<t.length;i++){const a=t[i],o=t[i-1],l=o.health*(n[o.name]||1),r=Math.ceil((l+1)/a.health);n[a.name]=r,console.log(`📋 ${a.name}: need ${r} units (${r*a.health} HP) to exceed ${o.name} (${l} HP)`)}return n}calculateProperStackingQuantities(t,e,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${e}`);const s={},i=[...t].sort((c,g)=>g.strength-c.strength),a=i.filter(c=>c.cost_type==="Leadership"),o=i.filter(c=>v.isMercenary(c));if(i.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),s;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${i.length} units (${a.length} leadership + ${o.length} mercenary)`);const l=i[0],r={};r[l.name]=1;const d=l.health*1;console.log(`🔧 Base: 1x ${l.name} = ${d} HP (strongest)`);for(let c=1;c<i.length;c++){const g=i[c],u=Math.ceil((d+1)/g.health);r[g.name]=u;const h=v.isMercenary(g)?"mercenary":"leadership";console.log(`🔧 Base: ${u}x ${g.name} = ${u*g.health} HP (beats ${d}) [${h}]`)}console.log("🔧 Validating base pattern stacking order...");for(let c=0;c<i.length-1;c++){const g=i[c],u=i[c+1],h=g.health*r[g.name];let y=u.health*r[u.name];if(y<=h)if(v.isMercenary(u))console.log(`🔧 WARNING: ${u.name} mercenary limit (${r[u.name]}) gives ${y} HP, can't beat ${h} HP`);else{const p=Math.ceil((h+1)/u.health);r[u.name]=p,y=u.health*p,console.log(`🔧 Fixed: ${u.name} increased to ${p} units = ${y} HP (now beats ${h})`)}else console.log(`🔧 OK: ${u.name} ${r[u.name]} units = ${y} HP (beats ${h})`)}let m=0;for(const[c,g]of Object.entries(r)){const u=this.unitsByName.get(c);u&&u.cost_type==="Leadership"&&(m+=g*u.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${m}`),m===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[c,g]of Object.entries(r))s[c]=g}else{const c=Math.floor(e/m);console.log(`🔧 Can afford ${c} base stacks (${e} / ${m})`);for(const[g,u]of Object.entries(r)){const h=this.unitsByName.get(g);if(h&&v.isMercenary(h)){const y=u*c,p=n[g]||1;s[g]=Math.min(y,p),y>p?console.log(`🔧 Mercenary ${g}: wanted ${y}, capped at limit ${p}`):console.log(`🔧 Mercenary ${g}: scaled to ${y} (under limit ${p})`)}else s[g]=u*c}}return console.log("🔧 SIMPLE STACKING: Final composition:",s),s}calculateProperStackingQuantitiesForDominance(t,e){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${e}`);const n={},s=[...t].sort((d,m)=>m.strength-d.strength);if(s.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${s.length} dominance units`);const i=s[0],a={};a[i.name]=1;const o=i.health*1;console.log(`🔧 Base: 1x ${i.name} = ${o} HP (strongest)`);for(let d=1;d<s.length;d++){const m=s[d],c=Math.ceil((o+1)/m.health);a[m.name]=c,console.log(`🔧 Base: ${c}x ${m.name} = ${c*m.health} HP (beats ${o})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let d=0;d<s.length-1;d++){const m=s[d],c=s[d+1],g=m.health*a[m.name];let u=c.health*a[c.name];if(u<=g){const h=Math.ceil((g+1)/c.health);a[c.name]=h,u=c.health*h,console.log(`🔧 Fixed: ${c.name} increased to ${h} units = ${u} HP (now beats ${g})`)}else console.log(`🔧 OK: ${c.name} ${a[c.name]} units = ${u} HP (beats ${g})`)}let l=0;for(const[d,m]of Object.entries(a)){const c=this.unitsByName.get(d);c&&c.cost_type==="Dominance"&&(l+=m*c.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${l}`),l===0)return console.log("🔧 No dominance costs found"),n;const r=Math.floor(e/l);console.log(`🔧 Can afford ${r} base stacks (${e} / ${l})`);for(const[d,m]of Object.entries(a))n[d]=m*r;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(t){return Object.entries(t).reduce((e,[n,s])=>{const i=this.unitsByName.get(n);return i&&i.cost_type==="Leadership"?e+s*i.leadership_cost:e},0)}calculateMaxStacksByMercenaries(t,e){let n=1/0;for(const[s,i]of Object.entries(t)){const a=this.unitsByName.get(s);if(a&&v.isMercenary(a)){const o=e[s]||1,l=Math.floor(o/i);n=Math.min(n,l),console.log(`🗡️ ${s}: limit ${o}, base need ${i}, allows ${l} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(t,e,n,s){const i=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const a=[...t,...e].sort((c,g)=>g.strength-c.strength);if(a.length===0)return i;const o=this.calculateCleanStackingPattern(a,s);console.log("📊 Dominance + Mercenary base pattern:",o);const l=Object.entries(o).reduce((c,[g,u])=>{const h=this.unitsByName.get(g);return h&&h.cost_type==="Dominance"?c+u*h.dominance_cost:c},0);if(console.log(`💰 Dominance cost per stack: ${l}`),l>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const c={};for(const g of e)c[g.name]=s[g.name]||1;return i.push(c),t.length>0&&i.push(...this.generateStackedCompositions(t,n,"dominance_cost")),i}const r=Math.floor(n/l),d=this.calculateMaxStacksByMercenaries(o,s),m=Math.min(r,d);console.log(`🔢 Max Dominance+Mercenary stacks: ${m}`);for(let c=1;c<=Math.min(m,5);c++){const g={};for(const[u,h]of Object.entries(o)){const y=this.unitsByName.get(u);y&&v.isMercenary(y)?g[u]=Math.min(h*c,s[u]||1):g[u]=h*c}i.push(g)}if(d<r&&t.length>0){const c=n-m*l,g=this.generateStackedCompositions(t,c,"dominance_cost"),u={};for(const h of e)u[h.name]=s[h.name]||1;for(const h of g.slice(0,3)){const y={...u,...h};i.push(y)}}return i}generateStackedCompositions(t,e,n){const s=[];if(t.length===0||e<=0)return s;const i=t[0];console.log(`🎯 Strongest unit: ${i.name} (STR: ${i.strength})`);const a=this.calculateStackingPattern(t);console.log("📊 Base stacking pattern:",a);const o=Object.entries(a).reduce((r,[d,m])=>{const c=this.unitsByName.get(d);if(c){const g=c[n];return r+m*g}return r},0);if(console.log(`💰 Base pattern cost: ${o}`),o<=0)return s;const l=Math.floor(e/o);console.log(`🔢 Max multiplier: ${l}`);for(let r=1;r<=Math.min(l,10);r++){const d={};for(const[m,c]of Object.entries(a))d[m]=c*r;s.push(d)}return t.length>1&&s.push(...this.generateStackingVariations(t,e,n)),s}calculateStackingPattern(t){const e={};if(t.length===0)return e;const n=t[0];e[n.name]=1;for(let s=1;s<t.length;s++){const i=t[s],a=t[s-1],o=a.health*(e[a.name]||1),l=Math.ceil((o+1)/i.health);e[i.name]=l,console.log(`📋 ${i.name}: need ${l} units (${l*i.health} HP) to exceed ${a.name} (${o} HP)`)}return e}generateCombinedStackedCompositions(t,e,n,s,i={}){const a=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const o=t.filter(x=>x.cost_type==="Leadership"),l=t.filter(x=>v.isMercenary(x));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const r=[...o,...l],m=[this.calculateProperStackingQuantities(r,n,i)];if(m.length===0)return a;const c=m[m.length-1];if(!c)return a;console.log("🎯 Using maximum Leadership composition for combination");const g=c,u=e[0];console.log(`🎯 Strongest Dominance unit: ${u.name} (STR: ${u.strength})`);const h=this.findClosestStrengthUnit(u,t);if(!h)return console.log("❌ No suitable Leadership unit found for comparison"),a;console.log(`🔍 Comparing to Leadership unit: ${h.name} (STR: ${h.strength})`);const y=g[h.name]||0,p=h.health*y;if(console.log(`📊 Comparison unit total health: ${p} (${y}x ${h.health})`),p<=0)return console.log("❌ Comparison unit not in Leadership composition"),a;const b=u.health;b>=p&&(console.log(`⚠️ Single Dominance unit too strong: ${b} HP >= ${p} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const E=[this.calculateProperStackingQuantitiesForDominance(e,s)];if(E.length>0){const x=E[E.length-1],w={...g,...x};a.push(w),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),a.push(g);return a}findClosestStrengthUnit(t,e){if(e.length===0)return null;let n=e[0],s=Math.abs(t.strength-n.strength);for(const i of e){const a=Math.abs(t.strength-i.strength);a<s&&(s=a,n=i)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${t.name} (STR: ${t.strength}), diff: ${s}`),n}calculateConstrainedDominanceStack(t,e,n){const s={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),t.length===0||e<=0||n<=0)return s;const i=t[0],a=Math.floor((n-1)/i.health),o=Math.floor(e/i.dominance_cost),l=Math.min(a,o);if(l<=0)return console.log(`❌ Cannot fit any ${i.name} within constraints`),s;for(let r=Math.min(l,3);r>=1;r--){const d={};d[i.name]=r;let m=r*i.dominance_cost,c=r*i.health;console.log(`🧪 Testing ${r}x ${i.name} (${c} HP, ${m} cost)`);for(let u=1;u<t.length&&m<e;u++){const h=t[u],y=e-m,p=Math.ceil((c+1)/h.health),b=Math.floor(y/h.dominance_cost),S=Math.min(p,b);S>0&&(d[h.name]=S,m+=S*h.dominance_cost,console.log(`  ➕ Added ${S}x ${h.name} (${S*h.health} HP)`))}const g=Object.entries(d).reduce((u,[h,y])=>{const p=this.unitsByName.get(h);return p?u+y*p.health:u},0);if(g<n)return console.log(`✅ Valid Dominance stack: ${g} HP < ${n} HP limit`),d;console.log(`❌ Dominance stack too strong: ${g} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),s}generateMercenaryMixedCompositions(t,e,n,s,i){const a=[];console.log("🗡️ Generating mixed compositions with mercenaries");const o=this.generateStackedCompositions(t,n,i);if(o.length===0)return a;for(const l of o.slice(0,3)){const r=e.sort((p,b)=>b.strength-p.strength)[0];if(!r)continue;console.log(`🎯 Strongest Mercenary: ${r.name} (STR: ${r.strength})`);const d=this.findClosestStrengthUnit(r,t);if(!d){console.log("❌ No suitable base unit found for comparison");continue}const m=l[d.name]||0,c=d.health*m;if(console.log(`📊 Comparison base unit total health: ${c}`),c<=0){console.log("❌ Comparison unit not in base composition");continue}const g=r.health,u=s[r.name]||1,h=g*u;if(h>=c){console.log(`⚠️ Mercenary too strong: ${h} HP >= ${c} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const p=Math.floor((c-1)/g);if(p>0){console.log(`✅ Using ${p}x ${r.name} instead of ${u}`);const b={...l};b[r.name]=p;for(const S of e)if(S.name!==r.name){const E=s[S.name]||1;b[S.name]=E}a.push(b),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),a.push(l);continue}const y={...l};for(const p of e){const b=s[p.name]||1;y[p.name]=b}a.push(y),console.log("✅ Created mixed composition with mercenaries")}return a}createAlternativeDominanceStack(t,e,n){const s={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const i=[...t].sort((l,r)=>l.health-r.health);let a=0,o=0;for(const l of i){const r=Math.floor((n-o-1)/l.health),d=Math.floor((e-a)/l.dominance_cost),m=Math.min(r,d);m>0&&(s[l.name]=m,a+=m*l.dominance_cost,o+=m*l.health,console.log(`➕ Added ${m}x ${l.name} (${m*l.health} HP, ${m*l.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${o} HP total, ${a} cost`),s}calculateMaximizedDominanceStack(t,e,n){console.log(`💰 Maximizing Dominance budget: ${e} with health limit: ${n}`);const s=this.createAlternativeDominanceStack(t,e,n);return Object.keys(s).length>0?s:this.calculateConstrainedDominanceStack(t,e,n)}generateStackingVariations(t,e,n){const s=[],i={},a=t[0],o=a[n];if(o>0){const l=Math.floor(e/o);i[a.name]=Math.min(l,5);let r=e-i[a.name]*o;for(let d=1;d<t.length&&r>0;d++){const m=t[d],c=m[n];if(c>0&&c<=r){const g=Math.floor(r/c/(t.length-d));g>0&&(i[m.name]=g,r-=g*c)}}s.push(i)}return s}generateGuaranteedDiverseCompositions_OLD(t){const e=[],n=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&r.cost_type==="Leadership"),s=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&r.cost_type==="Dominance"),i=this.availableUnits.filter(r=>t.availableUnits.includes(r.name)&&v.isMercenary(r)),a={};let o=0,l=0;for(const r of n)o+r.leadership_cost<=t.leadershipBudget&&(a[r.name]=1,o+=r.leadership_cost);for(const r of s)l+r.dominance_cost<=t.dominanceBudget&&(a[r.name]=1,l+=r.dominance_cost);for(const r of i){const d=t.mercenaryLimits[r.name]||1;a[r.name]=Math.min(1,d)}if(Object.keys(a).length>0&&e.push(a),n.length>0&&t.leadershipBudget>0){const r=n.sort((m,c)=>m.leadership_cost-c.leadership_cost)[0],d=Math.floor(t.leadershipBudget/r.leadership_cost);if(d>0){const m={};m[r.name]=Math.min(d,20);const c=t.leadershipBudget-m[r.name]*r.leadership_cost;for(const g of n.slice(1,3)){const u=Math.floor(c/g.leadership_cost/2);u>0&&(m[g.name]=u)}e.push(m)}}if(n.length>0||s.length>0){const r={};if(n.length>0&&t.leadershipBudget>0){const d=Math.floor(t.leadershipBudget/n.length);for(const m of n){const c=Math.floor(d/m.leadership_cost);c>0&&(r[m.name]=c)}}if(s.length>0&&t.dominanceBudget>0){const d=Math.floor(t.dominanceBudget/s.length);for(const m of s){const c=Math.floor(d/m.dominance_cost);c>0&&(r[m.name]=c)}}for(const d of i){const m=t.mercenaryLimits[d.name]||1;r[d.name]=Math.max(1,Math.floor(m/2))}Object.keys(r).length>0&&e.push(r)}return e}generateMercenaryCombinations(t){if(Object.keys(t).length===0)return[{}];let e=[{}];for(const[n,s]of Object.entries(t)){if(!this.unitsByName.has(n))continue;const i=[];for(const a of e)for(let o=0;o<=s;o++){const l={...a};o>0&&(l[n]=o),i.push(l)}e=i}return e}evaluateComposition(t){let e=0,n=0,s=0,i=0,a=0;const o=[];for(const[y,p]of Object.entries(t)){const b=this.unitsByName.get(y);if(!b)continue;const S=b.health*p,E=b.strength*p;e+=E,n+=S,s+=b.leadership_cost*p,i+=b.dominance_cost*p,v.isMercenary(b)&&(a+=p),o.push({unit:b,count:p,totalHealth:S,unitStrength:b.strength})}o.sort((y,p)=>y.unitStrength-p.unitStrength);let l=!0;const r=[];for(let y=0;y<o.length;y++){const{unit:p,count:b,totalHealth:S}=o[y];r.push({unitName:p.name,count:b,totalHealth:S,unitStrength:p.strength});for(let E=y+1;E<o.length;E++){const x=o[E].unit,w=o[E].totalHealth;if(p.strength===x.strength){const z=Math.max(S,w)*.1;if(Math.abs(S-w)<=z)continue}S<=w&&console.log(`❌ Stacking violation: ${p.name} (STR:${p.strength}, ${S} HP) <= ${x.name} (STR:${x.strength}, ${w} HP)`)}}const d=s+i+a;let m=d>0?e/d:0;m*=1.2;const g=1+(Object.keys(t).length-1)*.05;m*=g;let u=0;s>0&&u++,i>0&&u++,a>0&&u++;const h=1+(u-1)*.1;return m*=h,{units:t,totalStrength:e,totalHealth:n,totalLeadershipCost:s,totalDominanceCost:i,totalMercenaryCount:a,stackingOrder:r,isValidStacking:l,efficiencyScore:m}}explainStacking(t){const e=[],n=[],s=[],i=[];return t.stackingOrder.forEach(a=>{const o=this.unitsByName.get(a.unitName);if(!o)return;const l={name:a.unitName,count:a.count,totalHealth:a.totalHealth,strength:o.strength};v.isMercenary(o)?i.push(l):o.cost_type==="Leadership"?n.push(l):o.cost_type==="Dominance"&&s.push(l)}),e.push("🏆 OPTIMIZED ARMY COMPOSITION"),e.push("═".repeat(60)),e.push(""),e.push("📊 ARMY SUMMARY"),e.push("─".repeat(30)),e.push(`Total Units: ${Object.values(t.units).reduce((a,o)=>a+o,0).toLocaleString()}`),e.push(`Total Strength: ${t.totalStrength.toLocaleString()}`),e.push(`Total Health: ${t.totalHealth.toLocaleString()}`),e.push(`Budget Usage: L:${t.totalLeadershipCost} D:${t.totalDominanceCost} M:${t.totalMercenaryCount}`),e.push(""),i.length>0&&(e.push("🗡️ MERCENARY FORCES"),e.push("─".repeat(30)),i.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),n.length>0&&(e.push("👑 LEADERSHIP FORCES"),e.push("─".repeat(30)),n.sort((a,o)=>o.strength-a.strength),n.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),s.length>0&&(e.push("⚡ DOMINANCE FORCES"),e.push("─".repeat(30)),s.sort((a,o)=>o.strength-a.strength),s.forEach(a=>{e.push(`${a.count.toLocaleString()}x ${a.name}`),e.push(`   └─ ${a.totalHealth.toLocaleString()} HP total (STR: ${a.strength})`)}),e.push("")),e.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),e.push("─".repeat(40)),t.stackingOrder.forEach((a,o)=>{const l=this.unitsByName.get(a.unitName);if(!l)return;const r=v.isMercenary(l)?"🗡️":l.cost_type==="Leadership"?"👑":l.cost_type==="Dominance"?"⚡":"❓";e.push(`${o+1}. ${r} ${a.count.toLocaleString()}x ${a.unitName} (${a.totalHealth.toLocaleString()} HP)`)}),e.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class L{static formatGroupForLog(t){return`${t.count} ${t.unitName}`}static formatEnemyGroupForLog(t){return`Enemy Group ${t+1}`}static calculateDamageDealt(t){return t.count*t.unitStrength}static createPlayerAttackAction(t,e,n){const s=L.calculateDamageDealt(e);return{turn:t,attacker:L.formatGroupForLog(e),target:L.formatEnemyGroupForLog(n),action:`attack and deal ${s.toLocaleString()} damage`,damageDealt:s,eliminated:!1}}static createEnemyAttackAction(t,e,n){return{turn:t,attacker:L.formatEnemyGroupForLog(e),target:L.formatGroupForLog(n),action:`attack and kill ${L.formatGroupForLog(n)}`,eliminated:!0}}static formatCombatLogForDisplay(t){return t.map(e=>e.eliminated?`${e.attacker} ${e.action}`:`${e.attacker} ${e.action}`)}static calculateBattleStatistics(t,e){const n=t.filter(o=>!o.eliminated),s=t.filter(o=>o.eliminated),i={},a={};return n.forEach(o=>{const l=o.attacker.split(" ").slice(1).join(" "),r=o.damageDealt||0;i[l]=(i[l]||0)+r,a[l]=(a[l]||0)+1}),{totalPlayerAttacks:n.length,totalEnemyAttacks:s.length,averageDamagePerAttack:n.length>0?e/n.length:0,damageByUnitType:i,attacksByUnitType:a,eliminationRate:s.length>0?s.length/t.length:0}}static getBattleSummary(t){const e=t.statistics||L.calculateBattleStatistics(t.combatLog,t.totalDamageDealtToEnemies);return`Battle Summary:
- Duration: ${t.battleDuration} battle phases
- Player unit turns taken: ${e.totalPlayerAttacks}
- Enemy unit turns taken: ${e.totalEnemyAttacks}
- Total damage dealt to enemies: ${t.totalDamageDealtToEnemies.toLocaleString()}
- Average damage per unit turn: ${Math.round(e.averageDamagePerAttack).toLocaleString()}
- Scenario: ${t.scenario==="best_case"?"Best Case (Player First)":"Worst Case (Enemy First)"}`}}const B={MAX_BATTLE_TURNS:1e3};class I{constructor(){f(this,"attackOrderCache",new Map);f(this,"targetOrderCache",new Map)}validateBattleConfiguration(t){if(!t)throw new Error("Battle configuration is required");if(!t.playerArmy)throw new Error("Player army is required");if(!t.playerArmy.stackingOrder||t.playerArmy.stackingOrder.length===0)throw new Error("Player army must have at least one unit group");if(t.enemyGroupCount<1)throw new Error("Enemy group count must be at least 1");if(t.enemyGroupCount>100)throw new Error("Enemy group count cannot exceed 100 (performance limit)");for(const e of t.playerArmy.stackingOrder){if(!e.unitName||e.unitName.trim()==="")throw new Error("All unit groups must have a valid name");if(e.count<=0)throw new Error(`Unit group "${e.unitName}" must have a positive count`);if(e.unitStrength<=0)throw new Error(`Unit group "${e.unitName}" must have positive strength`);if(e.totalHealth<=0)throw new Error(`Unit group "${e.unitName}" must have positive health`)}}simulateBattle(t){this.validateBattleConfiguration(t);const e={currentTurn:0,playerGroups:[...t.playerArmy.stackingOrder],enemyGroupCount:t.enemyGroupCount,totalDamageDealt:0,battleEnded:!1,combatLog:[]};let n=0;const s=5;for(;!this.shouldBattleEnd(e)&&e.currentTurn<B.MAX_BATTLE_TURNS;){const a=e.combatLog.length;e.currentTurn++;try{this.processTurn(e,t.playerGoesFirst)}catch(o){throw new Error(`Battle processing failed on turn ${e.currentTurn}: ${o instanceof Error?o.message:"Unknown error"}`)}if(e.combatLog.length===a){if(n++,n>=s)throw new Error(`Battle stalled: No actions taken for ${s} consecutive turns`)}else n=0;if(e.currentTurn>1&&e.playerGroups.length===0&&!e.battleEnded){e.battleEnded=!0;break}}if(e.currentTurn>=B.MAX_BATTLE_TURNS)throw new Error(`Battle exceeded maximum duration of ${B.MAX_BATTLE_TURNS} turns`);const i=L.calculateBattleStatistics(e.combatLog,e.totalDamageDealt);return{outcome:"player_eliminated",combatLog:e.combatLog,totalDamageDealtToEnemies:e.totalDamageDealt,battleDuration:e.currentTurn,playerSurvivalTurns:e.currentTurn,scenario:t.playerGoesFirst?"best_case":"worst_case",configuration:t,statistics:i}}simulateBothScenarios(t,e){if(!t)throw new Error("Player army is required");if(e<1||e>100)throw new Error("Enemy group count must be between 1 and 100");const n={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!0},s=this.simulateBattle(n),i={playerArmy:t,enemyGroupCount:e,playerGoesFirst:!1},a=this.simulateBattle(i),o={damageDifference:s.totalDamageDealtToEnemies-a.totalDamageDealtToEnemies,survivalDifference:s.playerSurvivalTurns-a.playerSurvivalTurns,averageDamage:(s.totalDamageDealtToEnemies+a.totalDamageDealtToEnemies)/2,averageSurvival:(s.playerSurvivalTurns+a.playerSurvivalTurns)/2};return{bestCase:s,worstCase:a,comparison:o}}calculateAttackOrder(t){const e=t.map(s=>`${s.unitName}:${s.count}:${s.unitStrength}`).join("|");if(this.attackOrderCache.has(e))return this.attackOrderCache.get(e);const n=[...t].sort((s,i)=>i.unitStrength-s.unitStrength);return this.attackOrderCache.set(e,n),n}calculateEnemyTargetOrder(t){const e=t.map(s=>`${s.unitName}:${s.count}:${s.totalHealth}`).join("|");if(this.targetOrderCache.has(e))return this.targetOrderCache.get(e);const n=[...t].sort((s,i)=>i.totalHealth-s.totalHealth);return this.targetOrderCache.set(e,n),n}shouldBattleEnd(t){return t.playerGroups.length===0||t.battleEnded}processTurn(t,e){const n=this.calculateAttackOrder(t.playerGroups),s=n.length,i=t.enemyGroupCount,a=new Set;let o=0;const l=Math.max(s,i);for(let r=0;r<l*2&&!this.shouldBattleEnd(t);r++){if(e?r%2===0:r%2===1){const m=this.getNextPlayerAttacker(t,n,a);if(m){this.processSinglePlayerAttackByGroup(t,m,a.size);const c=`${m.unitName}:${m.count}:${m.unitStrength}`;a.add(c)}}else o<t.enemyGroupCount&&t.playerGroups.length>0&&(this.processSingleEnemyAttack(t,o),o++);if(a.size>=s&&o>=i)break}}getNextPlayerAttacker(t,e,n){for(const s of e){const i=`${s.unitName}:${s.count}:${s.unitStrength}`;if(!n.has(i)){const a=t.playerGroups.find(o=>o.unitName===s.unitName&&o.unitStrength===s.unitStrength);if(a)return a}}return null}processSinglePlayerAttackByGroup(t,e,n){if(t.playerGroups.length===0)return;const s=n%t.enemyGroupCount,i=L.calculateDamageDealt(e),a=L.createPlayerAttackAction(t.currentTurn,e,s);t.combatLog.push(a),t.totalDamageDealt+=i}processSinglePlayerAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateAttackOrder(t.playerGroups);if(e>=n.length)return;const s=n[e],i=e%t.enemyGroupCount,a=L.calculateDamageDealt(s),o=L.createPlayerAttackAction(t.currentTurn,s,i);t.combatLog.push(o),t.totalDamageDealt+=a}processSingleEnemyAttack(t,e){if(t.playerGroups.length===0)return;const n=this.calculateEnemyTargetOrder(t.playerGroups);if(n.length===0)return;const s=n[0],i=L.createEnemyAttackAction(t.currentTurn,e,s);t.combatLog.push(i);const a=t.playerGroups.findIndex(o=>o.unitName===s.unitName&&o.count===s.count&&o.totalHealth===s.totalHealth);a!==-1&&t.playerGroups.splice(a,1),t.playerGroups.length===0&&(t.battleEnded=!0)}}class H{constructor(t,e){f(this,"battleSimulator");f(this,"algorithm");this.battleSimulator=t||new I,this.algorithm=e||new _}setAlgorithm(t){this.algorithm=t}reportProgress(t,e){t.onProgress&&t.onProgress(e)}checkCancellation(t){var e;if((e=t.signal)!=null&&e.aborted)throw new Error("Operation was cancelled by user")}async optimizeForDamage(t,e){const n=performance.now(),s=12e4;console.log(`🎯 Starting damage optimization with ${this.algorithm.name}`),console.log(`📊 Constraints: L:${t.leadershipBudget} D:${t.dominanceBudget} vs ${t.enemyGroupCount} enemies`),console.log(`⏱️ Maximum processing time: ${s/1e3} seconds`),this.reportProgress(t,{phase:"initializing",progress:0,message:"Initializing damage optimizer...",elapsedMs:0}),this.validateOptimizationConstraints(t),this.reportProgress(t,{phase:"generating",progress:10,message:"Generating army combinations...",elapsedMs:performance.now()-n});const i=await this.algorithm.generateCombinations(t,e);console.log(`🔄 Generated ${i.length} army combinations to evaluate`),this.reportProgress(t,{phase:"evaluating",progress:20,message:"Evaluating army combinations...",combinationsGenerated:i.length,totalCombinations:i.length,combinationsEvaluated:0,totalToEvaluate:i.length,elapsedMs:performance.now()-n});const a=[];let o=0;for(let m=0;m<i.length;m++){this.checkCancellation(t);const c=performance.now();if(c-n>s){console.warn(`⏱️ Optimization timeout after ${(c-n)/1e3}s - stopping at ${o} combinations`);break}const g=i[m];try{const u=await this.evaluateArmyComposition(g,t.enemyGroupCount,e);a.push(u),o++}catch(u){console.warn("⚠️ Failed to evaluate army composition:",u)}if(o%3===0&&await new Promise(u=>setTimeout(u,0)),o%10===0||o===i.length){const u=performance.now()-n,h=20+Math.floor(o/i.length*60),y=o>0?u/o*(i.length-o):void 0;this.reportProgress(t,{phase:"evaluating",progress:h,message:`Evaluating combinations... (${o}/${i.length})`,combinationsGenerated:i.length,totalCombinations:i.length,combinationsEvaluated:o,totalToEvaluate:i.length,elapsedMs:u,estimatedRemainingMs:y})}if(o%25===0){const u=(performance.now()-n)/1e3;console.log(`📊 Progress: ${o}/${i.length} combinations (${u.toFixed(1)}s elapsed)`)}}this.reportProgress(t,{phase:"finalizing",progress:90,message:"Finalizing results...",combinationsGenerated:i.length,totalCombinations:i.length,combinationsEvaluated:o,totalToEvaluate:i.length,elapsedMs:performance.now()-n});const l=a.sort((m,c)=>{const g=c.averageDamagePerBattle-m.averageDamagePerBattle;return Math.abs(g)>.01?g:c.damageEfficiencyScore-m.damageEfficiencyScore}),d=performance.now()-n;return console.log(`✅ Optimization complete: ${l.length} valid results in ${d.toFixed(2)}ms`),this.reportProgress(t,{phase:"finalizing",progress:100,message:"Optimization complete!",combinationsGenerated:i.length,totalCombinations:i.length,combinationsEvaluated:o,totalToEvaluate:i.length,elapsedMs:d}),{rankedResults:l,combinationsEvaluated:o,optimizationTimeMs:d,algorithmUsed:this.algorithm.name,wasTruncated:i.length>(t.maxCombinations||50)}}async evaluateArmyComposition(t,e,n){const s=this.battleSimulator.simulateBothScenarios(t,e),i=this.calculateSilverCost(t,n),a=this.calculateFoodConsumption(t,n),o=this.calculateRevivalCost(t,n),l=s.bestCase.totalDamageDealtToEnemies,r=s.worstCase.totalDamageDealtToEnemies,d=(l+r)/2,m=t.totalLeadershipCost+t.totalDominanceCost+i,c=m>0?d/m:0;return{armyComposition:t,battleAnalysis:s,totalSilverCost:i,totalFoodConsumption:a,totalRevivalCost:o,averageDamagePerBattle:d,damageEfficiencyScore:c}}calculateSilverCost(t,e){const n=new Map(e.map(i=>[i.name,i]));let s=0;for(const[i,a]of Object.entries(t.units)){const o=n.get(i);o&&(s+=o.revival_cost_silver*a)}return s}calculateFoodConsumption(t,e){const n=new Map(e.map(i=>[i.name,i]));let s=0;for(const[i,a]of Object.entries(t.units)){const o=n.get(i);o&&(s+=o.food_consumption*a)}return s}calculateRevivalCost(t,e){return this.calculateSilverCost(t,e)}validateOptimizationConstraints(t){if(t.enemyGroupCount<1||t.enemyGroupCount>100)throw new Error("Enemy group count must be between 1 and 100");if(t.leadershipBudget<0)throw new Error("Leadership budget cannot be negative");if(t.dominanceBudget<0)throw new Error("Dominance budget cannot be negative");if(!t.availableUnits||t.availableUnits.length===0)throw new Error("At least one unit type must be available for optimization");if(t.maxCombinations&&t.maxCombinations<1)throw new Error("Maximum combinations must be at least 1")}}class _{constructor(){f(this,"name","Systematic Combination Testing")}async generateCombinations(t,e){const n=performance.now(),s=6e4;console.log("🔍 Generating combinations using systematic testing algorithm");const i=e.filter(r=>t.availableUnits.includes(r.name));console.log(`📋 Available units for optimization: ${i.length}`);const a=t.maxCombinations||50,o=this.generateUnitCombinations(i.map(r=>r.name),a);console.log(`🔄 Testing ${o.length} different unit combinations (user requested: ${a})`);const l=[];for(let r=0;r<o.length;r++){const d=performance.now();if(d-n>s){console.warn(`⏱️ Generation timeout after ${(d-n)/1e3}s - stopping at ${r} combinations`);break}const m=o[r];try{const c=await this.testCombinationWithStackingAlgorithm(m,t,e);c&&l.push(c)}catch(c){console.warn(`⚠️ Failed to test combination [${m.join(", ")}]:`,c)}if(r%5===0&&await new Promise(c=>setTimeout(c,0)),r%20===0&&r>0){const c=(performance.now()-n)/1e3;console.log(`🔄 Generation progress: ${r}/${o.length} combinations tested (${c.toFixed(1)}s)`)}}return console.log(`✅ Generated ${l.length} valid army combinations for evaluation`),l}generateUnitCombinations(t,e){const n=Math.pow(2,t.length)-1;if(console.log(`📊 Total possible combinations: ${n}, user requested: ${e}`),n>e)return this.generateLimitedCombinations(t,e);const s=[];for(let i=1;i<=n;i++){const a=[];for(let o=0;o<t.length;o++)i&1<<o&&a.push(t[o]);s.push(a)}return s.sort((i,a)=>a.length-i.length),console.log(`🎯 Generated all ${s.length} combinations, ordered largest to smallest`),console.log(`   User requested: ${e} combinations (all possible combinations fit within limit)`),s}generateLimitedCombinations(t,e){const n=[];n.push([...t]);for(let s=0;s<t.length&&n.length<e;s++){const i=t.filter((a,o)=>o!==s);n.push(i)}for(let s=0;s<t.length&&n.length<e;s++)for(let i=s+1;i<t.length&&n.length<e;i++){const a=t.filter((o,l)=>l!==s&&l!==i);a.length>0&&n.push(a)}for(let s=0;s<t.length&&n.length<e;s++)for(let i=s+1;i<t.length&&n.length<e;i++)for(let a=i+1;a<t.length&&n.length<e;a++){const o=t.filter((l,r)=>r!==s&&r!==i&&r!==a);o.length>0&&n.push(o)}if(n.length<e){const s=Math.floor(t.length/2);for(let a=0;a<10&&n.length<e;a++){const o=this.getRandomCombination(t,s);n.some(l=>l.length===o.length&&l.every(r=>o.includes(r)))||n.push(o)}const i=Math.max(1,Math.floor(t.length/4));for(let a=0;a<5&&n.length<e;a++){const o=this.getRandomCombination(t,i);n.some(l=>l.length===o.length&&l.every(r=>o.includes(r)))||n.push(o)}}return console.log(`🎯 Generated ${n.length} top-down combinations from ${t.length} units`),console.log(`   Strategy: Started with all ${t.length} units, then systematically removed units`),console.log(`   User requested: ${e} combinations (time-based limits still apply)`),n}getRandomCombination(t,e){return[...t].sort(()=>Math.random()-.5).slice(0,e)}async testCombinationWithStackingAlgorithm(t,e,n){try{const s=new k(n),i={leadershipBudget:e.leadershipBudget,dominanceBudget:e.dominanceBudget,mercenaryLimits:e.mercenaryLimits,availableUnits:t},a=await s.optimizeArmy(i);return a.compositions&&a.compositions.length>0?a.compositions[0]:null}catch(s){return console.warn(`Failed to test combination [${t.join(", ")}]:`,s),null}}}class D{constructor(){f(this,"container",null);f(this,"battleService");f(this,"currentArmy",null);f(this,"currentAnalysis",null);f(this,"tooltipData",{"battle-simulation-overview":`
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
    `});this.battleService=new I}mount(t,e){this.container=t,this.currentArmy=e,this.render(),this.attachEventListeners()}render(){this.container&&(this.container.innerHTML=`
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
    `,this.addBattleSimulationStyles())}attachEventListeners(){const t=document.getElementById("run-simulation-btn"),e=document.getElementById("clear-simulation-btn"),n=document.getElementById("enemy-groups");t&&t.addEventListener("click",()=>this.runSimulation()),e&&e.addEventListener("click",()=>this.clearResults()),n&&n.addEventListener("input",()=>this.validateInput()),this.attachTooltipListeners()}validateInput(){const t=document.getElementById("enemy-groups"),e=document.getElementById("run-simulation-btn");if(!t||!e)return!1;const n=t.value.trim();let s=!0,i="";if(!n)s=!1,i="Please enter the number of enemy groups";else if(isNaN(Number(n))||!Number.isInteger(Number(n)))s=!1,i="Please enter a valid whole number";else{const a=parseInt(n);a<1?(s=!1,i="Number of enemy groups must be at least 1"):a>50&&(s=!1,i="Number of enemy groups cannot exceed 50 (performance limit)")}return e.disabled=!s||!this.validateArmyComposition(),s?(t.classList.remove("error"),this.hideInputError("enemy-groups")):(t.classList.add("error"),this.showInputError("enemy-groups",i)),s}validateArmyComposition(){if(!this.currentArmy||!this.currentArmy.stackingOrder||this.currentArmy.stackingOrder.length===0)return!1;for(const t of this.currentArmy.stackingOrder)if(!t.unitName||t.count<=0||t.unitStrength<=0||t.totalHealth<=0)return!1;return!0}showInputError(t,e){var i;const n=document.getElementById(t);if(!n)return;this.hideInputError(t);const s=document.createElement("div");s.className="input-error-message",s.id=`${t}-error`,s.textContent=e,(i=n.parentNode)==null||i.insertBefore(s,n.nextSibling)}hideInputError(t){const e=document.getElementById(`${t}-error`);e&&e.remove()}attachTooltipListeners(){document.querySelectorAll(".help-icon[data-tooltip]").forEach(e=>{e.addEventListener("mouseenter",n=>this.showTooltip(n)),e.addEventListener("mouseleave",()=>this.hideTooltip()),e.addEventListener("click",n=>{n.preventDefault(),this.toggleTooltip(n)})}),document.addEventListener("click",e=>{const n=e.target;!n.closest(".help-icon")&&!n.closest("#tooltip")&&this.hideTooltip()})}showTooltip(t){const e=t.target,n=e.getAttribute("data-tooltip");if(!n||!this.tooltipData[n])return;const s=document.getElementById("tooltip"),i=s==null?void 0:s.querySelector(".tooltip-content");!s||!i||(i.innerHTML=this.tooltipData[n],s.classList.remove("hidden"),this.positionTooltip(s,e))}hideTooltip(){const t=document.getElementById("tooltip");t&&t.classList.add("hidden")}toggleTooltip(t){const e=document.getElementById("tooltip");e!=null&&e.classList.contains("hidden")?this.showTooltip(t):this.hideTooltip()}positionTooltip(t,e){const n=e.getBoundingClientRect(),s=t;s.style.top="",s.style.left="",s.style.transform="";const i=t.getBoundingClientRect(),a=window.innerWidth,o=window.innerHeight;let l=n.bottom+10,r=n.left+n.width/2-i.width/2;r<10?r=10:r+i.width>a-10&&(r=a-i.width-10),l+i.height>o-10&&(l=n.top-i.height-10),s.style.top=`${l}px`,s.style.left=`${r}px`}async runSimulation(){if(!this.validateInput()){this.showError("Please fix the input errors before running the simulation.");return}if(!this.validateArmyComposition()){this.showError("Invalid army composition. Please ensure you have selected and optimized your army first.");return}const t=document.getElementById("enemy-groups"),e=parseInt(t.value);e>this.currentArmy.stackingOrder.length*10&&this.showError(`Warning: ${e} enemy groups vs ${this.currentArmy.stackingOrder.length} player groups may result in a very short battle.`),this.showLoading(!0),this.hideError();try{if(!this.currentArmy||!this.currentArmy.stackingOrder)throw new Error("Army composition is invalid or missing");const n=new Promise((a,o)=>{try{this.currentAnalysis=this.battleService.simulateBothScenarios(this.currentArmy,e),a()}catch(l){o(l)}}),s=new Promise((a,o)=>{setTimeout(()=>o(new Error("Simulation timed out")),3e4)});if(await Promise.race([n,s]),!this.currentAnalysis||!this.currentAnalysis.bestCase||!this.currentAnalysis.worstCase)throw new Error("Simulation completed but results are invalid");this.displayResults(),this.showLoading(!1),this.showResults(!0);const i=document.getElementById("clear-simulation-btn");i&&(i.style.display="inline-block")}catch(n){console.error("Battle simulation failed:",n),this.showLoading(!1);let s="An unexpected error occurred during simulation.";n instanceof Error&&(n.message.includes("timeout")?s="Simulation timed out. Try reducing the number of enemy groups or check your army composition.":n.message.includes("invalid")?s="Invalid data detected. Please refresh the page and try again.":n.message.includes("Army composition")&&(s="Army composition error. Please re-optimize your army and try again.")),this.showError(s)}}displayResults(){if(!this.currentAnalysis)return;const t=document.getElementById("simulation-results");if(!t)return;const{bestCase:e,worstCase:n,comparison:s}=this.currentAnalysis;t.innerHTML=`
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
    `,this.attachLogTabListeners(),this.attachTooltipListeners()}formatCombatLog(t){return t.length===0?'<p class="no-log">No combat actions recorded.</p>':`<div class="log-entries">${t.map(n=>`
        <div class="${!n.attacker.includes("Enemy Group")?"log-entry player-turn":"log-entry enemy-turn"}">
          <span class="turn-number">Turn ${n.turn}:</span>
          <span class="action-text">${n.attacker} ${n.action}</span>
        </div>
      `).join("")}</div>`}attachLogTabListeners(){const t=document.querySelectorAll(".log-tab");t.forEach(e=>{e.addEventListener("click",n=>{const s=n.target,i=s.dataset.scenario;t.forEach(l=>l.classList.remove("active")),s.classList.add("active"),document.querySelectorAll(".combat-log").forEach(l=>{l.classList.remove("active"),l.classList.add("hidden")});const o=document.getElementById(`${i}-case-log`);o&&(o.classList.add("active"),o.classList.remove("hidden"))})})}clearResults(){this.currentAnalysis=null,this.showResults(!1);const t=document.getElementById("clear-simulation-btn");t&&(t.style.display="none")}showLoading(t){const e=document.getElementById("simulation-loading");e&&e.classList.toggle("hidden",!t)}showResults(t){const e=document.getElementById("simulation-results");e&&e.classList.toggle("hidden",!t)}showError(t){this.hideError();const e=document.createElement("div");e.className="simulation-error",e.id="simulation-error",e.innerHTML=`
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
    `,document.head.appendChild(t)}displayPreCalculatedResults(t){if(console.log("BattleSimulationComponent: displayPreCalculatedResults called",t),!this.container){console.log("BattleSimulationComponent: no container");return}this.currentAnalysis=t;const e=this.container.querySelector("#simulation-results");if(!e){console.log("BattleSimulationComponent: simulation-results container not found");return}console.log("BattleSimulationComponent: found results container",e),e.classList.remove("hidden"),this.displayResults(),this.showResults(!0);const n=this.container.querySelector("#run-simulation-btn");n&&(n.textContent="🔄 Re-run Simulation",n.disabled=!1);const s=this.container.querySelector("#simulation-note");s&&(s.innerHTML=`
        <div class="info-note">
          <span class="note-icon">ℹ️</span>
          <span class="note-text">Showing pre-calculated battle results from damage optimization</span>
        </div>
      `,s.classList.remove("hidden"))}}const U={tabletSmall:768,tabletLarge:1024};class G{constructor(){f(this,"currentMode","desktop");f(this,"listeners",[]);this.updateLayoutMode(),this.setupResizeListener()}getCurrentMode(){return this.currentMode}isMobile(){return this.currentMode==="mobile"}isTablet(){return this.currentMode==="tablet"}isDesktop(){return this.currentMode==="desktop"}isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}getViewportWidth(){return window.innerWidth}addLayoutChangeListener(t){this.listeners.push(t)}removeLayoutChangeListener(t){const e=this.listeners.indexOf(t);e>-1&&this.listeners.splice(e,1)}updateLayoutMode(){const t=this.getViewportWidth();let e;t<U.tabletSmall?e="mobile":t<U.tabletLarge?e="tablet":e="desktop",e!==this.currentMode&&(this.currentMode=e,this.notifyListeners())}setupResizeListener(){let t;window.addEventListener("resize",()=>{clearTimeout(t),t=window.setTimeout(()=>{this.updateLayoutMode()},150)})}notifyListeners(){this.listeners.forEach(t=>t(this.currentMode))}}class T{static addTouchSupport(t,e){if(t.addEventListener("click",e),"ontouchstart"in window){let n;t.addEventListener("touchstart",s=>{n=Date.now(),t.classList.add("touch-active")}),t.addEventListener("touchend",s=>{t.classList.remove("touch-active"),Date.now()-n<200&&(s.preventDefault(),e())}),t.addEventListener("touchcancel",()=>{t.classList.remove("touch-active")})}}static optimizeScrolling(t){t.style.webkitOverflowScrolling="touch",t.style.scrollBehavior="smooth",t.classList.add("scroll-momentum")}static addHapticFeedback(t){t.addEventListener("touchstart",()=>{t.style.transform="scale(0.98)",t.style.transition="transform 0.1s ease"}),t.addEventListener("touchend",()=>{t.style.transform="scale(1)"}),t.addEventListener("touchcancel",()=>{t.style.transform="scale(1)"})}}class A{static updateBodyClasses(t){const e=document.body;e.classList.remove("layout-mobile","layout-tablet","layout-desktop"),e.classList.add(`layout-${t.getCurrentMode()}`),t.isTouchDevice()&&e.classList.add("touch-device")}static optimizeCombatLogs(){document.querySelectorAll(".combat-log").forEach(e=>{e instanceof HTMLElement&&T.optimizeScrolling(e)})}static optimizeUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&T.addHapticFeedback(e)})}}const $=new G;$.addLayoutChangeListener(()=>{A.updateBodyClasses($)});A.updateBodyClasses($);class R{constructor(){f(this,"sections",[]);f(this,"currentActiveSection",null);f(this,"tabContainer",null);f(this,"initialized",!1);this.setupLayoutListener()}initialize(){this.initialized||(this.identifySections(),this.createNavigationElements(),this.setupInitialLayout(),this.initialized=!0)}identifySections(){this.sections=[{id:"config-section",title:"Configuration",icon:"⚙️",element:document.getElementById("config-section"),isAvailable:!0,isCollapsed:!1},{id:"results-section",title:"Results",icon:"🎯",element:document.getElementById("results-section"),isAvailable:!1,isCollapsed:!1},{id:"battle-simulation-container",title:"Battle Simulation",icon:"⚔️",element:document.getElementById("battle-simulation-container"),isAvailable:!1,isCollapsed:!1}]}createNavigationElements(){this.createMobileTabNavigation(),this.createTabletCollapsibleHeaders()}createMobileTabNavigation(){var n;const t=document.querySelector(".main-content");if(!t)return;const e=document.createElement("div");e.className="mobile-tab-navigation mobile-only",e.innerHTML=`
      <div class="tab-nav-container">
        ${this.sections.map(s=>`
          <button class="tab-nav-item ${s.id==="config-section"?"active":""}" 
                  data-section="${s.id}">
            <span class="tab-icon">${s.icon}</span>
            <span class="tab-label">${s.title}</span>
          </button>
        `).join("")}
      </div>
    `,(n=t.parentNode)==null||n.insertBefore(e,t),this.tabContainer=e,this.attachTabListeners()}createTabletCollapsibleHeaders(){this.sections.forEach(t=>{if(!t.element)return;const e=document.createElement("div");e.className="collapsible-header tablet-only",e.innerHTML=`
        <div class="collapsible-title">
          <span class="section-icon">${t.icon}</span>
          <h2>${t.title}</h2>
          <span class="collapse-indicator">▼</span>
        </div>
      `,t.element.insertBefore(e,t.element.firstChild),e.addEventListener("click",()=>{this.toggleSectionCollapse(t.id)})})}setupInitialLayout(){const t=$.getCurrentMode();this.applyLayoutMode(t),this.updateTabVisibility()}applyLayoutMode(t){switch(t){case"mobile":this.applyMobileLayout();break;case"tablet":this.applyTabletLayout();break;case"desktop":this.applyDesktopLayout();break}}applyMobileLayout(){this.sections.forEach(t=>{t.element&&(t.id===this.currentActiveSection||this.currentActiveSection===null&&t.id==="config-section"?t.element.classList.remove("hidden"):t.element.classList.add("hidden"))}),this.updateTabActiveState()}applyTabletLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden"):t.element.classList.add("hidden"),t.isCollapsed?t.element.classList.add("collapsed"):t.element.classList.remove("collapsed"))})}applyDesktopLayout(){this.sections.forEach(t=>{t.element&&(t.isAvailable?t.element.classList.remove("hidden","collapsed"):t.element.classList.add("hidden"),t.isCollapsed=!1)})}switchToSection(t){this.currentActiveSection=t,$.isMobile()&&this.applyMobileLayout()}toggleSectionCollapse(t){const e=this.sections.find(s=>s.id===t);if(!e||!e.element)return;e.isCollapsed=!e.isCollapsed,e.isCollapsed?e.element.classList.add("collapsed"):e.element.classList.remove("collapsed");const n=e.element.querySelector(".collapse-indicator");n&&(n.textContent=e.isCollapsed?"▶":"▼")}attachTabListeners(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("disabled"))return;const n=e.getAttribute("data-section");n&&this.switchToSection(n)})})}updateTabActiveState(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section");n===this.currentActiveSection||this.currentActiveSection===null&&n==="config-section"?e.classList.add("active"):e.classList.remove("active")})}setupLayoutListener(){$.addLayoutChangeListener(t=>{this.initialized&&this.applyLayoutMode(t)})}showSection(t){const e=this.sections.find(n=>n.id===t);e&&(!e.element&&(e.element=document.getElementById(t),!e.element)||(e.element.classList.remove("hidden"),e.isAvailable=!0,$.isMobile()&&this.switchToSection(t),this.updateTabVisibility()))}hideSection(t){const e=this.sections.find(n=>n.id===t);!e||!e.element||(e.element.classList.add("hidden"),e.isAvailable=!1,this.updateTabVisibility(),$.isMobile()&&this.currentActiveSection===t&&this.switchToSection("config-section"))}updateTabVisibility(){if(!this.tabContainer)return;this.tabContainer.querySelectorAll(".tab-nav-item").forEach(e=>{const n=e.getAttribute("data-section"),s=this.sections.find(i=>i.id===n);s&&(s.isAvailable?(e.classList.remove("disabled"),e.disabled=!1):(e.classList.add("disabled"),e.disabled=!0))})}}const M=new R;class F{constructor(){f(this,"container",null);f(this,"unitLoader");f(this,"optimizer",null);f(this,"damageOptimizer",null);f(this,"selectedUnits",new Set);f(this,"mercenaryLimits",{});f(this,"battleSimulation",null);f(this,"currentOptimizedArmy",null);f(this,"currentMode","stacking");f(this,"optimizationAbortController",null);f(this,"optimizationStartTime",0);f(this,"progressUpdateInterval",null);this.unitLoader=new N}async mount(t){this.container=t,this.render(),this.attachEventListeners(),await this.loadInitialData(),this.initializeMobileOptimizations(),M.initialize()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(t)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(t){console.error("Failed to load unit data:",t)}}attachEventListeners(){const t=document.getElementById("stacking-mode-btn"),e=document.getElementById("damage-mode-btn"),n=document.getElementById("unit-search"),s=document.getElementById("unit-type-filter"),i=document.getElementById("optimize-btn"),a=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),l=document.getElementById("clear-selection"),r=document.getElementById("leadership-budget"),d=document.getElementById("dominance-budget");t&&t.addEventListener("click",()=>this.switchMode("stacking")),e&&e.addEventListener("click",()=>this.switchMode("damage")),n&&n.addEventListener("input",()=>this.filterAndDisplayUnits()),s&&s.addEventListener("change",()=>this.filterAndDisplayUnits()),i&&i.addEventListener("click",()=>this.optimizeArmy()),a&&a.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),l&&l.addEventListener("click",()=>this.clearSelection()),r&&r.addEventListener("input",()=>this.updateOptimizeButton()),d&&d.addEventListener("input",()=>this.updateOptimizeButton()),document.addEventListener("click",m=>{const c=m.target;c.classList.contains("filter-tab")&&this.handleFilterTabClick(c)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const t=document.getElementById("unit-type-filter");if(!t)return;const e=this.unitLoader.getUniqueUnitTypes();t.innerHTML='<option value="">All Unit Types</option>',e.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,t.appendChild(s)})}updateFilterTabCounts(){const t=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const s=n.getAttribute("data-filter");let i=0;s==="all"?i=t.length:i=t.filter(a=>this.getMainCategory(a)===s).length,n.textContent=`${s==="all"?"All":s} (${i})`})}handleFilterTabClick(t){document.querySelectorAll(".filter-tab").forEach(e=>e.classList.remove("active")),t.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var i,a,o;const t=((i=document.getElementById("unit-search"))==null?void 0:i.value)||"",e=((a=document.querySelector(".filter-tab.active"))==null?void 0:a.getAttribute("data-filter"))||"all",n=((o=document.getElementById("unit-type-filter"))==null?void 0:o.value)||"";let s=this.unitLoader.getAllUnits();if(e!=="all"&&(s=s.filter(l=>this.getMainCategory(l)===e)),n&&(s=s.filter(l=>l.unit_types.includes(n))),t){const l=t.toLowerCase();s=s.filter(r=>r.name.toLowerCase().includes(l)||r.unit_types.some(d=>d.toLowerCase().includes(l)))}this.renderGroupedUnits(s),this.updateSelectedSummary()}renderGroupedUnits(t){const e=document.getElementById("unit-groups");if(!e)return;if(e.innerHTML="",t.length===0){e.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(t);Object.entries(n).forEach(([s,i])=>{const a=this.createMainCategoryElement(s,i);e.appendChild(a)}),this.attachAllEventListeners(n)}createHierarchicalGroups(t){const e={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return t.forEach(n=>{const s=this.getMainCategory(n),i=this.getSubCategory(n),a=this.getUnitFamily(n);e[s][i]||(e[s][i]={}),e[s][i][a]||(e[s][i][a]=[]),e[s][i][a].push(n)}),Object.values(e).forEach(n=>{Object.values(n).forEach(s=>{Object.values(s).forEach(i=>{i.sort((a,o)=>a.strength-o.strength)})})}),e}getMainCategory(t){if(t.cost_type==="Mercenary"||t.authority_cost>0)return"Mercenaries";const e=t.unit_types;return e.includes("Engineer corps")||e.includes("Siege engine")?"Engineer Corps":e.includes("Guardsman")?"Guardsmen":e.includes("Specialist")?"Specialists":e.includes("Beast")||e.includes("Dragon")||e.includes("Giant")||e.includes("Elemental")||e.includes("ELEMENTAL")||e.includes("Flying")&&!e.includes("Human")?"Monsters":e.includes("Human")&&(e.includes("Melee")||e.includes("Ranged")||e.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(t){const e=t.unit_types,n=t.name.toUpperCase(),s=this.getMainCategory(t);if(s==="Mercenaries")return e.includes("Guardsman")?"Elite Forces":"Special Forces";if(s==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(e.includes("Siege engine"))return"Siege Engines"}if(s==="Monsters"){if(e.includes("Dragon"))return"Dragons";if(e.includes("Giant"))return"Giants";if(e.includes("Beast"))return"Beasts";if(e.includes("Elemental")||e.includes("ELEMENTAL"))return"Elementals";if(e.includes("Flying"))return"Flying"}if(s==="Guardsmen"||s==="Specialists"){if(e.includes("Ranged"))return"Ranged";if(e.includes("Melee"))return"Melee";if(e.includes("Mounted"))return"Mounted";if(e.includes("Flying")||e.includes("Beast"))return"Flying";if(e.includes("Scout"))return"Scouts"}return e.includes("Human")?"Infantry":"Other"}getUnitFamily(t){let e=t.name;return e=e.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),e.includes("HEAVY "),e}createMainCategoryElement(t,e){const n=document.createElement("div");n.className="main-category";const s=this.countUnitsInCategory(e),i=this.countSelectedUnitsInCategory(e);return n.innerHTML=`
      <div class="main-category-header" data-category="${t}">
        <div class="category-title">
          <h3>${t} (${i}/${s})</h3>
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
    `,n}createSubCategoryHTML(t,e,n){const s=Object.values(n).reduce((a,o)=>a+o.length,0),i=Object.values(n).reduce((a,o)=>a+o.filter(l=>this.selectedUnits.has(l.name)).length,0);return`
      <div class="sub-category" data-category="${t}" data-subcategory="${e}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${e} (${i}/${s})</h4>
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
    `}attachAllEventListeners(t){document.querySelectorAll(".main-category").forEach((e,n)=>{const i=Object.keys(t)[n];if(i){const a=t[i];this.attachMainCategoryListeners(e,i,a)}}),document.querySelectorAll(".sub-category").forEach(e=>{var i;const n=e.getAttribute("data-category"),s=e.getAttribute("data-subcategory");if(n&&s&&((i=t[n])!=null&&i[s])){const a=t[n][s];this.attachSubCategoryListeners(e,a)}}),document.querySelectorAll(".unit-family").forEach(e=>{const n=e.getAttribute("data-family");let s=[];Object.values(t).forEach(i=>{Object.values(i).forEach(a=>{a[n]&&(s=a[n])})}),s.length>0&&this.attachUnitFamilyListeners(e,s)})}countUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((s,i)=>s+i.length,0),0)}countSelectedUnitsInCategory(t){return Object.values(t).reduce((e,n)=>e+Object.values(n).reduce((s,i)=>s+i.filter(a=>this.selectedUnits.has(a.name)).length,0),0)}attachMainCategoryListeners(t,e,n){const s=t.querySelector(".main-category-header"),i=t.querySelector(".main-category-content"),a=t.querySelector(".expand-icon");if(!s||!i||!a){console.warn("Missing main-category elements for",e,{header:!!s,content:!!i,expandIcon:!!a});return}s.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Main category header clicked:",e,"collapsed:",i.classList.contains("collapsed")),i.classList.toggle("collapsed"),a.textContent=i.classList.contains("collapsed")?"▼":"▲"});const o=t.querySelector(".select-category"),l=t.querySelector(".deselect-category");o&&o.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInCategory(n)}),l&&l.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(t,e){const n=t.querySelector(".sub-category-header"),s=t.querySelector(".sub-category-content"),i=t.querySelector(".expand-icon");if(!n||!s||!i){console.warn("Missing sub-category elements:",{header:!!n,content:!!s,expandIcon:!!i});return}n.addEventListener("click",l=>{if(l.target.classList.contains("btn")){l.stopPropagation();return}console.log("Sub-category header clicked, toggling:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),i.textContent=s.classList.contains("collapsed")?"▼":"▲"});const a=t.querySelector(".select-subcategory"),o=t.querySelector(".deselect-subcategory");a&&a.addEventListener("click",l=>{l.stopPropagation(),this.selectAllInFamilies(e)}),o&&o.addEventListener("click",l=>{l.stopPropagation(),this.deselectAllInFamilies(e)})}attachUnitFamilyListeners(t,e){const n=t.querySelector(".unit-family-header"),s=t.querySelector(".unit-family-content"),i=t.querySelector(".expand-icon");n.addEventListener("click",r=>{r.target.classList.contains("btn")||(s.classList.toggle("collapsed"),i.textContent=s.classList.contains("collapsed")?"▼":"▲")});const a=t.querySelector(".select-family"),o=t.querySelector(".deselect-family");a&&a.addEventListener("click",r=>{r.stopPropagation(),this.selectAllUnits(e)}),o&&o.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllUnits(e)}),t.querySelectorAll(".unit-card").forEach(r=>{r.addEventListener("click",()=>{const d=r.getAttribute("data-unit");if(d){const m=this.unitLoader.getUnitByName(d);m&&this.toggleUnitSelection(m)}})})}getUnitCost(t){switch(t.cost_type){case"Leadership":return t.leadership_cost;case"Dominance":return t.dominance_cost;case"Authority":case"Mercenary":return t.authority_cost;default:return 0}}toggleUnitSelection(t){this.selectedUnits.has(t.name)?(this.selectedUnits.delete(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&delete this.mercenaryLimits[t.name]):(this.selectedUnits.add(t.name),(t.cost_type==="Mercenary"||t.cost_type==="Authority")&&(this.mercenaryLimits[t.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(t=>{const e=t.getAttribute("data-unit");e&&(this.selectedUnits.has(e)?t.classList.add("selected"):t.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((t,e)=>{const n=t.querySelector(".category-title h3");if(n){const i=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][e];if(i){const{selected:a,total:o}=this.countUnitsInMainCategory(i),r=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${r} (${a}/${o})`}}}),document.querySelectorAll(".sub-category").forEach(t=>{const e=t.querySelector(".subcategory-title h4"),n=t.getAttribute("data-category"),s=t.getAttribute("data-subcategory");if(e&&n&&s){const{selected:i,total:a}=this.countUnitsInSubCategory(n,s),l=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${l} (${i}/${a})`}}),document.querySelectorAll(".unit-family").forEach(t=>{const e=t.querySelector(".family-title h5"),n=t.getAttribute("data-family");if(e&&n){const{selected:s,total:i}=this.countUnitsInFamily(n),o=(e.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");e.textContent=`${o} (${s}/${i})`}})}countUnitsInMainCategory(t){const n=this.unitLoader.getAllUnits().filter(i=>this.getMainCategory(i)===t);return{selected:n.filter(i=>this.selectedUnits.has(i.name)).length,total:n.length}}countUnitsInSubCategory(t,e){const s=this.unitLoader.getAllUnits().filter(a=>this.getMainCategory(a)===t&&this.getSubCategory(a)===e);return{selected:s.filter(a=>this.selectedUnits.has(a.name)).length,total:s.length}}countUnitsInFamily(t){const n=this.unitLoader.getAllUnits().filter(i=>this.getUnitFamily(i)===t);return{selected:n.filter(i=>this.selectedUnits.has(i.name)).length,total:n.length}}updateSelectedSummary(){const t=document.getElementById("selected-count");t&&(t.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(e=>{const n=e.getAttribute("data-unit");if(n){const s=this.unitLoader.getUnitByName(n);s&&(this.selectedUnits.add(s.name),(s.cost_type==="Mercenary"||s.cost_type==="Authority")&&(this.mercenaryLimits[s.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(t){Object.values(t).forEach(e=>{this.selectAllInFamilies(e)})}deselectAllInCategory(t){Object.values(t).forEach(e=>{this.deselectAllInFamilies(e)})}selectAllInFamilies(t){Object.values(t).forEach(e=>{this.selectAllUnits(e)})}deselectAllInFamilies(t){Object.values(t).forEach(e=>{this.deselectAllUnits(e)})}selectAllUnits(t){t.forEach(e=>{this.selectedUnits.add(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&(this.mercenaryLimits[e.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(t){t.forEach(e=>{this.selectedUnits.delete(e.name),(e.cost_type==="Mercenary"||e.cost_type==="Authority")&&delete this.mercenaryLimits[e.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const t=document.getElementById("mercenary-limits");if(!t)return;const e=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&(n.cost_type==="Mercenary"||n.cost_type==="Authority"));if(e.length===0){t.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}t.innerHTML="",e.forEach(n=>{if(!n)return;const s=document.createElement("div");s.className="mercenary-item";const i=n.cost_type==="Authority"?"⚔️":"🗡️",a=n.cost_type==="Authority"?`AUTH: ${n.authority_cost}`:`AUTH: ${n.authority_cost}`;s.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">${i} ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health}, ${a})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,s.querySelector("input").addEventListener("change",l=>{const r=l.target;this.mercenaryLimits[r.dataset.unit]=parseInt(r.value)||1}),t.appendChild(s)})}updateOptimizeButton(){const t=document.getElementById("optimize-btn"),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!t||!e||!n)return;const s=this.selectedUnits.size>0,i=parseInt(e.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;t.disabled=!s||!i}async optimizeArmy(){try{this.currentMode==="stacking"?(this.showLoadingModal(),await this.optimizeForStacking(),this.hideLoadingModal()):await this.optimizeForDamage()}catch(t){console.error("Optimization failed:",t),alert("Optimization failed. Please check your inputs and try again."),this.hideLoadingModal(),this.hideProgressModal()}}async optimizeForStacking(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new k(t);const e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),s={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},i=await this.optimizer.optimizeArmy(s);this.displayStackingResults(i)}async optimizeForDamage(){const t=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits)),e=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),s=document.getElementById("enemy-count"),i=document.getElementById("max-combinations"),a={leadershipBudget:parseInt(e.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits),enemyGroupCount:parseInt(s.value)||5,maxCombinations:parseInt(i.value)||50};await this.runDamageOptimizationWithProgress(a,t)}async runDamageOptimizationWithProgress(t,e){this.optimizationAbortController=new AbortController,this.showProgressModal();try{this.damageOptimizer||(this.damageOptimizer=new H);const n={...t,signal:this.optimizationAbortController.signal,onProgress:i=>{this.updateProgressModal(i.progress,i.message,{combinationsEvaluated:i.combinationsEvaluated,totalToEvaluate:i.totalToEvaluate,phase:i.phase,estimatedRemainingMs:i.estimatedRemainingMs})}},s=await this.damageOptimizer.optimizeForDamage(n,e);await this.delay(500),this.hideProgressModal(),this.displayDamageResults(s)}catch(n){this.hideProgressModal(),n instanceof Error&&n.message.includes("cancelled")?console.log("Optimization cancelled by user"):(console.error("Damage optimization failed:",n),alert(`Optimization failed: ${n instanceof Error?n.message:"Unknown error"}`))}}delay(t){return new Promise(e=>setTimeout(e,t))}displayStackingResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),s=document.getElementById("results-section"),i=document.getElementById("stacking-results"),a=document.getElementById("damage-results");!e||!n||!s||(i&&i.classList.remove("hidden"),a&&a.classList.add("hidden"),e.innerHTML=`
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
    `,n.innerHTML="",t.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.compositions.forEach((o,l)=>{const r=this.createCompositionElement(o,l+1);n.appendChild(r)}),s.classList.remove("hidden"),M.showSection("results-section"),t.compositions.length>0&&(this.currentOptimizedArmy=t.compositions[0]))}displayDamageResults(t){const e=document.getElementById("optimization-stats"),n=document.getElementById("damage-army-list"),s=document.getElementById("results-section"),i=document.getElementById("stacking-results"),a=document.getElementById("damage-results");if(!e||!n||!s)return;i&&i.classList.add("hidden"),a&&a.classList.remove("hidden");const o=document.getElementById("battle-simulation-container");o&&(o.classList.add("hidden"),M.hideSection("battle-simulation-container")),e.innerHTML=`
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
    `,n.innerHTML="",t.rankedResults.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':t.rankedResults.slice(0,10).forEach((l,r)=>{const d=this.createDamageArmyElement(l,r+1);n.appendChild(d)}),s.classList.remove("hidden"),M.showSection("results-section"),$.isMobile()||setTimeout(()=>{s.scrollIntoView({behavior:"smooth",block:"start"})},100)}showBattleSimulationWithResults(t){const e=document.getElementById("battle-simulation-container");!e||!this.currentOptimizedArmy||(e.classList.remove("hidden"),M.showSection("battle-simulation-container"),this.battleSimulation||(this.battleSimulation=new D,this.battleSimulation.mount(e,this.currentOptimizedArmy)),this.battleSimulation.displayPreCalculatedResults(t),$.isMobile()||e.scrollIntoView({behavior:"smooth",block:"nearest"}))}showBattleSimulation(){if(!this.currentOptimizedArmy)return;const t=document.getElementById("battle-simulation-container");t&&(t.classList.remove("hidden"),this.battleSimulation||(this.battleSimulation=new D),this.battleSimulation.mount(t,this.currentOptimizedArmy),M.showSection("battle-simulation-container"),$.isMobile()||setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"start"})},100))}createCompositionElement(t,e){var r;const n=document.createElement("div");n.className="army-composition";const s=((r=this.optimizer)==null?void 0:r.explainStacking(t))||"No stacking explanation available",i=`
      <div class="composition-header">
        <div class="composition-title">Solution ${e} ${t.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${t.efficiencyScore.toFixed(2)}</div>
      </div>
    `,a=s.split(`
`).map(d=>d.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${d}</h3>`:d.includes("═".repeat(60))?'<hr class="title-divider">':d.includes("📊 ARMY SUMMARY")||d.includes("🗡️ MERCENARY FORCES")||d.includes("👑 LEADERSHIP FORCES")||d.includes("⚡ DOMINANCE FORCES")||d.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${d}</h4>`:d.includes("─".repeat(30))||d.includes("─".repeat(40))?'<hr class="section-divider">':d.includes("└─")?`<div class="unit-detail">${d}</div>`:d.trim()&&!d.includes("═")&&!d.includes("─")?`<div class="unit-line">${d}</div>`:d.trim()===""?'<div class="spacing"></div>':"").filter(d=>d!=="").join(""),o=`
      <div class="composition-actions">
        <button class="btn btn-secondary simulate-btn" data-composition-index="${e-1}">
          ⚔️ Simulate Battle
        </button>
      </div>
    `;n.innerHTML=i+'<div class="composition-content">'+a+"</div>"+o;const l=n.querySelector(".simulate-btn");return l&&l.addEventListener("click",()=>{this.currentOptimizedArmy=t,this.showBattleSimulation()}),n}createDamageArmyElement(t,e){const n=document.createElement("div");n.className="damage-army-card",n.setAttribute("data-army-index",(e-1).toString());const s=t.armyComposition.totalDominanceCost===0?"Leadership":t.armyComposition.totalLeadershipCost===0?"Dominance":"Mixed",i=s==="Leadership"?"🛡️":s==="Dominance"?"👹":"⚔️";return n.addEventListener("click",()=>this.selectDamageArmy(t,e-1)),n.innerHTML=`
      <div class="damage-army-header">
        <div class="army-rank">#${e}</div>
        <div class="army-strategy">
          <span class="strategy-icon">${i}</span>
          <span class="strategy-label">${s} Strategy</span>
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
    `,n}selectDamageArmy(t,e){document.querySelectorAll(".damage-army-card").forEach((s,i)=>{s.classList.toggle("selected",i===e)}),this.showSelectedArmyDetails(t),this.currentOptimizedArmy=t.armyComposition,this.showBattleSimulationWithResults(t.battleAnalysis)}showSelectedArmyDetails(t){const e=document.getElementById("selected-army-details"),n=document.getElementById("selected-army-composition");if(!e||!n)return;const s=t.armyComposition,i=this.unitLoader.getAvailableUnits(Object.keys(s.units)),o=new k(i).explainStacking(s);n.innerHTML=`
      <div class="selected-army-header">
        <h4>Army Composition Details</h4>
        <div class="army-summary-stats">
          <span class="summary-stat">
            <strong>Total Damage:</strong> ${t.averageDamagePerBattle.toLocaleString()}/battle
          </span>
          <span class="summary-stat">
            <strong>Total Strength:</strong> ${s.totalStrength.toLocaleString()}
          </span>
          <span class="summary-stat">
            <strong>Army Size:</strong> ${Object.values(s.units).reduce((l,r)=>l+r,0).toLocaleString()} units
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
    `,e.classList.remove("hidden"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}formatCombatLog(t){return!t||t.length===0?'<div class="no-combat-log">No combat actions recorded</div>':t.map((e,n)=>{const s=e.attacker&&!e.attacker.includes("Enemy");return`
        <div class="combat-action ${s?"player-action":"enemy-action"}">
          <div class="action-header">
            <span class="turn-number">Turn ${e.turn}</span>
            <span class="action-type">${s?"⚔️ Player Attack":"🛡️ Enemy Attack"}</span>
          </div>
          <div class="action-details">
            <strong>${e.attacker}</strong> ${e.action} <strong>${e.target}</strong>
            ${e.damageDealt?`<span class="damage-dealt">(${e.damageDealt.toLocaleString()} damage)</span>`:""}
            ${e.eliminated?'<span class="eliminated-indicator">💀 Eliminated</span>':""}
          </div>
        </div>
      `}).join("")}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={},this.currentOptimizedArmy=null;const t=document.getElementById("leadership-budget"),e=document.getElementById("dominance-budget"),n=document.getElementById("results-section"),s=document.getElementById("battle-simulation-container");t&&(t.value="0"),e&&(e.value="0"),n&&(n.classList.add("hidden"),M.hideSection("results-section")),s&&(s.classList.add("hidden"),M.hideSection("battle-simulation-container")),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}switchMode(t){this.currentMode=t;const e=document.getElementById("stacking-mode-btn"),n=document.getElementById("damage-mode-btn");e&&n&&(e.classList.toggle("active",t==="stacking"),n.classList.toggle("active",t==="damage"));const s=document.getElementById("stacking-description"),i=document.getElementById("damage-description");s&&i&&(s.classList.toggle("hidden",t!=="stacking"),i.classList.toggle("hidden",t!=="damage"));const a=document.getElementById("damage-controls");a&&a.classList.toggle("hidden",t!=="damage");const o=document.getElementById("optimize-btn-text");o&&(t==="stacking"?o.textContent="🚀 Optimize Army":o.textContent="⚔️ Optimize for Damage");const l=document.getElementById("results-title");l&&(t==="stacking"?l.textContent="🎯 Stacking Results":l.textContent="⚔️ Damage Optimization Results");const r=document.getElementById("results-section");r&&(r.classList.add("hidden"),M.hideSection("results-section"));const d=document.getElementById("battle-simulation-container");d&&(d.classList.add("hidden"),M.hideSection("battle-simulation-container"))}showLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.remove("hidden")}hideLoadingModal(){const t=document.getElementById("loading-modal");t&&t.classList.add("hidden")}showProgressModal(){let t=document.getElementById("progress-modal");if(!t){t=document.createElement("div"),t.id="progress-modal",t.className="modal",t.innerHTML=`
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
      `,document.body.appendChild(t);const e=document.getElementById("cancel-optimization-btn");e&&e.addEventListener("click",()=>{this.cancelOptimization()})}t.classList.remove("hidden"),this.optimizationStartTime=performance.now(),this.updateProgressModal(0,"Initializing..."),this.startProgressTimer()}updateProgressModal(t,e,n){const s=document.getElementById("progress-fill"),i=document.getElementById("progress-text"),a=document.getElementById("progress-percentage"),o=document.getElementById("progress-combinations"),l=document.getElementById("progress-phase"),r=document.getElementById("progress-remaining");if(s&&(s.style.width=`${t}%`),i&&(i.textContent=e),a&&(a.textContent=`${Math.round(t)}%`),o&&n){const d=n.combinationsEvaluated||0,m=n.totalToEvaluate||0;o.textContent=`${d.toLocaleString()} / ${m.toLocaleString()} combinations`}if(l&&(n!=null&&n.phase)&&(l.textContent=n.phase.charAt(0).toUpperCase()+n.phase.slice(1)),r&&(n!=null&&n.estimatedRemainingMs)){const d=Math.ceil(n.estimatedRemainingMs/1e3),m=Math.floor(d/60),c=d%60;r.textContent=`(~${m}:${c.toString().padStart(2,"0")} remaining)`}else r&&(r.textContent="")}startProgressTimer(){this.progressUpdateInterval=window.setInterval(()=>{const t=performance.now()-this.optimizationStartTime,e=Math.floor(t/1e3),n=Math.floor(e/60),s=e%60,i=document.getElementById("progress-elapsed");i&&(i.textContent=`${n.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`)},1e3)}stopProgressTimer(){this.progressUpdateInterval&&(clearInterval(this.progressUpdateInterval),this.progressUpdateInterval=null)}cancelOptimization(){this.optimizationAbortController&&(this.optimizationAbortController.abort(),this.hideProgressModal(),alert("Optimization cancelled by user."))}hideProgressModal(){const t=document.getElementById("progress-modal");t&&t.classList.add("hidden"),this.stopProgressTimer(),this.optimizationAbortController=null}initializeMobileOptimizations(){A.optimizeCombatLogs(),A.optimizeUnitCards(),this.addTouchSupportToUnitCards(),$.addLayoutChangeListener(t=>{this.handleLayoutModeChange(t)})}addTouchSupportToUnitCards(){document.querySelectorAll(".unit-card").forEach(e=>{e instanceof HTMLElement&&T.addHapticFeedback(e)})}handleLayoutModeChange(t){setTimeout(()=>{A.optimizeCombatLogs(),A.optimizeUnitCards(),this.addTouchSupportToUnitCards()},100)}}document.addEventListener("DOMContentLoaded",()=>{const C=document.getElementById("app");if(!C)throw new Error("App container not found");new F().mount(C),window.addEventListener("error",e=>{console.error("Global error:",e.error)}),window.addEventListener("unhandledrejection",e=>{console.error("Unhandled promise rejection:",e.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-CyAu6LN9.js.map
