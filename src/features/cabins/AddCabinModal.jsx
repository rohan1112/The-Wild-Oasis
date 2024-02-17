import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabinModal() {
  return (
    <Modal>
      <Modal.Open windowName="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window windowName="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   return (
  //     <>
  //       {!isModalOpen && (
  //         <Button onClick={() => setIsModalOpen((prev) => !prev)}>
  //           Add New Cabin
  //         </Button>
  //       )}
  //       {isModalOpen && (
  //         <Modal onClose={() => setIsModalOpen(false)}>
  //           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
  //         </Modal>
  //       )}
  //     </>
  //   );
}
