import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {ClazzService} from "../../../services/api/clazz.service";
import {CategoryService} from "../../../services/api/category.service";
import {Clazz} from "../../../entitites/clazz";
import {Category} from "../../../entitites/category";
import {Person} from "../../../entitites/person";
import {Delivery} from "../../../entitites/delivery";
import {StateService} from "../../../services/api/state.service";
import {State} from "../../../entitites/state";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  classes: Clazz[] = [];
  categories: Category[] = [];
  states: State[] = [];

  selectedClass: Clazz | undefined;
  selectedPerson: Person | undefined;
  selectedCategory: Category | undefined;
  selectedState: State | undefined;
  deliveredProduct: string = '';
  brand: string = '';
  deliveryDate: Date = new Date();
  quantity: number = 1;
  specifications: string = '';
  functional: boolean = false;

  constructor(
    private readonly clazzService: ClazzService,
    private readonly categoryService: CategoryService,
    private readonly stateService: StateService,
  ) {
  }

  ngOnInit(): void {
    this.clazzService.getAllClasses().subscribe(c => {
      this.classes = c;
      if (this.classes.length > 0) {
        this.selectedClass = this.classes[0];
      }
    });
    this.categoryService.getAllCategories().subscribe(c => this.categories = c);
    this.stateService.getAllStates().subscribe(s => this.states = s);

  }

  click() {
    console.log(this.deliveredProduct, this.brand, this.deliveryDate, this.quantity, this.specifications, this.functional);
  }

}
