import React from "react";
import { CircularProgress, Slider, Button, withStyles, Table, TableRow, TableCell } from "@material-ui/core";
import moment from 'moment';

import s from './Dashboard.Module.css';


export default function Dashboard() {
  //const [userId, setUserId] = useState(null);
  //const currUser = useSelector(({ user }) => user);

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
  const finaceWeekEnd = daysCounter.getFinaceWeekCount();

  //const getPackage = async (user) => {
  //  const res = await axios.get(`http://localhost:5000/api/user/1/upgrades`)
  //    .then(response => response)
  //    .catch(error => error)

  //  console.log(res)
  //}
  //getPackage(currUser)

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
      color: '#52af77',
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
      //marginTop: ,
      marginLeft: -4,
      borderRadius: '50%',
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    valueLabel: {
      left: 'calc(-50% + 4px)',
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

  return <div className={s.root}>
      <div className={s.leftContainer}>
        <div className={s.qualification}>
          <span className={s.qualificationTitle}>Квалификация</span>
          <span className={s.qualificationValue}>NO QUALIFY</span>
        </div>
        <div className={s.userInfo}>
          <div className={s.userContainer}>Горпинсенко Максим</div>
          <span className={s.userProfit}>Доходы за месяц 500 y.e.</span>
        </div>
      </div>

      <div className={s.centerContainer}>
        <div className={s.financeTerm}>
          <span className={s.financeTermTitle}>
            До конца финансовой недели осталось:
          </span>
          <div className={s.financeTermValue}>
            {finaceWeekEnd} дней
          </div>
        </div>
        <div className={s.statusLeft}>
          <span className={s.statusLeftTitle}>Подтверждение статуса:</span>
          <span className={s.statusLeftValue}>Осталось 28 дней</span>
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
            <div className={s.progressTitle}>No Qualify</div>
            <div className={s.progressValue}>{progress}%</div>
          </div>
        </div>
        <div className={s.range}>
          <PrettoSlider
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            defaultValue={0}
            step={null}
            max={10000}
            min={0}
            marks={marks}
          />
        </div>
        {/*<div className={s.rangeInfo}></div>*/}
      </div>

      <div className={s.rightContainer}>
        <span className={s.rightContainerTitle}>Статистика</span>
        <div className={s.buttonsControl}>
          <Button variant="outlined" color="inherit" className={s.actionButton}>Неделя</Button>
          <Button variant="outlined" color="inherit" className={s.actionButton}>Месяц</Button>
          <Button variant="outlined" color="inherit" className={s.actionButton}>Всего</Button>
        </div>
        <Table className={s.table}>
          <TableRow className={s.tableRow}>
            <TableCell className={s.tableCell}>Всего заработано</TableCell>
            <TableCell className={s.styledTableCell}>0.00 y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Start бонус</TableCell>
            <TableCell className={s.styledTableCell}>0.00 y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Fixed бонус</TableCell>
            <TableCell className={s.styledTableCell}>0.00 y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Binary бонус</TableCell>
            <TableCell className={s.styledTableCell}>0.00 y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Check to check</TableCell>
            <TableCell className={s.styledTableCell}>0.00 y.e.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Личных партнёров</TableCell>
            <TableCell className={s.styledTableCell}>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={s.tableCell}>Партнёров в команде</TableCell>
            <TableCell className={s.styledTableCell}>0</TableCell>
          </TableRow>
        </Table>
        {/*//table*/}
      </div>
    </div>
}
