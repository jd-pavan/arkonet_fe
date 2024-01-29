import React, { useState } from 'react';
import style from './Test.module.css'

const Test = () => {
  const [formdata, setFormdata] = useState({
    query_nature: "",
    financialyear: "",
    details: ""
  });


  const wordLimit = 300;
  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name,value)
    switch (name) {
      case "details":
        const inputText = e.target.value;
        // Split the text into words and filter out empty strings
        const words = inputText.split(' ').filter(word => word.length > 0);

        if (words.length <= wordLimit) {
          setFormdata({ ...formdata, [name]: value });
        }
        else {

        }
        break;
      default:
        setFormdata({ ...formdata, [name]: value });

    }

  }
  const Name = "Pavan Jidimath"
  const name = Name.split(" ")[0];
  return (
    <>

      <div className={style.noti_Titile}>
        <h3>
          <b>
            Notify your clients
          </b>
        </h3>
      </div>
      <div className={style.noti_TextareaAndIMGarea}>
        <div className={style.noti_First_Section}>
          <div className={style.noti_input_area}>
            <h5 className='text-center'><b>Add Text</b></h5>
            <div className={style.TEXT_area}>
              <textarea name="details" className={`${style.text2}`} value={formdata.details}
                onChange={handleChange} placeholder={`Max. ${wordLimit} Words..`} />

              <div className={`${style.p2}`}>
                <p className={`${style.wordcount}`}>Word Count: {formdata.details.split(' ').filter(word => word.length > 0).length}/{wordLimit}</p>
              </div>
            </div>
          </div>
          <div className={style.noti_img_area}>
            <label htmlFor="noti_img_upload"><b>Upload file</b></label>
            <div class={style.upload_btn_wrapper}>
              <button class={style.btn}>Upload a file</button>
              <input type="file" name="myfile" id='noti_img_upload' />
            </div>
          </div>
        </div>
        <div className={style.noti_Second_Section}>
          <button data-toggle="modal" data-target=".bd-example-modal-xl">SEND</button>
        </div>
      </div>
      <div className={style.noti_Lists}>
        <h4 className='mt-3 mb-2'><b>Notifications</b></h4>
        <div className={style.noti_lists} >
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
          <div className={`${style.noti_list} row`}>
            <span className="col-4">1</span>
            <span className="col-4">{name}</span>
            <span className="col-4">Preview...</span>
          </div>
        </div>
      </div>


      <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Send To...</h5>
            </div>
            <div class="modal-body">
              <div style={{ height: "70vh", overflowY: "auto" }}>
                <>
                  <div className='d-flex flex-column justify-content-center'>
                    <table className="table table-striped ">
                      <thead>
                        <tr style={{ backgroundColor: "#ffd401e6" }}>
                          <th scope="col" className="text-center">#</th>
                          <th scope="col" className="text-center">NAME</th>
                          <th scope="col" className="text-center">PAN</th>
                          <th scope="col" className="text-center">Mobile</th>
                        </tr>
                      </thead>
                      <tbody>




                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>
                        <tr >
                          <td className="text-center">
                            <input
                              type="checkbox"
                            // id={item.clientId}
                            // checked={checkedCheckboxes.includes(item.clientId)}
                            // onChange={() => handleCheckboxChange(item.clientId, item)}
                            />
                          </td>
                          <td className='text-center'>Name</td>
                          <td className='text-center'>PAN</td>
                          <td className='text-center'>mobile</td>

                        </tr>



                      </tbody>
                    </table>
                  </div>
                </>
              </div>

            </div>
            <div className={`${style.noti_Modal_footer_btn} modal-footer d-flex justify-content-center `}>
              <button >Send Notification</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
