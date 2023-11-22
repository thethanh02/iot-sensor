import {
  Card,
  Title,
  Grid,
  Col,
  Metric,
  Text,
  Switch,
  ProgressCircle,
  LineChart
} from "@tremor/react";
import React from "react";
import { BsLightbulbFill, BsLightbulbOffFill, BsLightbulb } from 'react-icons/bs';
import axios from 'axios'

function Dashboard() {
  const [valueChart, setValueChart] = React.useState(null);
  const [dataChart, setDataChart] = React.useState(null);
  const [kpiData, setKpiData] = React.useState([
    {
      title: "Temperature",
      value: 0,
    },
    {
      title: "Humidity",
      value: 0,
    },
    {
      title: "Light",
      value: 0,
    },
  ]);
  const [isSwitchLightOn, setIsSwitchLightOn] = React.useState(false);
  const [isSwitchLight2On, setIsSwitchLight2On] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:5678/api/lastest_sensors")
        .then(res => {
          setDataChart(res.data);
          setKpiData([
            {
              title: "Temperature",
              value: res.data[res.data.length - 1].temperature,
            },
            {
              title: "Humidity",
              value: res.data[res.data.length - 1].humidity,
            },
            {
              title: "Light",
              value: res.data[res.data.length - 1].light,
            },
          ]);
        }).catch(error => console.log(error))
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  async function handleSwitchLightOn(e) {
    console.log(e)
    setIsSwitchLightOn(e);
    let myAction = {
      name: 'LedY',
      action: e == true ? 'on' : 'off'
    }
    await axios.post("http://localhost:5678/api/action/save", myAction)
      .catch(error => console.log(error))
  }
  async function handleSwitchLight2On(e) {
    setIsSwitchLight2On(e);
    let myAction = {
      name: 'LedR',
      action: e == true ? 'on' : 'off'
    }
    await axios.post("http://localhost:5678/api/action/save", myAction)
      .catch(error => console.log(error))
  }
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-16 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Dashboard</h3>
      </header>
      {/* KPI Card ở trên cùng */}
      <div className="grid ie-na-content mt-5 gap-4 sm:grid-cols-3">
        {kpiData.map((item) => (
          <Card key={item.title}>
            <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
              <Col>
                <Text>{item.title}</Text>
                <Metric>{item.value}</Metric>
              </Col>
              <Col>
                <ProgressCircle value={item.value} size="md" color={`${item.value <= 30 ? 'indigo' : (item.value <= 80 ? 'violet' : 'fuchsia')}`}>
                  <span className={`h-12 w-12 rounded-full flex items-center justify-center text-sm text-fuchsia-500 font-medium ${item.value <= 30 ? 'bg-indigo-100' : (item.value <= 60 ? 'bg-violet-100' : 'bg-fuchsia-100')}`}>
                    {item.value}
                  </span>
                </ProgressCircle>
              </Col>
            </Grid>
          </Card>
        ))}
      </div>
      {/* Biểu đồ */}
      <div className="grid mt-4 gap-4 grid-rows-2 grid-cols-8">
        <div className="row-span-2 col-span-6">
          <Card className="h-full">
            <Title>DHT</Title>
            <LineChart
              className="mt-6"
              data={dataChart}
              index="time"
              categories={["temperature", "humidity", "light"]}
              colors={["blue", "fuchsia", "red"]}
              yAxisWidth={30}
              onValueChange={(v) => setValueChart(v)}
            />
          </Card>
        </div>
        {/* Các HÀNH ĐỘNG BẤM NÚT */}
        <div className="row-span-1 col-span-2">
          <Card className="h-full">
            <div className="grid grid-rows-2 grid-cols-2 space-x-3 text-orange-300 justify-items-center">
              <p className="text-2xl font-extrabold m-0 col-span-1 row-span-1">
                Light
              </p>
              <Switch className="mt-3 col-span-1 row-span-1" name="LedY" color={'amber'} checked={isSwitchLightOn} onChange={handleSwitchLightOn} />
              {isSwitchLightOn ?
                <BsLightbulbFill className="text-6xl col-span-2 row-span-1" /> :
                <BsLightbulb className="text-6xl col-span-2 row-span-1" />
              }
            </div>
          </Card>
        </div>
        <div className="row-span-1 col-span-2">
          <Card className="h-full">
            <div className="grid grid-rows-2 grid-cols-2 space-x-3 text-red-500 justify-items-center">
              <p className="text-2xl font-extrabold m-0 col-span-1 row-span-1">
                Light2
              </p>
              <Switch className="mt-3 col-span-1 row-span-1" name="LedY" color={'red'} checked={isSwitchLight2On} onChange={handleSwitchLight2On} />
              {isSwitchLight2On ?
                <BsLightbulbFill className="text-6xl col-span-2 row-span-1" /> :
                <BsLightbulb className="text-6xl col-span-2 row-span-1" />
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
