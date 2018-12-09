<?php global $wp_embed; 
$initialtab = $settings->initialtab; ?>
<div class="ajax-tabs ajax-tabs-<?php echo $settings->layout; ?> fl-clearfix">
	<div class="ajax-tabs-labels fl-clearfix" role="tablist">
		<?php for ($i = 0; $i < count($settings->items);
			$i++) : if (! is_object($settings->items[ $i ])) { continue;} 
			$select_type = $settings->items[ $i ]->select_type;
			$post_select = get_permalink($settings->items[ $i ]->post_select); ?>
			<div class="ajax-tabs-label<?php if ($initialtab == $i) { echo ' ajax-tab-active';} ?>" id="<?php echo 'ajax-tabs-' . $module->node . '-label-' . $i; ?>" data-index="<?php echo $i; ?>" aria-selected="<?php echo ($i != $initialtab) ? 'false' : 'true';?>" aria-controls="<?php echo 'ajax-tabs-' . $module->node . '-panel-' . $i; ?>" aria-expanded="<?php echo ($i != $initialtab) ? 'false' : 'true'; ?>" role="tab" tabindex="0" data-url="<?php echo $post_select; ?>" data-contenttype="<?php echo $select_type; ?>" <?php if ($initialtab == $i) { echo 'data-initialtab="true"'; } else {echo 'data-initialtab="false"';} ?>>
				<?php echo $settings->items[ $i ]->label; ?>
			</div>
		<?php endfor; ?>
	</div>
	<div class="ajax-tabs-panels fl-clearfix">
		<?php for ($i = 0; $i < count($settings->items);
			$i++) : if (! is_object($settings->items[ $i ])) { continue;}
			$select_type = $settings->items[ $i ]->select_type;
			$ajaxpostid = $settings->items[ $i ]->post_select; ?>
			<div class="ajax-tabs-panel"<?php if (! empty($settings->id)) { echo ' id="' . sanitize_html_class($settings->id) . '-' . $i . '"';} ?>>
				<div class="ajax-tabs-label ajax-tabs-panel-label<?php if ($initialtab == $i) { echo ' ajax-tab-active';} ?>" data-index="<?php echo $i; ?>" tabindex="0">
					<span><?php echo $settings->items[ $i ]->label; ?></span>
					<i class="fas<?php if ($i != $initialtab) { echo ' fa-plus';} ?>"></i>
				</div>
				<div class="ajax-tabs-panel-content fl-clearfix<?php if ($initialtab == $i) { echo ' ajax-tab-active';} ?>" id="<?php echo 'ajax-tabs-' . $module->node . '-panel-' . $i; ?>" data-index="<?php echo $i; ?>"<?php if ($i != $initialtab) { echo ' aria-hidden="true"';} ?> aria-labelledby="<?php echo 'ajax-tabs-' . $module->node . '-label-' . $i; ?>" role="tabpanel" aria-live="polite">
					<?php if($i == $initialtab && $select_type == "ajax"){
						FLBuilder::render_query(array(
							'p'         => $ajaxpostid
						));
					} elseif ($select_type == "editor") {
						echo wpautop($wp_embed->autoembed($settings->items[ $i ]->content));
					} ?>
				</div>
			</div>
		<?php endfor; ?>
	</div>
</div>
