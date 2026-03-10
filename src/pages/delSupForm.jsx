import React, { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import { contractorMapping } from '../utils/contractorData';
import './delSupForm.css';

const DelSupForm = ({ navigate }) => {

  const [formData, setFormData] = useState({
    delSupPoint: '',
    demandCategory: '',
    contractorFirm: '',
    contractDeedNo: '',
    demandDateTime: '',
    deliveryDateTime: '',
    note: '',
    note1: '',
    note2: '',
    note3: '',
    note4: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [vegetableData, setVegetableData] = useState([
    { id: 1, name: 'Potato (O)', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 2, name: 'Onion', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 3, name: 'Tomato', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 4, name: 'Garlic', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 5, name: 'Ginger', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 6, name: 'Cabbage', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 7, name: 'Cauliflower', selected: false, unit: 'kg', quantityDemand: '' }
  ]);

  const [fruitData, setFruitData] = useState([
    { id: 1, name: 'Apple', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 2, name: 'Banana', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 3, name: 'Orange', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 4, name: 'Grapes', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 5, name: 'Mango', selected: false, unit: 'kg', quantityDemand: '' },
    { id: 6, name: 'Papaya', selected: false, unit: 'kg', quantityDemand: '' }
  ]);

  const [singleItemData, setSingleItemData] = useState({
    selected: false,
    unit: 'kg',
    quantityDemand: ''
  });

  const delSupPoints = [
    'Sup P Khanabal','Sup P Awantipur','Sup P Wuzur','Del P 08 FBSU (AF)',
    'Sup P Balapur','Sup P Budgam','Del P Aishmaquam','Sup P Khundru',
    'Del P Bihibagh','Del P Tral'
  ];

  const demandCategories = [
    'Meat Dsd Fzn','Chicken Dsd Fzn','Broiler Alive','Egg Fresh ',
    'Veg','Fruit','POG','Bread White','Bread Wheatmeal',
    'Milk Fresh ','Butter Fresh','MAP Milk'
  ];

  useEffect(() => {

    if (formData.delSupPoint && formData.demandCategory) {

      const categoryData = contractorMapping[formData.demandCategory];

      if (categoryData && categoryData[formData.delSupPoint]) {

        const { firm, deed } = categoryData[formData.delSupPoint];

        setFormData(prev => ({
          ...prev,
          contractorFirm: firm || 'No Contractor Found',
          contractDeedNo: deed || ''
        }));

      } else {

        setFormData(prev => ({
          ...prev,
          contractorFirm: 'No Contractor Found',
          contractDeedNo: ''
        }));

      }

    }

  }, [formData.delSupPoint, formData.demandCategory]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleVegChange = (id, field, value) => {

    setVegetableData(prev =>
      prev.map(v =>
        v.id === id ? { ...v, [field]: value } : v
      )
    );

  };

  const handleFruitChange = (id, field, value) => {

    setFruitData(prev =>
      prev.map(f =>
        f.id === id ? { ...f, [field]: value } : f
      )
    );

  };

  const sendEmail = async (details, demands) => {

    const demandListText =
      demands && demands.length > 0
        ? demands.map(d => `${d.name}: ${d.quantityDemand} ${d.unit}`).join('\n')
        : 'No items selected';

    const templateParams = {
      delSupPoint: details.delSupPoint,
      demandCategory: details.demandCategory,
      contractorFirm: details.contractorFirm,
      contractDeedNo: details.contractDeedNo,
      demandDateTime: details.demandDateTime,
      deliveryDateTime: details.deliveryDateTime,
      items: demandListText,
      note: [details.note, details.note1, details.note2, details.note3, details.note4].filter(Boolean).join(' | ') || 'None'
    };

    try {

      await emailjs.send(
        "service_vpwvmyu",
        "template_3v2fmoz",
        templateParams,
        "Z_xATKuNDtphjuIm8"
      );

      return true;

    } catch (err) {

      console.error("Email send error:", err);
      return false;

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSending(true);

    let requiredDemands = [];

    if (formData.demandCategory === 'Veg') {
      requiredDemands = vegetableData.filter(v => v.selected);
    } 
    else if (formData.demandCategory === 'Fruit') {
      requiredDemands = fruitData.filter(f => f.selected);
    } 
    else if (formData.demandCategory && singleItemData.selected) {
      requiredDemands = [{ name: formData.demandCategory, ...singleItemData }];
    }

    const success = await sendEmail(formData, requiredDemands);

    setIsSending(false);

    if (success) {
      setIsSubmitted(true);
    } else {
      alert("Email failed to send");
    }

  };

  if (isSubmitted) {

    return (

      <div className="formContainer">

        <div className="successCard">

          <div className="successIcon">✓</div>

          <h1 className="successTitle">
            Request Submitted Successfully
          </h1>

          <p className="successSubtitle">
            Your supply indent for <strong>{formData.demandCategory}</strong> at <strong>{formData.delSupPoint}</strong> has been processed.
          </p>

          <div className="successActions">

            <button
              className="btnPrimary"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Request
            </button>

            <button
              className="btnSecondary"
              onClick={() => navigate('demandSelection')}
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="formContainer">

      <div className="formHeader">

        <button
          type="button"
          className="formBackBtn"
          onClick={() => navigate('demandSelection')}
        >
          &larr; Back
        </button>

        <h1 className="formTitle">Initiate Supply Indent</h1>

        <p className="formSubtitle">
          Fill out the supply parameters to initiate a formal rations indent
        </p>

      </div>

      <div className="formCard">

        <form onSubmit={handleSubmit}>

          {/* General Info */}

          <div className="formSection">

            <h2 className="sectionTitle">General Info</h2>

            <div className="formGrid">

              <div className="formGroup">
                <label className="formLabel">Del/Sup Point</label>

                <select
                  name="delSupPoint"
                  className="formInput"
                  value={formData.delSupPoint}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select point...</option>

                  {delSupPoints.map(point => (
                    <option key={point} value={point}>{point}</option>
                  ))}

                </select>
              </div>

              <div className="formGroup">

                <label className="formLabel">Demand Category</label>

                <select
                  name="demandCategory"
                  className="formInput"
                  value={formData.demandCategory}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select category...</option>

                  {demandCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}

                </select>

              </div>

              <div className="formGroup">

                <label className="formLabel">Authorized Farmer/Contractor</label>

                <input
                  type="text"
                  name="contractorFirm"
                  className="formInput"
                  value={formData.contractorFirm}
                  readOnly
                />

              </div>

              <div className="formGroup">

                <label className="formLabel">Contact Deed No.</label>

                <input
                  type="text"
                  name="contractDeedNo"
                  className="formInput"
                  value={formData.contractDeedNo}
                  readOnly
                />

              </div>

            </div>

          </div>

          {/* Demand Details */}

          {formData.demandCategory && (
            <div className="formSection">
              <h2 className="sectionTitle">Demand Details</h2>
              <div className="tableWrapper">
                {formData.demandCategory === 'Veg' ? (
                  <table className="itemsTable">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Item Name</th>
                        <th style={{ textAlign: 'right' }}>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vegetableData.map(veg => (
                        <tr key={veg.id} className={veg.selected ? "rowSelected" : ""}>
                          <td>
                            <input
                              type="checkbox"
                              className="formCheckbox"
                              checked={veg.selected}
                              onChange={(e) => handleVegChange(veg.id, 'selected', e.target.checked)}
                            />
                          </td>
                          <td className="itemName">{veg.name}</td>
                          <td style={{ textAlign: 'right' }}>
                            <input
                              type="number"
                              className={`formInput ${veg.selected ? 'reqInput' : ''}`}
                              style={{ width: '100px', padding: '0.5rem', display: 'inline-block' }}
                              value={veg.quantityDemand}
                              onChange={(e) => handleVegChange(veg.id, 'quantityDemand', e.target.value)}
                              disabled={!veg.selected}
                              placeholder="0"
                              required={veg.selected}
                              min="0.01"
                              step="any"
                            />
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <select 
                              className="formInput"
                              style={{ width: '80px', padding: '0.5rem', display: 'inline-block' }}
                              value={veg.unit}
                              onChange={(e) => handleVegChange(veg.id, 'unit', e.target.value)}
                              disabled={!veg.selected}
                            >
                              <option value="kg">kg</option>
                              <option value="g">g</option>
                              <option value="nos">nos</option>
                              <option value="ltr">ltr</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : formData.demandCategory === 'Fruit' ? (
                  <table className="itemsTable">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Item Name</th>
                        <th style={{ textAlign: 'right' }}>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fruitData.map(fruit => (
                        <tr key={fruit.id} className={fruit.selected ? "rowSelected" : ""}>
                          <td>
                            <input
                              type="checkbox"
                              className="formCheckbox"
                              checked={fruit.selected}
                              onChange={(e) => handleFruitChange(fruit.id, 'selected', e.target.checked)}
                            />
                          </td>
                          <td className="itemName">{fruit.name}</td>
                          <td style={{ textAlign: 'right' }}>
                            <input
                              type="number"
                              className={`formInput ${fruit.selected ? 'reqInput' : ''}`}
                              style={{ width: '100px', padding: '0.5rem', display: 'inline-block' }}
                              value={fruit.quantityDemand}
                              onChange={(e) => handleFruitChange(fruit.id, 'quantityDemand', e.target.value)}
                              disabled={!fruit.selected}
                              placeholder="0"
                              required={fruit.selected}
                              min="0.01"
                              step="any"
                            />
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <select 
                              className="formInput"
                              style={{ width: '80px', padding: '0.5rem', display: 'inline-block' }}
                              value={fruit.unit}
                              onChange={(e) => handleFruitChange(fruit.id, 'unit', e.target.value)}
                              disabled={!fruit.selected}
                            >
                              <option value="kg">kg</option>
                              <option value="g">g</option>
                              <option value="nos">nos</option>
                              <option value="ltr">ltr</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="itemsTable">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Item Name</th>
                        <th style={{ textAlign: 'right' }}>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={singleItemData.selected ? "rowSelected" : ""}>
                        <td>
                          <input
                            type="checkbox"
                            className="formCheckbox"
                            checked={singleItemData.selected}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, selected: e.target.checked }))}
                          />
                        </td>
                        <td className="itemName">{formData.demandCategory}</td>
                        <td style={{ textAlign: 'right' }}>
                          <input
                            type="number"
                            className={`formInput ${singleItemData.selected ? 'reqInput' : ''}`}
                            style={{ width: '100px', padding: '0.5rem', display: 'inline-block' }}
                            value={singleItemData.quantityDemand}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, quantityDemand: e.target.value }))}
                            disabled={!singleItemData.selected}
                            placeholder="0"
                            required={singleItemData.selected}
                            min="0.01"
                            step="any"
                          />
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <select 
                            className="formInput"
                            style={{ width: '80px', padding: '0.5rem', display: 'inline-block' }}
                            value={singleItemData.unit}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, unit: e.target.value }))}
                            disabled={!singleItemData.selected}
                          >
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="nos">nos</option>
                            <option value="ltr">ltr</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Scheduling */}

          <div className="formSection">

            <h2 className="sectionTitle">Scheduling</h2>

            <div className="formGrid">

              <div className="formGroup">

                <label className="formLabel">Indent Date & Time</label>

                <input
                  type="datetime-local"
                  name="demandDateTime"
                  className="formInput"
                  value={formData.demandDateTime}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="formGroup">

                <label className="formLabel">Delivery Date & Time</label>

                <input
                  type="datetime-local"
                  name="deliveryDateTime"
                  className="formInput"
                  value={formData.deliveryDateTime}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>

          {/* Notes */}

          <div className="formSection flex-col">

            <h2 className="sectionTitle">Additional Notes</h2>

            <textarea
              name="note"
              className="formTextarea"
              placeholder="Enter any special packing or delivery instructions here..."
              value={formData.note}
              onChange={handleChange}
              rows={3}
              style={{ marginBottom: '1.5rem' }}
            ></textarea>

            <div className="formGrid">
              <div className="formGroup">
                <label className="formLabel">Additional Note 1</label>
                <input
                  type="text"
                  name="note1"
                  className="formInput"
                  placeholder="Note 1..."
                  value={formData.note1}
                  onChange={handleChange}
                />
              </div>
              
              <div className="formGroup">
                <label className="formLabel">Additional Note 2</label>
                <input
                  type="text"
                  name="note2"
                  className="formInput"
                  placeholder="Note 2..."
                  value={formData.note2}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Additional Note 3</label>
                <input
                  type="text"
                  name="note3"
                  className="formInput"
                  placeholder="Note 3..."
                  value={formData.note3}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Additional Note 4</label>
                <input
                  type="text"
                  name="note4"
                  className="formInput"
                  placeholder="Note 4..."
                  value={formData.note4}
                  onChange={handleChange}
                />
              </div>
            </div>

          </div>

          <div className="formActions">

            <button
              type="submit"
              className="formSubmitBtn"
              disabled={isSending}
            >
              {isSending ? "Sending Indent..." : "Submit Indent"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default DelSupForm;