export class InputStream {

  constructor(file){
    this.input = file;
    this.pos = 0;
    this.line = 1;
    this.col = 0;
  }

  next(){
    var char = this.input.charAt(this.pos++);
    if(char == "\n"){
      this.line++;
      this.col = 0;
    } else {
      this.col++;
    }
    return char;
  }

  peek(){
    return this.input.charAt(this.pos);
  }

  eof(){
    return this.peek() == "";
  }

  error(msg){
    throw new Error(msg + " (" + this.line + ":" + this.col + ")");
  }
}

class Tokenizer {
 
  constructor(input){
    this.input = input;
  }
 
  readNext(){
    this.readWhile(this.isWhitespace);
    if(this.input.eof()){
      return null;
    }
    var char = this.input.peek();
    if(char == "\n" || char == "\r"){
      this.readWhile(this.isNewline);
      return "\n";
    }
    if(this.isDigit(char)){
      return this.readNumber();
    }
    if(this.isChar(char)){
      return this.input.next();
    }
    if(this.isPunc(char)){
      return this.input.next();
    }
  }
 
  readNumber(){
    return this.readWhile(this.isDigit);
  }
 
  readWhile(predicate){
    var str = "";
    while(!this.input.eof() && predicate(this.input.peek())){
      str += this.input.next();
    }
    return str;
  }
 
  isDigit(char){
    return /[0-9]+/.test(char);
  }
 
  isChar(char){
    return "OX".indexOf(char) >= 0;
  }
 
  isWhitespace(char){
    return " \t".indexOf(char) >= 0;
  }
 
  isNewline(char){
    return "\r\n".indexOf(char) >= 0;
  }
 
  isPunc(char){
    return "()-".indexOf(char) >= 0;
  }
}
 
class Parser{
  constructor(tokens){
    this.tokens = tokens;
 
    this.isleNode = {
      type: "isle",
      walkable: true,
      symbol: "S",
    };
 
    this.wallNode = {
      type: "wall",
      walkable: false,
      symbol: String.fromCharCode(9633),
    }
 
    this.floorNode = {
      type: "floor",
      walkable: true,
      symbol: String.fromCharCode(9711),
    }
  }
 
  getRow(){
    var token;
    var row = {data: [], isles: []};
    while(true){
      var result = this.parseStmt();
      if(result == null){
        return result;
      }
      if(result != "\n"){
        //row = row.concat(result);
        row.data = row.data.concat(result.data);
        row.isles = row.isles.concat(result.isles);
      } else {
        break;
      }
    }
    return row;
  }
 
  parseStmt(){
    var type = this.tokens.readNext();
    if(type == null){
      return type;
    }
    if(type == "\n"){
      return "\n";
    }
    var p = this.tokens.readNext();
    if(p == "("){
      var num1 = parseInt(this.tokens.readNext());
      var num2 = this.tokens.readNext();
 
      if(num2 == ")"){
        return this.buildRow(type, 0, num1);
      } else if(num2 == "-"){
        var num3 = parseInt(this.tokens.readNext());
        this.tokens.readNext();
        return this.buildRow(type, num1, num3);
      }
    } else {
      console.log("got " + p + " expected ()");
    }
  }
 
  buildRow(type, from, to){
    var result = {data: [], isles: []};
    if(this.tokens.isChar(type)){
      for(var i = from; i < to; i++){
        if(type == "O"){
          result.data.push(this.floorNode);
        } else if(type == "X"){
          result.data.push(this.wallNode);
        }
      }
    } else {
      var isle = parseInt(type);
      result.isles.push(isle);
      if(from < to){
        for(let i = from; i <= to; i++){
          result.data.push({...this.isleNode, symbol: "S", isle: isle, shelf: i})
        }
      } else {
        for(let i = from; i >= to; i--){
          result.data.push({...this.isleNode, symbol: "S", isle: isle, shelf: i})
        }
      }
    }
    return result;
  }
 
  buildGrid(){
    var grid = [];
    while((row = parser.getRow()) != null){
      grid.push(row);
    }
    return grid;
  }
}

export function getGrid(text){
  var istream = new InputStream(text);
  var tokens = new Tokenizer(istream);
  var parser = new Parser(tokens);

  var grid = [];
  var row;
  while((row = parser.getRow()) != null){
    grid.push(row);
  }
  return grid;
}
