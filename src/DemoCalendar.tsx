import React,{useState,useEffect} from 'react'
import FullCalendar,{EventInput,EventContentArg, mapHash, DayCellContent, DayHeader, EventMountArg} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin,{DateClickArg} from '@fullcalendar/interaction'
import AddEvent from './AddEvent'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Hidden } from '@material-ui/core'
import { ToolbarInput } from '@fullcalendar/core'
import yellow from "./images/yellow.jpg"
import { TimelineDateProfile, TimelineView } from '@fullcalendar/timeline'
import "./DemoCalendar.css"
import { stringify } from 'querystring'
import {toMoment} from "@fullcalendar/moment"
import { group } from 'console'


const initialData:EventInput[] = [
    {
        title:"Due is Pending",
        start:"2022-04-25",
        amount:1000,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-26 12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-27T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-28T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-29T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-29T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-29T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-29T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-29T12:30:00",
        amount:30,
        allDay : false
    },
    {
        title:"Get Drunk",
        start:"2022-04-28"
    }
]

const repeatDate:EventInput[] = [
    {
        title:"Due is Pending",
        start:"2022-05-04",
        amount:1000,
        allDay : false,
        status:'start'
    },
    {
        title:"Due is Over",
        start:"2022-05-04",
        amount:1000,
        allDay : false,
        status:'start'
    },
    {
        title:"Get Drunk",
        start:"2022-05-05",
        amount:30,
        allDay : false,
        status:'start'
    }
]

const repeatDateTwo:EventInput[] = [
    {
        title:"Due is Pending",
        start:"2022-05-08",
        amount:1000,
        allDay : false,
        status:'end'
    },
    {
        title:"Due is Pending",
        start:"2022-05-04",
        amount:1000,
        allDay : false,
        status:'end'
    },
    {
        title:"Get Drunk",
        start:"2022-05-06",
        amount:30,
        allDay : false,
        status:'end'
    },
    {
        title:"Get Drunk",
        start:"2022-05-08",
        amount:30,
        allDay : false,
        status:'end'
    },
    {
        title:"Get Drunk",
        start:"2022-05-08",
        amount:30,
        allDay : false,
        status:'end'
    }
]

const DemoCalendar=(props:any)=>{
    const [data,setData]=useState<EventInput[]>(initialData);
    const [show,setShow]=useState(false);
    const [selected,setSelected]=useState(new Date())
    const [sampleData, setSampleData] = useState<any>();
    const [initialDataNew,setinitialDataNew]=useState<any>([]);
    const[filtered,setFiltered]=useState<any>([]);

    let testDate:any=[];
    const fetchPost = async () => {
    const response = await fetch(
        'https://www.gov.uk/bank-holidays.json'
    );
    const dataNew1 = await response.json();
    const dataNew =  dataNew1['england-and-wales']['events'];  
    let init:any=[]
    dataNew.map((item:any,key:any)=>{
        init = [...init, {title:"Britto", start:item.date, amount:1000,allDay : false}]; 
    });
     //setinitialDataNew(init);
    }
   
    useEffect(() => {
        fetchPost();
        getRepeatDate();
        // console.log(initialDataNew);
        // console.log(initialData);
    }, []);

    const renderEventContent=(e:EventContentArg)=>{
        return(
            <>
            {/* <span>{e.event.title}</span> */}
            {/* <span>{e.event.extendedProps.amount}</span>            */}
            {/* <img src={yellow} alt={'yellow'} width={10} height={10} style={{marginLeft:'50%'}}/> */}
            <div className='dot'></div>
            </>
        )
    }

    //Single Click
    // const handleDateClick=(dateClickInfo:any)=>{
    //     console.log(dateClickInfo.dateStr)
    // }

    //Double Click
    // const handleDateClick=(e:DateClickArg)=>{
    //   e.dayEl.addEventListener('dblclick',()=>{
    //       alert(`You Double clicked on ${e.dateStr}`)
    //   })
    // }

    //single Click and Double Click
    let clicks=0;
    let timer=setTimeout(()=>{},500);
    let dateClicked='';
    const reset =()=>{
        clicks=0;
        clearTimeout(timer);
        dateClicked='';
    }
    const handleDateClick=(e:DateClickArg)=>{
        clicks++;
        if(clicks===1){
            dateClicked=e.dateStr;
            timer=setTimeout(()=>{
                alert(`You single clicked on ${e.dateStr}`);
                reset();
            },250);
        }
        else{
            if(dateClicked===e.dateStr){
                //alert(`You double clicked on ${e.dateStr}`);
                setSelected(e.date);
                setShow(true);
            }
            reset();
        }
      }


    const injectCellContent=(args:any)=>{
        return(
           <div>
               <button onClick={()=>saveRecord(args.date)}>
                   {args.dayNumberText}
               </button>
           </div>
        )
    }
    const saveRecord=(date:Date)=>{
        alert(`You clicked on ${date}`);
    }
    const handleAdd=(data:any)=>{
            const event:EventInput = {start:selected,...data};
            setData(old=>[...old,event]);
            setShow(false);
    }

    
    const getRepeatDate=()=>{
        const ids = repeatDate.map(o => o.start)                                                        //working                   //working
        let filteredDate = repeatDate.filter(({start}, index) => !ids.includes(start, index + 1 ))      //working         
        //console.log(repeatDate); 

        let dates:any=[];
        filteredDate.map((item:any,key:any)=>{
            dates = [...dates, {title:"Britto", item, amount:1000,allDay : false}]; 
        });
        setFiltered(filteredDate); 
    }
    const renderEventContentRepeat=(e:EventContentArg)=>{

         return (
          <>
             {e.event.extendedProps.status === "start" &&  <div className="green"></div>}
             {e.event.extendedProps.status === "end" &&  <div className="dot"></div>}
          </>
        );
    }

    return(
        <>
        <h3>Calendar</h3>
        {show && <AddEvent handleAdd={handleAdd} handleClose={()=>setShow(false)}/>}
        {/* <FullCalendar 
        plugins={[dayGridPlugin,interactionPlugin,bootstrap5Plugin]}
        events={data}
        eventContent={renderEventContent}
        dateClick={handleDateClick}
        dayCellContent={injectCellContent}
        themeSystem= 'bootstrap5'
        contentHeight= {300}
        dayMaxEvents ={2}
        //dayMaxEventRows={true}
        /> */}

        <div className='col-lg-10'>
        <FullCalendar 
            plugins={[dayGridPlugin,interactionPlugin,bootstrap5Plugin,timeGridPlugin]}
           // events={data}
           // events={repeatDate}
            eventSources={[repeatDate,repeatDateTwo]}
            eventColor= '#20c997'
            eventContent={renderEventContentRepeat}
            dateClick={handleDateClick}
            //dayCellContent={injectCellContent}
            themeSystem= 'bootstrap5'
            //contentHeight= {'auto'}
            //height={'auto'}
            // expandRows={false}
            //aspectRatio={5}           
            headerToolbar={{start:'prev prevYear',center:'title',end:'nextYear next'}}
            //titleFormat={{day: 'numeric'}}
            //titleRangeSeparator={' to '}
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            //slotMinWidth={0.5}
            contentHeight={'auto'}
            //eventMinWidth={0}
            //contentHeight= {300}
            //dayMaxEventRows={true}
            //dayMaxEvents ={2}
            moreLinkContent=''
            dayHeaderFormat={{weekday:'long'}}
            />
        </div>
        </>
    )
}
export default DemoCalendar


