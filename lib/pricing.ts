export type ProjectType='residential'|'commercial'|'industrial';
export const round50=(n:number)=>Math.ceil(n/50)*50;
export function residentialBase(area:number){ if(area<=100)return 2000; return 2000+Math.ceil((area-100)/50)*500; }
export function ediculaValue(area:number){ if(area<=50)return 500; return 500+Math.ceil((area-50)/10)*50; }
export function calculateResidential(input:{area:number;floors:'terrea'|'sobrado';rooms:number;baths:number;suites:number;ediculaArea?:number}){
  const rawBase=residentialBase(input.area);
  const base=input.floors==='sobrado'?rawBase*1.5:rawBase;
  const extras=base*(Math.max(0,input.rooms-2)*.10+Math.max(0,input.baths-1)*.05+Math.max(0,input.suites)*.05);
  return base+extras+(input.ediculaArea?ediculaValue(input.ediculaArea):0);
}
export function calculateCommercial(area:number){ return Math.max(3000,residentialBase(area)*1.3); }
export function calculateIndustrial(area:number){ if(area<=500)return 5000; return 5000+Math.ceil((area-500)/100)*1000; }
export function rangeFor(value:number,type:ProjectType){ const floor=type==='residential'?3000:type==='commercial'?3000:5000; const min=round50(Math.max(value,floor)); return {min,max:round50(min*1.10)}; }
export const money=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n);
