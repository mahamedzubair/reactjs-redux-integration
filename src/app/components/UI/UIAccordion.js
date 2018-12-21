import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import UIDropDownButton from "./modules/UIDropDownButton";
import simpleDDState from "./modules/sub-modules/DDState";
import v4 from "uuid/v4";
const UI_DROPDOWN_BUTTON_TYPE = "toggle";
export default class UIAccordion extends Component {
  static defaultProps = {
    allowManyPanelsToBeOpen: false,
    children: null,
    className: "",
    icon: true,
    iconType: "",
    openFirstPanelOnDefault: false,
    openNextPanel: false,
    openAllNPanels: null,
  };
  static propTypes = {
    /**
     * True allows multiple panels to be open.
     * @type {[type]}
     */
    allowManyPanelsToBeOpen: PropTypes.bool,
    /**
     * Used to build  the accordion.
     * @type {[type]}
     */
    children: PropTypes.arrayOf(
        PropTypes.shape({
          /** aria-label for child accordion panel
           * used only in the case where there is no header (text)
           * or the header text is inadequate for screen reader users
          */
          ariaLabel: PropTypes.string,
          /** Header for child accordion panel */
          header: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
          ]),
          /** Content for child accordion panel */
          body: PropTypes.any,
        })
      ),
      /** Additional classNames */
      className: PropTypes.string,
      /** Show or hide icons on accordion headers */
      icon: PropTypes.bool,
      /** Custom icon */
      iconType: PropTypes.string,
      /** Option to open a panel on default */
    openFirstPanelOnDefault: PropTypes.bool,
    /**
     * Headings will have a default aria-level of 2. If another heading level is
     * appropriate this attribute supplies it.
     * @type {[type]}
     */
    headingLevel: PropTypes.number,
    /** Flag to open the next panel */
    openNextPanel: PropTypes.bool,
    /** N number of panels to open on default, must be the total or it will open the first N panels */
    openAllNPanels: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      expandedItems: {}
    };
    this.uuid = v4();
  }
  componentDidMount() {
    const { openFirstPanelOnDefault, openAllNPanels } = this.props;
    if (openAllNPanels) {
      let expandedItems = {};
      for (let i = 0; i < openAllNPanels; i++) {
        expandedItems[i] = true;
      }
      this.setState({ expandedItems: expandedItems })
    }
    if (openFirstPanelOnDefault && !openAllNPanels) {
      this.setState({ expandedItems: {
        0: true
      }})
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.openNextPanel !== prevProps.openNextPanel && this.props.openNextPanel) {
      let newExpandedItem;
      Object.keys(this.state.expandedItems).forEach((item) => {
        if (this.state.expandedItems[item]) {
          newExpandedItem = Number(item) + 1;
          this.setState({ expandedItems: { [newExpandedItem]: true }});
        }
      })
    }
    if(this.props.openAllNPanels === 0 && 
        this.props.openAllNPanels !== prevProps.openAllNPanels )  {
        this.setState({ expandedItems: {}})
    }
    if (this.props.openAllNPanels !== prevProps.openAllNPanels 
        && this.props.openAllNPanels) {
      let expandedItems = {};
      for (let i = 0; i < this.props.openAllNPanels; i++) {
        expandedItems[i] = true;
      }
      this.setState({ expandedItems: expandedItems})
    }
  }
  dropdownClickHandler = id => {
    const { allowManyPanelsToBeOpen, openAllNPanels } = this.props;
    const currentExpandedItems = this.state.expandedItems;
    const emptyExpandedItems = {};
    if (currentExpandedItems[id] && !allowManyPanelsToBeOpen && !openAllNPanels) {
      return this.setState({ expandedItems: emptyExpandedItems });
    }
    if (allowManyPanelsToBeOpen || openAllNPanels) {
      const items = Object.assign(currentExpandedItems, {
        [id]: !currentExpandedItems[id]
      });
      return this.setState({
        expandedItems: Object.assign(currentExpandedItems, items)
      });
    }
    if (id >= 0) this.setState({ expandedItems: { [id]: true } });
  };
  renderAccordion = () => {
    const { children, className, icon, iconType } = this.props;
    return children.map((child, index) => {
      return (
        <div
          className={`accordion ${className}`}
          key={index}
          id={`accordionGroup-${index}-${this.uuid}`}
        >
          <div className="row" onClick={() => this.dropdownClickHandler(index)}>
            <div
              className={
                `accordion-title` + (icon ? " icon" : "") + ` columns small-12`
              }
              data-dropdown-expanded={this.state.expandedItems[index] || false}
              id={`accordionTitle-${index}-${this.uuid}`}
              role="heading"
              aria-level={this.props.headingLevel}
            >
            <UIDropDownButton
                type={UI_DROPDOWN_BUTTON_TYPE}
                ddId={`dd-${index}-${this.uuid}`}
                ddState={simpleDDState(
                  `dd-${index}-${this.uuid}`,
                  this.state.expandedItems[index] || false,
                  `accordionTitle-${index}-${this.uuid}`
                )}
                label={child.header}
                icon={iconType}
                refId={`button-${index}-${this.uuid}`}
                ariaLabel={child.ariaLabel}
                aria-expanded={this.state.expandedItems[index] || false}
              />
            </div>
          </div>
          <div
            className={
              this.state.expandedItems[index]
                ? `accordion-body row`
                : `accordion-body row hidden`
            }
          >
          <div
              className="columns small-12"
              role="region"
              aria-labelledby={`button-${index}-${this.uuid}`}
              id={`dd-${index}-${this.uuid}`}
            >
              <Fragment>{child.body}</Fragment>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    return this.renderAccordion(this.props.children);
  }
}


// Example:
// //In this accordion we passed 4 so all the 4 accordions will be opened. We need to toogle something like
// //openAllNPanels={2} or none.
// const accordionContent = [
//     {
//       "ariaLabel": "testing",
//       "header": "testing",
//       "body": "Nunc arcu nunc, rhoncus vitae cursus non"
//     },
//     {
//       "ariaLabel": "testing",
//       "header": "testing",
//       "body": "Nunc arcu nunc, rhoncus vitae cursus non, iaculis"
//     },
//     {
//       "ariaLabel": "testing",
//       "header": "testing",
//       "body": <p><strong>Bold text:</strong> why not?</p>
//     },
//     {
//       "ariaLabel": "Testing",
//       "header": "Testing",
//       "body": <div>markup also available</div>
//     },
//   ];
// <UIAccordion className="accordion-sample" openAllNPanels={4} icon={false}>
//     {accordionContent}
// </UIAccordion>


// Example 2:
// //In this accordion all accordions will be closed
// const accordionContent = [
//     {
//       "header": "example 1",
//       "body": "Nunc arcu nunc, rhoncus vitae cursus non"
//     },
//     {
//       "ariaLabel": "example 2",
//       "body": "Nunc arcu nunc, rhoncus vitae cursus non, iaculis"
//     },
//     {
//       "header": "example 3",
//       "body": <p><strong>Bold text:</strong> why not?</p>
//     },
//     {
//       "header": "example 4",
//       "body": <div>markup also available</div>
//     },
//   ];
// <UIAccordion className="accordion-sample">
//     {accordionContent}
// </UIAccordion>