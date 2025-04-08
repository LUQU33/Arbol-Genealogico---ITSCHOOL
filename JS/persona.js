class Persona {
    
    // Constructor de clase
    constructor(nombre, apellido, nacimiento, genero) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._nacimiento = nacimiento;
        this._genero = genero;
    }

    // Metodos GET
    get nombre(){
        return this._nombre;
    }
    get apellido(){
        return this._apellido;
    }
    get nacimiento(){
        return this._nacimiento;
    }
    get genero(){
        return this._genero;
    }
    // Metodos SET
    set nombre(nombre){
        this._nombre = nombre;
    }
    set apellido(apellido){
        this._apellido = apellido;
    }
    set nacimiento(nacimiento){
        this._nacimiento = nacimiento;
    }
    set genero(genero){
        this._genero = genero;
    }
}