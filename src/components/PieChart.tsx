import * as Chartist from 'chartist';
import * as React from 'react';

interface Props {
  data: Chartist.IChartistData
  className?: string
  options?: Chartist.IPieChartOptions
  responsiveOptions?: Array<Chartist.IResponsiveOptionTuple<Chartist.IPieChartOptions>>
  style?: React.CSSProperties
}

export class PieChart extends React.Component<Props> {

  public displayName!: 'PieChart';

  protected chart!: HTMLDivElement | null;
  protected chartist!: Chartist.IChartistPieChart;

  public componentDidMount() {
    this.updateChart(this.props);
  }

  public componentWillReceiveProps(newProps: Props) {
    this.updateChart(newProps);
  }

  public componentWillUnmount() {
    if (this.chartist) {
      try {
        this.chartist.detach();
      } catch (err) {
        throw new Error(`Internal chartist error: ${err}`);
      }
    }
  }

  public shouldComponentUpdate(newProps: Props) {
    const { data, className, options, style, responsiveOptions } = this.props;
    return data !== newProps.data
      || className !== newProps.className
      || options !== newProps.options
      || style !== newProps.style
      || responsiveOptions !== newProps.responsiveOptions;
  }

  public render() {
    const { className, style } = this.props;
    return (
      <div className={`ct-chart ${className || ''}`} ref={ref => this.chart = ref} style={style} />
    );
  }

  protected updateChart(config: Props) {
    const data = config.data;
    const options = config.options || {};
    const responsiveOptions = config.responsiveOptions || [];

    if (this.chartist) {
      this.chartist.update(data, options);
    } else {
      this.chartist = new Chartist.Pie(this.chart, data, options, responsiveOptions);
    }

    return this.chartist;
  }
}
