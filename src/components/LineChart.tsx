import { LineChart as Line } from 'chartist';
import type { LineChartData, LineChartOptions } from 'chartist';
import { Component } from 'react';

interface Props {
  data: LineChartData
  className?: string
  options?: LineChartOptions
  responsiveOptions?: [string, LineChartOptions][]
  style?: React.CSSProperties
}

export class LineChart extends Component<Props> {

  public displayName!: 'LineChart';

  protected chart!: HTMLDivElement | null;
  protected chartist!: Line;

  public componentDidMount() {
    this.updateChart(this.props);
  }

  public componentDidUpdate(newProps: Props) {
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
    if (this.chartist) {
      this.chartist.update(config.data, config.options);
    } else {
      this.chartist = new Line(this.chart, config.data, config.options, config.responsiveOptions);
    }

    return this.chartist;
  }
}
