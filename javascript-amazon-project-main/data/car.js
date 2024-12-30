class Car{
    #model;#brand;
    speed;
    isTrunkOpen;
    constructor(model,brand){
        this.#model=model;
        this.#brand=brand;
        this.speed=0;
        this.isTrunkOpen=false;
    }
    
    go(){
        if(this.speed<196 && !this.isTrunkOpen){
            this.speed+=5;
        }
    }
    brake(){
        if(this.speed>=5){
            this.speed-=5;
        }
    }
    displayInfo(){
        console.log(`${this.#brand} ${this.#model} ,Speed:${this.speed}km/h ,IsTrunkOpen:${this.isTrunkOpen}`);
    }
    openTrunk(){
        if(this.speed==0){
        this.isTrunkOpen=true;
        }
    }
    closeTrunk(){
        this.isTrunkOpen=false;
    }

}
class Racecar extends Car{
    acceleration;
    constructor(model,brand,acceleration){
        super(model,brand);
        this.acceleration=acceleration;
    }
    go(){
      
        if(this.speed+this.acceleration<=300){
            this.speed+=this.acceleration;
        }
    }
    openTrunk(){
        return '';
    }
    closeTrunk(){
        return'';
    }
}
const Car1=new Car('Corolla','Toyota');
const Car2=new Car('Tesla','Model 3');
const Car3=new Racecar('F1','Mclaren',20);
Car1.go();
Car1.brake();
Car2.go();
Car1.openTrunk();
Car2.openTrunk();
Car1.closeTrunk();
Car1.displayInfo();

Car2.displayInfo();
Car3.openTrunk();
Car3.go();
Car3.displayInfo();