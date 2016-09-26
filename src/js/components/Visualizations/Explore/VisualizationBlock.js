import React, { Component, PropTypes } from 'react';

import styles from '../Visualizations.sass';

import Visualization from '../Visualization';
import { getRoundedString } from '../../../helpers/helpers';

export default class VisualizationBlock extends Component {
  onClick() {
    const { spec, onClick } = this.props;
    onClick(spec.id);
  }

  saveVisualization() {
    const { spec, saveVisualization } = this.props;
    saveVisualization(spec.id, spec.data.visualize);
  }

  render() {
    const { spec, exportedSpecs, fieldNameToColor, filteredVisualizationTypes, className, showStats } = this.props;

    return (
      <div className={ styles.visualizationBlocksContainer + ' ' + ( styles[className] || '') }>
        <Visualization
          visualizationTypes={ filteredVisualizationTypes }
          fieldNameToColor={ fieldNameToColor ? fieldNameToColor : {} }
          spec={ spec }
          data={ spec.data.visualize }
          bins={ spec.data.bins }
          onClick={ this.onClick.bind(this) }
          isMinimalView={ true }
          showHeader={ true } />
        <div className={ styles.starContainer } onClick={ this.saveVisualization.bind(this) }>
          <i className={ exportedSpecs.items.find((exportedSpec) => exportedSpec.specId == spec.id) ? 'fa fa-star ' + styles.starred : 'fa fa-star-o' }></i>
        </div>
        { showStats &&
          <div className={ styles.stats }>
             { spec.scores.filter((score) => score.score !== null).map((score) =>
               <div>
                  <span className={ styles.type }>{ score.type }</span>:
                  <span className={ styles.value }>{ getRoundedString(score.score) }</span>
               </div>
             )}
          </div>
        }
      </div>
    );
  }
}

VisualizationBlock.propTypes = {
  spec: PropTypes.object.isRequired,
  fieldNameToColor: PropTypes.object,
  className: PropTypes.string,
  filteredVisualizationTypes: PropTypes.array.isRequired,
  exportedSpecs: PropTypes.object.isRequired,
  saveVisualization: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  showStats: PropTypes.bool
};