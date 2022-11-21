<template>
<!-- <div class="wrap-header"></div> -->
<div class="page-header">
    <p class="fs-2">Danh Sách Cấc Cặp Đấu</p>
    <p style="font-size: 5rem">CHIẾM LĨNH 1B</p>
</div>

<div class="container" v-if="data">
    <div class="col col-12 mt-4 mb-4">
        <div class="table-responsive bg-light p-3 pt-3 pb-3 table-radius">
            <div class="block-opposite" v-for="group in data" :key="group.id">
                <div class="text-black imso-medium-font edit-border imso-ani">Vòng Đấu bảng {{group.id}}</div>
                <div>
                    <div class="imso-ml-c">
                        <router-link
                            :to="{ name: 'DetailOppositePair', params: { id: group.id } }"
                            class="edit-tag-a"
                        >
                            <table class="ml-bs-u liveresults-sports-immersive__match-grid">
                                <tbody>
                                    <tr>
                                        <td class="liveresults-sports-immersive__match-tile imso-hov liveresults-sports-immersive__match-grid-right-border">
                                            <div class="imso-hov">
                                                <div class="imso-loa imso-ani">
                                                    <div class="imspo_mt__mtc-no">
                                                        <table class="KAIX8d">
                                                            <tbody>
                                                                <tr class="S6bEgc">
                                                                    <td class="lc"></td>
                                                                    <td></td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                    <td class="h8T7ab"></td>
                                                                    <td class="imspo_mt__sc"></td>
                                                                    <td class="G6pHwb" style="width: 0px;"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="BAX2sc" colspan="6">
                                                                        <div class="imspo_mt__lg-st-co"><span>Vòng 1</span></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td class="kwbMAe" rowspan="5"></td>
                                                                    <td rowspan="5" class="GOsQPe imspo_mt__wt">
                                                                        <div class="imspo_mt__ms-w">
                                                                            <div>
                                                                                <div class="imspo_mt__ns-pm-s">
                                                                                    <div class="imspo_mt__pm-inf imspo_mt__pm-infc imspo_mt__date imso-medium-font">{{group.teams[0].point_after_steal.total}}</div>
                                                                                    <div class="imspo_mt__ndl-p imspo_mt__pm-inf imspo_mt__pm-infc imso-medium-font">{{group.teams[1].point_after_steal.total}}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                </tr>
                                                                <tr class="L5Kkcd">
                                                                    <td class="tns-c imspo_mt__tt-w imspo_mt__dt-t">
                                                                        <div class="ellipsisize">
                                                                            <span aria-hidden="true">{{group.teams[0].name}}</span><span></span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                </tr>
                                                                <tr class="L5Kkcd">
                                                                    <td class="tns-c imspo_mt__tt-w imspo_mt__dt-t">
                                                                        <div class="ellipsisize" >
                                                                            <span aria-hidden="true">{{group.teams[1].name}}</span><span></span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                </tr>
                                                                <tr class="bN3Vue"></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="liveresults-sports-immersive__match-tile imso-hov">
                                            <div class="imso-hov">
                                                <div class="imso-loa imso-ani">
                                                    <div class="imspo_mt__mtc-no">
                                                        <table class="KAIX8d">
                                                            <tbody>
                                                                <tr class="S6bEgc">
                                                                    <td class="lc"></td>
                                                                    <td></td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                    <td class="h8T7ab"></td>
                                                                    <td class="imspo_mt__sc"></td>
                                                                    <td class="G6pHwb" style="width: 0px;"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="BAX2sc" colspan="6">
                                                                        <div class="imspo_mt__lg-st-co"><span>Vòng 2</span></div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3"></td>
                                                                    <td class="kwbMAe" rowspan="5"></td>
                                                                    <td rowspan="5" class="GOsQPe imspo_mt__wt">
                                                                        <div class="imspo_mt__ms-w">
                                                                            <div>
                                                                                <div class="imspo_mt__ns-pm-s">
                                                                                    <div class="imspo_mt__pm-inf imspo_mt__pm-infc imspo_mt__date imso-medium-font">{{group.teams[0].point_after_steal.total}}</div>
                                                                                    <div class="imspo_mt__ndl-p imspo_mt__pm-inf imspo_mt__pm-infc imso-medium-font">{{group.teams[1].point_after_steal.total}}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                </tr>
                                                                <tr class="L5Kkcd">
                                                                    <td class="tns-c imspo_mt__tt-w imspo_mt__dt-t">
                                                                        <div class="ellipsisize" >
                                                                            <span aria-hidden="true">{{group.teams[0].name}}</span><span></span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                </tr>
                                                                <tr class="L5Kkcd">
                                                                    <td class="tns-c imspo_mt__tt-w imspo_mt__dt-t">
                                                                        <div class="ellipsisize" >
                                                                            <span aria-hidden="true">{{group.teams[1].name}}</span><span></span>
                                                                        </div>
                                                                    </td>
                                                                    <td class="imspo_mt__rg"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                </tr>
                                                                <tr class="bN3Vue"></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
  
<script>
  import ApiService from "@/services/api.service";
  export default {
    setup() {
        const { data } = ApiService.getData();
        console.log('data: ', data)
        return { data };
      },
  };
</script>
  