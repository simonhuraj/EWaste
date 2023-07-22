import {AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {DeliveryService} from "../../../services/delivery.service";
import {filter, Observable, of, switchMap} from "rxjs";
import {Delivery} from "../../../entitites/delivery";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-waste-list',
  templateUrl: './waste-list.component.html',
  styleUrls: ['./waste-list.component.css']
})
export class WasteListComponent implements OnInit, AfterViewInit {

  deliveries$: Observable<Delivery[]>;
  refresh$: Observable<boolean>;

  dataSource: MatTableDataSource<Delivery> = new MatTableDataSource<Delivery>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnDefs = [
    {
      columnDef: 'deliveredProduct',
      header: 'Product',
      cell: (element: Delivery) => element.deliveredProduct
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: Delivery) => element.quantity
    },
    {
      columnDef: 'brand',
      header: 'Brand',
      cell: (element: Delivery) => element.brand
    },
    {
      columnDef: 'deliveryDate',
      header: 'DeliveryDate',
      cell: (element: Delivery) => formatDate(element.deliveryDate, 'yyyy-MM-dd HH:mm', this.locale)
    },
    {
      columnDef: 'specification',
      header: 'Specification',
      cell: (element: Delivery) => element.specifications
    },
    {
      columnDef: 'functional',
      header: 'Functional',
      cell: (element: Delivery) => element.functional
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: Delivery) => element.category.name
    },
    {
      columnDef: 'person',
      header: 'Person',
      cell: (element: Delivery) => element.person.email
    },
    {
      columnDef: 'manager',
      header: 'Manager',
      cell: (element: Delivery) => element.manager.username
    },
    {
      columnDef: 'state',
      header: 'State',
      cell: (element: Delivery) => element.state.name
    }
  ]
  displayedColumns = this.columnDefs.map(c => c.columnDef);


  constructor(
    private readonly deliveryService: DeliveryService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.refresh$ = of(true);
    this.deliveries$ = this.refresh$.pipe(
      filter(Boolean),
      switchMap(value => this.deliveryService.getAllDeliveries())
    );
  }

  ngOnInit(): void {
    this.deliveries$.subscribe(deliveries => {
      this.dataSource.data = deliveries;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }


}
