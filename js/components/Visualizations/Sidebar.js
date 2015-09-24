import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDatasetsIfNeeded } from '../../actions/DatasetActions';
import { selectDataset, selectVisualizationType } from '../../actions/VisualizationActions';
import styles from './visualizations.sass';

import DropDownMenu from '../Base/DropDownMenu';
import ToggleButtonGroup from '../Base/ToggleButtonGroup';

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.onSelectDataset = this.onSelectDataset.bind(this);
    this.onSelectVisualizationType = this.onSelectVisualizationType.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { project, datasets, specSelector, fetchDatasetsIfNeeded, selectDataset } = this.props;

    if (nextProps.project.properties.id !== project.properties.id) {
      fetchDatasetsIfNeeded(nextProps.project.properties.id);
    }
    if (nextProps.datasets.items.length !== datasets.items.length && !specSelector.datasetId) {
      selectDataset(nextProps.datasets.items[0].dID);
    }
  }

  onSelectDataset(e, selectedIndex, menuItem) {
    this.props.selectDataset(menuItem.payload);
  }

  onSelectVisualizationType(visualizationType) {
    this.props.selectVisualizationType(visualizationType);
  }

  render() {
    return (
      <div className={ styles.sidebar }>
        { this.props.datasets.items && this.props.datasets.items.length > 0 &&
          <div className={ styles.sidebarGroup }>
            <h3 className={ styles.sidebarHeading }>Dataset</h3>
            <DropDownMenu
              selectedValue={ this.props.specSelector.datasetId }
              menuItems={ this.props.datasets.items }
              displayMember="title"
              valueMember="dID"
              onChange={ this.onSelectDataset } />
          </div>
        }
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Visualization type</h3>
          <ToggleButtonGroup
            toggleItems={ this.props.filters.visualizationTypes }
            displayTextMember="label"
            valueMember="type"
            imageNameMember="imageName"
            imageNameSuffix=".chart.svg"
            onChange={ this.onSelectVisualizationType } />
        </div>
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Categorical data</h3>
        </div>
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Numerical data</h3>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  project: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  specSelector: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { project, datasets, specSelector, filters } = state;
  return {
    project,
    datasets,
    specSelector,
    filters
  }
}

export default connect(mapStateToProps, { fetchDatasetsIfNeeded, selectDataset, selectVisualizationType })(Sidebar);
