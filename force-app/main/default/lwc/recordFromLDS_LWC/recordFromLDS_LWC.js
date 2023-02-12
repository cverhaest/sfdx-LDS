import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
// Lightning Data Service: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_ui_api
// lightning/ui*Api Wire Adapters and Functions: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_ui_api
// lightning/uiRecordApi: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_record
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//import account_Object from '@salesforce/schema/Account'; // {"objectApiName":"Account"}
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import name from '@salesforce/schema/Account.Name'; // {"fieldApiName":"Name","objectApiName":"Account"}
import open_Opportunities from '@salesforce/schema/Account.Open_Opportunities__c';
import open_Opportunities_Value from '@salesforce/schema/Account.Open_Opportunities_Value__c';
import closed_Won_Opportunities from '@salesforce/schema/Account.Closed_Won_Opportunities__c';
import closed_Lost_Opportunities from '@salesforce/schema/Account.Closed_Lost_Opportunities__c';

// Access Labels
// https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.create_labels
import recordFromLDS_CardTitle from '@salesforce/label/c.recordFromLDS_CardTitle';

export default class RecordFromLDS_LWC extends LightningElement {
    @api cardVariant;
    @api cardTitle;
    @api cardIconName;
    @api debug = false;

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    // Loading the record
    @wire(getRecord, { recordId: '$recordId', fields: [name], optionalFields: [open_Opportunities, open_Opportunities_Value, closed_Won_Opportunities, closed_Lost_Opportunities] })
    oCurrentRecord;

    // Get object info
    //@wire(getObjectInfo, { objectApiName: account_Object })
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    oCurrentObjectInfo;     

    get open_Opportunities() {
        return getFieldValue(this.oCurrentRecord.data, open_Opportunities);
    }
    get open_Opportunities_Label() {
        if (this.oCurrentObjectInfo && this.oCurrentObjectInfo.data && this.oCurrentObjectInfo.data.fields) {
            return this.oCurrentObjectInfo.data.fields.Open_Opportunities__c.label;
        }
        return {};
    }     
    get open_Opportunities_Value() {
        return getFieldValue(this.oCurrentRecord.data, open_Opportunities_Value);
    }
    get open_Opportunities_Value_Label() {
        if (this.oCurrentObjectInfo && this.oCurrentObjectInfo.data && this.oCurrentObjectInfo.data.fields) {
            return this.oCurrentObjectInfo.data.fields.Open_Opportunities_Value__c.label;
        }
        return {};
    }     
    get closed_Won_Opportunities() {
        return getFieldValue(this.oCurrentRecord.data, closed_Won_Opportunities);
    }
    get closed_Won_Opportunities_Label() {
        if (this.oCurrentObjectInfo && this.oCurrentObjectInfo.data && this.oCurrentObjectInfo.data.fields) {
            return this.oCurrentObjectInfo.data.fields.Closed_Won_Opportunities__c.label;
        }
        return {};
    }     
    get closed_Lost_Opportunities() {
        return getFieldValue(this.oCurrentRecord.data, closed_Lost_Opportunities);
    }
    get closed_Lost_Opportunities_Label() {
        if (this.oCurrentObjectInfo && this.oCurrentObjectInfo.data && this.oCurrentObjectInfo.data.fields) {
            return this.oCurrentObjectInfo.data.fields.Closed_Lost_Opportunities__c.label;
        }
        return {};
    } 

    connectedCallback() {
        if(this.debug) console.log('### RecordFromLDS_LWC - connectedCallback() - START');
        console.log('### CVER - objectApiName:' + this.objectApiName);

        // Card title management
        if(this.cardTitle === null || this.cardTitle === ''){
            this.cardTitle = recordFromLDS_CardTitle;
        }
        if(this.debug) console.log('### RecordFromLDS_LWC - connectedCallback() - this.cardTitle:' + this.cardTitle);

        if(this.debug) console.log('### RecordFromLDS_LWC - connectedCallback() - END');
    }    

    handleRefresh(e) {
        console.log('### caseInformationFromLDS_LWC - handleRefresh() - START');
        // Refresh the component information
        return refreshApex(this.oCurrentRecord);
    }
}