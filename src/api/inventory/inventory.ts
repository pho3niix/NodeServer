import {Model} from 'objection';
import {knex} from '../index.model';

Model.knex(knex);

export class Inventory extends Model {
    
    static get tableName(){
        return 'inventory';
    }

}