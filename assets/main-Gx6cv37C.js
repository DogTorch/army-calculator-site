var x=Object.defineProperty;var E=(S,e,t)=>e in S?x(S,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):S[e]=t;var C=(S,e,t)=>E(S,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class b{static isMercenary(e){return e.cost_type==="Mercenary"||e.authority_cost>0}static getPrimaryCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}static getStrengthPerCost(e){const t=b.getPrimaryCost(e);return t>0?e.strength/t:0}static getHealthPerCost(e){const t=b.getPrimaryCost(e);return t>0?e.health/t:0}}class B{constructor(){C(this,"units",[]);C(this,"unitsByName",new Map);C(this,"unitsByCostType",{Leadership:[],Dominance:[],Authority:[],Mercenary:[]});this.resetData()}async loadUnits(e){try{let t;if(typeof e=="string"){console.log(`Loading units from: ${e}`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch units: ${n.status} ${n.statusText}`);t=await n.json()}else t=e;if(!Array.isArray(t))throw new Error("Unit data must be an array");return this.units=t.map(n=>this.validateAndNormalizeUnit(n)),this.buildLookups(),console.log(`✅ Loaded ${this.units.length} units successfully`),this.units}catch(t){throw console.error("❌ Error loading units:",t),t}}validateAndNormalizeUnit(e){const t={name:e.name||"Unknown",unit_types:Array.isArray(e.unit_types)?e.unit_types:[],cost_type:e.cost_type||"Leadership",health:Number(e.health)||0,strength:Number(e.strength)||0,leadership_cost:Number(e.leadership_cost)||0,dominance_cost:Number(e.dominance_cost)||0,authority_cost:Number(e.authority_cost)||0,food_consumption:Number(e.food_consumption)||0,carrying_capacity:Number(e.carrying_capacity)||0,revival_cost_gold:Number(e.revival_cost_gold)||0,revival_cost_silver:Number(e.revival_cost_silver)||0,source_file:e.source_file||""};return["Leadership","Dominance","Authority","Mercenary"].includes(t.cost_type)||(console.warn(`Invalid cost type for unit ${t.name}: ${t.cost_type}`),t.cost_type="Leadership"),t}buildLookups(){this.resetData(),this.unitsByName=new Map(this.units.map(e=>[e.name,e])),this.units.forEach(e=>{b.isMercenary(e)?this.unitsByCostType.Mercenary.push(e):e.cost_type in this.unitsByCostType&&this.unitsByCostType[e.cost_type].push(e)}),Object.keys(this.unitsByCostType).forEach(e=>{this.unitsByCostType[e].sort((t,n)=>t.strength-n.strength)})}resetData(){this.unitsByName.clear(),this.unitsByCostType={Leadership:[],Dominance:[],Authority:[],Mercenary:[]}}getAllUnits(){return[...this.units]}getUnitByName(e){return this.unitsByName.get(e)}getUnitsByCostType(e){return[...this.unitsByCostType[e]]}getAvailableUnits(e){const t=[];for(const n of e){const s=this.getUnitByName(n);s?t.push(s):console.warn(`Unit '${n}' not found in loaded data`)}return t}filterUnits(e){let t=this.units;return e.costType&&(t=t.filter(n=>n.cost_type===e.costType)),e.unitTypes&&e.unitTypes.length>0&&(t=t.filter(n=>e.unitTypes.some(s=>n.unit_types.includes(s)))),e.minStrength!==void 0&&(t=t.filter(n=>n.strength>=e.minStrength)),e.maxCost!==void 0&&(t=t.filter(n=>b.getPrimaryCost(n)<=e.maxCost)),t}searchUnits(e){if(!e.trim())return this.getAllUnits();const t=e.toLowerCase();return this.units.filter(n=>n.name.toLowerCase().includes(t))}getEnhancedUnits(){return this.units.map(e=>({...e,get isMercenary(){return b.isMercenary(e)},get primaryCost(){return b.getPrimaryCost(e)},get strengthPerCost(){return b.getStrengthPerCost(e)},get healthPerCost(){return b.getHealthPerCost(e)}}))}getUnitSummary(){if(this.units.length===0)return{totalUnits:0,byCostType:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthRange:{min:0,max:0},healthRange:{min:0,max:0}};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,byCostType:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthRange:{min:Math.min(...e),max:Math.max(...e)},healthRange:{min:Math.min(...t),max:Math.max(...t)}}}getUniqueUnitTypes(){const e=new Set;return this.units.forEach(t=>{t.unit_types.forEach(n=>e.add(n))}),Array.from(e).sort()}getStatistics(){if(this.units.length===0)return{totalUnits:0,costTypeDistribution:{Leadership:0,Dominance:0,Authority:0,Mercenary:0},strengthStats:{min:0,max:0,avg:0},healthStats:{min:0,max:0,avg:0},topUnitsByStrength:[],topUnitsByHealth:[]};const e=this.units.map(n=>n.strength),t=this.units.map(n=>n.health);return{totalUnits:this.units.length,costTypeDistribution:{Leadership:this.unitsByCostType.Leadership.length,Dominance:this.unitsByCostType.Dominance.length,Authority:this.unitsByCostType.Authority.length,Mercenary:this.unitsByCostType.Mercenary.length},strengthStats:{min:Math.min(...e),max:Math.max(...e),avg:Math.round(e.reduce((n,s)=>n+s,0)/e.length)},healthStats:{min:Math.min(...t),max:Math.max(...t),avg:Math.round(t.reduce((n,s)=>n+s,0)/t.length)},topUnitsByStrength:[...this.units].sort((n,s)=>s.strength-n.strength).slice(0,10),topUnitsByHealth:[...this.units].sort((n,s)=>s.health-n.health).slice(0,10)}}}class A{constructor(e){C(this,"availableUnits");C(this,"unitsByName");C(this,"leadershipUnits");C(this,"dominanceUnits");C(this,"mercenaryUnits");this.availableUnits=[...e],this.unitsByName=new Map(e.map(t=>[t.name,t])),this.leadershipUnits=e.filter(t=>t.cost_type==="Leadership").sort((t,n)=>t.strength-n.strength),this.dominanceUnits=e.filter(t=>t.cost_type==="Dominance").sort((t,n)=>t.strength-n.strength),this.mercenaryUnits=e.filter(t=>b.isMercenary(t)).sort((t,n)=>t.strength-n.strength)}async optimizeArmy(e){const t=performance.now();console.log(`🔍 Optimizing army with L:${e.leadershipBudget} D:${e.dominanceBudget} M:${Object.keys(e.mercenaryLimits).length}`),console.log(`📋 Selected units: ${e.availableUnits.join(", ")}`);const n=[],s=this.generateGuaranteedValidCompositions(e);console.log(`Generated ${s.length} guaranteed valid army combinations`);let o=0;for(const l of s){o++;const m=this.evaluateComposition(l);n.push(m)}const i=performance.now();console.log(`Evaluated ${o} combinations, found ${n.length} valid stackings`);const a=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Leadership"),r=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&l.cost_type==="Dominance"),c=this.availableUnits.filter(l=>e.availableUnits.includes(l.name)&&b.isMercenary(l)),u=n.filter(l=>{const m=a.some(g=>l.units[g.name]&&l.units[g.name]>0),h=r.some(g=>l.units[g.name]&&l.units[g.name]>0),p=c.some(g=>l.units[g.name]&&l.units[g.name]>0);return[a.length>0?m:!0,r.length>0?h:!0,c.length>0?p:!0].every(g=>g)});return u.sort((l,m)=>{const h=l.totalLeadershipCost/e.leadershipBudget+l.totalDominanceCost/e.dominanceBudget;return m.totalLeadershipCost/e.leadershipBudget+m.totalDominanceCost/e.dominanceBudget-h}),{compositions:u.length>0?[u[0]]:n.slice(0,1),totalCombinationsEvaluated:o,validStackingsFound:n.length,executionTimeMs:i-t}}generateGuaranteedValidCompositions(e){const t=[],n=this.availableUnits.filter(i=>e.availableUnits.includes(i.name)&&i.cost_type==="Leadership").sort((i,a)=>a.strength-i.strength),s=this.availableUnits.filter(i=>e.availableUnits.includes(i.name)&&i.cost_type==="Dominance").sort((i,a)=>a.strength-i.strength),o=this.availableUnits.filter(i=>e.availableUnits.includes(i.name)&&b.isMercenary(i));if(console.log(`Selected units: L:${n.length} D:${s.length} M:${o.length}`),console.log("Leadership units:",n.map(i=>i.name)),console.log("Dominance units:",s.map(i=>i.name)),console.log("Mercenary units:",o.map(i=>i.name)),console.log(`🎯 MUST use ALL selected units: L:${n.length} D:${s.length} M:${o.length}`),console.log(`Budgets: Leadership:${e.leadershipBudget} Dominance:${e.dominanceBudget}`),n.length>0&&s.length>0&&o.length>0&&e.leadershipBudget>0&&e.dominanceBudget>0){console.log("🔗 Generating ALL THREE types compositions");const i=[...n,...o];t.push(...this.generateCombinedStackedCompositions(i,s,e.leadershipBudget,e.dominanceBudget,e.mercenaryLimits))}else if(n.length>0&&o.length>0&&s.length===0&&e.leadershipBudget>0){console.log("🤝 Generating Leadership + Mercenary compositions (PROPER STACKING)");const i=[...n,...o],a=this.calculateProperStackingQuantities(i,e.leadershipBudget,e.mercenaryLimits);t.push(a)}else if(s.length>0&&o.length>0&&n.length===0&&e.dominanceBudget>0){console.log("🤝 Generating Dominance + Mercenary compositions (NEW SIMPLE STACKING)");const i=this.calculateProperStackingQuantitiesForDominance(s,e.dominanceBudget),a={};for(const c of o)a[c.name]=e.mercenaryLimits[c.name]||1;const r={...i,...a};t.push(r)}else if(n.length>0&&s.length>0&&o.length===0&&e.leadershipBudget>0&&e.dominanceBudget>0)console.log("🤝 Generating Leadership + Dominance compositions"),t.push(...this.generateCombinedStackedCompositions(n,s,e.leadershipBudget,e.dominanceBudget,{}));else if(n.length>0&&s.length===0&&o.length===0&&e.leadershipBudget>0){console.log("👑 Generating Leadership-only compositions (NEW PROPER STACKING)");const i=this.calculateProperStackingQuantities(n,e.leadershipBudget,{});t.push(i)}else if(s.length>0&&n.length===0&&o.length===0&&e.dominanceBudget>0){console.log("⚡ Generating Dominance-only compositions (NEW SIMPLE STACKING)");const i=this.calculateProperStackingQuantitiesForDominance(s,e.dominanceBudget);t.push(i)}else if(o.length>0&&n.length===0&&s.length===0){console.log("🗡️ Generating Mercenary-only compositions");const i={};for(const a of o){const r=e.mercenaryLimits[a.name]||1;i[a.name]=r}Object.keys(i).length>0&&t.push(i)}else console.log("❌ No valid combination of selected units and budgets");return n.length>0&&o.length>0&&e.leadershipBudget>0&&t.push(...this.generateMercenaryMixedCompositions(n,o,e.leadershipBudget,e.mercenaryLimits,"leadership_cost")),s.length>0&&o.length>0&&e.dominanceBudget>0&&t.push(...this.generateMercenaryMixedCompositions(s,o,e.dominanceBudget,e.mercenaryLimits,"dominance_cost")),t}generateStackedCompositionsWithMercenaries(e,t,n,s){console.log("�🚨🚨 NEW METHOD CALLED! 🚨🚨🚨"),console.log("�🗡️ Generating Leadership + Mercenary stacks (NEW PROPER STACKING)");const o=[...e,...t];console.log(`🚨 About to call calculateProperStackingQuantities with ${o.length} units`);const i=this.calculateProperStackingQuantities(o,n,s);return console.log("🚨 Got composition back:",i),[i]}calculateCleanStackingPattern(e,t){const n={};if(e.length===0)return n;const s=e[0];n[s.name]=1,console.log(`🎯 Starting with 1x ${s.name} (STR: ${s.strength})`);for(let o=1;o<e.length;o++){const i=e[o],a=e[o-1],r=a.health*(n[a.name]||1),c=Math.ceil((r+1)/i.health);n[i.name]=c,console.log(`📋 ${i.name}: need ${c} units (${c*i.health} HP) to exceed ${a.name} (${r} HP)`)}return n}calculateProperStackingQuantities(e,t,n){console.log(`🔧 SIMPLE STACKING: Starting with budget ${t}`);const s={},o=[...e].sort((l,m)=>m.strength-l.strength),i=o.filter(l=>l.cost_type==="Leadership"),a=o.filter(l=>b.isMercenary(l));if(o.length===0)return console.log("🔧 SIMPLE STACKING: No units selected"),s;console.log(`🔧 SIMPLE STACKING: Creating base pattern with ${o.length} units (${i.length} leadership + ${a.length} mercenary)`);const r=o[0],c={};c[r.name]=1;const u=r.health*1;console.log(`🔧 Base: 1x ${r.name} = ${u} HP (strongest)`);for(let l=1;l<o.length;l++){const m=o[l],h=Math.ceil((u+1)/m.health);c[m.name]=h;const p=b.isMercenary(m)?"mercenary":"leadership";console.log(`🔧 Base: ${h}x ${m.name} = ${h*m.health} HP (beats ${u}) [${p}]`)}console.log("🔧 Validating base pattern stacking order...");for(let l=0;l<o.length-1;l++){const m=o[l],h=o[l+1],p=m.health*c[m.name];let y=h.health*c[h.name];if(y<=p)if(b.isMercenary(h))console.log(`🔧 WARNING: ${h.name} mercenary limit (${c[h.name]}) gives ${y} HP, can't beat ${p} HP`);else{const g=Math.ceil((p+1)/h.health);c[h.name]=g,y=h.health*g,console.log(`🔧 Fixed: ${h.name} increased to ${g} units = ${y} HP (now beats ${p})`)}else console.log(`🔧 OK: ${h.name} ${c[h.name]} units = ${y} HP (beats ${p})`)}let d=0;for(const[l,m]of Object.entries(c)){const h=this.unitsByName.get(l);h&&h.cost_type==="Leadership"&&(d+=m*h.leadership_cost)}if(console.log(`🔧 Base pattern leadership cost: ${d}`),d===0){console.log("🔧 No leadership costs, using mercenaries only");for(const[l,m]of Object.entries(c))s[l]=m}else{const l=Math.floor(t/d);console.log(`🔧 Can afford ${l} base stacks (${t} / ${d})`);for(const[m,h]of Object.entries(c)){const p=this.unitsByName.get(m);if(p&&b.isMercenary(p)){const y=h*l,g=n[m]||1;s[m]=Math.min(y,g),y>g?console.log(`🔧 Mercenary ${m}: wanted ${y}, capped at limit ${g}`):console.log(`🔧 Mercenary ${m}: scaled to ${y} (under limit ${g})`)}else s[m]=h*l}}return console.log("🔧 SIMPLE STACKING: Final composition:",s),s}calculateProperStackingQuantitiesForDominance(e,t){console.log(`🔧 DOMINANCE STACKING: Starting with budget ${t}`);const n={},s=[...e].sort((u,d)=>d.strength-u.strength);if(s.length===0)return console.log("🔧 DOMINANCE STACKING: No dominance units selected"),n;console.log(`🔧 DOMINANCE STACKING: Creating base pattern with ${s.length} dominance units`);const o=s[0],i={};i[o.name]=1;const a=o.health*1;console.log(`🔧 Base: 1x ${o.name} = ${a} HP (strongest)`);for(let u=1;u<s.length;u++){const d=s[u],l=Math.ceil((a+1)/d.health);i[d.name]=l,console.log(`🔧 Base: ${l}x ${d.name} = ${l*d.health} HP (beats ${a})`)}console.log("🔧 Validating dominance base pattern stacking order...");for(let u=0;u<s.length-1;u++){const d=s[u],l=s[u+1],m=d.health*i[d.name];let h=l.health*i[l.name];if(h<=m){const p=Math.ceil((m+1)/l.health);i[l.name]=p,h=l.health*p,console.log(`🔧 Fixed: ${l.name} increased to ${p} units = ${h} HP (now beats ${m})`)}else console.log(`🔧 OK: ${l.name} ${i[l.name]} units = ${h} HP (beats ${m})`)}let r=0;for(const[u,d]of Object.entries(i)){const l=this.unitsByName.get(u);l&&l.cost_type==="Dominance"&&(r+=d*l.dominance_cost)}if(console.log(`🔧 Base pattern dominance cost: ${r}`),r===0)return console.log("🔧 No dominance costs found"),n;const c=Math.floor(t/r);console.log(`🔧 Can afford ${c} base stacks (${t} / ${r})`);for(const[u,d]of Object.entries(i))n[u]=d*c;return console.log("🔧 DOMINANCE STACKING: Final composition:",n),n}calculateLeadershipCost(e){return Object.entries(e).reduce((t,[n,s])=>{const o=this.unitsByName.get(n);return o&&o.cost_type==="Leadership"?t+s*o.leadership_cost:t},0)}calculateMaxStacksByMercenaries(e,t){let n=1/0;for(const[s,o]of Object.entries(e)){const i=this.unitsByName.get(s);if(i&&b.isMercenary(i)){const a=t[s]||1,r=Math.floor(a/o);n=Math.min(n,r),console.log(`🗡️ ${s}: limit ${a}, base need ${o}, allows ${r} stacks`)}}return n===1/0?100:n}generateDominanceMercenaryCompositions(e,t,n,s){const o=[];console.log("⚡🗡️ Generating Dominance + Mercenary stacks");const i=[...e,...t].sort((l,m)=>m.strength-l.strength);if(i.length===0)return o;const a=this.calculateCleanStackingPattern(i,s);console.log("📊 Dominance + Mercenary base pattern:",a);const r=Object.entries(a).reduce((l,[m,h])=>{const p=this.unitsByName.get(m);return p&&p.cost_type==="Dominance"?l+h*p.dominance_cost:l},0);if(console.log(`💰 Dominance cost per stack: ${r}`),r>n){console.log("❌ Can't afford mercenary stack, falling back to pure strategies");const l={};for(const m of t)l[m.name]=s[m.name]||1;return o.push(l),e.length>0&&o.push(...this.generateStackedCompositions(e,n,"dominance_cost")),o}const c=Math.floor(n/r),u=this.calculateMaxStacksByMercenaries(a,s),d=Math.min(c,u);console.log(`🔢 Max Dominance+Mercenary stacks: ${d}`);for(let l=1;l<=Math.min(d,5);l++){const m={};for(const[h,p]of Object.entries(a)){const y=this.unitsByName.get(h);y&&b.isMercenary(y)?m[h]=Math.min(p*l,s[h]||1):m[h]=p*l}o.push(m)}if(u<c&&e.length>0){const l=n-d*r,m=this.generateStackedCompositions(e,l,"dominance_cost"),h={};for(const p of t)h[p.name]=s[p.name]||1;for(const p of m.slice(0,3)){const y={...h,...p};o.push(y)}}return o}generateStackedCompositions(e,t,n){const s=[];if(e.length===0||t<=0)return s;const o=e[0];console.log(`🎯 Strongest unit: ${o.name} (STR: ${o.strength})`);const i=this.calculateStackingPattern(e);console.log("📊 Base stacking pattern:",i);const a=Object.entries(i).reduce((c,[u,d])=>{const l=this.unitsByName.get(u);if(l){const m=l[n];return c+d*m}return c},0);if(console.log(`💰 Base pattern cost: ${a}`),a<=0)return s;const r=Math.floor(t/a);console.log(`🔢 Max multiplier: ${r}`);for(let c=1;c<=Math.min(r,10);c++){const u={};for(const[d,l]of Object.entries(i))u[d]=l*c;s.push(u)}return e.length>1&&s.push(...this.generateStackingVariations(e,t,n)),s}calculateStackingPattern(e){const t={};if(e.length===0)return t;const n=e[0];t[n.name]=1;for(let s=1;s<e.length;s++){const o=e[s],i=e[s-1],a=i.health*(t[i.name]||1),r=Math.ceil((a+1)/o.health);t[o.name]=r,console.log(`📋 ${o.name}: need ${r} units (${r*o.health} HP) to exceed ${i.name} (${a} HP)`)}return t}generateCombinedStackedCompositions(e,t,n,s,o={}){const i=[];console.log("🔗 Generating combined Leadership + Mercenary + Dominance stacks");const a=e.filter($=>$.cost_type==="Leadership"),r=e.filter($=>b.isMercenary($));console.log("🗡️ Generating Leadership + Mercenary stacks (proper stacking approach)");const c=[...a,...r],d=[this.calculateProperStackingQuantities(c,n,o)];if(d.length===0)return i;const l=d[d.length-1];if(!l)return i;console.log("🎯 Using maximum Leadership composition for combination");const m=l,h=t[0];console.log(`🎯 Strongest Dominance unit: ${h.name} (STR: ${h.strength})`);const p=this.findClosestStrengthUnit(h,e);if(!p)return console.log("❌ No suitable Leadership unit found for comparison"),i;console.log(`🔍 Comparing to Leadership unit: ${p.name} (STR: ${p.strength})`);const y=m[p.name]||0,g=p.health*y;if(console.log(`📊 Comparison unit total health: ${g} (${y}x ${p.health})`),g<=0)return console.log("❌ Comparison unit not in Leadership composition"),i;const f=h.health;f>=g&&(console.log(`⚠️ Single Dominance unit too strong: ${f} HP >= ${g} HP`),console.log("🔧 Trying constrained Dominance stack anyway (may use weaker Dominance units)")),console.log("🔄 Creating independent Dominance stack to maximize budget usage (NEW SIMPLE STACKING)");const M=[this.calculateProperStackingQuantitiesForDominance(t,s)];if(M.length>0){const $=M[M.length-1],L={...m,...$};i.push(L),console.log("✅ Created independent L+M + D composition maximizing both budgets")}else console.log("⚠️ Using Leadership+Mercenary composition only"),i.push(m);return i}findClosestStrengthUnit(e,t){if(t.length===0)return null;let n=t[0],s=Math.abs(e.strength-n.strength);for(const o of t){const i=Math.abs(e.strength-o.strength);i<s&&(s=i,n=o)}return console.log(`🎯 Closest match: ${n.name} (STR: ${n.strength}) vs ${e.name} (STR: ${e.strength}), diff: ${s}`),n}calculateConstrainedDominanceStack(e,t,n){const s={};if(console.log(`🔒 Calculating Dominance stack with max health constraint: ${n}`),e.length===0||t<=0||n<=0)return s;const o=e[0],i=Math.floor((n-1)/o.health),a=Math.floor(t/o.dominance_cost),r=Math.min(i,a);if(r<=0)return console.log(`❌ Cannot fit any ${o.name} within constraints`),s;for(let c=Math.min(r,3);c>=1;c--){const u={};u[o.name]=c;let d=c*o.dominance_cost,l=c*o.health;console.log(`🧪 Testing ${c}x ${o.name} (${l} HP, ${d} cost)`);for(let h=1;h<e.length&&d<t;h++){const p=e[h],y=t-d,g=Math.ceil((l+1)/p.health),f=Math.floor(y/p.dominance_cost),v=Math.min(g,f);v>0&&(u[p.name]=v,d+=v*p.dominance_cost,console.log(`  ➕ Added ${v}x ${p.name} (${v*p.health} HP)`))}const m=Object.entries(u).reduce((h,[p,y])=>{const g=this.unitsByName.get(p);return g?h+y*g.health:h},0);if(m<n)return console.log(`✅ Valid Dominance stack: ${m} HP < ${n} HP limit`),u;console.log(`❌ Dominance stack too strong: ${m} HP >= ${n} HP limit`)}return console.log("❌ Could not create valid constrained Dominance stack"),s}generateMercenaryMixedCompositions(e,t,n,s,o){const i=[];console.log("🗡️ Generating mixed compositions with mercenaries");const a=this.generateStackedCompositions(e,n,o);if(a.length===0)return i;for(const r of a.slice(0,3)){const c=t.sort((g,f)=>f.strength-g.strength)[0];if(!c)continue;console.log(`🎯 Strongest Mercenary: ${c.name} (STR: ${c.strength})`);const u=this.findClosestStrengthUnit(c,e);if(!u){console.log("❌ No suitable base unit found for comparison");continue}const d=r[u.name]||0,l=u.health*d;if(console.log(`📊 Comparison base unit total health: ${l}`),l<=0){console.log("❌ Comparison unit not in base composition");continue}const m=c.health,h=s[c.name]||1,p=m*h;if(p>=l){console.log(`⚠️ Mercenary too strong: ${p} HP >= ${l} HP`),console.log("🔧 Reducing mercenary quantity to fit stacking order");const g=Math.floor((l-1)/m);if(g>0){console.log(`✅ Using ${g}x ${c.name} instead of ${h}`);const f={...r};f[c.name]=g;for(const v of t)if(v.name!==c.name){const M=s[v.name]||1;f[v.name]=M}i.push(f),console.log("✅ Created mixed composition with reduced mercenaries")}else console.log("❌ Even 1 mercenary too strong, skipping mercenary integration"),i.push(r);continue}const y={...r};for(const g of t){const f=s[g.name]||1;y[g.name]=f}i.push(y),console.log("✅ Created mixed composition with mercenaries")}return i}createAlternativeDominanceStack(e,t,n){const s={};console.log(`🔄 Creating alternative Dominance stack with max health: ${n}`);const o=[...e].sort((r,c)=>r.health-c.health);let i=0,a=0;for(const r of o){const c=Math.floor((n-a-1)/r.health),u=Math.floor((t-i)/r.dominance_cost),d=Math.min(c,u);d>0&&(s[r.name]=d,i+=d*r.dominance_cost,a+=d*r.health,console.log(`➕ Added ${d}x ${r.name} (${d*r.health} HP, ${d*r.dominance_cost} cost)`))}return console.log(`📊 Alternative Dominance stack: ${a} HP total, ${i} cost`),s}calculateMaximizedDominanceStack(e,t,n){console.log(`💰 Maximizing Dominance budget: ${t} with health limit: ${n}`);const s=this.createAlternativeDominanceStack(e,t,n);return Object.keys(s).length>0?s:this.calculateConstrainedDominanceStack(e,t,n)}generateStackingVariations(e,t,n){const s=[],o={},i=e[0],a=i[n];if(a>0){const r=Math.floor(t/a);o[i.name]=Math.min(r,5);let c=t-o[i.name]*a;for(let u=1;u<e.length&&c>0;u++){const d=e[u],l=d[n];if(l>0&&l<=c){const m=Math.floor(c/l/(e.length-u));m>0&&(o[d.name]=m,c-=m*l)}}s.push(o)}return s}generateGuaranteedDiverseCompositions_OLD(e){const t=[],n=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&c.cost_type==="Leadership"),s=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&c.cost_type==="Dominance"),o=this.availableUnits.filter(c=>e.availableUnits.includes(c.name)&&b.isMercenary(c)),i={};let a=0,r=0;for(const c of n)a+c.leadership_cost<=e.leadershipBudget&&(i[c.name]=1,a+=c.leadership_cost);for(const c of s)r+c.dominance_cost<=e.dominanceBudget&&(i[c.name]=1,r+=c.dominance_cost);for(const c of o){const u=e.mercenaryLimits[c.name]||1;i[c.name]=Math.min(1,u)}if(Object.keys(i).length>0&&t.push(i),n.length>0&&e.leadershipBudget>0){const c=n.sort((d,l)=>d.leadership_cost-l.leadership_cost)[0],u=Math.floor(e.leadershipBudget/c.leadership_cost);if(u>0){const d={};d[c.name]=Math.min(u,20);const l=e.leadershipBudget-d[c.name]*c.leadership_cost;for(const m of n.slice(1,3)){const h=Math.floor(l/m.leadership_cost/2);h>0&&(d[m.name]=h)}t.push(d)}}if(n.length>0||s.length>0){const c={};if(n.length>0&&e.leadershipBudget>0){const u=Math.floor(e.leadershipBudget/n.length);for(const d of n){const l=Math.floor(u/d.leadership_cost);l>0&&(c[d.name]=l)}}if(s.length>0&&e.dominanceBudget>0){const u=Math.floor(e.dominanceBudget/s.length);for(const d of s){const l=Math.floor(u/d.dominance_cost);l>0&&(c[d.name]=l)}}for(const u of o){const d=e.mercenaryLimits[u.name]||1;c[u.name]=Math.max(1,Math.floor(d/2))}Object.keys(c).length>0&&t.push(c)}return t}generateMercenaryCombinations(e){if(Object.keys(e).length===0)return[{}];let t=[{}];for(const[n,s]of Object.entries(e)){if(!this.unitsByName.has(n))continue;const o=[];for(const i of t)for(let a=0;a<=s;a++){const r={...i};a>0&&(r[n]=a),o.push(r)}t=o}return t}evaluateComposition(e){let t=0,n=0,s=0,o=0,i=0;const a=[];for(const[y,g]of Object.entries(e)){const f=this.unitsByName.get(y);if(!f)continue;const v=f.health*g,M=f.strength*g;t+=M,n+=v,s+=f.leadership_cost*g,o+=f.dominance_cost*g,b.isMercenary(f)&&(i+=g),a.push({unit:f,count:g,totalHealth:v,unitStrength:f.strength})}a.sort((y,g)=>y.unitStrength-g.unitStrength);let r=!0;const c=[];for(let y=0;y<a.length;y++){const{unit:g,count:f,totalHealth:v}=a[y];c.push({unitName:g.name,count:f,totalHealth:v,unitStrength:g.strength});for(let M=y+1;M<a.length;M++){const $=a[M].unit,L=a[M].totalHealth;if(g.strength===$.strength){const U=Math.max(v,L)*.1;if(Math.abs(v-L)<=U)continue}v<=L&&console.log(`❌ Stacking violation: ${g.name} (STR:${g.strength}, ${v} HP) <= ${$.name} (STR:${$.strength}, ${L} HP)`)}}const u=s+o+i;let d=u>0?t/u:0;d*=1.2;const m=1+(Object.keys(e).length-1)*.05;d*=m;let h=0;s>0&&h++,o>0&&h++,i>0&&h++;const p=1+(h-1)*.1;return d*=p,{units:e,totalStrength:t,totalHealth:n,totalLeadershipCost:s,totalDominanceCost:o,totalMercenaryCount:i,stackingOrder:c,isValidStacking:r,efficiencyScore:d}}explainStacking(e){const t=[],n=[],s=[],o=[];return e.stackingOrder.forEach(i=>{const a=this.unitsByName.get(i.unitName);if(!a)return;const r={name:i.unitName,count:i.count,totalHealth:i.totalHealth,strength:a.strength};b.isMercenary(a)?o.push(r):a.cost_type==="Leadership"?n.push(r):a.cost_type==="Dominance"&&s.push(r)}),t.push("🏆 OPTIMIZED ARMY COMPOSITION"),t.push("═".repeat(60)),t.push(""),t.push("📊 ARMY SUMMARY"),t.push("─".repeat(30)),t.push(`Total Units: ${Object.values(e.units).reduce((i,a)=>i+a,0).toLocaleString()}`),t.push(`Total Strength: ${e.totalStrength.toLocaleString()}`),t.push(`Total Health: ${e.totalHealth.toLocaleString()}`),t.push(`Budget Usage: L:${e.totalLeadershipCost} D:${e.totalDominanceCost} M:${e.totalMercenaryCount}`),t.push(""),o.length>0&&(t.push("🗡️ MERCENARY FORCES"),t.push("─".repeat(30)),o.forEach(i=>{t.push(`${i.count.toLocaleString()}x ${i.name}`),t.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),t.push("")),n.length>0&&(t.push("👑 LEADERSHIP FORCES"),t.push("─".repeat(30)),n.sort((i,a)=>a.strength-i.strength),n.forEach(i=>{t.push(`${i.count.toLocaleString()}x ${i.name}`),t.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),t.push("")),s.length>0&&(t.push("⚡ DOMINANCE FORCES"),t.push("─".repeat(30)),s.sort((i,a)=>a.strength-i.strength),s.forEach(i=>{t.push(`${i.count.toLocaleString()}x ${i.name}`),t.push(`   └─ ${i.totalHealth.toLocaleString()} HP total (STR: ${i.strength})`)}),t.push("")),t.push("⚔️ BATTLE ORDER (Weakest → Strongest)"),t.push("─".repeat(40)),e.stackingOrder.forEach((i,a)=>{const r=this.unitsByName.get(i.unitName);if(!r)return;const c=b.isMercenary(r)?"🗡️":r.cost_type==="Leadership"?"👑":r.cost_type==="Dominance"?"⚡":"❓";t.push(`${a+1}. ${c} ${i.count.toLocaleString()}x ${i.unitName} (${i.totalHealth.toLocaleString()} HP)`)}),t.join(`
`)}getAvailableUnits(){return[...this.availableUnits]}getUnitsByCostType(){return{Leadership:[...this.leadershipUnits],Dominance:[...this.dominanceUnits],Authority:[],Mercenary:[...this.mercenaryUnits]}}}class k{constructor(){C(this,"container",null);C(this,"unitLoader");C(this,"optimizer",null);C(this,"selectedUnits",new Set);C(this,"mercenaryLimits",{});this.unitLoader=new B}async mount(e){this.container=e,this.render(),this.attachEventListeners(),await this.loadInitialData()}render(){this.container&&(this.container.innerHTML=`
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
    `,document.head.appendChild(e)}async loadInitialData(){try{await this.unitLoader.loadUnits("./final_units.json"),this.displayUnitList(),this.updateOptimizeButton()}catch(e){console.error("Failed to load unit data:",e)}}attachEventListeners(){const e=document.getElementById("unit-search"),t=document.getElementById("unit-type-filter"),n=document.getElementById("optimize-btn"),s=document.getElementById("clear-btn"),o=document.getElementById("select-all-visible"),i=document.getElementById("clear-selection"),a=document.getElementById("leadership-budget"),r=document.getElementById("dominance-budget");e&&e.addEventListener("input",()=>this.filterAndDisplayUnits()),t&&t.addEventListener("change",()=>this.filterAndDisplayUnits()),n&&n.addEventListener("click",()=>this.optimizeArmy()),s&&s.addEventListener("click",()=>this.clearSelection()),o&&o.addEventListener("click",()=>this.selectAllVisible()),i&&i.addEventListener("click",()=>this.clearSelection()),a&&a.addEventListener("input",()=>this.updateOptimizeButton()),r&&r.addEventListener("input",()=>this.updateOptimizeButton()),document.addEventListener("click",c=>{const u=c.target;u.classList.contains("filter-tab")&&this.handleFilterTabClick(u)})}displayUnitList(){this.setupUnitTypeFilter(),this.updateFilterTabCounts(),this.filterAndDisplayUnits()}setupUnitTypeFilter(){const e=document.getElementById("unit-type-filter");if(!e)return;const t=this.unitLoader.getUniqueUnitTypes();e.innerHTML='<option value="">All Unit Types</option>',t.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,e.appendChild(s)})}updateFilterTabCounts(){const e=this.unitLoader.getAllUnits();document.querySelectorAll(".filter-tab").forEach(n=>{const s=n.getAttribute("data-filter");let o=0;s==="all"?o=e.length:o=e.filter(i=>this.getMainCategory(i)===s).length,n.textContent=`${s==="all"?"All":s} (${o})`})}handleFilterTabClick(e){document.querySelectorAll(".filter-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active"),this.filterAndDisplayUnits()}filterAndDisplayUnits(){var o,i,a;const e=((o=document.getElementById("unit-search"))==null?void 0:o.value)||"",t=((i=document.querySelector(".filter-tab.active"))==null?void 0:i.getAttribute("data-filter"))||"all",n=((a=document.getElementById("unit-type-filter"))==null?void 0:a.value)||"";let s=this.unitLoader.getAllUnits();if(t!=="all"&&(s=s.filter(r=>this.getMainCategory(r)===t)),n&&(s=s.filter(r=>r.unit_types.includes(n))),e){const r=e.toLowerCase();s=s.filter(c=>c.name.toLowerCase().includes(r)||c.unit_types.some(u=>u.toLowerCase().includes(r)))}this.renderGroupedUnits(s),this.updateSelectedSummary()}renderGroupedUnits(e){const t=document.getElementById("unit-groups");if(!t)return;if(t.innerHTML="",e.length===0){t.innerHTML='<div class="no-units">No units match your filters</div>';return}const n=this.createHierarchicalGroups(e);Object.entries(n).forEach(([s,o])=>{const i=this.createMainCategoryElement(s,o);t.appendChild(i)}),this.attachAllEventListeners(n)}createHierarchicalGroups(e){const t={Guardsmen:{},Specialists:{},"Engineer Corps":{},Monsters:{},Mercenaries:{}};return e.forEach(n=>{const s=this.getMainCategory(n),o=this.getSubCategory(n),i=this.getUnitFamily(n);t[s][o]||(t[s][o]={}),t[s][o][i]||(t[s][o][i]=[]),t[s][o][i].push(n)}),Object.values(t).forEach(n=>{Object.values(n).forEach(s=>{Object.values(s).forEach(o=>{o.sort((i,a)=>i.strength-a.strength)})})}),t}getMainCategory(e){if(e.cost_type==="Mercenary"||e.authority_cost>0)return"Mercenaries";const t=e.unit_types;return t.includes("Engineer corps")||t.includes("Siege engine")?"Engineer Corps":t.includes("Guardsman")?"Guardsmen":t.includes("Specialist")?"Specialists":t.includes("Beast")||t.includes("Dragon")||t.includes("Giant")||t.includes("Elemental")||t.includes("ELEMENTAL")||t.includes("Flying")&&!t.includes("Human")?"Monsters":t.includes("Human")&&(t.includes("Melee")||t.includes("Ranged")||t.includes("Mounted"))?"Guardsmen":"Specialists"}getSubCategory(e){const t=e.unit_types,n=e.name.toUpperCase(),s=this.getMainCategory(e);if(s==="Mercenaries")return t.includes("Guardsman")?"Elite Forces":"Special Forces";if(s==="Engineer Corps"){if(n.includes("CATAPULT"))return"Catapults";if(n.includes("BALLISTA"))return"Ballistae";if(n.includes("JOSEPHINE"))return"Heavy Artillery";if(t.includes("Siege engine"))return"Siege Engines"}if(s==="Monsters"){if(t.includes("Dragon"))return"Dragons";if(t.includes("Giant"))return"Giants";if(t.includes("Beast"))return"Beasts";if(t.includes("Elemental")||t.includes("ELEMENTAL"))return"Elementals";if(t.includes("Flying"))return"Flying"}if(s==="Guardsmen"||s==="Specialists"){if(t.includes("Ranged"))return"Ranged";if(t.includes("Melee"))return"Melee";if(t.includes("Mounted"))return"Mounted";if(t.includes("Flying")||t.includes("Beast"))return"Flying";if(t.includes("Scout"))return"Scouts"}return t.includes("Human")?"Infantry":"Other"}getUnitFamily(e){let t=e.name;return t=t.replace(/\s+(I{1,3}|IV|V|VI{0,2}|VII)$/,""),t.includes("HEAVY "),t}createMainCategoryElement(e,t){const n=document.createElement("div");n.className="main-category";const s=this.countUnitsInCategory(t),o=this.countSelectedUnitsInCategory(t);return n.innerHTML=`
      <div class="main-category-header" data-category="${e}">
        <div class="category-title">
          <h3>${e} (${o}/${s})</h3>
          <span class="expand-icon">▼</span>
        </div>
        <div class="category-actions">
          <button class="btn btn-xs select-category" data-category="${e}">Select All</button>
          <button class="btn btn-xs deselect-category" data-category="${e}">Deselect All</button>
        </div>
      </div>
      <div class="main-category-content collapsed">
        ${Object.entries(t).map(([i,a])=>this.createSubCategoryHTML(e,i,a)).join("")}
      </div>
    `,n}createSubCategoryHTML(e,t,n){const s=Object.values(n).reduce((i,a)=>i+a.length,0),o=Object.values(n).reduce((i,a)=>i+a.filter(r=>this.selectedUnits.has(r.name)).length,0);return`
      <div class="sub-category" data-category="${e}" data-subcategory="${t}">
        <div class="sub-category-header">
          <div class="subcategory-title">
            <h4>${t} (${o}/${s})</h4>
            <span class="expand-icon">▼</span>
          </div>
          <div class="subcategory-actions">
            <button class="btn btn-xs select-subcategory">Select All</button>
            <button class="btn btn-xs deselect-subcategory">Deselect All</button>
          </div>
        </div>
        <div class="sub-category-content collapsed">
          ${Object.entries(n).map(([i,a])=>this.createUnitFamilyHTML(i,a)).join("")}
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
    `}attachAllEventListeners(e){document.querySelectorAll(".main-category").forEach((t,n)=>{const o=Object.keys(e)[n];if(o){const i=e[o];this.attachMainCategoryListeners(t,o,i)}}),document.querySelectorAll(".sub-category").forEach(t=>{var o;const n=t.getAttribute("data-category"),s=t.getAttribute("data-subcategory");if(n&&s&&((o=e[n])!=null&&o[s])){const i=e[n][s];this.attachSubCategoryListeners(t,i)}}),document.querySelectorAll(".unit-family").forEach(t=>{const n=t.getAttribute("data-family");let s=[];Object.values(e).forEach(o=>{Object.values(o).forEach(i=>{i[n]&&(s=i[n])})}),s.length>0&&this.attachUnitFamilyListeners(t,s)})}countUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((s,o)=>s+o.length,0),0)}countSelectedUnitsInCategory(e){return Object.values(e).reduce((t,n)=>t+Object.values(n).reduce((s,o)=>s+o.filter(i=>this.selectedUnits.has(i.name)).length,0),0)}attachMainCategoryListeners(e,t,n){const s=e.querySelector(".main-category-header"),o=e.querySelector(".main-category-content"),i=e.querySelector(".expand-icon");if(!s||!o||!i){console.warn("Missing main-category elements for",t,{header:!!s,content:!!o,expandIcon:!!i});return}s.addEventListener("click",c=>{if(c.target.classList.contains("btn")){c.stopPropagation();return}console.log("Main category header clicked:",t,"collapsed:",o.classList.contains("collapsed")),o.classList.toggle("collapsed"),i.textContent=o.classList.contains("collapsed")?"▼":"▲"});const a=e.querySelector(".select-category"),r=e.querySelector(".deselect-category");a&&a.addEventListener("click",c=>{c.stopPropagation(),this.selectAllInCategory(n)}),r&&r.addEventListener("click",c=>{c.stopPropagation(),this.deselectAllInCategory(n)})}attachSubCategoryListeners(e,t){const n=e.querySelector(".sub-category-header"),s=e.querySelector(".sub-category-content"),o=e.querySelector(".expand-icon");if(!n||!s||!o){console.warn("Missing sub-category elements:",{header:!!n,content:!!s,expandIcon:!!o});return}n.addEventListener("click",r=>{if(r.target.classList.contains("btn")){r.stopPropagation();return}console.log("Sub-category header clicked, toggling:",s.classList.contains("collapsed")),s.classList.toggle("collapsed"),o.textContent=s.classList.contains("collapsed")?"▼":"▲"});const i=e.querySelector(".select-subcategory"),a=e.querySelector(".deselect-subcategory");i&&i.addEventListener("click",r=>{r.stopPropagation(),this.selectAllInFamilies(t)}),a&&a.addEventListener("click",r=>{r.stopPropagation(),this.deselectAllInFamilies(t)})}attachUnitFamilyListeners(e,t){const n=e.querySelector(".unit-family-header"),s=e.querySelector(".unit-family-content"),o=e.querySelector(".expand-icon");n.addEventListener("click",c=>{c.target.classList.contains("btn")||(s.classList.toggle("collapsed"),o.textContent=s.classList.contains("collapsed")?"▼":"▲")});const i=e.querySelector(".select-family"),a=e.querySelector(".deselect-family");i&&i.addEventListener("click",c=>{c.stopPropagation(),this.selectAllUnits(t)}),a&&a.addEventListener("click",c=>{c.stopPropagation(),this.deselectAllUnits(t)}),e.querySelectorAll(".unit-card").forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-unit");if(u){const d=this.unitLoader.getUnitByName(u);d&&this.toggleUnitSelection(d)}})})}getUnitCost(e){switch(e.cost_type){case"Leadership":return e.leadership_cost;case"Dominance":return e.dominance_cost;case"Authority":case"Mercenary":return e.authority_cost;default:return 0}}toggleUnitSelection(e){this.selectedUnits.has(e.name)?(this.selectedUnits.delete(e.name),e.cost_type==="Mercenary"&&delete this.mercenaryLimits[e.name]):(this.selectedUnits.add(e.name),e.cost_type==="Mercenary"&&(this.mercenaryLimits[e.name]=1)),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateSelectionDisplay(){document.querySelectorAll(".unit-card").forEach(e=>{const t=e.getAttribute("data-unit");t&&(this.selectedUnits.has(t)?e.classList.add("selected"):e.classList.remove("selected"))}),this.updateAllCounters(),this.updateSelectedSummary()}updateAllCounters(){document.querySelectorAll(".main-category").forEach((e,t)=>{const n=e.querySelector(".category-title h3");if(n){const o=["Guardsmen","Specialists","Engineer Corps","Monsters","Mercenaries"][t];if(o){const{selected:i,total:a}=this.countUnitsInMainCategory(o),c=(n.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");n.textContent=`${c} (${i}/${a})`}}}),document.querySelectorAll(".sub-category").forEach(e=>{const t=e.querySelector(".subcategory-title h4"),n=e.getAttribute("data-category"),s=e.getAttribute("data-subcategory");if(t&&n&&s){const{selected:o,total:i}=this.countUnitsInSubCategory(n,s),r=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${r} (${o}/${i})`}}),document.querySelectorAll(".unit-family").forEach(e=>{const t=e.querySelector(".family-title h5"),n=e.getAttribute("data-family");if(t&&n){const{selected:s,total:o}=this.countUnitsInFamily(n),a=(t.textContent||"").replace(/\s*\(\d+\/\d+\)/,"");t.textContent=`${a} (${s}/${o})`}})}countUnitsInMainCategory(e){const n=this.unitLoader.getAllUnits().filter(o=>this.getMainCategory(o)===e);return{selected:n.filter(o=>this.selectedUnits.has(o.name)).length,total:n.length}}countUnitsInSubCategory(e,t){const s=this.unitLoader.getAllUnits().filter(i=>this.getMainCategory(i)===e&&this.getSubCategory(i)===t);return{selected:s.filter(i=>this.selectedUnits.has(i.name)).length,total:s.length}}countUnitsInFamily(e){const n=this.unitLoader.getAllUnits().filter(o=>this.getUnitFamily(o)===e);return{selected:n.filter(o=>this.selectedUnits.has(o.name)).length,total:n.length}}updateSelectedSummary(){const e=document.getElementById("selected-count");e&&(e.textContent=`${this.selectedUnits.size} units selected`)}selectAllVisible(){document.querySelectorAll(".unit-card").forEach(t=>{const n=t.getAttribute("data-unit");if(n){const s=this.unitLoader.getUnitByName(n);s&&(this.selectedUnits.add(s.name),s.cost_type==="Mercenary"&&(this.mercenaryLimits[s.name]=1))}}),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}selectAllInCategory(e){Object.values(e).forEach(t=>{this.selectAllInFamilies(t)})}deselectAllInCategory(e){Object.values(e).forEach(t=>{this.deselectAllInFamilies(t)})}selectAllInFamilies(e){Object.values(e).forEach(t=>{this.selectAllUnits(t)})}deselectAllInFamilies(e){Object.values(e).forEach(t=>{this.deselectAllUnits(t)})}selectAllUnits(e){e.forEach(t=>{this.selectedUnits.add(t.name),t.cost_type==="Mercenary"&&(this.mercenaryLimits[t.name]=1)}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}deselectAllUnits(e){e.forEach(t=>{this.selectedUnits.delete(t.name),t.cost_type==="Mercenary"&&delete this.mercenaryLimits[t.name]}),this.updateSelectionDisplay(),this.updateMercenaryLimits(),this.updateOptimizeButton()}updateMercenaryLimits(){const e=document.getElementById("mercenary-limits");if(!e)return;const t=Array.from(this.selectedUnits).map(n=>this.unitLoader.getUnitByName(n)).filter(n=>n&&n.cost_type==="Mercenary");if(t.length===0){e.innerHTML='<p class="text-muted">Select mercenary units to set limits</p>';return}e.innerHTML="",t.forEach(n=>{if(!n)return;const s=document.createElement("div");s.className="mercenary-item",s.innerHTML=`
        <div class="mercenary-label">
          <span class="unit-name">🗡️ ${n.name}</span>
          <span class="unit-stats">(STR: ${n.strength}, HP: ${n.health})</span>
        </div>
        <div class="mercenary-input">
          <label for="merc-${n.name}">Max Available:</label>
          <input type="number" id="merc-${n.name}" min="1" max="100" value="${this.mercenaryLimits[n.name]||1}"
                 data-unit="${n.name}" class="input" placeholder="1">
        </div>
      `,s.querySelector("input").addEventListener("change",i=>{const a=i.target;this.mercenaryLimits[a.dataset.unit]=parseInt(a.value)||1}),e.appendChild(s)})}updateOptimizeButton(){const e=document.getElementById("optimize-btn"),t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget");if(!e||!t||!n)return;const s=this.selectedUnits.size>0,o=parseInt(t.value)>0||parseInt(n.value)>0||Object.keys(this.mercenaryLimits).length>0;e.disabled=!s||!o}async optimizeArmy(){try{this.showLoadingModal();const e=this.unitLoader.getAvailableUnits(Array.from(this.selectedUnits));this.optimizer=new A(e);const t=document.getElementById("leadership-budget"),n=document.getElementById("dominance-budget"),s={leadershipBudget:parseInt(t.value)||0,dominanceBudget:parseInt(n.value)||0,mercenaryLimits:{...this.mercenaryLimits},availableUnits:Array.from(this.selectedUnits)},o=await this.optimizer.optimizeArmy(s);this.displayResults(o)}catch(e){console.error("Optimization failed:",e),alert("Optimization failed. Please check your inputs and try again.")}finally{this.hideLoadingModal()}}displayResults(e){const t=document.getElementById("optimization-stats"),n=document.getElementById("army-compositions"),s=document.getElementById("results-section");!t||!n||!s||(t.innerHTML=`
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
    `,n.innerHTML="",e.compositions.length===0?n.innerHTML='<p class="text-center text-muted">No valid army compositions found. Try adjusting your constraints.</p>':e.compositions.forEach((o,i)=>{const a=this.createCompositionElement(o,i+1);n.appendChild(a)}),s.classList.remove("hidden"))}createCompositionElement(e,t){var a;const n=document.createElement("div");n.className="army-composition";const s=((a=this.optimizer)==null?void 0:a.explainStacking(e))||"No stacking explanation available",o=`
      <div class="composition-header">
        <div class="composition-title">Solution ${t} ${e.isValidStacking?"✅":"❌"}</div>
        <div class="composition-score">Efficiency: ${e.efficiencyScore.toFixed(2)}</div>
      </div>
    `,i=s.split(`
`).map(r=>r.includes("🏆 OPTIMIZED ARMY COMPOSITION")?`<h3 class="army-title">${r}</h3>`:r.includes("═".repeat(60))?'<hr class="title-divider">':r.includes("📊 ARMY SUMMARY")||r.includes("🗡️ MERCENARY FORCES")||r.includes("👑 LEADERSHIP FORCES")||r.includes("⚡ DOMINANCE FORCES")||r.includes("⚔️ BATTLE ORDER")?`<h4 class="section-header">${r}</h4>`:r.includes("─".repeat(30))||r.includes("─".repeat(40))?'<hr class="section-divider">':r.includes("└─")?`<div class="unit-detail">${r}</div>`:r.trim()&&!r.includes("═")&&!r.includes("─")?`<div class="unit-line">${r}</div>`:r.trim()===""?'<div class="spacing"></div>':"").filter(r=>r!=="").join("");return n.innerHTML=o+'<div class="composition-content">'+i+"</div>",n}clearSelection(){this.selectedUnits.clear(),this.mercenaryLimits={};const e=document.getElementById("leadership-budget"),t=document.getElementById("dominance-budget"),n=document.getElementById("results-section");e&&(e.value="0"),t&&(t.value="0"),n&&n.classList.add("hidden"),this.filterAndDisplayUnits(),this.updateMercenaryLimits(),this.updateOptimizeButton()}showLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.remove("hidden")}hideLoadingModal(){const e=document.getElementById("loading-modal");e&&e.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{const S=document.getElementById("app");if(!S)throw new Error("App container not found");new k().mount(S),window.addEventListener("error",t=>{console.error("Global error:",t.error)}),window.addEventListener("unhandledrejection",t=>{console.error("Unhandled promise rejection:",t.reason)}),"serviceWorker"in navigator&&window.addEventListener("load",()=>{console.log("Service worker support detected")}),console.log("TotalBattle Army Calculator initialized")});
//# sourceMappingURL=main-Gx6cv37C.js.map
