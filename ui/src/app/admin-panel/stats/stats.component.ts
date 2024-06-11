import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../shared/services/purchase.service';
import { PurchaseStatsDto } from './purchase-stats.dto';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  lastTimeTotalIncomeData: any;
  lastTimeTotalIncomeOptions: any;

  weekdayTotalIncomeData: any;
  weekdayTotalIncomeOptions: any;

  filmTotalIncomeData: any;
  filmTotalIncomeOptions: any;

  purchases: PurchaseStatsDto[] = [];

  incomesDateLimit = Date.parse('28.01.2024');

  constructor(private purchaseService: PurchaseService) {
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const dataSetsBgColor = documentStyle.getPropertyValue('--color-primary-transparent-4');
    const dataSetsBorderColor = documentStyle.getPropertyValue('--color-primary-transparent-1');
    const textColorSecondary = documentStyle.getPropertyValue('--color-grey-light-2');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.purchaseService.getAll().data.subscribe(
      response => {
        this.purchases = response;
        const totalPriceByDate = calculateTotalPriceByDate(response);

        let labels = totalPriceByDate.map(result => result.date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short'
        }));
        this.lastTimeTotalIncomeData = {
          labels: labels,
          datasets: [
            {
              label: 'Incomes',
              data: totalPriceByDate.map(result => result.totalPrice),
              fill: true,
              backgroundColor: 'rgba(103, 103, 255, 0.2)',
              borderColor: 'rgba(103, 103, 255, 0.7)',
              tension: 0.4
            }
          ]
        };

        this.lastTimeTotalIncomeOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: textColorSecondary
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            y: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };

        const totalPriceByDayOfWeek = calculateTotalPriceByDayOfWeek(this.purchases);
        this.weekdayTotalIncomeData = {
          labels: totalPriceByDayOfWeek.map(result => result.date),
          datasets: [
            {
              label: 'Incomes',
              data: totalPriceByDayOfWeek.map(result => result.totalPrice),
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };

        this.weekdayTotalIncomeOptions = {
          plugins: {
            legend: {
              labels: {
                color: textColorSecondary
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };

        const totalIncomeByFilm = calculateTotalPriceByFilm(this.purchases);
        this.filmTotalIncomeData = {
          labels: totalIncomeByFilm.map(result => result.filmTitle),
          datasets: [
            {
              label: 'Sales',
              data: totalIncomeByFilm.map(result => result.totalSales),
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };

        this.filmTotalIncomeOptions = {
          indexAxis: 'y',
          plugins: {
            legend: {
              labels: {
                color: textColorSecondary
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: textColorSecondary
              },
              grid: {
                color: surfaceBorder,
                drawBorder: false
              }
            }
          }
        };
      }
    );
  }
}


// Function to get total price for each day
function calculateTotalPriceByDate(purchases: PurchaseStatsDto[]): { date: Date, totalPrice: number }[] {
  const totalPriceByDayMap = new Map<string, number>();

  purchases.forEach((purchase) => {
    // Extracting the date without time
    const dateKey = purchase.dealtAt.toISOString().split('T')[0];

    // Summing up the total price for each day
    const totalForDay = totalPriceByDayMap.get(dateKey) ?? 0;
    totalPriceByDayMap.set(dateKey, totalForDay + purchase.tickets.reduce((acc, ticket) => acc + ticket.price, 0));
  });

  // Converting the map to an array of objects
  const totalPriceByDayArray = Array.from(totalPriceByDayMap, ([date, totalPrice]) => ({
    date: new Date(date),
    totalPrice
  }));

  // Sorting by date in descending order
  totalPriceByDayArray.sort((a, b) => a.date.getTime() - b.date.getTime());

  return totalPriceByDayArray;
}

function calculateTotalPriceByDayOfWeek(purchaseStats: PurchaseStatsDto[]): {
  date: string;
  totalPrice: number;
}[] {
  const totalPriceByDayOfWeek: { [dayOfWeek: number]: number } = {};

  purchaseStats.forEach((purchase) => {
    const dayOfWeek = purchase.dealtAt.getDay();
    const totalPurchasePrice = purchase.tickets.reduce((total, ticket) => total + ticket.price, 0);

    totalPriceByDayOfWeek[dayOfWeek] = (totalPriceByDayOfWeek[dayOfWeek] || 0) + totalPurchasePrice;
  });

  // Convert the object to an array of objects
  const resultArray = Object.keys(totalPriceByDayOfWeek).map((dayOfWeekStr) => {
    const dayOfWeek = parseInt(dayOfWeekStr, 10);
    return { date: WEEKDAYS[dayOfWeek], totalPrice: totalPriceByDayOfWeek[dayOfWeek] };
  });

  // Sort the array by weekday
  resultArray.sort((a, b) => WEEKDAYS.indexOf(a.date) - WEEKDAYS.indexOf(b.date));

  return resultArray;
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function calculateTotalPriceByFilm(purchases: PurchaseStatsDto[]): {
  filmId: string,
  filmTitle: string,
  totalSales: number
}[] {
  const totalPriceByFilm = new Map<string, { filmTitle: string, totalSales: number }>();

  // Iterate through purchases
  purchases.forEach((purchase) => {
    // Iterate through tickets in each purchase
    purchase.tickets.forEach((ticket) => {
      // Extract film information
      const { filmId, title } = ticket.session;

      // Sum up total sales for each film
      const filmSales = totalPriceByFilm.get(filmId) ?? { filmTitle: title, totalSales: 0 };
      filmSales.totalSales += ticket.price;
      totalPriceByFilm.set(filmId, filmSales);
    });
  });

  // Convert the map to an array of objects
  return Array.from(totalPriceByFilm, ([filmId, { filmTitle, totalSales }]) => ({
    filmId,
    filmTitle,
    totalSales
  })).sort((o1, o2) => o2.totalSales - o1.totalSales);
}
