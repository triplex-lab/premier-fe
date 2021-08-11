import React, { useEffect, useState } from "react";
import { CircularProgress, Slider, Button, withStyles, Table, TableRow, TableCell } from "@material-ui/core";
import moment from 'moment';
import axios from 'axios';

import s from './Dashboard.Module.css';


export default function Dashboard() {

  const [dashboard, setDashboard] = useState({});
  const [statsPeriod, setStatsPerios] = useState('week');
  const [qualBvValue, setQualBvValue] = useState(0);

  const getDashboard = async () => {
    axios.get('/dashboard')
      .then(res => {
        if (res.data) {
          setDashboard(res.data)
          setQualBvValue(res.data.qualBv)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const statsPeriodNamer = (period) => {
    switch(period) {
      case 'week':
      return 'Неделя';

      case 'month':
      return 'Месяц';

      case 'total':
      return 'Всего';

      case 'НЕДЕЛЯ':
      return 'week';

      case 'МЕСЯЦ':
      return 'month';

      case 'ВСЕГО':
      return 'total';
    }
  };

  const statsPeriodHandler = (e) => {
    setStatsPerios(statsPeriodNamer(e.target.innerText));
  }

  class DateControl {
    constructor(props) {
      this.date = props.date;
      this.weekCount = null;
    }

    getCurrentDay() {
      return moment(this.date).day();
    }

    getDaysCountByMonths() {
      return moment(this.date).daysInMonth();
    }

    getDimension() {
      let currDayCount = moment(this.date).date();
      let dimension = currDayCount / this.getDaysCountByMonths();
      return Math.round(dimension * 100);
    }

    getFinaceWeekCount() {
      if (this.getCurrentDay() === 1) {
        return this.getCurrentDay();
      }
      else {
        return 9 - this.getCurrentDay();
      }
    }
  }

  const daysCounter = new DateControl(new Date());
  const progress = daysCounter.getDimension();

  const statsButtons = [
    'week',
    'month',
    'total',
  ]

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 50,
    },
    {
      value: 200,
    },
    {
      value: 500,
    },
    {
      value: 1000,
      label: '1000',
    },
    {
      value: 2500,
      label: '2500',
    },
    {
      value: 5000,
      label: '5000',
    },
    {
      value: 10000,
      label: '10000',
    },
  ];

  const PrettoSlider = withStyles({
    root: {
      color: '#ec860d',
      height: 8,
      paddingRight: 5,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    mark: {
      height: 8,
      width: 8,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginLeft: -4,
      borderRadius: '50%',
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    valueLabel: {
      left: 'calc(-50% - 5px)',
      top: '-60px'
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const getAriaValueText = (value) => {
    return `B: ${value}`
  }

  const rangeInfoRenderer = (array) => {
    let count = 6;
    let arr =array.map((type, index) => {
      if (index < 8) {
        return;
      }
      count += 2;
      return <div className={s.rangeInfoContainer}>
        <span className={s.rangeInfoItem}>{type}</span>
        <span className={s.rangeInfoItem} style={{marginTop: "3px"}}>{dashboard.QualRequirements[count -index].req}</span>
      </div>
    })
    return arr.filter(item => item !== undefined);
  }

  useEffect(() => {
    getDashboard();
  }, [])

  if (!Object.keys(dashboard).length) {
    return null;
  }

  return <div className={s.root}>
      <div className={s.leftContainer}>
        <div className={s.qualification}>
          <span className={s.qualificationTitle}>Квалификация</span>
          <span className={s.qualificationValue}>{dashboard.qualSt.toUpperCase()}</span>
        </div>
        <div className={s.userInfo}>
          <div className={s.userContainer}>{dashboard.inviterFullName}</div>
          <span className={s.userProfit}>Доходы за месяц {dashboard.stats.month.total} y.e.</span>
        </div>
      </div>

      <div className={s.centerContainer}>
        <div className={s.bvIndicator}>
          <span>{dashboard.qualStBvLeft} BV</span>
          <span>до {dashboard.qualNextName.toUpperCase()}</span>
        </div>
        <div className={s.financeTerm}>
          <span className={s.financeTermTitle}>
            До конца финансовой недели осталось:
          </span>
          <div className={s.financeTermValue}>
            {dashboard.timeBounds.weekDaysLeft} дней
          </div>
        </div>
        <div className={s.statusLeft}>
          <span className={s.statusLeftTitle}>Подтверждение статуса:</span>
          <span className={s.statusLeftValue}>Осталось {dashboard.timeBounds.statusDaysLeft} дней</span>
        </div>
        <div className={s.myQualification}>
          <span className={s.myQualificationTitle}>Моя квалификация</span>
        </div>
        <div className={s.progress}>
          <CircularProgress
            className={s.realProgress}
            color={'inherit'}
            size={300}
            thickness={6}
            variant="determinate"
            value={progress}
          />
          <div className={s.pseudoProgress}></div>
          <div className={s.progressInfo}>
            <div className={s.progressTitle}>{dashboard && dashboard.qualSt}</div>
            <div className={s.progressValue}>{progress}%</div>
          </div>
        </div>
        <div className={s.range}>
          <PrettoSlider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            defaultValue={dashboard.qualBv}
            step={null}
            max={10000}
            min={0}
            marks={marks}
            valueLabelFormat={() => getAriaValueText(qualBvValue)}
            value={qualBvValue}
            onChange={(e, newVal) => {
              console.log(newVal)
              setQualBvValue(newVal)
            }}
          />
        </div>
        <div className={s.rangeInfo}>
          {rangeInfoRenderer(Object.keys(dashboard.QualType))}
        </div>
      </div>

      <div className={s.rightContainer}>
        <span className={s.rightContainerTitle}>Статистика</span>
        <div className={s.buttonsControl}>
          {statsButtons.map(name => {
            return <Button
              variant="outlined"
              color="inherit"
              className={s.actionButton}
              onClick={statsPeriodHandler}
            >
              {statsPeriodNamer(name)}
            </Button>
          })}
        </div>
        <Table className={s.table}>
          <TableRow>
            <TableCell className={s.tableCell}>Всего заработано</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].total} y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Start бонус</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].start} y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Fixed бонус</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].fixed} y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Binary бонус</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].binary} y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Check to check</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].check} y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Личных партнёров</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].personalPartners}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Партнёров в команде</TableCell>
            <TableCell className={s.styledTableCell}>{dashboard.stats[statsPeriod].teamPartners}</TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
}
