
    ///API del newsfedd del U.S. Department of Health and Human Services
    document.addEventListener('DOMContentLoaded', () => {
        getContent();
      })
      const cardtitle = document.querySelectorAll('.card-title');
      const cardtext = document.querySelectorAll('.card-text');
      const cardimg = document.querySelectorAll('.card-img-top');
      //const cardfecha = document.querySelectorAll('.fecha_news');
  
      function getContent() {
        var xhr = new XMLHttpRequest();
        var url = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=es&categoryId=18";
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = () => {
          var response = JSON.parse(xhr.response);
          const responseshort = response.Result.Resources.Resource.splice(12, 4);
          for (i = 0; i <=3; i++){
          cardtitle[i].innerHTML = responseshort[i].Title;
          cardtitle[i].href = responseshort[i].AccessibleVersion;
          cardimg[i].alt = responseshort[i].ImageAlt;
          cardimg[i].src = responseshort[i].ImageUrl;
          }
        }
        
        //Esto lo hago porque las imagenes de la API son pesadas y tardan en cargar.
        setTimeout(()=>{
          document.querySelector('#noticias').className = "row row-cols-lg-1 row-cols-md-2 row-cols-sm-2 g-4"; 
         }, 2500)  
         
      };