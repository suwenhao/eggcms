exports.compare = (obj1, obj2)=>{
    var val1 = obj1['sort'];
    var val2 = obj2['sort'];
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
}