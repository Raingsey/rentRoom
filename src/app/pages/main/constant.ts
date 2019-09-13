export class Constant {
    public static TRANS_SALE = 'Sale';
    public static TRANS_VOID = 'Void';
    public static TRANS_REFUND = 'Refund';

    public static STATUS_ACTIVE = 'Active';
    public static STATUS_CLOSE = 'Close';
    public static STATUS_DELETED = 'Deleted';
    public static STATUS_INACTIVE = 'In-Active';
    public static STATUS_PENDING = 'Pending';
    public static STATUS_APPROVED = 'Approved';
    public static STATUS_REJECTED = 'Rejected';
    public static STATIC_CANCELED = 'Canceled';
    public static STATIC_SUCCESS = 'Success';
    public static STATIC_FAILED = 'Failed';
    public static STATIC_WEB = 'WEB';
    public static STATIC_POS = 'POS';
    public static FIRST_PASS = 'X0ILODD055O1L';

    public static STATUS_NUMBER_ACTIVE = '1';
    public static STATUS_NUMBER_CLOSE = '0';
    public static STATUS_NUMBER_INACTIVE = '2';

    public static TRANSACTION_STATUSES = [
        { name: Constant.STATUS_PENDING, bg_color: '#0c96c9' },
        { name: Constant.STATUS_APPROVED, bg_color: '#bd0e67' },
        { name: Constant.STATUS_REJECTED, bg_color: '#e42104' },
        { name: Constant.STATIC_CANCELED, bg_color: '#f19c35' },
        { name: Constant.STATIC_SUCCESS, bg_color: '#317247' },
        { name: Constant.STATIC_FAILED, bg_color: '#8c51b1' }
    ];

    public static MERCHANT_STATUSES = [
        { name: Constant.STATUS_ACTIVE, bg_color: '#0088dc' },
        { name: Constant.STATUS_CLOSE, bg_color: '#FF2323' },
        { name: Constant.STATUS_INACTIVE, bg_color: '#BFF073' }
    ];

    public static MERCHANT_USER_STATUSES = [
        { name: Constant.STATUS_NUMBER_ACTIVE, bg_color: '#0088dc' },
        { name: Constant.STATUS_NUMBER_CLOSE, bg_color: '#FF2323' },
        { name: Constant.STATUS_NUMBER_INACTIVE, bg_color: '#BFF073' }
    ];

    public static ENCRYPE_PASS = {
        'token' : 'bb36eb5e-a19a-4ed5-b987-0e49a397e4a6',
        'secrete' : '9452e6b9-2b47-4493-b5c0-647be1f93809',
        'salt' : 'R@ingseyBuntoern168',
        'iv' : 'T0ny@rnS0p@k#9589'
    }

    public static BATCH_STATUSES = [
        { name: Constant.STATUS_PENDING, bg_color: '#0c96c9' },
        { name: Constant.STATUS_APPROVED, bg_color: '#bd0e67' },
        { name: Constant.STATUS_REJECTED, bg_color: '#e42104' },
        { name: Constant.STATIC_CANCELED, bg_color: '#f19c35' },
        { name: Constant.STATUS_DELETED, bg_color: '#9F0000' },
        { name: Constant.STATUS_CLOSE, bg_color: '#ff1c36' },
        { name: Constant.STATUS_INACTIVE, bg_color: '#BFF073' }
    ];

    public static CHANNELS = [
        { name: 'POS' },
        { name: 'WEB' },
        { name: 'External' },
        { name: 'Mobile' },
    ];

    public static WORKFLOWS = [
        { name: 'Transaction QR Code' },
        { name: 'Barcode Payment' },
        { name: 'External' },
        { name: 'Static QR Code' },
        { name: 'Online Payment' },
    ];

    public static TRANSACTION_TYPES = [
        { name: Constant.TRANS_SALE },
        { name: Constant.TRANS_VOID },
        { name: Constant.TRANS_REFUND },
    ];

    public static INTERNATIONAL_PAYMENT = [
        {id: 1, name: 'All' },
        {id: 2, name: 'Alipay' },
        {id: 3, name: 'Wechat Pay' },
    ];
}
