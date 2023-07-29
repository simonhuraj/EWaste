import {AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {DeliveryService} from "../../../services/api/delivery.service";
import {filter, map, Observable, of, switchMap} from "rxjs";
import {Delivery} from "../../../entitites/delivery";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export class DeliveryForTable {
  constructor(
    public deliveryId: number,
    public deliveredProduct: string,
    public quantity: number,
    public brand: string,
    public deliveryDate: string,
    public specifications: string,
    public functional: boolean,
    public category: string,
    public person: string,
    public manager: string,
    public state: string
  ) {}
}

@Component({
  selector: 'app-waste-list',
  templateUrl: './waste-list.component.html',
  styleUrls: ['./waste-list.component.css']
})
export class WasteListComponent implements OnInit, AfterViewInit {

  deliveries$: Observable<DeliveryForTable[]>;
  refresh$: Observable<boolean>;

  dataSource: MatTableDataSource<DeliveryForTable> = new MatTableDataSource<DeliveryForTable>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnDefs = [
    {
      columnDef: 'deliveredProduct',
      header: 'Product',
      cell: (element: DeliveryForTable) => element.deliveredProduct
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: DeliveryForTable) => element.quantity
    },
    {
      columnDef: 'brand',
      header: 'Brand',
      cell: (element: DeliveryForTable) => element.brand
    },
    {
      columnDef: 'deliveryDate',
      header: 'DeliveryDate',
      cell: (element: DeliveryForTable) => formatDate(element.deliveryDate, 'yyyy-MM-dd HH:mm', this.locale)
    },
    {
      columnDef: 'specification',
      header: 'Specification',
      cell: (element: DeliveryForTable) => element.specifications
    },
    {
      columnDef: 'functional',
      header: 'Functional',
      cell: (element: DeliveryForTable) => element.functional
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: DeliveryForTable) => element.category,
    },
    {
      columnDef: 'person',
      header: 'Person',
      cell: (element: DeliveryForTable) => element.person
    },
    {
      columnDef: 'manager',
      header: 'Manager',
      cell: (element: DeliveryForTable) => element.manager
    },
    {
      columnDef: 'state',
      header: 'State',
      cell: (element: DeliveryForTable) => element.state
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
      switchMap(value => this.deliveryService.getAllDeliveries()),
      map(deliveries =>
        deliveries.map(delivery => new DeliveryForTable(
            delivery.deliveryId!,
            delivery.deliveredProduct,
            delivery.quantity,
            delivery.brand,
            delivery.deliveryDate,
            delivery.specifications,
            delivery.functional,
            delivery.category.name,
            delivery.person.email,
            delivery.manager.username,
            delivery.state.name
          ))
      )
    );
  }

  ngOnInit(): void {
    this.deliveries$.subscribe(deliveries => {
      this.dataSource.data = deliveries;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
