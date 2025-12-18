export default function useCustom(){
    const DateID = (date : Date, type : string | null)=>{

      if(type == 'date'){
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric" 
        }).format(new Date(date)) 
      }
       return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date(date)).replace("pukul", "").trim()
    }


    
  return { DateID };
}