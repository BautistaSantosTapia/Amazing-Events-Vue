

const app = Vue.

  createApp({
    data() {
      return {
        api:'https://amazing-events.herokuapp.com/api/events',
        data:[],
        cartas: [],
        filtroUpCarta: [],
        filtroPastCarta: [],
        cartasId:"",
        infoCarta:"",
        numMayor: 0,
        objeto1: "",
        asistencia: 0,
        capacidad: 0,
        percent: 0,
        numMinimo: 100,
        objeto2: "",
        objeto3: "",
        filtroUpTabla:[],
        filtroPastTabla:[],

        nombre:"",
        cartasFiltradas:[],

        categorias:[],
        categoriasSelec:[],
/////////
        nombreUp:"",
        cartasFiltradasUp:[],

        categoriasUp:[],
        categoriasSelecUp:[],
//////////
        nombrePast:"",
        cartasFiltradasPast:[],

        categoriasPast:[],
        categoriasSelecPast:[],


      }
    },
    created() {
        fetch(this.api).then(respuesta => respuesta.json()).then(data =>{
            console.log(data);
            this.data = data
            this.cartas = data.events
            console.log(this.cartas);
            this.cartasFiltradas = this.cartas
            console.log(this.cartasFiltradas);

            //index
            if (document.title == 'Amazing Events') {
                this.functGetCategorias()
                this.functFiltroNombre(this.cartas)
            }
            
            //upcoming
            if (document.title == 'Upcoming Events') {
                this.functUpFilter()
                this.functGetCategoriasUp()
                this.functFiltroNombreUp(this.filtroUpCarta)
            }
            
            //past
            if (document.title == 'Past Events') {
                this.functPastFilter()
                this.functGetCategoriasPast()
                this.functFiltroNombrePast(this.filtroPastCarta)
            }
            
            //details
            if (document.title == 'Details') {
                this.functIdCarta()
                this.functInfoCarta()
            }
            
            //stats
            if (document.title == 'Stats') {
                this.functTablaUnoUno()
                this.functTablaUnoDos()
                this.functTablaUnoTres()
                this.functUpTabla()
                this.functPastTabla()
            }
            
        })
        .catch((error) => console.log(error))

    },
    methods: {
        functUpFilter(){          
            this.filtroUpCarta = this.cartas.filter(carta => carta.date > this.data.currentDate)
            console.log(this.filtroUpCarta)
        },
        functPastFilter(){
            this.filtroPastCarta = this.cartas.filter(carta => carta.date < this.data.currentDate)
            console.log(this.filtroPastCarta);
        },
        functIdCarta(){
            this.cartasId = location.search.split("?_id=").join("")
            console.log(location.search);
            console.log(this.cartasId);
        },
        functInfoCarta(){
            this.infoCarta = this.cartas.find(carta => carta._id == this.cartasId)
            console.log(this.infoCarta);
        },
        functTablaUnoUno(){
            this.cartas.forEach(carta => {
                console.log(carta.category);
                this.asistencia = Number(carta.assistance)
                this.capacidad = Number(carta.capacity)
                console.log(this.asistencia)
                console.log(this.capacidad)
                this.percent = this.asistencia * 100 / this.capacidad
                console.log(this.percent);
                if (this.percent > this.numMayor) {
                    this.numMayor = this.percent
                    this.objeto1 = carta
                }
            })
        },
        functTablaUnoDos(){
            this.cartas.forEach(carta => {
                console.log(carta.category);
                this.asistencia = Number(carta.assistance)
                this.capacidad = Number(carta.capacity)
                console.log(this.asistencia)
                console.log(this.capacidad)
                this.percent = this.asistencia * 100 / this.capacidad
                console.log(this.percent);
                if (this.percent < this.numMinimo) {
                    this.numMinimo = this.percent
                    this.objeto2 = carta
                }
            })
        },
        functTablaUnoTres(){
            this.cartas.sort(function(a,b){
                return b.capacity - a.capacity
            })
            console.log(this.cartas[0]);
            this.objeto3 = this.cartas[0]
        },
        functUpTabla(){
            this.filtroUpTabla = this.cartas.filter(carta => carta.date > this.data.currentDate)
            console.log(this.filtroUpTabla);
        },
        functPastTabla(){
            this.filtroPastTabla = this.cartas.filter(carta => carta.date < this.data.currentDate)
            console.log(this.filtroPastTabla);
        },
        functFiltroNombre(arrayCartas){
            this.cartasFiltradas = arrayCartas.filter(carta => {
                return carta.name.toLowerCase().includes(this.nombre.toLowerCase())

            })
            console.log(this.cartasFiltradas);
        },
        functFiltroNombreUp(arrayCartas){
            this.cartasFiltradasUp = arrayCartas.filter(carta => {
                return carta.name.toLowerCase().includes(this.nombreUp.toLowerCase())

            })
            console.log(this.cartasFiltradasUp);
        },
        functFiltroNombrePast(arrayCartas){
            this.cartasFiltradasPast = arrayCartas.filter(carta => {
                return carta.name.toLowerCase().includes(this.nombrePast.toLowerCase())

            })
            console.log(this.cartasFiltradasPast);
        },
        functGetCategorias(){
            this.categorias = this.cartasFiltradas.map(carta => carta.category)
            console.log(this.categorias);
            this.categorias = new Set(this.categorias)
            console.log(this.categorias);
        }, 
        functGetCategoriasUp(){
            this.categoriasUp = this.filtroUpCarta.map(carta => carta.category)
            console.log(this.categoriasUp);
            this.categoriasUp = new Set(this.categoriasUp)
            console.log(this.categoriasUp);
        }, 
        functGetCategoriasPast(){
            this.categoriasPast = this.filtroPastCarta.map(carta => carta.category)
            console.log(this.categoriasPast);
            this.categoriasPast = new Set(this.categoriasPast)
            console.log(this.categoriasPast);
        }, 

    },
    computed: {
       buscador(){ 
            if (this.categoriasSelec.length != 0) {
                this.cartasFiltradas = this.cartas.filter(carta => { 
                return this.categoriasSelec.includes(carta.category)})
            }else{
                this.cartasFiltradas = this.cartas
                  
            }
            if (this.nombre != '') {
                this.functFiltroNombre(this.cartasFiltradas)
            } 
        },
        buscadorUp(){
            if (this.categoriasSelecUp.length != 0) {
                this.cartasFiltradasUp = this.filtroUpCarta.filter(carta => { 
                return this.categoriasSelecUp.includes(carta.category)})
            }else{
                this.cartasFiltradasUp = this.filtroUpCarta
                  
            }
            if (this.nombreUp != '') {
                this.functFiltroNombreUp(this.cartasFiltradasUp)
            } 
        },
        buscadorPast(){
            if (this.categoriasSelecPast.length != 0) {
                this.cartasFiltradasPast = this.filtroPastCarta.filter(carta => { 
                return this.categoriasSelecPast.includes(carta.category)})
            }else{
                this.cartasFiltradasPast = this.filtroPastCarta
                  
            }
            if (this.nombrePast != '') {
                this.functFiltroNombrePast(this.cartasFiltradasPast)
            } 
        },
    },
  }).mount('#app')
