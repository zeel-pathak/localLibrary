var mongoose = require('mongoose');

const {DateTime}  = require("luxon");
const { retry } = require('async');
var Schema = mongoose.Schema;

var authorSchema = new Schema(
    {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
    }
);

// Virtual for author's full name
authorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
authorSchema
.virtual('lifespan')
.get(function () {
  let birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_FULL) : '';
  let death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_FULL) : ''; 
  lifespan = `${birth} - ${death}`;
  return lifespan;

  
});

// Virtual for author's URL
authorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', authorSchema);