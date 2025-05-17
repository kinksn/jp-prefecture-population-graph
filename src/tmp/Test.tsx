import { Button } from '@radix-ui/themes';
import { SunIcon } from '@radix-ui/react-icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Test = () => {
  return (
    <div className="p-8">
      {/* 基本ボタン */}
      <Button>Click me</Button>

      {/* バリアント／カラーを変える例 */}
      <Button variant="solid" color="indigo" className="ml-4">
        Indigo Solid
      </Button>

      {/* アイコン付きゴーストボタン */}
      <Button color="gray" className="ml-4">
        <SunIcon width={18} height={18} />
      </Button>
      <Chart />
    </div>
  );
};

function Chart() {
  const options: Highcharts.Options = {
    title: { text: 'サンプルチャート' },
    series: [
      {
        type: 'line',
        data: [1, 3, 2, 4, 6, 5],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
