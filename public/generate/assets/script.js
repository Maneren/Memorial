class OrderedArray {
    constructor(){
        this.arr = new Array();
    }
    
    join(sep){
        return this.arr.join(sep);
    }
    
    push(el){
        this.arr.push(el);
        this.sort(this.arr)
    }
    
    sort(arr){
        let change = {
            "A" : 4,
            "B" : 4,
            "C" : 2,
            "E" : 0
        };
        let semi = [];
        arr.sort(
            (a, b) => {
                let outa = "", outb = "", out;
                
                a = a.replace(/\d/ig, parseInt(a[0]) + change[a[2]]);
                b = b.replace(/\d/ig, parseInt(b[0]) + change[b[2]]);
                
                if(a[4] == "H") a = a.replace(/\d/ig, " " + a[0]);
                if(b[4] == "H") b = b.replace(/\d/ig, " " + b[0]);
                
                for(let i in a){
                    outa += a.charCodeAt(i)
                }
                for(let i in b){
                    outb += b.charCodeAt(i)
                }
                
                outa = parseInt(outa)
                outb = parseInt(outb)
                out = outa - outb;
                
                return out;
            }
        )
    }
    
    indexOf(index){
        return this.arr.indexOf(index);
    }
    
    splice(i, len){
        this.arr.splice(i, len);
    }
}

(function (window, document) {
    const queryAll = document.querySelectorAll.bind(document);
    const query = document.querySelector.bind(document);
    
    listOfSelected = query("#listOfSelected");
    
    selectedTeams = new OrderedArray();
    const clickHandler = event => {
        cell = event.target;
        table = cell.parentNode.parentNode.parentNode.parentNode.className;
        type = table.includes("lads");
        if(type) type = "-H"
        else type = "-D";
        if(cell.className == "empty") return;
        if(!cell.selected){
            cell.selected = true;
            selectedTeams.push(cell.textContent + type);
            cell.className = "selected";
        } else {
            cell.selected = false;
            cell.className = "";
            let i = selectedTeams.indexOf(cell.textContent);
            selectedTeams.splice(i, 1);
        }
        listOfSelected.innerHTML = selectedTeams.join(", ");
    };
    
    [...queryAll(".choose table tbody td")].forEach(cell=>{
        cell.onclick = e => clickHandler(e);
        cell.selected = false;
    });
    
    function generate(event){
        event.preventDefault();
        if(selectedTeams.length < 1){
            alert("Nejsou vybrané žádné týmy");
            return;
        }
        if(selectedTeams.length == 1){
            alert("Musí být vybrány alespoň 2 týmy");
            return;
        }
        confirmed = confirm("Opravdu chcete spustit generování?");
        if(confirmed){
            time = query("#time").value;
            oneMatch = query("#oneMatch").value;
            if(time.length < 1 || oneMatch.length < 1) 
                return alert("Nespravné časové parametry");
            matches = time * 60 / oneMatch;
            alert(selectedTeams + "\n" + matches)
        }
        else return;
        
    }
    
    query("#generate").onclick = e => generate(e);
    
})(window, document);