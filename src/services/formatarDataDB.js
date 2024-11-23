export default function formatarDataDB(dateObject) {
     const formattedDate = dateObject.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
     });

     return formattedDate;
}