import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
import PlayersTable from "../PlayersTable/PlayersTable";
import Select from "react-select";
import "./PlayersPage.css";
import { androidAdd } from "react-icons-kit/ionicons/androidAdd";
import { sort } from "react-icons-kit/fa/sort";
import { target } from "react-icons-kit/iconic/target";
import { Icon } from "react-icons-kit";

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results_count: 12,
      players: [],
      sort_options: [],
      filter_positions: [],
      selectedSort: { label: "Total score", value: "total_points" },
      selectedPosition: { label: "All", value: 5 }
    };
  }

  componentDidMount() {
    this.props.changeView();
  }

  loadMorePlayers = () => {
    this.setState(function(state) {
      return {
        ...state,
        results_count: state.results_count + 12
      };
    });
  };

  handleSortChange = selectedOption => {
    const { players } = this.state;
    this.setState({ selectedSort: selectedOption });
    this.setState(function(state) {
      return {
        ...state,
        players: players.sort(
          (a, b) => b[selectedOption.value] - a[selectedOption.value]
        )
      };
    });
  };

  handlePositionChange = selectedOption => {
    const { selectedSort } = this.state;
    this.setState(function(state) {
      return {
        ...state,
        selectedPosition: selectedOption,
        results_count: 12,
        players: this.props.response.elements
          .filter(player => player.element_type === selectedOption.value)
          .sort((a, b) => b[selectedSort.value] - a[selectedSort.value])
      };
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (
      nextProps.response &&
      nextProps.response.elements &&
      prevState.players.length === 0
    ) {
      console.log("getDerivedStateFromProps goes into the IF");

      const { stats_options } = nextProps.response; //sort options for react-select
      let sort_options = stats_options.map(option => {
        return { label: option.name, value: option.key };
      });

      const { element_types: positions } = nextProps.response; //filter options for react-select
      let position_options = positions.map(option => {
        return { label: option.plural_name, value: option.id };
      });
      position_options = [{ label: "All", value: 5 }, ...position_options];

      return {
        players: nextProps.response.elements.sort(
          (a, b) => a.element_type - b.element_type
        ),
        sort_options: sort_options,
        filter_positions: position_options
      };
    }
    return null;
  }

  render() {
    if (!this.props.response) {
      return <Loader />;
    }

    const { element_types: positions, teams } = this.props.response;
    const {
      players,
      sort_options,
      filter_positions,
      selectedSort,
      selectedPosition,
      results_count
    } = this.state;

    return (
      <div>
        <div className="PlayersPage">
          <div className="column">
            <div className="block">
              <div className="block-header">
                <h3 className="block-header__title">
                  <Icon
                    size={"24px"}
                    icon={target}
                    className="players-page__icon"
                  />
                  Position
                </h3>
              </div>
              <div className="content">
                <Select
                  value={selectedPosition}
                  onChange={this.handlePositionChange}
                  options={filter_positions}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="block">
              <div className="block-header">
                <h3 className="block-header__title">
                  <Icon
                    size={"24px"}
                    icon={sort}
                    className="players-page__icon"
                  />{" "}
                  Sort by
                </h3>
              </div>
              <div className="content">
                <Select
                  value={selectedSort}
                  onChange={this.handleSortChange}
                  options={sort_options}
                />
              </div>
            </div>
          </div>
        </div>
        <PlayersTable
          data={players}
          teams={teams}
          positions={positions}
          results_count={results_count}
        />
        <div class="loadmore">
          <button
            onClick={this.loadMorePlayers}
            disabled={players.length <= results_count ? true : false}
          >
            {" "}
            <Icon
              size={"24px"}
              icon={androidAdd}
              className="players-page__icon"
            />{" "}
            Load more{" "}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.response,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: () =>
      dispatch({
        type: actions.CHANGE_ACTIVE_VIEW,
        activeView: urls.PLAYERS_PAGE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersPage);
