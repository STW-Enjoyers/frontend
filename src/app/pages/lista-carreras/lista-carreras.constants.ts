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


