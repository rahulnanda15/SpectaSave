import { Interactable } from "./SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { InteractorEvent } from "./SpectaclesInteractionKit/Core/Interactor/InteractorEvent";
import { SIK } from "./SpectaclesInteractionKit/SIK";
import { mix } from "./SpectaclesInteractionKit/Utils/animate";
import NativeLogger from "./SpectaclesInteractionKit/Utils/NativeLogger";

const log = new NativeLogger("MyNativeLogger");
// Interaction System https://developers.snap.com/spectacles/spectacles-frameworks/spectacles-interaction-kit/features/interactionsystem
// Instantiate https://developers.snap.com/lens-studio/api/lens-scripting/classes/Built-In.ObjectPrefab.html#instantiateasync or https://developers.snap.com/lens-studio/lens-studio-workflow/prefabs

@component
export class ExampleLensManager extends BaseScriptComponent {

  @input
  @allowUndefined
  @hint("The prefab object we will instantiate when clicking the create button")
  faceObjectAttached: SceneObject;

  @input
  @allowUndefined
  @hint("The position reference the object will move to on left-hand pinch")
  destinationReference: SceneObject;

  @input
  @hint("Speed at which the object moves to the destination on pinch")
  lerpSpeed: number = 0.1;



  onAwake() {
    this.createEvent("UpdateEvent").bind(() => {
      this.updateObjectMovement();
      //log.d("Update event triggered");
     // print("Update event triggered");
    });
  }


  // Update the object movement to the destination
  updateObjectMovement() {

    let currentPos = this.faceObjectAttached.getTransform().getWorldPosition();
    let targetPos = this.destinationReference
      .getTransform()
      .getWorldPosition();

    let currentRot = this.faceObjectAttached.getTransform().getWorldRotation();
    let targetRot = this.destinationReference
      .getTransform()
      .getWorldRotation();

    let newPos = mix(currentPos, targetPos, this.lerpSpeed);
    let newRot = mix(currentRot, targetRot, this.lerpSpeed);
    this.faceObjectAttached.getTransform().setWorldPosition(newPos);
    this.faceObjectAttached.getTransform().setWorldRotation(newRot);
    
    //log.d("Object is moving to destination");
    //print("Object is moving to destination");
  }
}