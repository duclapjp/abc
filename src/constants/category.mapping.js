import RoomUse from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";
import PlanTitle from "@iso/components/CategoryPlan/BasicPlanInfo/PlanTitle";
import AvailableTime from "@iso/components/CategoryPlan/BasicPlanInfo/AvailableTime";
import PostTime from "@iso/components/CategoryPlan/BasicPlanInfo/PostTime";
import EndTime from "@iso/components/CategoryPlan/BasicPlanInfo/EndTime";
import ReservablePeriod from "@iso/components/CategoryPlan/BasicPlanInfo/ReservablePeriod";
import CheckIn from "@iso/components/CategoryPlan/BasicPlanInfo/CheckIn";
import CheckOut from "@iso/components/CategoryPlan/BasicPlanInfo/CheckOut";
import MinConsecutiveNight from "@iso/components/CategoryPlan/BasicPlanInfo/MinConsecutiveNight";
import MaxConsecutiveNight from "@iso/components/CategoryPlan/BasicPlanInfo/MaxConsecutiveNight";
import MealCondition from "@iso/components/CategoryPlan/BasicPlanInfo/MealCondition";
import PaymentMethod from "@iso/components/CategoryPlan/BasicPlanInfo/PaymentMethod";
import ReservationStartDate from "@iso/components/CategoryPlan/BasicPlanInfo/ReservationStartDate";
import RewardPoints from "@iso/components/CategoryPlan/BasicPlanInfo/RewardPoints";
import BathTax from "@iso/components/CategoryPlan/BasicPlanInfo/BathTax";
import PlanRank from "@iso/components/CategoryPlan/BasicPlanInfo/PlanRank";

import PlanContent from "@iso/components/CategoryPlan/ExplanatoryText/PlanContent";
import QuestionsToBooker from "@iso/components/CategoryPlan/ExplanatoryText/QuestionsToBooker";
import ChargeSpecialNote from "@iso/components/CategoryPlan/ExplanatoryText/ChargeSpecialNote";
import ChildFeeSpecialNote from "@iso/components/CategoryPlan/ExplanatoryText/ChildFeeSpecialNote";
// import OtherInfo from "@iso/components/CategoryPlan/ExplanatoryText/OtherInfo";
import PackagePlanContent from "@iso/components/CategoryPlan/ExplanatoryText/PackagePlanContent";

import Package from "@iso/components/CategoryPlan/Jaran/Package";
// import HomepageDirect from "@iso/components/CategoryPlan/Jaran/HomepageDirect";
import InformationServices from "@iso/components/CategoryPlan/Jaran/InformationServices";
import LodgingLogPost from "@iso/components/CategoryPlan/Jaran/LodgingLogPost";
import BasicRoomProvided from "@iso/components/CategoryPlan/Jaran/BasicRoomProvided";
import AcceptanceConditions from "@iso/components/CategoryPlan/Jaran/AcceptanceConditions";
import Bedding from "@iso/components/CategoryPlan/Jaran/Bedding";
import Grade from "@iso/components/CategoryPlan/Jaran/Grade";
import View from "@iso/components/CategoryPlan/Jaran/View";

import InboundSales from "@iso/components/CategoryPlan/Rakuten/InboundSales";
import LimitedSales from "@iso/components/CategoryPlan/Rakuten/LimitedSales";
import PlanFeatures from "@iso/components/CategoryPlan/Rakuten/PlanFeatures";
import RakutenSuperPoint from "@iso/components/CategoryPlan/Rakuten/RakutenSuperPoint";
import SalesDestination from "@iso/components/CategoryPlan/Rakuten/SalesDestination";
import RoomChargeFormat from "@iso/components/CategoryPlan/Rakuten/RoomChargeFormat";
import ID from "@iso/components/CategoryPlan/Rakuten/ID";
import PublicFlag from "@iso/components/CategoryPlan/Rakuten/PublicFlag";
import RakutenPaymentMethod from "@iso/components/CategoryPlan/Rakuten/RakutenPaymentMethod";

import LimitMenWomen from "@iso/components/CategoryPlan/Rurubu/LimitMenWomen";
import GuestRoomUsage from "@iso/components/CategoryPlan/Rurubu/GuestRoomUsage";

import InstallationFee from "@iso/components/CategoryPlan/YoyakuPro/InstallationFee";

import MealIntroduction from "@iso/components/CategoryPlan/YoyakuPro/MealIntroduction";
import PlanForm from "@iso/components/CategoryPlan/YoyakuPro/PlanForm";
import PlanIntroduction1 from "@iso/components/CategoryPlan/YoyakuPro/PlanIntroduction1";
import PlanIntroduction2 from "@iso/components/CategoryPlan/YoyakuPro/PlanIntroduction2";

import DesignateSalesDestination from "@iso/components/CategoryPlan/Ikkyu/DesignateSalesDestination";
import PlanCode from "@iso/components/CategoryPlan/Ikkyu/PlanCode";
import RoomCode from "@iso/components/CategoryPlan/Ikkyu/RoomCode";
import SleepingWithChildren from "@iso/components/CategoryPlan/Ikkyu/SleepingWithChildren";

import RangeOfCharges from "@iso/components/CategoryPlan/Dairekutoin/RangeOfCharges";

import RoomTypeName from "@iso/components/CategoryPlan/RoomCreationInstructions/RoomTypeName";
import AmountPeople from "@iso/components/CategoryPlan/RoomCreationInstructions/AmountPeople";
import RoomTypeExplanation from "@iso/components/CategoryPlan/RoomCreationInstructions/RoomTypeExplanation";
import RoomSize from "@iso/components/CategoryPlan/RoomCreationInstructions/RoomSize";
import RoomType from "@iso/components/CategoryPlan/RoomCreationInstructions/RoomType";
import RoomEquipment from "@iso/components/CategoryPlan/RoomCreationInstructions/RoomEquipment";
import BedInformation from "@iso/components/CategoryPlan/RoomCreationInstructions/BedInformation";

import TaskDetail from "@iso/components/CategoryPlan/PhotoGalleryModification/TaskDetail";
import Caption from "@iso/components/CategoryPlan/PhotoGalleryModification/Caption";
import DisplaySettingAndArrangement from "@iso/components/CategoryPlan/PhotoGalleryModification/DisplaySettingAndArrangement";
import ImageDataStoreUrl from "@iso/components/CategoryPlan/PhotoGalleryModification/ImageDataStoreUrl";

import PatternDefault from "@iso/components/CategoryPlan/Cost/PatternDefault";

import Image from "@iso/components/CategoryPlan/Others/Image";
import TargetPeriod from "@iso/components/CategoryPlan/Others/TargetPeriod";
import EditingRange from "@iso/components/CategoryPlan/Others/EditingRange";
import TargetArea from "@iso/components/CategoryPlan/Others/TargetArea";
import Date from "@iso/components/CategoryPlan/Others/Date";
import ReferencePage from "@iso/components/CategoryPlan/Others/ReferencePage";
import TargetNumberPeople from "@iso/components/CategoryPlan/Others/TargetNumberPeople";

export default {
  ITEM1: RoomUse,
  ITEM2: PlanTitle,
  ITEM3: PlanContent,
  ITEM4: AvailableTime,
  ITEM5: PostTime,
  ITEM6: EndTime,
  ITEM7: CheckIn,
  ITEM8: CheckOut,
  ITEM9: MinConsecutiveNight,
  ITEM10: MaxConsecutiveNight,
  ITEM11: MealCondition,
  ITEM12: PaymentMethod,
  ITEM13: QuestionsToBooker,
  ITEM14: ChargeSpecialNote,
  ITEM15: ReservationStartDate,
  ITEM17: RewardPoints,
  ITEM19: ChildFeeSpecialNote,
  ITEM20: TaskDetail,
  ITEM21: PatternDefault,
  ITEM22: BathTax,
  ITEM23: PackagePlanContent,
  ITEM24: PlanRank,
  ITEM25: Package,
  ITEM26: InformationServices,
  ITEM27: LodgingLogPost,
  ITEM28: SalesDestination,
  ITEM29: InboundSales,
  ITEM30: PlanFeatures,
  ITEM31: RakutenSuperPoint,
  ITEM32: LimitedSales,
  ITEM33: LimitMenWomen,
  ITEM34: PlanForm,
  ITEM35: PlanIntroduction1,
  ITEM36: PlanIntroduction2,
  ITEM37: MealIntroduction,
  ITEM38: InstallationFee,
  ITEM39: DesignateSalesDestination,
  ITEM40: PlanCode,
  ITEM41: RangeOfCharges,
  ITEM42: RoomTypeName,
  ITEM43: AmountPeople,
  ITEM44: RoomTypeExplanation,
  ITEM45: RoomSize,
  ITEM46: RoomType,
  ITEM47: RoomEquipment,
  ITEM48: BedInformation,
  ITEM49: RoomChargeFormat,
  ITEM50: PublicFlag,
  ITEM51: ID,
  ITEM52: RakutenPaymentMethod,
  ITEM53: Grade,
  ITEM54: View,
  ITEM55: Bedding,
  ITEM56: AcceptanceConditions,
  ITEM57: BasicRoomProvided,
  ITEM58: GuestRoomUsage,
  ITEM59: SleepingWithChildren,
  ITEM60: RoomCode,
  ITEM61: Image,
  ITEM62: Caption,
  ITEM63: DisplaySettingAndArrangement,
  ITEM64: TargetPeriod,
  ITEM65: ImageDataStoreUrl,
  ITEM66: EditingRange,
  ITEM67: TargetArea,
  ITEM68: Date,
  ITEM70: TargetNumberPeople,
  ITEM71: ReferencePage,
  ITEM72: ReservablePeriod,
};
