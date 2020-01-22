import * as React from "react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Facepile, IFacepilePersona, IFacepileProps, OverflowButtonType } from "office-ui-fabric-react/lib/Facepile";
import { PersonaSize } from "office-ui-fabric-react/lib/Persona";
import { Slider } from "office-ui-fabric-react/lib/Slider";
import { facepilePersonas } from "./FacepileExampleData";
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";

// Suppress office UI fabric icon warnings.
setIconOptions({
	disableWarnings: true,
});

export interface IFacepileBasicExampleProps {
	numberOfFaces?: number;
	numberFacesChanged?: (newValue: number) => void;
}

export interface IFacepileBasicExampleState extends React.ComponentState, IFacepileBasicExampleProps {
	personaSize: PersonaSize;
	imagesFadeIn: boolean;
}

export class FacepileBasicExample extends React.Component<IFacepileBasicExampleProps, IFacepileBasicExampleState> {
	constructor(props: IFacepileBasicExampleProps) {
		super(props);

		this.state = {
			numberOfFaces: props.numberOfFaces || 3,
			imagesFadeIn: true,
			personaSize: PersonaSize.size32
		};
	}

	public componentWillReceiveProps(newProps: IFacepileBasicExampleProps): void {
		this.setState(newProps);
	}

	public render(): JSX.Element {
		const { numberOfFaces, personaSize } = this.state;
		const facepileProps: IFacepileProps = {
			personaSize,
			personas: facepilePersonas,
			overflowButtonType: OverflowButtonType.descriptive,
			maxDisplayablePersonas: this.state.numberOfFaces,
			getPersonaProps: (persona: IFacepilePersona) => {
				return {
					imageShouldFadeIn: this.state.imagesFadeIn,
				};
			},
			ariaDescription: "To move through the items use left and right arrow keys.",
		};

		return (
			<div className={"msFacepileExample"}>
				<h3>React version in control: {React.version}</h3>
				<h3>React version in host window: {(window as any).React.version}</h3>
				<Facepile {...facepileProps} />
				<div className={"control"}>
					<Slider
						label="Number of Personas:"
						min={1}
						max={5}
						step={1}
						showValue={true}
						value={numberOfFaces}
						onChange={this.onChangePersonaNumber}
					/>
					<Dropdown
						label="Persona Size:"
						selectedKey={this.state.personaSize}
						options={[
							{ key: PersonaSize.size16, text: "16px" },
							{ key: PersonaSize.size24, text: "24px" },
							{ key: PersonaSize.size28, text: "28px" },
							{ key: PersonaSize.size32, text: "32px" },
							{ key: PersonaSize.size40, text: "40px" },
						]}
						onChange={this.onChangePersonaSize}
					/>
					<Checkbox
						className={"exampleCheckbox"}
						label="Fade In"
						checked={this.state.imagesFadeIn}
						onChange={this.onChangeFadeIn}
					/>
				</div>
			</div>
		);
	}

	private onChangeFadeIn = (
		ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
		checked?: boolean
	): void => {
		this.setState(
			(prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
				prevState.imagesFadeIn = checked!;
				return prevState;
			}
		);
	};

	private onChangePersonaNumber = (value: number): void => {
		this.setState(
			(prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
				prevState.numberOfFaces = value;
				return prevState;
			}
		);
		if (this.props.numberFacesChanged) {
			this.props.numberFacesChanged(value);
		}
	};

	private onChangePersonaSize = (event: React.FormEvent<HTMLDivElement>, value?: IDropdownOption): void => {
		this.setState(
			(prevState: IFacepileBasicExampleState): IFacepileBasicExampleState => {
				prevState.personaSize = value ? (value.key as PersonaSize) : PersonaSize.size32;
				return prevState;
			}
		);
	};
}
