import React, { useState, useEffect } from 'react';
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
    note: ''
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
    'Sup P Khanabal', 'Sup P Awantipur', 'Sup P Wuzur', 'Del P 08 FBSU (AF)',
    'Sup P Balapur', 'Sup P Budgam', 'Del P Aishmaquam', 'Sup P Khundru',
    'Del P Bihibagh', 'Del P Tral'
  ];

  const demandCategories = [
    'Meat Dsd Fzn', 'Chicken Dsd Fzn', 'Broiler Alive', 'Egg Fresh ',
    'Veg', 'Fruit', 'POG', 'Bread White', 'Bread Wheatmeal',
    'Milk Fresh ', 'Butter Fresh', 'MAP Milk'
  ];

  // Effect to automatically fill Contractor and Deed Number
  useEffect(() => {
    if (formData.delSupPoint && formData.demandCategory) {
      // Find matching entry in our mapping file
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVegChange = (id, field, value) => {
    setVegetableData(prev => prev.map(veg =>
      veg.id === id ? { ...veg, [field]: value } : veg
    ));
  };

  const handleFruitChange = (id, field, value) => {
    setFruitData(prev => prev.map(fruit =>
      fruit.id === id ? { ...fruit, [field]: value } : fruit
    ));
  };

  const sendEmailSmtp = async (details, demands) => {

    console.log("*************************************************");
    // Load SMTP.js dynamically
    if (!window.Email) {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://smtpjs.com/v3/smtp.js";
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }
    console.log("resolverd 1")

    // Format the demands into a readable string
    const demandListText = demands && demands.length > 0
      ? demands.map(d => `- ${d.name}: ${d.quantityDemand} ${d.unit}`).join('\n')
      : 'No items selected';

    const emailBody = `
      New Supply Indent Initiated:
      ---------------------------------
      Del/Sup Point: ${details.delSupPoint}
      Category: ${details.demandCategory}
      Contractor Firm: ${details.contractorFirm}
      Deed No: ${details.contractDeedNo}
      Demand Date: ${details.demandDateTime}
      Delivery Date: ${details.deliveryDateTime}
      
      Selected Requirements:
      ${demandListText}

      Additional Notes:
      ${details.note || 'None'}
    `;

    try {
      /* 
       * SMTP.js Implementation 
       * REPLACE the placeholders below with your actual SMTP credentials or SecureToken
       * Example using Host/Username/Password:
       */
      console.log('Attempting to send SMTP email with body:\n', emailBody);

      // Simulate network delay for the UI (remove this when you add real credentials below)
      await new Promise(res => setTimeout(res, 1500));

      //UNCOMMENT AND ADD CREDENTIALS TO ACTUAL SEND:
      const result = await window.Email.send({
        Host: "smtp.gmail.com",
        Username: "sheikh.umaid03@gmail.com",
        Password: "bhdz toet fwbw wzjp",
        To: 'demandsupply586@gmail.com',
        From: "sheikh.umaid03@gmail.com",
        Subject: `New ${details.demandCategory} Indent from ${details.delSupPoint}`,
        Body: emailBody.replace(/\n/g, '<br>')
      });


      console.log("resolverd 1.5", result)

      if (result !== "OK") {
        console.error("SMTPJS failed to send:", result);
        alert("Failed to send email. Check console for details. Error: " + result);
        return false;
      }
      console.log("resolverd 2")

      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    let requiredDemands = [];
    if (formData.demandCategory === 'Veg') {
      requiredDemands = vegetableData.filter(v => v.selected);
    } else if (formData.demandCategory === 'Fruit') {
      requiredDemands = fruitData.filter(f => f.selected);
    } else if (formData.demandCategory && singleItemData.selected) {
      requiredDemands = [{ name: formData.demandCategory, ...singleItemData }];
    }

    console.log('Submitting Form data:', formData);
    console.log('With requirements:', requiredDemands);

    // Fire Email via SMTP
    await sendEmailSmtp(formData, requiredDemands);

    setIsSending(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="formContainer">
        <div className="successCard">
          <div className="successIcon">✓</div>
          <h1 className="successTitle">Request Submitted Successfully</h1>
          <p className="successSubtitle">
            Your supply indent for <strong>{formData.demandCategory}</strong> at <strong>{formData.delSupPoint}</strong> has been processed and your designated email was fired via SMTP.
          </p>
          <div className="successActions">
            <button
              className="btnPrimary"
              onClick={() => {
                // reset form perfectly
                setFormData(prev => ({ ...prev, demandDateTime: '', deliveryDateTime: '', note: '' }));
                setIsSubmitted(false);
              }}
            >
              Submit Another Request
            </button>
            <button className="btnSecondary" onClick={() => navigate('demandSelection')}>
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
        <button type="button" className="formBackBtn" onClick={() => navigate('demandSelection')}>
          &larr; Back
        </button>
        <h1 className="formTitle">Initiate Supply Indent</h1>
        <p className="formSubtitle">Fill out the supply parameters to initiate a formal rations indent</p>
      </div>

      <div className="formCard">
        <form onSubmit={handleSubmit}>

          <div className="formSection">
            <h2 className="sectionTitle">General Info</h2>
            <div className="formGrid">
              <div className="formGroup">
                <label className="formLabel">Del/Sup Point</label>
                <select name="delSupPoint" className="formInput" value={formData.delSupPoint} onChange={handleChange} required>
                  <option value="" disabled>Select point...</option>
                  {delSupPoints.map(point => (
                    <option key={point} value={point}>{point}</option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label className="formLabel">Demand Category</label>
                <select name="demandCategory" className="formInput" value={formData.demandCategory} onChange={handleChange} required>
                  <option value="" disabled>Select category...</option>
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
                  style={{ backgroundColor: '#f8fafc', color: '#475569' }}
                  value={formData.contractorFirm}
                  readOnly
                  placeholder="Auto-filled based on selection"
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Contact Deed No.</label>
                <input
                  type="text"
                  name="contractDeedNo"
                  className="formInput"
                  style={{ backgroundColor: '#f8fafc', color: '#475569' }}
                  value={formData.contractDeedNo}
                  readOnly
                  placeholder="Auto-filled based on selection"
                />
              </div>
            </div>
          </div>

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

          {/* VARIOUS CATEGORY TABLES */}
          {formData.demandCategory && (
            <div className="formSection">
              <div className="sectionHeader">
                <h2 className="sectionTitle">{formData.demandCategory} Requisition</h2>
                <span className="sectionBadge">Selection</span>
              </div>
              <div className="tableWrapper">
                <table className="itemsTable">
                  <thead>
                    <tr>
                      <th width="80" align="center">Include</th>
                      <th width="80" align="center">S.No</th>
                      <th>Item Name</th>
                      <th width="140" align="right">Quantity</th>
                      <th width="140" align="right">Indent Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* General Category */}
                    {formData.demandCategory !== 'Veg' && formData.demandCategory !== 'Fruit' && (
                      <tr className={singleItemData.selected ? 'rowSelected' : ''}>
                        <td align="center">
                          <input
                            type="checkbox"
                            className="formCheckbox"
                            checked={singleItemData.selected}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, selected: e.target.checked }))}
                          />
                        </td>
                        <td align="center">1</td>
                        <td className="itemName">{formData.demandCategory}</td>
                        <td align="right">
                          <select
                            className="unitSelect"
                            value={singleItemData.unit}
                            disabled={!singleItemData.selected}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, unit: e.target.value }))}
                            style={{ border: '1px solid #cbd5e1', borderRadius: '6px', width: '80px' }}
                          >
                            <option value="kg">/ kg</option>
                            <option value="g">/ g</option>
                            <option value="L">/ L</option>
                            <option value="pcs">/ pcs</option>
                          </select>
                        </td>
                        <td align="right">
                          <input
                            type="number"
                            className="qtyInput reqInput"
                            placeholder="0"
                            value={singleItemData.quantityDemand}
                            disabled={!singleItemData.selected}
                            onChange={(e) => setSingleItemData(prev => ({ ...prev, quantityDemand: e.target.value }))}
                            required={singleItemData.selected}
                          />
                        </td>
                      </tr>
                    )}

                    {/* Vegetable Category */}
                    {formData.demandCategory === 'Veg' && vegetableData.map((veg, index) => (
                      <tr key={veg.id} className={veg.selected ? 'rowSelected' : ''}>
                        <td align="center">
                          <input
                            type="checkbox"
                            className="formCheckbox"
                            checked={veg.selected}
                            onChange={(e) => handleVegChange(veg.id, 'selected', e.target.checked)}
                          />
                        </td>
                        <td align="center">{index + 1}</td>
                        <td className="itemName">{veg.name}</td>
                        <td align="right">
                          <span style={{ color: veg.selected ? '#475569' : '#cbd5e1', fontWeight: '500', display: 'inline-block', padding: '0.5rem 1rem' }}>
                            / kg
                          </span>
                        </td>
                        <td align="right">
                          <input
                            type="number"
                            className="qtyInput reqInput"
                            placeholder="0"
                            value={veg.quantityDemand}
                            disabled={!veg.selected}
                            onChange={(e) => handleVegChange(veg.id, 'quantityDemand', e.target.value)}
                            required={veg.selected}
                          />
                        </td>
                      </tr>
                    ))}

                    {/* Fruit Category */}
                    {formData.demandCategory === 'Fruit' && fruitData.map((fruit, index) => (
                      <tr key={fruit.id} className={fruit.selected ? 'rowSelected' : ''}>
                        <td align="center">
                          <input
                            type="checkbox"
                            className="formCheckbox"
                            checked={fruit.selected}
                            onChange={(e) => handleFruitChange(fruit.id, 'selected', e.target.checked)}
                          />
                        </td>
                        <td align="center">{index + 1}</td>
                        <td className="itemName">{fruit.name}</td>
                        <td align="right">
                          <span style={{ color: fruit.selected ? '#475569' : '#cbd5e1', fontWeight: '500', display: 'inline-block', padding: '0.5rem 1rem' }}>
                            / kg
                          </span>
                        </td>
                        <td align="right">
                          <input
                            type="number"
                            className="qtyInput reqInput"
                            placeholder="0"
                            value={fruit.quantityDemand}
                            disabled={!fruit.selected}
                            onChange={(e) => handleFruitChange(fruit.id, 'quantityDemand', e.target.value)}
                            required={fruit.selected}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="formSection flex-col">
            <h2 className="sectionTitle">XXXXXXXX XXXXXXXX</h2>
            <textarea
              name="note"
              className="formTextarea"
              placeholder="Enter any special packing or delivery instructions here..."
              value={formData.note}
              onChange={handleChange}
              rows={3}
            ></textarea>
          </div>

          <div className="formActions">
            <button type="submit" className="formSubmitBtn" disabled={isSending}>
              {isSending ? 'Sending Indent & Email...' : 'Submit Indent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DelSupForm;
