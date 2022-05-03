export const TITLE:string = "Foro de carreras";
export const PLACEHOLDER:string = "Buscar una carrera";

export const CITIES = [
  {
    name: "Zaragoza",
    image: "/assets/zaragoza.jpg",
    web: "https://www.unizar.es/"
  },
  {
    name: "Huesca",
    image: "/assets/huesca.jpg",
    web: "https://campushuesca.unizar.es/"
  },
  {
    name: "Teruel",
    image: "/assets/teruel.jpg",
    web: "https://teruel.unizar.es/"
  },
  {
    name: "Almunia de Doña Godina (La)",
    image: "/assets/almunia.jpg",
    web: "https://eupla.unizar.es/"
  }

]

// Datatables options
export const DTOPTIONS = {
  pageLength: 10,
  search: true,
  dom:  '<<t>ip>',
  scrollX: true,
  scrollCollapse: true,
  columnDefs: [
    { // Handle Carreras column overflow
      "targets": 0,
      "width": "100%",
      render: function ( data: string, type: string) {
        return data.length > 40
          ? '<a class="text-grade" role="button">' + data.substr( 0, 38 ) + '...</a>'
          : '<a class="text-grade" role="button">' + data + '</a>'
      }

    },
    {  // Handle cell padding (the only way that works)
      "targets": '_all',
      "createdCell": function (td: any) {
        $(td).css('padding', '15px')
      }
    }
  ],
  language: {
    zeroRecords: "No hemos encontrado ninguna carrera - disculpa",
    info: "Mostrando _TOTAL_ carreras",
    infoEmpty: "No hay carreras disponibles",
    infoFiltered: "",
    paginate: {
      first: "Primera página",
      last:"Última página",
      next:"Siguiente",
      previous: "Anterior"
    },
  }
}


